import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Search from './search'

class Navbar extends Component {
       constructor() {
        super()
        this.state = {
            searchBar: false
        }
    }
    searchBar = () => {
        this.setState({
            searchBar: !this.state.searchBar
        })
    }
    render() {
        
        return (
            <div id="nav-bar">
                <span><Link to='/' className='logo'>ShowsFinder</Link></span>
                <i className={this.state.searchBar ? "fas fa-angle-double-up" : "fas fa-angle-double-down"} onClick={this.searchBar}></i>
                <div className='NavLinks'>
                    <div><Link to='/SignUp' className='link' >Log In/Sign Up</Link></div>
                </div>
                {this.state.searchBar ? <Search /> : null}
            </div>
        )
    }
}

export default Navbar