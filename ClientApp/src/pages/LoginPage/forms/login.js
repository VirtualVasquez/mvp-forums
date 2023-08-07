import React, { useState } from 'react';
import axios from "axios";




const Login  = ({showLoginForm}) => {
    const [providedEmail, setEmail] = useState(null);
    const [providedPassword, setPassword] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    
    function validateCredentials(email, password ){
        if (!email) {
            setErrorMessage('Please provide a email');
            return {status: false, msg:'Please provide a email' };
        }
        if (email.includes(' ')) {
            setErrorMessage('No whitespace is allowed for the email');
            return {status: false, msg:'No whitespace is allowed for the email' };
        }
        if (!password) {
          setErrorMessage('Please provide a password');
          return {status: false, msg: 'Please provide a password'};
        }
        if (password.includes(' ')) {
            setErrorMessage('No whitespace is allowed for the password');
            return {status: false, msg: 'No whitespace is allowed for the password' };
        }
        return {status: true, msg: 'valid' };
    }

    async function LoginUser(email, password) {
        try {
            //make axios request
            const response = await axios.post('/api/User/loginuser', {
                email: email,
                password: password
            })
            //save access token to localStorage
            localStorage.setItem('mvp_forums_access_token', response.data.token);
            window.location.reload();         
        } catch (error) {
            console.error(error)
        }
    }

    const handleInputChange =  (userInput, inputType) => {
        if(inputType == "email"){
            setEmail(userInput);
        }
        if(inputType == "password"){
            setPassword(userInput);
        }
        if(errorMessage){
            setErrorMessage(null);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const validation = validateCredentials(
            providedEmail, providedPassword
        );
        if(validation.status){
            LoginUser(providedEmail, providedPassword);
        } else {
            console.log(validation.msg);
        }
    }

    return (
        <form id="login-form" className="account-forms">
            <h1>Login</h1>
            <div className="form-group email-group">
                <input 
                    type="email" 
                    className="form-control" 
                    id="login-email" 
                    aria-describedby="emailHelp" 
                    placeholder="Enter email"
                    onChange={e=>handleInputChange(e.target.value, "email")}
                    onClick={e=>setErrorMessage(null)}
                    >
                </input>

            </div>
            <div className="form-group password-group">
                <input 
                    type="password"
                    className="form-control" 
                    id="login-password" 
                    placeholder="Password"
                    onChange={e=>handleInputChange(e.target.value, "password")}
                    onClick={e=>setErrorMessage(null)}
                >
                </input>
            </div>
            <div>
                <div 
                    className="error-message"
                >
                    {errorMessage ? <p>{errorMessage}</p> : <p>&nbsp;</p> }
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary btn-submit"
                    onClick={handleSubmit}
                >
                    Log In
                </button>
            </div>
        </form>
    );
}

export default Login;