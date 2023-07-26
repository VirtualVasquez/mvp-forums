import React from 'react';
import './TopicHeader.scss';

function TopicHeader () {

    return (
        <div className="topic-header">
            <div className="topic-header_title">
                <h1>TITLE OF THE TOPIC</h1>
            </div>
            <div className="topic-header_info">
                <i className="info_profile_image"></i>
                <div className="info_author">
                    <p>
                        <strong>
                            By <span className="info_author_name">AUTHOR NAME</span>
                        </strong>
                    </p>
                    <p className="info_timestamp_and_parent">
                        <span className="timestamp">
                        TIMESTAMP OF POST                       
                        </span>
                        <span>
                        &nbsp;in&nbsp; 
                        </span> 
                        <span className="parent">
                        <a>
                            TITLE OF FORUM GROUP
                        </a>
                        </span>
                        {/* TITLE OF FORUM GROUP means parent group of topic */}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default TopicHeader;