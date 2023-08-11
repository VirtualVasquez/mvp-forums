import React, { useState, useEffect, useCallback } from 'react';
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

  const [forum, setForum] = useState(null);

  async function GetForumById(id) {
      try {
          await axios.get(`/api/forum/${id}`).then(response => {
              setForum(response.data);
          })
      } catch (error) {
          console.error(error);
      }
  }

  const [topic, setTopic] = useState(null);
  const [topicAuthor, setAuthor] = useState(null);
  const [currentPage] = useState(page_number ? page_number : 1);  
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedPosts, setPaginatedPosts] = useState(null);
  const [loggedInUsername, setloggedInUsername] = useState(null);
  const [activeId] = useState(localStorage.getItem('mvp_forums_active_id'));

  const GetTopicById = useCallback(async () => {
      try {
          await axios.get(`/api/topic/TopicById/${topic_id}`).then(response => {
              setTopic(response.data);
          })
      } catch (error) {
          console.error(error);
      }
  }, [topic_id]);

    const addUserView = useCallback(async () => {
        try {
            await axios.post(`/api/View/AddUserView`, {
                UserId: activeId,
                TopicId: topic_id
            });
        } catch (error) {
            console.error(error);
        }
  }, [activeId, topic_id]);



  async function getPostsByTopicId(id, pageSize = 9){
    try {
        const response = await axios.get(`/api/Post/AllPostsByTopicId/${id}?page=${currentPage}&pageSize=${pageSize}`);
        const { totalPages, posts } = response.data;
        setTotalPages(totalPages);
        setPaginatedPosts(posts);
    } catch (error) {
        console.error(error);
    }
  }
  async function getUsernameById(id){
    try{
        const response = await axios.get(`/api/User/NameById/${id}`);
        return response.data;
    } catch (error){
        console.error(error);
    }
  };


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
    async function fetchData() {
      let activeUsername = await getUsernameById(activeId);
      setloggedInUsername(activeUsername);
      }
      GetTopicById();
      addUserView();
      fetchData();
  }, [GetTopicById, addUserView, activeId]);

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
        getUsernameById={getUsernameById}
        setAuthor={setAuthor}
        forum={forum}
        GetForumById={GetForumById}
      />
      <TopicButtons 
          pageType="topic"
          statusOpen={true}
          forumId={forum?.id}
          forumSlug={forum?.slug}
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
        topicText={topic.text}
        dateCreated={topic.dateCreated}
        formatDate={formatDate}
        getUsernameById={getUsernameById}
        paginatedPosts={paginatedPosts}
        getPostsByTopicId={getPostsByTopicId}
      />
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        id={topic_id}
        slug={topic_slug}
        pageType="topic"
      />        
      <ReplyForm 
        activeId={activeId}
        topicId={topic_id}
        topicSlug={topic_slug}
        forumId={topic.forumId}
        getPostsByTopicId={getPostsByTopicId}
        currentPage={currentPage}
        loggedInUsername={loggedInUsername}
      />      
    </div>
  );
} 

export default TopicPage;