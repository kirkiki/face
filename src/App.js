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

  /*post https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect
header: Ocp-Apim-Subscription-Key --> 59367a363a2947208054fa85fc318ce9

pour une url: Content-type: application/json
pour une image: application/octet-stream


params: returnFaceLandmarks (bool)
        returnFaceAttributes (age,gender,smile,facialHair,headPose,glasses,emotion,hair,makeup,accessories,blur,exposure,noise) */

  uploadUrlImage() {
    // TODO add url checks.
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
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  uploadImage(evt) {
    // TODO parse event;
    console.log(evt);
    /*
    axios.post('/https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect', {
      url : evt.target.value.name,
      config : {
        headers : {
          "Ocp-Apim-Subscription-Key": "59367a363a2947208054fa85fc318ce9",
          "Content-type" : "application/json"
        }
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });*/
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
                <input type="file" id="mypic" accept="image/*" capture="camera"/>
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
