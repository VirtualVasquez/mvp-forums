import React from 'react';

function GroupTitle () {

    return (
        <div className="group-title">
            <div className="row row-one">
            <h1>GroupPage</h1>
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
            <p>Meta Description of group</p>
            </div>

        </div>
    );
}

export default GroupTitle;