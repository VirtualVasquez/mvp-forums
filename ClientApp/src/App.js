import React, { useState, useEffect } from 'react';
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import { Layout } from './components/Layout';
import Protected from "./helpers/Protected";
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import ForumPage from './pages/ForumPage/ForumPage';
import ThreadPage from './pages/ThreadPage/ThreadPage';
import axios from "axios";


import './custom.css'

function App() {
  const [localToken, setLocalToken] = useState(localStorage.getItem('mvp_forums_access_token'));
  const [tempTestAuth, setTempTestAuth] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);

    async function verifyAccessToken(token) {
        try {
            const response = await axios.get('/api/User/ValidateAccessToken', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (localToken) {
            verifyAccessToken(localToken).then((verified) => {
                if (!verified) {
                    return localStorage.removeItem('mvp_forums_access_token');
                }
            })
        }
    }, [localToken])

  return (
      <Layout
        localToken={localToken}
        setShowLoginForm={setShowLoginForm}
      >
        <Routes>
          <Route
            exact path="/"
            element={
                localToken ? ( 
                <Navigate to ="/home" replace />
              ) : (
                <LoginPage 
                  showLoginForm={showLoginForm}
                />
              )
              }
          />
          <Route
           exact path="/home"
           element={
            <Protected localToken={localToken}>
              <HomePage />
            </Protected>
           }
          />
          {/* Need to figure out a way to dynamically ajdust the path per respective group and post */}
          <Route
           exact path="/group"
           element={
            <Protected localToken={localToken}>
               <ForumPage />
            </Protected>
           }
          />
          {/* this should look something like '/GROUPNAME/THREADNAME' */}
          <Route
           exact path="/thread"
           element={
            <Protected localToken={localToken}>
              <ThreadPage />
            </Protected>
           }
          />
        </Routes>
      </Layout>
  );
}

export default App;
