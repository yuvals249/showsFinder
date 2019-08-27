import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import axios from 'axios'
import { async } from 'q';
@inject("SignUpstore")
@observer
class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            validfilds: true,
            NameError:"",
            EmailError: "",
            PassError: "",
            ConPassError: ""
        }
    }

    handleinputs = (e) => {
        this.props.SignUpstore.handleinputs(e.target.name, e.target.value)
    }

    checkinputs() {
        let store = this.props.SignUpstore
        let checks = {
            name: false,
            email: false,
            password: false,
            confirmpassword: false
        }
        
        if (store.name !== "" && !(store.name.includes('1','2','3','4','5','6','7','8','9','0',))) {
            checks.name = true
    }
        if (store.email.includes('@') && store.email.includes('.')) {
            checks.email = true
        }
        if (store.password.length >= 8) {
            checks.password = true
        }
        if (store.password === store.confirmpassword) {
            checks.confirmpassword = true
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
                name: this.props.SignUpstore.name,
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
                    <td className='fieldTitle'>Name: </td>
                    <td><input type='text' name='name' onChange={this.handleinputs} placeholder='Your Name' className='SignInputs'></input></td>
                    <td>{this.checkinputs().name ? null : <div className='error'>Please Add A Valid Name</div>}</td>
                </tr>


                <tr>
                    <td className='fieldTitle'>E-Mail: </td>
                    <td><input type='text' name='email' onChange={this.handleinputs} placeholder='email@example.com' className='SignInputs'></input></td>
                    <td>{this.checkinputs().email ? null : <div className='error'>Please enter a valid email</div>}</td>
                </tr>

                <tr>
                    <td className='fieldTitle'>Password: </td>
                    <td><input type='password' name='password' onChange={this.handleinputs} className='SignInputs'></input></td>
                    <td>{this.checkinputs().password ? null : <div className='error'>Password must be at list 8 characters</div>}</td>
                </tr>

                <tr>
                    <td className='fieldTitle'>Confirm Password: </td>
                    <td><input type='password' name='confirmpassword' onChange={this.handleinputs} className='SignInputs'></input></td>
                    <td>{this.checkinputs().confirmpassword ? null : <div className='error'>Please confirm your password</div>}</td>
                </tr>

                <tr>
                    <td colspan="2"><button onClick={this.newuser} className='SignBtn'>Sign Up</button></td>
                </tr>

                <tr>
                <td colspan="3">{this.state.validfilds === false ? <div className='error'eeddddedeeeeeeee
                                                                            >Please enter all requierd fields</div> : null}</td>
                </tr>

            </table>
        )
    }
}

export default SignUp