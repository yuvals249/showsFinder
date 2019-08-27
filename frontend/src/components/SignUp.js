import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import axios from 'axios'
import SignIn from './Signin'
import { async } from 'q';
@inject("SignUpstore")
@observer
class SignUp extends Component {
    constructor(){
        super()
        this.state={
            validfilds:true
        }
    }

    handleinputs = (e) => {

        this.props.SignUpstore.handleinputs(e.target.name, e.target.value)
        
    }

    checkinputs(){
        let store=this.props.SignUpstore
        let checks={
            name:false,
            email:false,
            password:false,
            confirmpassword:false
        }
        if(store.name!==""){
            checks.name=true
        }
        if(store.email.includes('@') && store.email.includes('.')){
            checks.email=true
        }
        if(store.password.length>=8){
            checks.password=true
        }
        if(store.password===store.confirmpassword){
            checks.confirmpassword=true
        }
        return checks
    }

    newuser=async ()=> {
    let checks=  this.checkinputs()
    let validfilds = true
    for (let c in checks){
        if(checks[c]===false){
            validfilds=false
        }
    }

    if(validfilds){
        this.setState({validfilds:true})
      let newuser={
          name:this.props.SignUpstore.name,
          email:this.props.SignUpstore.email,
          password : this.props.SignUpstore.password
      }
    let res= await axios.post(`http://localhost:8080`,newuser)
    return res
  }else{
      this.setState({validfilds:false})
  }
}
    render (){
        return(
            <div className='signup'>
                <SignIn />
               <div>
                  name: <input type='text' name='name' onChange={this.handleinputs} placeholder='your name' ></input>
                  </div>
                    {this.checkinputs().name ? null : <div>please enter a name</div>}
                   <div>
                  email :  <input type='text' name='email' onChange={this.handleinputs} placeholder='email@example.com' ></input>
                    </div>
                    {this.checkinputs().email ? null : <div>please enter a valid email</div>}
                    <div>
                 password :   <input type='password' name='password' onChange={this.handleinputs} placeholder='password' ></input>
                    </div>
                    {this.checkinputs().password ? null : <div>password mast be at list 8 characters</div>}
                   <div>
                  confirm password : <input type='password' name='confirmpassword' onChange={this.handleinputs} placeholder='confirm password' ></input>
                    </div>
                    {this.checkinputs().confirmpassword ? null : <div>confirm your password please</div>}
                    <button onClick={this.newuser} >SignUp</button>
                    {this.state.validfilds===false ? <div>please enter all the requierd fields</div> : null }
                    
            </div>
        )
    }
}

export default SignUp