import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import ForumTitle from '../../components/ForumTitle/ForumTitle';
import ForumThreadList from '../../components/ForumThreadList/ForumThreadList';
import TopicButtons from '../../components/TopicButtons/TopicButtons';
import './ForumPage.scss';

function ForumPage() {
    const { id } = useParams();
    const [forum, setForum] = useState(null);


    async function GetForumById(forumId) {
        try {
            await axios.get(`/api/forum/${forumId}`).then(response => {
                setForum(response.data);
            })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        GetForumById(id);
    }, []);

    if (forum === null) {
        return <div>Loading forum ...</div>
    }
    
    return (
      <div className="forum-page">
        <ForumTitle
            title={forum.title}
            description={forum.description}
        />
        <TopicButtons 
            pageType="forum"
        />
        <ForumThreadList />
      </div>
    );
}

export default ForumPage;