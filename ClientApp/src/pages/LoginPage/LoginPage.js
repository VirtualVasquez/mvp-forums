import React from 'react';

function LoginPage ({showLoginForm}) {

    return (
      <div>
        <h1>LoginPage</h1>
        {showLoginForm ? "This is the login form" : "This is the signup form"}        
      </div>
    );
}

export default LoginPage;