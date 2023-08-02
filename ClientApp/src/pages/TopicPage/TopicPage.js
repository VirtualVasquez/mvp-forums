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
  const [topicAuthor, setAuthor] = useState(null);
  const [currentPage] = useState(page_number ? page_number : 1);  
  const [totalPages, setTotalPages] = useState(1);
  const [totalTopicPosts, setTotalTopicPosts] = useState(null);

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

  useEffect(() => {
    GetTopicById(topic_id);
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
          topicAuthor={topicAuthor}
          setAuthor={setAuthor}
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
        <Topic
          topicAuthor={topicAuthor}
          topicId={topic_id}
          topicSlug={topic_slug}
          currentPage={currentPage}
          setTotalPages={setTotalPages}
          setTotalTopicPosts={setTotalTopicPosts}
          topicText={topic.text}
          dateCreated={topic.dateCreated}
          formatDate={formatDate}
        />
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