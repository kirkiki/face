import React, { Component } from 'react'

import FaceRecognitionApiService from '../Services/FaceRecognitionApi.service'

class UploadForm extends Component {

    faceRecog

    constructor(props) {
        super(props);

        this.faceRecog = new FaceRecognitionApiService("59367a363a2947208054fa85fc318ce9")

        this.state = {
            inputValue: ''
        };

    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    uploadUrlImage() {
        // TODO add url checks.
        // https://media1.popsugar-assets.com/files/thumbor/Z2Pu7yrdRY56ug4-KYlLLoNK_3Y/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2011/10/43/3/192/1922153/88ead859efe1888f_BTV_HowTo_DragonTat_2011_1023_thumbsquare/i/Halloween-Costume-Lisbeth-Salander-Girl-Dragon-Tattoo.png
        //
        //
        this.faceRecog.GetFaceInformationFromUrl(this.input.value)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    uploadImage(evt) {
        let fileList = evt.target.files;
        let fileReader = new FileReader();
        if (fileReader && fileList && fileList.length) {
            fileReader.readAsArrayBuffer(fileList[0]);
            fileReader.onload = () => {
                let imageData = fileReader.result;
                // TODO update preview
                this.faceRecog.GetFaceInformationFromImageData(imageData)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            };
        }
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <label>Upload through Link</label>
                        <div>
                            <input id="urlImput" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)} placeholder="http://your_link/to/an/image.ext" />
                        </div>
                        <div>
                            <button type="button" onClick={evt => this.uploadUrlImage()}>Submit</button>
                        </div>
                    </div>
                    OR
                    <div>
                        <label>Take a picture of your face</label>
                        <div>
                            <input type="file" id="mypic" accept="image/*" capture="camera" onChange={evt => this.uploadImage(evt)} />
                        </div>
                    </div>
                </div>
                <div id="preview_container">
                    <div id="preview"></div>
                </div>
            </div>
        )
    }

}

export default UploadForm