import React, { Component } from 'react' 

class Profile extends Component {
    logout(){
        localStorage.clear()
        window.location.reload()
        window.location.href = "http://localhost:3000/SignInUp"
    }
render() {
return (
<div className='PorfileContainer'> 
    <button className='logout' onClick={this.logout} > Logout</button>
    <h1 className='profTitle'>My Profile</h1>
    <h2 className='SecTitle'>Bookmarked Shows:</h2>
    <div className='BookmarkContainer'>



    </div>



    <h2 className='SecTitle'>Purchased Shows:</h2>
    <div className='PurchaseContainer'>

            

    </div>
</div>
)}
}

export default Profile