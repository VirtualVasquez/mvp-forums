import React from 'react';

function ForumGroupsItem () {

    return (
        <li className="forumItem">
            <div className="forumItem-icon">
                <span>
                <i>
                    
                </i>
                </span>
            </div>
            <div className="forumItem-main">
                <h4 className="forumItem_title">
                    <a href="/">
                    Forum Group Title                        
                    </a>
                </h4>
                <div className="forumItem_meta">
                <p>
                    Forum Group Title Meta Description
                </p>
                </div>
            </div>
            <div className="forumItem-stats">
                <dl>
                    <dt>
                        9999k
                    </dt>
                    <dd>
                        posts
                    </dd>
                </dl>
            </div>
            <ul className="forumItem-lastPoster">
                <li className="forumItem_lastPoster_icon"><i></i></li>
                <li className="forumItem_lastPoster_title"><a href="#">Thread for TITLE OF THREAD</a></li>
                <li className="forumItem_lastPoster_timestamp">
                By so-and-so, 1 hour ago,
                By so-and-so, 1 hour ago
                </li>              
            </ul>              
        </li>
    );
}

export default ForumGroupsItem;