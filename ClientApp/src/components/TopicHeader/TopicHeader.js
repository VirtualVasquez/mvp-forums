import React, { useEffect } from 'react';
import './TopicHeader.scss';

function TopicHeader ({title, userId, forumId, dateCreated, formatDate, topicAuthor, setAuthor, getUsernameById, forum, GetForumById}) {
    
    useEffect(() => {
        async function fetchData() {
            const username = await getUsernameById(userId);
            setAuthor(username);
            GetForumById(forumId);
        }
        fetchData();
    }, [])
    
    return (
        <div className="topic-header box-shadow">
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
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TopicHeader;