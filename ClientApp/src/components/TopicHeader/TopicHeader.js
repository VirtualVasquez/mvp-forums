import React, { useState, useEffect } from 'react';
import axios from "axios";
import './TopicHeader.scss';

function TopicHeader ({title, userId, forumId, dateCreated, formatDate, topicAuthor, setAuthor}) {

    const [forum, setForum] = useState(null);

    async function getUsernameById(id){
        try{
            await axios.get(`/api/User/NameById/${id}`).then(response =>{
              setAuthor(response.data);
            })
        } catch (error){
            console.error(error);
        }
    };

    async function GetForumById(id) {
        try {
            await axios.get(`/api/forum/${id}`).then(response => {
                setForum(response.data);
            })
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        getUsernameById(userId);
        GetForumById(forumId)
    }, [])
    
    return (
        <div className="topic-header">
            <div className="topic-header_title">
                <h1>{title}</h1>
            </div>
            <div className="topic-header_info">
                <i className="info_profile_image"></i>
                <div className="info_author">
                    <p>
                        <strong>
                            By <span className="info_author_name">
                                {topicAuthor}
                            </span>
                        </strong>
                    </p>
                    <p className="info_timestamp_and_parent">
                        <span className="timestamp">
                        {formatDate(dateCreated)}                       
                        </span>
                        <span>
                        &nbsp;in&nbsp; 
                        </span> 
                        <span className="parent">
                        <a>
                            {forum ? forum.title : null}
                        </a>
                        </span>
                        {/* TITLE OF FORUM GROUP means parent group of topic */}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TopicHeader;