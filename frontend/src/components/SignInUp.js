import React, { Component } from 'react'
import SignUp from './SignUp'
import SignIn from './Signin'

class SignInUp extends Component {
render() {
return (
<div className='SignInUpContainer'> 
    <div><SignIn /></div>
    <div><SignUp /></div>
</div>
)}
}

export default SignInUp