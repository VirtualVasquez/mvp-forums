import React from 'react';
import './HomePage.scss';
import ForumList from './ForumList';

function HomePage () {

    return (
      <div className="home-page">
        <div><h1>Forums</h1></div>
        <ForumList />    
      </div>
    );
}

export default HomePage;