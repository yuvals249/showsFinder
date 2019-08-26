import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react'
import * as serviceWorker from './serviceWorker';
import {FilterStore as filterstore} from './stores/filterstore'
import {DataStore as datastore} from './stores/datastore'
import {SigninStore} from './stores/Signinstore'
import {SignUpStore} from './stores/SignUpstore'

const Filterstore=new filterstore()
const Datastore=new datastore()
const Signinstore=new SigninStore()
const SignUpstore=new SignUpStore()
const stores={Filterstore,Datastore,Signinstore,SignUpstore}

ReactDOM.render(<Provider {...stores} ><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();