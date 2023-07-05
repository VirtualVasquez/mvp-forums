import React from 'react';
import './HomePage.scss';
import ForumGroupsList from './ForumGroupsList';

function HomePage () {

    return (
      <div className="home-page">
        <div><h1>Forums</h1></div>
        <ForumGroupsList />    
      </div>
    );
}

export default HomePage;