import React from 'react';
import './GroupThreadItem.scss';

function GroupThreadItem () {

    return (
        <li className="groupThreadItem">
            <div className="groupThreadItem-main">
                <h4 className="groupThreadItem_title">
                    <a href="/">
                    Forum Group Title                        
                    </a>
                </h4>
                <div className="groupThreadItem_author">
                <a>
                    By USERNAME, DATE OF CREATION (MMMM DD, YYYY)
                </a>
                </div>
            </div>
            <div className="groupThreadItem-stats">
                <p className="replies">
                    <span>XXXX</span>
                    <span>&nbsp;replies</span>
                </p>
                <p className="views">
                    <span>XX.Xk</span> 
                    <span>&nbsp;views</span>
                </p>
            </div>
            <ul className="groupThreadItem-lastPoster">
                <li className="groupThreadItem_lastPoster_icon">
                    <i></i>
                </li>
                <li className="groupThreadItem_lastPoster_username"><a href="#">USERNAME</a></li>
                <li className="groupThreadItem_lastPoster_timestamp">
                 <span className="longForm">1 hour ago</span>
                 <span className="shortForm">X Units</span>
                </li>              
            </ul>              
        </li>
    );
}

export default GroupThreadItem;