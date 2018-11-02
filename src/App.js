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
    this.setState({
      inputValue: evt.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          An Awesome RGPD Compliant tool, we promise we don't keeps your personal data !
          <content>
          <form>
            <div>
              <label>Upload through Link</label>
              <div>
                <input id="urlImput" value={this.state.inputValue} placeholder="http://your_link/to/an/image.ext" />
              </div>
              <div>
                <button onClick={uploadImage()} >Submit</button>
              </div>
            </div>
            OR
            <div>
              <label>Take a picture of your face</label>
              <div>
                <input type="file" id="mypic" accept="image/*;capture=camera" />
              </div>
            </div>
          </form>
          <div id="preview">

          </div>
        </content>
        </header>
        
        <footer>
          Powered By Kirkiki and Noki !
        </footer>
      </div>
    );
  }
}

export default App;
