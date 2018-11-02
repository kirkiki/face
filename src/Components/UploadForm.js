import React, { Component } from 'react'

import FaceRecognitionApiService from '../Services/FaceRecognitionApi.service'
import Preview from './Preview'

class UploadForm extends Component {

    faceRecog

    constructor(props) {
        super(props);

        this.faceRecog = new FaceRecognitionApiService("59367a363a2947208054fa85fc318ce9")

        this.state = {
            inputValue: '',
            imageData : {
                width : 0,
                height : 0,
                url : ""
            },
            faceRect : {}
        };

    }

    updateInputValue(evt) {
        this.setState({
            inputValue: evt.target.value
        });
    }

    updatePreview(image) {
        image.onload = () => { 
            this.setState({
                imageData : { 
                    width : image.width,
                    height : image.height,
                    url : image.src
                }
            })
        }
    }

    uploadUrlImage() {
        // TODO add url checks.
        // 
        let image = new Image()
        image.src = this.state.inputValue
        this.updatePreview(image)
        this.faceRecog.GetFaceInformationFromUrl(this.state.inputValue)
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
                // TODO update preview
                let imageData = fileReader.result
                this.faceRecog.GetFaceInformationFromImageData(imageData)
                .then(function (response) {
                    console.log(response);
                    this.setState({
                        faceRect : response.data.faceRectangle
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
            };

            let imgUrlReader = new FileReader();
            
            imgUrlReader.onload = (file) =>
            {
                let image = new Image()
                image.src = file.target.result
                this.updatePreview(image)
            }

            imgUrlReader.readAsDataURL(fileList[0]);
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
                <Preview faceRect={this.state.faceRect} image={this.state.imageData} imageUrl={this.state.previewUrl}></Preview>
            </div>
        )
    }

}

export default UploadForm