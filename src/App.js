import React, { Component } from 'react';
import './App.css';

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

  uploadImage() {
    console.log(this.state.inputValue)
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
                <button type="button" onClick={evt => this.uploadImage()}>Submit</button>
              </div>
            </div>
            OR
            <div>
              <label>Take a picture of your face</label>
              <div>
                <input type="file" id="mypic" accept="image/*" capture="camera" />
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
