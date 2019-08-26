import React, { Component } from 'react';
import './css/App.css';
import './css/Main.css';
import './css/showPage.css';
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios'
import Show from './components/Show'
import Search from './components/search'
import ShowPage from './components/ShowPage';
import Navbar from './components/Navbar';


@inject("Filterstore", "Datastore")
@observer
class App extends Component {

  componentDidMount = async () => {
    let data = await axios.get('http://localhost:8080')
    this.props.Datastore.getdata(data.data)
    this.props.Datastore.updateStore(data.data)
  }

  render() {

    return (
      <Router>
        <div className="App">
          <Navbar/>
          <div className='mainContainer'> {this.props.Datastore.showsfilter.filter(n => n.name.includes(this.props.Filterstore.name)).map(s => <Route exact path="/" render={() => <Show show={s} />} />)}</div>
          <Route path="/inform/:show" exact render={({ match }) => <ShowPage match={match} show={this.props.Datastore.showinfo} />} />
        </div>
      </Router>
    );
  }
}

export default App;