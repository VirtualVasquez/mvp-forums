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

    function handleSubmit(event) {
        event.preventDefault();
        console.log("You hit submit");
        // LoginUser(providedEmail, providedUsername, providedPassword);
    }

    return (
        <form id="login-form" className="account-forms">
            <h1>Sign In</h1>
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