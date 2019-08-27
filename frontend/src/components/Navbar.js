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
                    <div><Link to='/SignInUp' className='link' ><i class="fas fa-user"></i> Sign In</Link></div>
                </div>
            </div>
        )
    }
}

export default Navbar