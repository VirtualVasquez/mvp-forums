import React from 'react';
import ForumTitle from '../../components/ForumTitle/ForumTitle';
import ForumThreadList from '../../components/ForumThreadList/ForumThreadList'
import './ForumPage.scss';

function ForumPage () {

    return (
      <div className="Forum-page">
        <ForumTitle />
        <ForumThreadList />
      </div>
    );
}

export default ForumPage;