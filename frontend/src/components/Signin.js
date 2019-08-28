import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios'

@inject("Signinstore")
@observer
class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      user: true
    }
  }
  handleinputs = (e) => {

    this.props.Signinstore.handleinputs(e.target.name, e.target.value)

  }

  checkuser = async () => {
    let email=this.props.Signinstore.email
    let password=this.props.Signinstore.password
    let res = await axios.get(`http://localhost:8080/user/${email}/${password}`)
    
    if(res.data.length>0){
    localStorage.setItem(`name`,res.data[0].name)
    localStorage.setItem(`email`,res.data[0].email)
    localStorage.setItem(`password`,res.data[0].password)
    localStorage.setItem('purchasedShows', JSON.stringify(res.data[0].purchasedShows))
    localStorage.setItem('bookmarks', JSON.stringify(res.data[0].bookmarks))
    this.setState({ user: true })
    window.location.reload()
    window.location.href = "http://localhost:3000/"
    }else{
      this.setState({
        user:false
      })
      console.log(this.state.user)
    }
  }
  render() {
    return (
      <table className='SignInContainer'>
        <tr>
          <td className='fieldTitle'>E-Mail: </td>
          <td><input type='text' name='email' onChange={this.handleinputs} placeholder='email@example.com' className='SignInputs'></input></td>
        </tr>

        <tr>
          <td className='fieldTitle'>Password: </td>
          <td><input type='password' name='password' onChange={this.handleinputs} className='SignInputs'></input></td>
        </tr>

        <tr><td colspan="2"><button onClick={this.checkuser} className='SignBtn'>Login</button></td></tr>
        <tr><td colspan="2">{this.state.user ? null : <div className='error'>enter a valid user</div>}</td></tr>
      </table>
    )
  }
}

export default SignIn