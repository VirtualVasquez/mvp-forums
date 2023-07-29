import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import ForumTitle from '../../components/ForumTitle/ForumTitle';
import ForumTopicList from '../../components/ForumTopicList/ForumTopicList';
import TopicButtons from '../../components/TopicButtons/TopicButtons';
import './ForumPage.scss';

function ForumPage() {
    const { forum_id } = useParams();
    const [forum, setForum] = useState(null);
    const [topics, setTopics] = useState(null);


    async function GetForumById(forumId) {
        try {
            await axios.get(`/api/forum/${forumId}`).then(response => {
                setForum(response.data);
            })
        } catch (error) {
            console.error(error);
        }
    }

    async function GetTopicsByForumId(forumId) {
        try {
            await axios.get(`/api/Topic/AllTopicsByForumId/${forumId}`).then(response => {
                setTopics(response.data);
            })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        GetForumById(forum_id);
        GetTopicsByForumId(forum_id);
    }, []);

    if (forum === null) {
        return <div>Loading forum ...</div>
    }
    
    return (
      <div className="forum-page">
        <ForumTitle
            title={forum.title}
            description={forum.description}
            topicsTotal={topics ? topics.length : 0}
        />
        <TopicButtons 
            pageType="forum"
        />
        <ForumTopicList />
      </div>
    );
}

export default ForumPage;