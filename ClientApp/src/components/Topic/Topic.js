import React, { useState, useEffect } from 'react';
import TopicPost from './TopicPost/TopicPost';
import axios from "axios";
import './Topic.scss';

function Topic ({topicAuthor, topicId, topicSlug, currentPage, setTotalPages, topicText, dateCreated, formatDate, setTotalTopicPosts, getUsernameById}) {

    const [paginatedPosts, setPaginatedPosts] = useState(null);

    async function getPostsByTopicId(id, pageSize = 10){
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
      currentPage == 1 ? getPostsByTopicId(topicId, 9) : getPostsByTopicId(topicId, 10)      
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