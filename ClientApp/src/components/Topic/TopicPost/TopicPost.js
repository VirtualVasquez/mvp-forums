import React, { useState, useEffect } from 'react';
import './TopicPost.scss';

function TopicPost ({firstPost, topicAuthor, text, dateCreated, formatDate, getUsernameById, postId, userId, postNum}) {

    const [author, setAuthor] = useState(null);
    const [postNumber, setPostNumber] = useState(firstPost ? 1 : postNum);

    useEffect(() => {
        async function fetchData() {
            const username = await getUsernameById(userId);
            setAuthor(username); 
        }
        firstPost ? setAuthor(topicAuthor) : fetchData();
        const hash = window.location.hash;
        if (hash){
          const element = document.querySelector(hash);
          if(element){
            element.scrollIntoView({behavior: 'smooth'});
          }
        }
    })

    return (
      <div 
        className=
            {firstPost ? 
            "topic-post first-post" : 
            "topic-post"
            }
        id={!firstPost ? `post-${postId}` : "first-post"}
      >
        <div className="post_author">
            <i className="author_picture"></i>
            <p className="author_username">{author}</p>
        </div>
        <div className="post_contents">
            <div className="contents_meta">
                <p className="meta_timestamp">
                    Posted <span> {formatDate(dateCreated)}</span>
                </p>
                <p className="meta_post_number">
                    Post #{postNumber}
                </p>
            </div>
            <div className="contents_text">
                {text}
            </div>
        </div>
      </div>
    );
}

export default TopicPost;