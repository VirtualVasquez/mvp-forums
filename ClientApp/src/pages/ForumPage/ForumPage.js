import React from 'react';
import { useParams } from 'react-router-dom';
import ForumTitle from '../../components/ForumTitle/ForumTitle';
import ForumThreadList from '../../components/ForumThreadList/ForumThreadList'
import './ForumPage.scss';

function ForumPage() {
    const { id, slug } = useParams();

    console.log(`ForumPage rendered with ${id} and ${slug}`)
    return (
      <div className="forum-page">
        <p>just a test</p>
        <ForumTitle />
        <ForumThreadList />
      </div>
    );
}

export default ForumPage;