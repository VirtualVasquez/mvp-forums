import React, { useState, useEffect } from 'react';
import './ReplyForm.scss';


function ReplyForm ({getUsernameById}) {

    const [loggedInUsername, setloggedInUsername] = useState(null);

    useEffect(() => {
        async function fetchData() {
            let activeId = localStorage.getItem('mvp_forums_active_id');
            let activeUsername = await getUsernameById(activeId);
            setloggedInUsername(activeUsername);
        }
        fetchData();
    })

    return(
        <div className="reply-form-wrapper">
            <form id="reply-form">
                <div className="row-one">
                    <div className="authorized-user">
                        <i className="user_picture"></i>
                        <p className="user_name">
                            <span>Reply to thread as</span> {loggedInUsername}
                        </p>                
                    </div>
                    <textarea></textarea>
                </div>
                <div className="row-two">
                    <button><strong>SUBMIT REPLY</strong></button> 
                </div>
            </form>
        </div>

    )
}

export default ReplyForm;