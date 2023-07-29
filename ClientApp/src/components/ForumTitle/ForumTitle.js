import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import './ForumTitle.scss';

function ForumTitle({title, description }) {
    
    const [topicsQuantity, setTopicsQuantity] = useState(0);

    

    return (
        <div className="forum-title">
            <div className="row row-one">
                <h1>{title}</h1>
            <div className="topics-quantity">
                <span className="span-wrapper">
                <span className="topics_label">
                    Topics
                </span>
                <span className="topics_number">
                    {topicsQuantity}
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