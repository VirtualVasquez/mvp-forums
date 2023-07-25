import React from 'react';
import './ForumTitle.scss';

function ForumTitle () {

    return (
        <div className="forum-title">
            <div className="row row-one">
            <h1>ForumPage</h1>
            <div className="threads-quantity">

                <span className="span-wrapper">
                <span className="threads_label">
                    Threads
                </span>
                <span className="threads_number">
                    XXX
                </span>
                </span>


            </div>
            </div>
            <div className="row row-two">
            <p>Meta Description of forum</p>
            </div>

        </div>
    );
}

export default ForumTitle;