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
import GroupPage from './pages/GroupPage/GroupPage';
import ThreadPage from './pages/ThreadPage/ThreadPage';




import './custom.css'

function App() {
  const [tempTestAuth, setTempTestAuth] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(true);

  return (
      <Layout 
        tempTestAuth={tempTestAuth}
        setShowLoginForm={setShowLoginForm}
      >
        <Routes>
          <Route
            exact path="/"
            element={
              tempTestAuth ? ( 
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
            <Protected tempTestAuth={tempTestAuth}>
              <HomePage />
            </Protected>
           }
          />
          {/* Need to figure out a way to dynamically ajdust the path per respective group and post */}
          <Route
           exact path="/group"
           element={
            <Protected tempTestAuth={tempTestAuth}>
              <GroupPage />
            </Protected>
           }
          />
          {/* this should look something like '/GROUPNAME/THREADNAME' */}
          <Route
           exact path="/thread"
           element={
            <Protected tempTestAuth={tempTestAuth}>
              <ThreadPage />
            </Protected>
           }
          />
        </Routes>
      </Layout>
  );
}

export default App;
