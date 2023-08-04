import React, { useState, useEffect } from 'react';
import TopicPost from './TopicPost/TopicPost';
import axios from "axios";
import './Topic.scss';

function Topic ({topicAuthor, topicId, topicSlug, currentPage, topicText, dateCreated, formatDate, getUsernameById, paginatedPosts, getPostsByTopicId}) {

    useEffect(() => {
      getPostsByTopicId(topicId)     
    }, [currentPage]);

    return (
      <div className="topic">
        <TopicPost
            firstPost={true}
            topicAuthor={topicAuthor}         
            text={topicText}
            dateCreated={dateCreated}
            formatDate={formatDate}
            getUsernameById={getUsernameById}
         /> 
        {/* map the posts here */}
        {Array.isArray(paginatedPosts) ? 
          paginatedPosts.map((post, index) => {

            let postNum;            
            postNum = index + 1 + ( (currentPage-1) * 10);
            currentPage == 1 ? postNum++ : postNum;                   

            return(
              <TopicPost
                key={post.id}                              
                firstPost={false}
                text={post.text} 
                dateCreated={dateCreated}
                formatDate={formatDate}
                getUsernameById={getUsernameById}
                postId={post.id}
                userId={post.userId}
                postNum={postNum}
                topicSlug={topicSlug}
              />
            )
          }) : null}
      </div>
    );
}

export default Topic;