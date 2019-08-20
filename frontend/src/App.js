import React, { Component } from 'react';
import './App.css';
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios'
import Shows from './components/Shows'
import Search from './components/search'
import ShowPage from './components/ShowPage'

import { tsMethodSignature } from '@babel/types';


@inject("Filterstore", "Datastore")
@observer
class App extends Component {

  componentDidMount = async () => {
    let data = await axios.get('http://localhost:8080')
    this.props.Datastore.getdata(data.data)
    this.props.Datastore.updateStore(data.data)
  }

  render() {
    console.log(this.props.Datastore.shows)
    console.log(this.props.Datastore.showInfo)
    return (
      <Router>
        <div className="App">
          <Route path="/" exact component={Search} />
          <Route exact path="/showPage" render={() => <ShowPage show={this.props.Datastore.showInfo} />} />
          <Route path="/" exact render={() => <Shows shows={this.props.Datastore.shows} />} />
        </div>
      </Router>
    );
  }
}

export default App;