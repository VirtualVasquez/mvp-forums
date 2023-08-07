import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './ReplyForm.scss';


function ReplyForm ({topicId, topicSlug, forumId, getPostsByTopicId, currentPage, loggedInUsername}) {

    const [postText, setPostText] = useState(null);
    const navigate = useNavigate()

    async function addPost (text, idOfTopic, idOfForum, idOfUser, slugOfTopic, currentPageNumber){
        try {
            const response = await axios.post('/api/Post/AddPost', {
                Text: text,
                TopicId: idOfTopic,
                UserId: idOfUser,
                ForumId: idOfForum
            })
            const pageNumber = response.data.pageNumber;
            const newPostId = response.data.post.id;
            let topicUrl;

            if(pageNumber == 1 ){
                topicUrl = `/topic/${topicId}/${slugOfTopic}/#post-${newPostId}`;
            } else{
                topicUrl = `/topic/${topicId}/${slugOfTopic}/page/${pageNumber}/#post-${newPostId}`
            }

            if (pageNumber == currentPageNumber){
                getPostsByTopicId(idOfTopic);
                navigate(topicUrl, {replace: true});
            } else{
                navigate(topicUrl, {replace: true});
                location.reload();
            }

        } catch (error) {
            throw new Error (`An error occurred while making the request: ${error.message}`)
        }
    }

    async function handleSubmit(event){
        event.preventDefault();
        try{
            await addPost(postText, topicId, forumId, activeId, topicSlug, currentPage);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="reply-form-wrapper box-shadow">
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
                    <textarea
                        className='box-shadow'
                        id="post-text"
                        name="post-text"
                        required
                        onChange={e=>setPostText(e.target.value)}
                    >                        
                    </textarea>
                </div>
                <div className="row-two">
                    <button
                        className="box-shadow"
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