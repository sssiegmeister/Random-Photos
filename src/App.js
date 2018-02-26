import React, {Component} from 'react';
import './App.css';
import Header from "./Header";
import Photos from "./Photos";

class App extends Component {
  render() {
    return (
      <div className="Wrapper">
        <Header/>
        <Photos/>
      </div>
    )
  }
}

export default App;