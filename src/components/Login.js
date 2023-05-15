import React from "react"
import {GoogleOutlined} from '@ant-design/icons'
import "firebase/app"
import firebase from "firebase/app"
import {auth} from '../firebase'
import { signInWithRedirect } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';


const Login = () => {
    return (
        <div id="login-page">
           <div id = "login-card">
                <h2>Welcome to Diva Chat!</h2>

                <div
                className="login-button google"
                onClick={()=> auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                >
                    <GoogleOutlined/> Sign In with Google
                </div>
           </div>
        </div>
    )
}

export default Login