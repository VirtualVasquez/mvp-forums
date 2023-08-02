import React from 'react';
import './TopicPost.scss';

function TopicPost ({topicAuthor, firstPost, topicText, dateCreated, formatDate}) {

    return (
      <div 
        className=
            {firstPost ? 
            "topic-post first-post" : 
            "topic-post"
            }
      >
        <div className="post_author">
            <i className="author_picture"></i>
            <p className="author_username">{firstPost ? topicAuthor : null}</p>
        </div>
        <div className="post_contents">
            <div className="contents_meta">
                <p className="meta_timestamp">
                    Posted <span> {formatDate(dateCreated)}</span>
                </p>
                <p className="meta_post_number">
                    Post # {firstPost ? 1 : null}
                </p>
            </div>
            <div className="contents_text">
                {topicText}
            </div>
        </div>
      </div>
    );
}

export default TopicPost;