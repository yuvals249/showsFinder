import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios'
import Search from './search'
@inject('Datastore')
@observer
class Navbar extends Component {
    loadData = async () => {
        let data = await axios.get('http://localhost:8080')
        this.props.Datastore.getdata(data.data)
        this.props.Datastore.updateStore(data.data)
    }
    render() {
        
        return (
            <div id="nav-bar">
                <span onClick={this.loadData} ><Link to='/' className='logo'>ShowsFinder</Link></span>
                <Search />
                <div className='NavLinks'>
                  {localStorage.getItem('name') ? <div><Link to='/Profile' className='link' >Hello, {localStorage.getItem('name')}!</Link></div> : <div><Link to='/SignInUp' className='link' ><i class="fas fa-user"></i> Sign In</Link></div>}
                </div>
            </div>
        )
    }
}

export default Navbar