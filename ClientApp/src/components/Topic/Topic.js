import React from 'react';
import TopicPost from './TopicPost/TopicPost';
import './Topic.scss';

function Topic () {

    return (
      <div className="topic">
        {/* map the posts here */}
      <TopicPost />
      </div>
    );
}

export default Topic;