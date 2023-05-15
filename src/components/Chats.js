import React , {useState, useEffect, useRef} from "react"

import { useHistory } from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine'
import { auth } from "../firebase";
import {useAuth} from '../contexts/AuthContext'
import axios from 'axios'
import Formdata from 'form-data'
const Chats = () => {

    const didMountRef = useRef(false)
    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await auth.signOut();
        history.push('/')
    }

    async function getFile(url) {
        let response = await fetch(url);
        let data = await response.blob();
        return new File([data], "test.jpg", { type: 'image/jpeg' });
      }

      useEffect(() => {
        if (!didMountRef.current) {
          didMountRef.current = true
    
          if (!user || user === null) {
            history.push("/")
            return
          }
          
          // Get-or-Create should be in a Firebase Function
          axios.get(
            'https://api.chatengine.io/users/me/',
            { headers: { 
              "project-id": 'ac393c51-6edf-4eb4-a099-07a341934801',
              "user-name": user.email,
              "user-secret": user.uid
            }}
          )
    
          .then(() => setLoading(false))
    
          .catch(e => {
            let formdata = new FormData()
            formdata.append('email', user.email)
            formdata.append('username', user.email)
            formdata.append('secret', user.uid)
    
            // getFile(user.photoURL)
            // .then(avatar => {
            //   formdata.append('avatar', avatar, avatar.name)
    
              axios.post(
                'https://api.chatengine.io/users/',
                formdata,
                { 
                    mode: 'cors',
                    headers: { "private-key": "c1b24999-f86b-4ed4-a33c-a823d1d9e3a9" }}
              )
              .then(() => setLoading(false))
              .catch(e => console.log('e', e.response))
            })
        //   })
          // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
        }
      }, [user, history])


   if (!user || loading) return 'Loading...'


    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Div Chat
                </div>   

                <div 
                onClick={handleLogout}
                className="logout-tab">
                    Logout
                </div> 
            </div>

            <ChatEngine 
                height="calc(100vh - 66px)"
                projectID="ac393c51-6edf-4eb4-a099-07a341934801"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}

export default Chats