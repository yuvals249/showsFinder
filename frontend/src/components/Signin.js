import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import axios from 'axios'

@inject("Signinstore")
@observer
class SignIn extends Component {
    constructor(){
      super()
      this.state={
        user:false
      }
    }
    handleinputs = (e) => {

        this.props.Signinstore.handleinputs(e.target.name, e.target.value)
        
    }

   checkuser=async ()=> {
    let res= await axios.get(`http://localhost:8080`)
    localStorage.setItem('name', 'ahi')
    this.setState({user : true})
    return res
  }
    render (){
        return(
            <div>
                
                    <input type='text' name='email' onChange={this.handleinputs} placeholder='email@example.com' ></input>
                    <input type='password' name='password' onChange={this.handleinputs} placeholder='password' ></input>
                    <button onClick={this.checkuser} >LogIn</button>
               {this.state.user ?  <div>welcome {localStorage.getItem('name')}</div>: null}
            </div>
        )
    }
}

export default SignIn