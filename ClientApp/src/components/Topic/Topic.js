import React, { useState, useEffect } from 'react';
import TopicPost from './TopicPost/TopicPost';
import axios from "axios";
import './Topic.scss';

function Topic ({topicAuthor, topicId, topicSlug, currentPage, setTotalPages, topicText, dateCreated, formatDate, setTotalTopicPosts, getUsernameById}) {

    const [paginatedPosts, setPaginatedPosts] = useState(null);

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
            firstPost={true}
            topicAuthor={topicAuthor}         
            text={topicText}
            dateCreated={dateCreated}
            formatDate={formatDate}
            getUsernameById={getUsernameById}
          /> 
        : null }
        {/* map the posts here */}
        {Array.isArray(paginatedPosts) ? 
          paginatedPosts.map(post => {
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
              />
            )
          }) : null}
      </div>
    );
}

export default Topic;