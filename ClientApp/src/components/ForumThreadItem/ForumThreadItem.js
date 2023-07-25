import React from 'react';
import './ForumThreadItem.scss';

function ForumThreadItem () {

    return (
        <li className="forumThreadItem">
            <div className="forumThreadItem-main">
                <h4 className="forumThreadItem_title">
                    <a href="/">
                    Forum Forum Title                        
                    </a>
                </h4>
                <div className="forumThreadItem_author">
                <a>
                    By USERNAME, DATE OF CREATION (MMMM DD, YYYY)
                </a>
                </div>
            </div>
            <div className="forumThreadItem-stats">
                <p className="replies">
                    <span>XXXX</span>
                    <span>&nbsp;replies</span>
                </p>
                <p className="views">
                    <span>XX.Xk</span> 
                    <span>&nbsp;views</span>
                </p>
            </div>
            <ul className="forumThreadItem-lastPoster">
                <li className="forumThreadItem_lastPoster_icon">
                    <i></i>
                </li>
                <li className="forumThreadItem_lastPoster_username"><a href="#">USERNAME</a></li>
                <li className="forumThreadItem_lastPoster_timestamp">
                 <span className="longForm">1 hour ago</span>
                 <span className="shortForm">X Units</span>
                </li>              
            </ul>              
        </li>
    );
}

export default ForumThreadItem;