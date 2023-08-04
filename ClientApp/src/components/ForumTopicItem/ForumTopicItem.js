import React, { useState, useEffect } from 'react';
import axios from "axios";
import './ForumTopicItem.scss';

function ForumTopicItem ({topicId, forumId, userId, title, dateCreated, slug, currentPage}) {

    const [topicCreator, setTopicCreator] = useState(null);
    const [totalReplies, setTotalReplies] = useState(null);
    const [mostRecentPost, setMostRecentPost] = useState(null);
    const [authorOfMostRecent, setAuthorOfMostRecent] = useState(null);

    async function getTopicCreatorById(id){
        try{
            await axios.get(`/api/User/NameById/${id}`).then(response => {
                setTopicCreator(response.data);
            })
        } catch (error){
            console.error(error);
        }
    };
    
    async function getTotalPostsByTopicId(id){
        try {
            const response = await axios.get(`/api/Post/AllPostsByTopicId/${id}?page=${currentPage}&pageSize=9`);
            const { totalPosts, lastPost } = response.data;
            setTotalReplies(totalPosts);
            setMostRecentPost(lastPost);
        } catch (error) {
            console.error(error);
        }
    }
        
    function formatTimestamp(timestamp) {
        const now = new Date();
        const postTime = new Date(timestamp); // Convert the timestamp to a Date object
        const diffInMilliseconds = now - postTime;
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInWeeks = Math.floor(diffInDays / 7);
      
        if (diffInMinutes < 60) {
          return `${diffInMinutes} minutes ago`;
        } else if (diffInHours < 24) {
          return `${diffInHours} hours ago`;
        } else if (diffInDays < 7) {
          const dayOfTheWeek = postTime.toLocaleString('en-US', { weekday: 'long' });
          const formattedTime = postTime.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          });
          return `${dayOfTheWeek} at ${formattedTime}`;
        } else if (diffInDays < 365) {
          const formattedTime = postTime.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
          });
          return formattedTime;
        } else {
          const formattedTime = postTime.toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
          });
          return formattedTime;
        }
    }
      
    useEffect(() => {
        getTopicCreatorById(userId);
        getTotalPostsByTopicId(topicId);
    }, []);

    return (
        <li className="forumTopicItem">
            <div className="forumTopicItem-main">
                <h4 className="forumTopicItem_title">
                    <a href={`topic/${topicId}/${slug}`}>
                    {title}                       
                    </a>
                </h4>
                <div className="forumTopicItem_author">
                <a>
                    By {topicCreator}, {formatTimestamp(dateCreated)}
                </a>
                </div>
            </div>
            <div className="forumTopicItem-stats">
                <p className="replies">
                    <span>{totalReplies}</span>
                    <span>&nbsp;replies</span>
                </p>
                <p className="views">
                    <span>XX.Xk</span> 
                    <span>&nbsp;views</span>
                </p>
            </div>
            <ul className="forumTopicItem-lastPoster">
                <li className="forumTopicItem_lastPoster_icon">
                    <i></i>
                </li>
                <li className="forumTopicItem_lastPoster_username"><a href="#">{authorOfMostRecent}</a></li>
                <li className="forumTopicItem_lastPoster_timestamp">
                <span className="longForm">
                    {
                        mostRecentPost 
                        ? formatTimestamp(mostRecentPost.dateCreated) 
                        : null
                   }
                </span>
                <span className="shortForm">X Units</span>
                </li>              
            </ul>              
        </li>
    );
}

export default ForumTopicItem;