import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Search from './search'

class Navbar extends Component {
    render() {
        
        return (
            <div id="nav-bar">
                <span><Link to='/' className='logo'>ShowsFinder</Link></span>
                <Search />
                <div className='NavLinks'>
                    <div><Link to='/SignUp' className='link' >Log In/Sign Up</Link></div>
                </div>
            </div>
        )
    }
}

export default Navbar