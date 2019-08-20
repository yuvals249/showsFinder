import React, { Component } from 'react';
import './App.css';
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios'
import Show from './components/Show'
import Search from './components/search'
import ShowPage from './components/ShowPage';


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
        <div><Link to="/">Home</Link></div>
      <Route exact path="/" component={Search}/>
     {this.props.Datastore.showsfilter.filter(n=>n.name.includes(this.props.Filterstore.name)).map(s=> <Route exact path="/" render={() =>   <Show show={s}/> }/>)}
     <Route path="/:show" exact render={({ match }) => <ShowPage match={match} show={this.props.Datastore.showinfo} />}/>
      </div>
      </Router>
    );
  }
}

export default App;