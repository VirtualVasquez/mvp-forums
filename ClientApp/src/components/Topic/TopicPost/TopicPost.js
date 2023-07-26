import React from 'react';
import './TopicPost.scss';

function TopicPost () {

    return (
      <div className="topic-post">
        <div className="post_author">
            <i className="author_picture"></i>
            <p className="author_username">USERNAME</p>
        </div>
        <div className="post_contents">
            <div className="contents_meta">
                <p className="meta_timestamp">
                    Posted <span> XXXX DD, YYYY</span>
                </p>
                <p className="meta_post_number">
                    Post #X
                </p>
            </div>
            <div className="contents_text">
                <p>Here is sample lorum ipsum.</p>
                <p>This could keep going.</p>
                <p>Might need some sort of wysiwyg editor?</p>
            </div>
        </div>
      </div>
    );
}

export default TopicPost;