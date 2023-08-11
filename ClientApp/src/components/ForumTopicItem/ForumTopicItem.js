import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import './ForumTopicItem.scss';

function ForumTopicItem ({topicId, userId, title, dateCreated, slug, currentPage}) {

    const [topicCreator, setTopicCreator] = useState(null);
    const [totalReplies, setTotalReplies] = useState(null);
    const [mostRecentPost, setMostRecentPost] = useState(null);
    const [authorOfMostRecent, setAuthorOfMostRecent] = useState(null);
    const [viewTotal, setViewTotal] = useState(null);

    const getTopicCreatorById = useCallback(async () => {
        try {
            await axios.get(`/api/User/NameById/${userId}`).then(response => {
                setTopicCreator(response.data);
            })
        } catch (error) {
            console.error(error);
        }
    }, [userId]);

    const getAuthorofLastPostById = useCallback(async () => {
        if (mostRecentPost) {
            try {
                await axios.get(`/api/User/NameById/${mostRecentPost.userId}`).then(response => {
                    setAuthorOfMostRecent(response.data);
                })
            } catch (error) {
                console.error(error);
            }
        }
    }, [mostRecentPost]);
    
    const getTotalPostsByTopicId = useCallback(async () => {
        try {
            const response = await axios.get(`/api/Post/AllPostsByTopicId/${topicId}?page=${currentPage}&pageSize=9`);
            const { totalPosts, lastPost } = response.data;
            setTotalReplies(formatNumber(totalPosts));
            setMostRecentPost(lastPost);
        } catch (error) {
            console.error(error);
        }
    }, [topicId, currentPage])

    const getViewsByTopicId = useCallback(async () => {
        try {
            await axios.get(`/api/View/TotalViews/${topicId}`).then(response => {
                setViewTotal(formatNumber(response.data));
            })
        } catch (error) {
            console.error(error);
        }
    }, [topicId])
        
    function longFormatTimestamp(timestamp) {
        const now = new Date();
        const postTime = new Date(timestamp); // Convert the timestamp to a Date object
        const diffInMilliseconds = now - postTime;
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
      
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

    function shortFormatTimestamp(timestamp) {
        const now = new Date();
        const postTime = new Date(timestamp);
        const diffInMilliseconds = now - postTime;
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
      
        if (diffInMinutes < 60) {
          return `${diffInMinutes} min`;
        } else if (diffInHours < 24) {
          return `${diffInHours} hr`;
        } else if (diffInDays < 7) {
          return `${diffInDays} dy`;
        } else {
          const formattedTime = postTime.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
          });
          return formattedTime;
        }
    }

    function formatNumber(total){
        let calculation;
        if(total > 999999){
            calculation = total/1000000;
            return `${calculation}m`
        }
        if(total > 999){
            calculation = total/1000;
            return `${calculation}k`
        }
        return total;
    }
            
    useEffect(() => {
        async function fetchDataOne() {
            getTopicCreatorById();
            getTotalPostsByTopicId();
            getViewsByTopicId();
        }
        fetchDataOne();
    }, [getTopicCreatorById, getTotalPostsByTopicId, getViewsByTopicId]);

    useEffect(() => {
        async function fetchDataTwo() {
            getAuthorofLastPostById();
        }
        fetchDataTwo();
    }, [getAuthorofLastPostById])

    return (
        <li className="forumTopicItem box-shadow">
            <div className="forumTopicItem-main">
                <h4 className="forumTopicItem_title">
                    <a href={`topic/${topicId}/${slug}`}>
                    {title}                       
                    </a>
                </h4>
                <div className="forumTopicItem_author">
                <p>
                    By {topicCreator}, {longFormatTimestamp(dateCreated)}
                </p>
                </div>
            </div>
            <div className="forumTopicItem-stats">
                <p className="replies">
                    <span>{totalReplies}</span>
                    <span>&nbsp;replies</span>
                </p>
                <p className="views">
                    <span>{viewTotal}</span> 
                    <span>&nbsp;views</span>
                </p>
            </div>
            {
                totalReplies === 0 
                ? 
                <div className="forumTopicItem-lastPoster">
                    <p className="no-posts"> No posts made yet.</p>
                </div>
                :
                <div className="forumTopicItem-lastPoster">
                <div className="forumTopicItem_lastPoster_icon">
                    <i></i>
                </div>
                <div className="lastPoster-info">
                    <div className="forumTopicItem_lastPoster_username">{authorOfMostRecent ? authorOfMostRecent : null}</div>
                    <div className="forumTopicItem_lastPoster_timestamp">
                    <span className="longForm">
                        {
                            mostRecentPost 
                            ? longFormatTimestamp(mostRecentPost.dateCreated) 
                            : null
                    }
                    </span>
                    <span className="shortForm">
                        {
                            mostRecentPost 
                            ? shortFormatTimestamp(mostRecentPost.dateCreated) 
                            : null
                    }
                    </span>
                    </div>  
                </div>            
            </div>   
            }           
        </li>
    );
}

export default ForumTopicItem;