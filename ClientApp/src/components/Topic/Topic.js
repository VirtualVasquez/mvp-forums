import React, { useEffect } from 'react';
import TopicPost from './TopicPost/TopicPost';
import './Topic.scss';

function Topic ({topicAuthor, topicId, topicSlug, currentPage, topicText, dateCreated, formatDate, getUsernameById, paginatedPosts, getPostsByTopicId}) {

    useEffect(() => {
      getPostsByTopicId(topicId)     
    },);

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
        {Array.isArray(paginatedPosts) ? 
          paginatedPosts.map((post, index) => {

            let postNum;            
              postNum = index + 1 + ((currentPage - 1) * 10);

            if (currentPage === 1) {
                postNum++
            }

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