import React, { useState } from 'react';
import axios from "axios";

async function createUser(email, username, password, passwordCheck) {
     try {
         debugger;
         const response = await axios.post('/api/User/createuser', {
             Email: email,
             Username: username,
             Password: password,
             PasswordCheck: passwordCheck
         })
         //save access token to localStorage
         localStorage.setItem('mvp_forums_access_token', response.data.token);
         window.location.reload();
     } catch (error) {
       if (error.response) {
         // The request was made and the server responded with a status code
         const status = error.response.status;
         if (status === 400) {
           throw new Error("Err Code: 400. Invalid request. Please provide valid email, username, password, and password check.");
         } else if (status === 401) {
           throw new Error("Err Code: 401 Unauthorized. Please check your credentials.");
         } else if (status === 500) {
           throw new Error("Err Code: 500. Internal server error. Please try again later.");
         } else {
           throw new Error("An error occurred while processing your request. Please try again.");
         }
       } else if (error.request) {
         // The request was made but no response was received
         throw new Error("No response received from the server. Please try again later.");
       } else {
         // Something else happened in making the request
         throw new Error("An error occurred while making the request. Please try again.");
       }
     }
 }



const Signup = props => {
    const [providedEmail, setEmail] = useState(null);
    const [providedUsername, setUsername] = useState(null);
    const [providedPassword, setPassword] = useState(null);
    const [passwordCheck, setPasswordCheck] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    function validateCredentials(email, username, password, confirmPassword){
        if (!email) {
            setErrorMessage('Please provide a email');
            return {status: false, msg:'Please provide a email' };
        }
        if (email.includes(' ')) {
            setErrorMessage('No whitespace is allowed for the email');
            return {status: false, msg:'No whitespace is allowed for the email' };
        }
        if (!username) {
            setErrorMessage('Please provide a username');
            return {status: false, msg:'Please provide a username' };
        }
        if (username.includes(' ') || username.includes('@')){
            setErrorMessage('No whitespace or "@" symbols are allowed in the username');
            return {status: false, msg: 'No whitespace or "@" symbols are allowed in the username'}
        }
        if (!password) {
          setErrorMessage('Please provide a password');
          return {status: false, msg: 'Please provide a password'};
        }
        if (password.includes(' ')) {
            setErrorMessage('No whitespace is allowed for the password');
            return {status: false, msg: 'No whitespace is allowed for the password' };
          }
        if (password && !confirmPassword) {
            setErrorMessage('Please confirm your password');
            return {status: false, msg: 'Please confirm your password'};
          }
    
        if (password !== confirmPassword) {
            setErrorMessage('The passwords do not match');
          return {status: false, msg:'The passwords do not match' };
        }
        return {status: true, msg: 'valid' };
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage(null);
        //validate credentials
            //if valid, create new user
        const validation = validateCredentials(
          providedEmail,
          providedUsername,
          providedPassword,
          passwordCheck
        );
        if(validation.status){
            createUser(providedEmail, providedUsername, providedPassword, passwordCheck);
        } 
        else {
            console.log(validation.msg);
        }
    };    


    return(
        <form id="register-form" className="account-forms">
            <h1>Sign Up</h1>
            <div className="form-group email-group">
                <input 
                    type="email" 
                    className="form-control" 
                    id="register-email" 
                    aria-describedby="emailHelp" 
                    placeholder="Enter email"
                    required
                    onChange={e=>setEmail(e.target.value)}
                >
                </input>
            </div>
            <div className="form-group username-group">
                <input 
                    type="username" 
                    className="form-control" 
                    id="register-username" 
                    aria-describedby="usernameHelp" 
                    placeholder="Enter username"
                    onChange={e=>setUsername(e.target.value)}
                >
                </input>
            </div>
            <div className="form-group password-group">
                <input 
                    type="password" 
                    className="form-control" 
                    id="register-password" 
                    placeholder="Password"
                    onChange={e=>setPassword(e.target.value)}
                >
                </input>
            </div>
            <div className="form-group confirm-password-group">
                <input 
                    type="confirm-password" 
                    className="form-control" 
                    id="confirm-password" 
                    placeholder="Confirm password"
                    onChange={e=>setPasswordCheck(e.target.value)}    
                >
                </input>
            </div>
            <div>
                <div 
                    className="error-message"
                >
                    {errorMessage ? errorMessage : <p>&nbsp;</p> }
                </div>
                <button 
                    type="submit" 
                    className="btn btn-warning btn-submit"
                    onClick={handleSubmit}
                >
                    Create Account
                </button>
            </div>
        </form>
    )
}

export default Signup;