import React from 'react';
import './ReplyForm.scss';

function ReplyForm () {
    return(
        <div className="reply-form-wrapper">
            <form id="reply-form">
                <div className="row-one">
                    <div className="authorized-user">
                        <i className="user_picture"></i>
                        <p className="user_name">
                            <span>Reply to thread as</span> USERNAME
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