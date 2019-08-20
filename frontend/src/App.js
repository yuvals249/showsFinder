import React, { Component } from 'react';
import './App.css';
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios'

@observer
class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
      </div>
      </Router>
    );
  }
}

export default App;
