import React, {useState} from 'react';

// async function LoginUser(email, password){
//     try {
//         //make axios request
//         //save access token to localStorage
//         //either reload the page or navigate to Home authorized
//     } catch (error) {
//         //uncomment below when ready
//         console.error(error)
//     }
// }


const Login  = ({showLoginForm}) => {
    const [providedEmail, setEmail] = useState(null);
    const [providedUsername, setUsername] = useState(null);
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

    function handleSubmit(event) {
        event.preventDefault();
        console.log("You hit submit");
        // LoginUser(providedEmail, providedUsername, providedPassword);
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
                    onChange={e=>setEmail(e.target.value)}
                    >
                </input>

            </div>
            <div className="form-group password-group">
                <input 
                    type="password"
                    className="form-control" 
                    id="login-password" 
                    placeholder="Password"
                    onChange={e=>setPassword(e.target.value)}
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