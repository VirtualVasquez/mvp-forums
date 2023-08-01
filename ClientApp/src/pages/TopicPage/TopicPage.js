import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import TopicHeader from '../../components/TopicHeader/TopicHeader';
import Pagination from '../../components/Pagination/Pagination';
import Topic from '../../components/Topic/Topic';
import ReplyForm from '../../components/ReplyForm/ReplyForm';
import TopicButtons from '../../components/TopicButtons/TopicButtons';
import './TopicPage.scss'

function TopicPage () {
  const { topic_id, topic_slug, page_number} = useParams();

  const [topic, setTopic] = useState(null);
  const [currentPage, setCurrentPage] = useState(page_number ? page_number : 1);  
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedPosts, setPaginatedPosts] = useState(null);

  async function GetTopicById(topicId) {
    try{
      await axios.get(`/api/topic/TopicById/${topicId}`).then( response => {
        setTopic(response.data);
      })
    } catch (error) {
      console.error(error);
    }
  }

  const formatDate = (isoDate) => {
    const dateObj = new Date(isoDate);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return formattedDate;
}

  // //Need to setup the endpoint and table for this.
  // async function getPostsByTopicId(topicId){

  // }

  useEffect(() => {
    GetTopicById(topic_id);
    ////getPostsByTopicId(topicId);
  }, [currentPage]);

  if (topic === null){
    return <div>Loading forum ...</div>
  }

    return (
      <div className="topic-page">
        <TopicHeader
          title={topic.title}
          userId={topic.userId}
          forumId={topic.forumId}
          dateCreated={topic.dateCreated}
          formatDate={formatDate}
        />
        <TopicButtons 
            pageType="topic"
            statusOpen={true}
        />
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          id={topic_id}
          slug={topic_slug}
          pageType="topic"
        />
        <Topic />
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          id={topic_id}
          slug={topic_slug}
          pageType="topic"
        />        <ReplyForm />      
      </div>
    );
} 

export default TopicPage;