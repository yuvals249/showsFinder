import React, { Component } from 'react';
import './App.css';
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios'
import Show from './components/Show'

@observer
class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
      <Show></Show>
      </div>
      </Router>
    );
  }
}

export default App;
