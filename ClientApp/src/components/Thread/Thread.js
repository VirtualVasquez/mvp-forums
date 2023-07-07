import React from 'react';
import ThreadPost from './ThreadPost/ThreadPost';
import './Thread.scss';

function Thread () {

    return (
      <div className="thread">
        {/* map the posts here */}
      <ThreadPost />
      </div>
    );
}

export default Thread;