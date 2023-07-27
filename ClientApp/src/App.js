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
import TopicPage from './pages/TopicPage/TopicPage';
import CreateTopicPage from './pages/CreateTopicPage/CreateTopicPage';
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
          <Route
           path="/forum/:id/:slug"
           element={
            <Protected localToken={localToken}>
               <ForumPage />
            </Protected>
           }
          />
          <Route
           exact path="/topic/:id/:slug"
           element={
            <Protected localToken={localToken}>
                <TopicPage />
            </Protected>
           }
          />
        </Routes>
      </Layout>
  );
}

export default App;
