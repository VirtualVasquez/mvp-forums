import React from 'react';
import Login from './forms/login';
import Signup from './forms/signup';
import './LoginPage.scss';

function LoginPage ({showLoginForm}) {

    return (
      <div className='container'>
        <div className='row'>
          <div className="col-lg-6 offset-lg-3 form-col">
          {showLoginForm ? <Login />: <Signup />} 
          </div>

        </div>
               
      </div>
    );
}

export default LoginPage;