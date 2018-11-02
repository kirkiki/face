import React, { Component } from 'react';
import './App.css';
import Footer from './Components/Footer'
import UploadForm from './Components/UploadForm';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          An Awesome RGPD Compliant tool, we promise we don't keeps your personal data !
          <UploadForm></UploadForm>
        </header>

        <Footer></Footer>
      </div>
    );
  }
}

export default App;
