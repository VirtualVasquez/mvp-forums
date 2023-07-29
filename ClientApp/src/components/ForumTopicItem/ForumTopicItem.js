import React from 'react';
import './ForumTopicItem.scss';

function ForumTopicItem () {

    return (
        <li className="forumTopicItem">
            <div className="forumTopicItem-main">
                <h4 className="forumTopicItem_title">
                    <a href="/">
                    Forum Forum Title                        
                    </a>
                </h4>
                <div className="forumTopicItem_author">
                <a>
                    By USERNAME, DATE OF CREATION (MMMM DD, YYYY)
                </a>
                </div>
            </div>
            <div className="forumTopicItem-stats">
                <p className="replies">
                    <span>XXXX</span>
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
                <li className="forumTopicItem_lastPoster_username"><a href="#">USERNAME</a></li>
                <li className="forumTopicItem_lastPoster_timestamp">
                 <span className="longForm">1 hour ago</span>
                 <span className="shortForm">X Units</span>
                </li>              
            </ul>              
        </li>
    );
}

export default ForumTopicItem;