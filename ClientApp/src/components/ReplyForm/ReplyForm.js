import React, { useState, useEffect } from 'react';
import './ReplyForm.scss';


function ReplyForm ({getUsernameById}) {

    const [activeId] = useState(localStorage.getItem('mvp_forums_active_id'))
    const [loggedInUsername, setloggedInUsername] = useState(null);

    async function addPost (text, topicId, userId){
        try {
            const response = await axios.post('/api/Post/AddPost', {
                Text: text,
                TopicId: topicId,
                UserId: userId
            })
            //may need to implement navigation?
        } catch (error) {
            throw new Error (`An error occurred while making the request: ${error.message}`)
        }
    }

    async function handleSubmit(event){
        event.preventDefault();
        console.log("need logic here");
        // try{
        // }
    }


    useEffect(() => {
        async function fetchData() {
            let activeUsername = await getUsernameById(activeId);
            setloggedInUsername(activeUsername);
        }
        fetchData();
    })

    return(
        <div className="reply-form-wrapper">
            <form 
                id="reply-form"
                onSubmit={handleSubmit}
            >
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
                    <button
                        type="submit"
                    >
                        <strong>
                            SUBMIT REPLY
                        </strong>
                    </button> 
                </div>
            </form>
        </div>

    )
}

export default ReplyForm;