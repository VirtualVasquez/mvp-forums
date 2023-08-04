import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';


const ForumListItem = ({ id, title, description, slug }) => {

    const [totalPosts, setTotalPosts] = useState(0);
    const [recentPost, setRecentPost] = useState(null);
    const [recentAuthor, setRecentAuthor] = useState(null);
    const [topicOfRecentPost, setTopicOfRecentPost] = useState(null);
    
    async function GetPostsDetails(forumId) {
        try {
            await axios.get(`/api/forum/posts-details/${forumId}`).then(response => {
                const {totalPosts, mostRecentPost } = response.data;
                setTotalPosts(totalPosts);
                setRecentPost(mostRecentPost)
            })
        } catch (error) {
            console.error(error);
        }
    }

    async function getUsernameById(userId){
        try{
            await axios.get(`/api/User/NameById/${id}`).then(response => {
                setRecentAuthor(response.data);
            })
        } catch (error){
            console.error(error);
        }
      };

    async function GetTopicOfPost(topicId){
        try {
            await axios.get(`/apii/Topic/TopicById/${topicId}`).then(response => {
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
        <li className="forumItem" id={id}>
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
            <ul className="forumItem-lastPoster">
                <li className="forumItem_lastPoster_icon"><i></i></li>
                <li className="forumItem_lastPoster_title"><a href="#">TITLE OF THREAD HERE OR ELLIPSIS</a></li>
                <li className="forumItem_lastPoster_timestamp">
                 <span className="longForm">By so-and-so, 1 hour ago,</span>
                 <span className="shortForm">X Units</span>
                </li>              
            </ul>              
        </li>
    );
}

export default ForumListItem;