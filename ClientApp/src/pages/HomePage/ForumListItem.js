import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';


const ForumListItem = ({ id, title, description, slug }) => {

    const [totalPosts, setTotalPosts] = useState(0);
    const [pageNumOfPost, setpageNumOfPost] = useState(null);
    const [recentPost, setRecentPost] = useState(null);
    const [recentAuthor, setRecentAuthor] = useState(null);
    const [topicOfRecentPost, setTopicOfRecentPost] = useState(null);
    
    async function GetPostsDetails(forumId) {
        try {
            await axios.get(`/api/forum/posts-details/${forumId}`).then(response => {
                const {totalPosts, mostRecentPost, lastPage} = response.data;
                setTotalPosts(totalPosts);
                setRecentPost(mostRecentPost);
                setpageNumOfPost(lastPage);
            })
        } catch (error) {
            console.error(error);
        }
    }

    async function getUsernameById(userId){
        try{
            await axios.get(`/api/User/NameById/${userId}`).then(response => {
                setRecentAuthor(response.data);
            })
        } catch (error){
            console.error(error);
        }
    };

    async function GetTopicOfPost(topicId){
        try {
            await axios.get(`/api/Topic/TopicById/${topicId}`).then(response => {
                setTopicOfRecentPost(response.data);
            })
        } catch (error) {
            console.error(error);
        }
    }

    function formatNumberOfPosts(total){
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

    function longFormatTimestamp(timestamp) {
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

    function shortFormatTimestamp(timestamp) {
        const now = new Date();
        const postTime = new Date(timestamp);
        const diffInMilliseconds = now - postTime;
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInWeeks = Math.floor(diffInDays / 7);
      
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

    function formatTopicURL(idOfTopic, slugOfTopic, pageOfTopic, idOfPost){
        let url;
        if(pageOfTopic == 1){
            url = `/topic/${idOfTopic}/${slugOfTopic}/#post-${idOfPost}`;
        }
        else {
            url = `/topic/${idOfTopic}/${slugOfTopic}/page/${pageOfTopic}/#post-${idOfPost}`;
        }
        return url;
    }

    useEffect(() => {
        GetPostsDetails(id);
    }, [id]);

    useEffect(() => {
        if (recentPost) {
            getUsernameById(recentPost.userId);
            GetTopicOfPost(recentPost.topicId);
        }
    }, [recentPost]);


    return (
        <li className="forumItem box-shadow" id={id}>
            <div className="forumItem-icon">
                <span>
                <i>
                    
                </i>
                </span>
            </div>
            <div className="forumItem-main">
                <h4 className="forumItem_title">
                    <Link to={`/forum/${id}/${slug}`}>
                        {title}                       
                    </Link>
                </h4>
                <div className="forumItem_meta">
                <p>
                    {description}
                </p>
                </div>
            </div>
            <div className="forumItem-stats">
                <dl>
                    <dt>
                        {formatNumberOfPosts(totalPosts)}
                    </dt>
                    <dd>
                        posts
                    </dd>
                </dl>
            </div>
            {
                !recentPost 
                ? 
                <div className="forumItem-lastPoster">
                    <p>No posts yet</p>
                </div> 
                : 
                <div className="forumItem-lastPoster">
                    <Link to={
                        topicOfRecentPost ?
                        formatTopicURL(
                            topicOfRecentPost.id,
                            topicOfRecentPost.slug, 
                            pageNumOfPost, 
                            recentPost.id 
                        ) : null
                    }>
                        <div className="forumItem_lastPoster_icon">
                            <i></i>
                        </div>
                    </Link>

                    <div className="lastPoster_info">
                        <Link to={
                            topicOfRecentPost ?
                            formatTopicURL(
                                topicOfRecentPost.id,
                                topicOfRecentPost.slug, 
                                pageNumOfPost, 
                                recentPost.id 
                            ) : null
                        }>
                        <div className="forumItem_lastPoster_title">
                            { topicOfRecentPost 
                                ? <p>{topicOfRecentPost.title}</p>
                                : null
                            }
                        </div>                    
                        </Link>
                        <div className="forumItem_lastPoster_timestamp">
                            <span className="longForm">
                                By {recentAuthor}, {longFormatTimestamp(recentPost.dateCreated)}
                            </span>
                            <span className="shortForm">
                                {shortFormatTimestamp(recentPost.dateCreated)}
                            </span>
                        </div> 
                    </div>                        
                </div>                      
            }
    
        </li>
    );
}

export default ForumListItem;