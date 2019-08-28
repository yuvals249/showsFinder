import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import axios from 'axios'
import { async } from 'q';
import validator from 'validator';

@inject("SignUpstore")
@observer
class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            validfilds: true,
                firstname: true,
                surename: true,
                email: true,
                password: true,
                confirmpassword: true
            
        }
    }

    handleinputs = (e) => {
        this.props.SignUpstore.handleinputs(e.target.name, e.target.value)
    }

    checkinputs() {
        let store = this.props.SignUpstore
        let checks={
            firstname: false,
            surename: false,
            email: false,
            password: false,
            confirmpassword: false
        }

        if (validator.isAlpha(store.firstname)) {
            checks.firstname=true
            this.setState({
                firstname:true
            })
        }else{
            this.setState({firstname:false})
        }

        if (validator.isAlpha(store.surename)) {
            checks.surename=true
            this.setState({
                surename:true
            })
        }else{
            this.setState({surename:false})
        }

        if (validator.isEmail(store.email)) {
            checks.email=true
            this.setState({
                email:true
            })
        }else{
            this.setState({email:false})
        }
        if (store.password.length >= 8 && validator.isAlphanumeric(store.password)) {
            checks.password=true
            this.setState({
                password:true
            })
        }else{
            this.setState({password:false})
        }
        if (validator.equals(store.password, store.confirmpassword)) {
            checks.confirmpassword=true
            this.setState({
                confirmpassword:true
            })
        }else{
            this.setState({confirmpassword:false})
        }
        return checks
    }

    newuser = async () => {
        let checks = this.checkinputs()
        let validfilds = true
        for (let c in checks) {
            if (checks[c] === false) {
                validfilds = false
            }
        }

        if (validfilds) {
            this.setState({ validfilds: true })
            let newuser = {
                name: `${this.props.SignUpstore.firstname} ${this.props.SignUpstore.surename}`,
                email: this.props.SignUpstore.email,
                password: this.props.SignUpstore.password
            }
            let res = await axios.post(`http://localhost:8080/newUser`, newuser)
            return res
        } else {
            this.setState({ validfilds: false })
        }
    }
    render() {
        return (
            <table className='signup'>
                <tr>
                    <td className='fieldTitle'>First Name: </td>
                    <td><input type='text' name='firstname' onChange={this.handleinputs} placeholder='No Numbers or Spaces' className='SignInputs'></input></td>
                    <td>{this.state.firstname ? null : <div className='error'>Please Add A Valid Name</div>}</td>
                </tr>

                <tr>
                    <td className='fieldTitle'>Surename: </td>
                    <td><input type='text' name='surename' onChange={this.handleinputs} placeholder='No Numbers or Spaces' className='SignInputs'></input></td>
                    <td>{this.state.surename ? null : <div className='error'>Please Add A Valid Name</div>}</td>
                </tr>

                <tr>
                    <td className='fieldTitle'>E-Mail: </td>
                    <td><input type='text' name='email' onChange={this.handleinputs} placeholder='email@example.com' className='SignInputs'></input></td>
                    <td>{this.state.email ? null : <div className='error'>Please enter a valid email</div>}</td>
                </tr>

                <tr>
                    <td className='fieldTitle'>Password: </td>
                    <td><input type='password' name='password' onChange={this.handleinputs} placeholder="Must Not Use Spaces" className='SignInputs'></input></td>
                    <td>{this.state.password ? null : <div className='error'>Password must be at list 8 characters</div>}</td>
                </tr>

                <tr>
                    <td className='fieldTitle'>Confirm Password: </td>
                    <td><input type='password' name='confirmpassword' onChange={this.handleinputs} className='SignInputs'></input></td>
                    <td>{this.state.confirmpassword ? null : <div className='error'>Please confirm your password</div>}</td>
                </tr>

                <tr>
                    <td colspan="2"><button onClick={this.newuser} className='SignBtn'>Sign Up</button></td>
                </tr>

                <tr>
                    <td colspan="3">{this.state.validfilds === false ? <div className='error' eeddddedeeeeeeee
                    >Please enter all requierd fields</div> : null}</td>
                </tr>

            </table>
        )
    }
}

export default SignUp