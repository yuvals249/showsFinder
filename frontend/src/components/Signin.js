import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import axios from 'axios'

@inject("Signinstore")
@observer
class SignIn extends Component {
  constructor() {
    super()
    this.state = {
      user: false
    }
  }
  handleinputs = (e) => {

    this.props.Signinstore.handleinputs(e.target.name, e.target.value)

  }

  checkuser = async () => {
    let res = await axios.get(`http://localhost:8080`)
    localStorage.setItem('name', 'ahi')
    this.setState({ user: true })
    return res
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
        <tr><td colspan="2">{this.state.user ? <div>welcome {localStorage.getItem('name')}</div> : null}</td></tr>
      </table>
    )
  }
}

export default SignIn