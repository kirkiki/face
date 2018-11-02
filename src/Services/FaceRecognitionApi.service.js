import axios from 'axios'

class FaceRecognitionApiService {

    APIKey = ""

    supported_attributes = [
        'age', 
        'gender', 
        'headPose',
        'smile',
        'facialHair',
        'glasses', 
        'emotion', 
        'hair',
        'makeup',
        'occlusion',
        'accessories',
        'blur',
        'exposure',
        'noise'
    ]

    constructor(APIKey) { 
        this.APIKey = APIKey
    }

    getSupportedAttributes() { 
        return this.supported_attributes;
    }

    formatAPIUrl(faceIds = true, faceLandmarks = false, attributes = []) {
        // Get states values.
        let ret = 'https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceIds=' + faceIds + "&returnFaceLandmarks=" + faceLandmarks
        let faceAttributes = ""
        for (let attribute in attributes)
        { 
            if (this.supported_attributes.includes(attribute)) {
                if(! faceAttributes) { 
                    faceAttributes += ','
                }
                faceAttributes += attribute
            }
            else {
                console.log("attribute :", attribute, "is not supported")
            }
        }
        if(faceAttributes) {
            ret = ret + "&returnFaceAttributes=" + faceAttributes
        }
        return ret
    }


/*

*/

    GetFaceInformationFromImageData(imageData, ids= true, landmarks=true, attributes = this.supported_attributes) {
        let to = this.formatAPIUrl(ids, landmarks, this.supported_attributes)
        return this._MakeRequest(to, imageData, "application/octet-stream")
    }

    GetFaceInformationFromUrl(Url, ids= true, landmarks=true, attributes = this.supported_attributes) {
        let to = this.formatAPIUrl(ids, landmarks, this.supported_attributes)
        return this._MakeRequest(to, {url : Url}, "application/json")
    }

    _MakeRequest(to, datas, contentType) {
        return axios.post(to,
            datas,
            {
                headers: {
                    "Ocp-Apim-Subscription-Key": this.APIKey,
                    "Content-type": contentType
                }
            }
        )
    }
}

export default FaceRecognitionApiService