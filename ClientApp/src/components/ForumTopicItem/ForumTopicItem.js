import React, { useState, useEffect } from 'react';
import axios from "axios";
import './ForumTopicItem.scss';

function ForumTopicItem ({topicId, forumId, userId, title, dateCreated, slug, currentPage}) {

    const [topicCreator, setTopicCreator] = useState(null);
    const [totalReplies, setTotalReplies] = useState(null);
    const [mostRecentPost, setMostRecentPost] = useState(null);
    const [authorOfMostRecent, setAuthorOfMostRecent] = useState(null);

    async function getUsernameById(id){
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
            getUsernameById(lastPost.userId);
        } catch (error) {
            console.error(error);
        }
      }
    
    async function getUsernameById(id){
        try{
            const response = await axios.get(`/api/User/NameById/${id}`);
            setAuthorOfMostRecent(response.data);
        } catch (error){
            console.error(error);
        }
      };
    
    //need endpoint to fetch number of views based on topicId

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
        getUsernameById(userId);
        getTotalPostsByTopicId(topicId);
        // getUsernameById(mostRecentPost.userId);
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
                    By {topicCreator}, {formatDate(dateCreated)}
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
                 <span className="longForm">1 hour ago</span>
                 <span className="shortForm">X Units</span>
                </li>              
            </ul>              
        </li>
    );
}

export default ForumTopicItem;