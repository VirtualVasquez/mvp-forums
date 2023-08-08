import React from 'react';
import './ForumTitle.scss';

function ForumTitle({title, description, topicsTotal }) {    

    return (
        <div className="forum-title box-shadow">
            <div className="row row-one">
                <h1>{title}</h1>
            <div className="topics-quantity">
                <span className="span-wrapper">
                <span className="topics_label">
                    Topics
                </span>
                <span className="topics_number">
                    {topicsTotal}
                </span>
                </span>
            </div>
            </div>
            <div className="row row-two">
                <p>{description}</p>
            </div>

        </div>
    );
}

export default ForumTitle;