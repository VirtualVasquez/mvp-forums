import React, { useState, useEffect } from 'react';import TopicPost from './TopicPost/TopicPost';
import './Topic.scss';

function Topic ({topicAuthor, topicId, topicSlug, pageNumber, setTotalPages, topicText, dateCreated, formatDate}) {

    const [paginatedPosts, setPaginatedPosts] = useState(null);
      // //Need to setup the endpoint and table for this.
      // async function getPostsByTopicId(topicId){

      // }
      ////getPostsByTopicId(topicId);


    return (
      <div className="topic">
        <TopicPost
          topicAuthor={topicAuthor}         
          firstPost={true}
          topicText={topicText}
          dateCreated={dateCreated}
          formatDate={formatDate}
        />
        {/* map the posts here */}
      </div>
    );
}

export default Topic;