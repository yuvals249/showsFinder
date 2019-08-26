import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import axios from 'axios'
@inject("Signinstore")
@observer
class SignIn extends Component {
    
    handleinputs = (e) => {

        this.props.Signinstore.handleinputs(e.target.name, e.target.value)
        
    }

  async  checkuser () {
    let res= await axios.get(`http://localhost:8080`)
    return res
  }
    render (){
        return(
            <div>
                
                    <input type='text' name='email' onChange={this.handleinputs} placeholder='email@example.com' ></input>
                    <input type='password' name='password' onChange={this.handleinputs} placeholder='password' ></input>
                    <button onClick={this.checkuser} >LogIn</button>
                
            </div>
        )
    }
}

export default SignIn