import React, { useState, useEffect } from 'react';import TopicPost from './TopicPost/TopicPost';
import axios from "axios";
import './Topic.scss';

function Topic ({topicAuthor, topicId, topicSlug, currentPage, setTotalPages, topicText, dateCreated, formatDate, setTotalTopicPosts}) {

    const [paginatedPosts, setPaginatedPosts] = useState(null);
      // //Need to setup the endpoint and table for this.
      
    async function getPostsByTopicId(id){
      const pageSize = 10;
      try {
          const response = await axios.get(`/api/Post/AllPostsByTopicId/${id}?page=${currentPage}&pageSize=${pageSize}`);
          const { totalPosts, totalPages, posts } = response.data;
          setTotalPages(totalPages);
          setTotalTopicPosts(totalPosts);
          setPaginatedPosts(posts);
      } catch (error) {
          console.error(error);
      }
    }

    useEffect(() => {
      getPostsByTopicId(topicId);
    }, [currentPage]);

    return (
      <div className="topic">
        { currentPage == 1
        ? <TopicPost
            topicAuthor={topicAuthor}         
            firstPost={true}
            topicText={topicText}
            dateCreated={dateCreated}
            formatDate={formatDate}
          /> 
        : null }
        {/* map the posts here */}
        {Array.isArray(paginatedPosts) ? 
          paginatedPosts.map(post => {
            return(
              <TopicPost 
                key={post.id}                              
                postId={post.id}
                dateCreated={dateCreated}
                formatDate={formatDate}
              />
            )
          }) : null}
      </div>
    );
}

export default Topic;