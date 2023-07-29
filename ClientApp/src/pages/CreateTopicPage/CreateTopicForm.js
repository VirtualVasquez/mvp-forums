import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import './CreateTopicPage.scss';

async function addTopic(title, text, forumId, forumSlug, userId, navigate){
    try {
        const response = await axios.post('/api/Topic/AddTopic', {
            Title: title,
            Text: text,
            ForumId: forumId,
            UserId: userId
        })
        const topicId = response.data.topicId;
        const topicSlug = response.data.topicSlug;
        const forumUrl = `/forum/${forumId}/${forumSlug}`;
        navigate(forumUrl, { replace: true });
        navigate(`/topic/${topicId}/${topicSlug}`);
    } catch (error){
        throw new Error(`An error occurred while making the request: ${error.message}`);
    }
}

async function extractUserId(token){
    try{
        const response = await axios.get('/api/User/ValidateAccessToken', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.userId;
    } catch (error) {
        console.error(error);
    }
}


function CreateTopicForm () {
    const {forum_id, forum_slug} = useParams();
    const [topicTitle, setTopicTitle] = useState(null);
    const [topicText, setTopicText] = useState(null);

    const accessToken = localStorage.getItem('mvp_forums_access_token');
    const navigate = useNavigate();


    async function handleSubmit(event){
        event.preventDefault();
        try{
            let userId = await extractUserId(accessToken)
            
            if(userId && Number.isInteger(userId)){
                await addTopic(topicTitle, topicText, forum_id, forum_slug, userId, navigate);
            }
            else {
                console.log("Something went wrong in extracting the UserId");
            }
        } catch (error){
            console.error(error);
        }
    }

    return (
        <div className="create-topic-form-wrapper">
            <form 
                id="create-topic-form" 
                onSubmit={handleSubmit}
            >
                <label htmlFor="title">
                    Title <span className='required'>REQUIRED</span>
                </label>
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    required
                    onChange={e=>setTopicTitle(e.target.value)}
                >                    
                </input>
                <label htmlFor="topic-text">
                    Topic Text <span className='required'>REQUIRED</span>
                </label>
                <textarea 
                    id="topic-text" 
                    name="topic-text" 
                    required
                    onChange={e=>setTopicText(e.target.value)}
                >
                </textarea>
                <button 
                    type="submit"
                >
                    Submit Topic
                </button> 
            </form>
        </div>
    );
}

export default CreateTopicForm;