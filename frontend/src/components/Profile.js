import React, { Component } from 'react' 
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Profile extends Component {
    logout(){
        localStorage.clear()
        window.location.reload()
        window.location.href = "http://localhost:3000/SignInUp"
    }
render() {
return (
<div className='PorfileContainer'> 
    <Link to='/not-a-pigion'><h1 className='profTitle'>My Profile</h1></Link>
    <h2 className='SecTitle'>Bookmarked Shows:</h2>
    <div className='BookmarkContainer'>


    </div>



    <h2 className='SecTitle'>Purchased Shows:</h2>
    <div className='PurchaseContainer'>

            

    </div>
    <button className='logout' onClick={this.logout} > Logout</button>
</div>
)}
}

export default Profile