import React, { Component } from 'react';
import './App.css';
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios'
import Show from './components/Show'
import Search from './components/search'
import { tsMethodSignature } from '@babel/types';


@inject("Filterstore","Datastore")
@observer
class App extends Component {

  componentDidMount=async()=>{
  let data = await axios.get('http://localhost:8080')
  this.props.Datastore.getdata(data.data)
  this.props.Datastore.updateStore(data.data)
  }

  render() {
  
    return (
      <Router>
      <div className="App">
      <Search />
     {this.props.Datastore.showsfilter.filter(n=>n.name.includes(this.props.Filterstore.name)).map(s=><Show show={s}/>)}
      </div>
      </Router>
    );
  }
}

export default App;