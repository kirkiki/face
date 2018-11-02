import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }

  updateInputValue(evt) {
    console.log("TEST")
    this.setState({
      inputValue: evt.target.value
    });
  }


  formatAPIUrl() { 
    // Get states values.
    return 
  }

  uploadUrlImage() {
    // TODO add url checks.
    // https://media1.popsugar-assets.com/files/thumbor/Z2Pu7yrdRY56ug4-KYlLLoNK_3Y/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2011/10/43/3/192/1922153/88ead859efe1888f_BTV_HowTo_DragonTat_2011_1023_thumbsquare/i/Halloween-Costume-Lisbeth-Salander-Girl-Dragon-Tattoo.png
    //
    //
    axios.post('https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect', {
        url : this.state.inputValue,
      },
      {
          headers : {
            "Ocp-Apim-Subscription-Key": "59367a363a2947208054fa85fc318ce9",
            "Content-type" : "application/json"
          }
      }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  uploadImage(evt) {
    // TODO parse event;
    console.log(evt.target.files);
    let fileList = evt.target.files;
    let fileReader = new FileReader();
    if (fileReader && fileList && fileList.length) {
       fileReader.readAsArrayBuffer(fileList[0]);
       fileReader.onload = function () {
          let imageData = fileReader.result;
          console.log(imageData)
          axios.post('https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect',
            imageData,
            {
              headers : {
                "Ocp-Apim-Subscription-Key": "59367a363a2947208054fa85fc318ce9",
                "Content-type" : "octet-stream"
              }
            }
          )
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
       };
    }
    /*
   */
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          An Awesome RGPD Compliant tool, we promise we don't keeps your personal data !
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
                <input type="file" id="mypic" accept="image/*" capture="camera" onChange={evt => this.uploadImage(evt)}/>
              </div>
            </div>
          </div>
          <div id="preview">

          </div>
        </div>
        </header>

        <footer>
          Powered By Kirkiki and Noki !
        </footer>
      </div>
    );
  }
}

export default App;
