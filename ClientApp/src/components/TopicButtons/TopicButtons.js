import React from 'react';
import { Link } from 'react-router-dom';
import './TopicButtons.scss'

function NewTopicButton({id, slug}){
    return(
        <Link to={`/forum/${id}/${slug}/addTopic`}>
        <button className="box-shadow">
                <strong>START NEW TOPIC</strong>
        </button>
        </Link>

    )
}

function ReplyToTopicButton(){
    
    function scollToReply(){
        let target = document.getElementById("reply-form");
        target.scrollIntoView({ behavior: "smooth"});
    }

    return(
        <button
        className="box-shadow" 
        onClick={scollToReply}
      >
        <strong>REPLY TO THIS TOPIC</strong>
      </button>
    )
}


function TopicButtons ({pageType, statusOpen, forumId, forumSlug}) {
    if(forumId === null || forumSlug === null){
        return null;
    }
    
    if (pageType === "forum"){
        return(            
            <div className="button-container">
                <NewTopicButton 
                    id={forumId}
                    slug={forumSlug}
                />
            </div>
        )
    }

    if (pageType === "topic"){
        return (
            <div className="button-container">
              <NewTopicButton 
                id={forumId}
                slug={forumSlug}
              />
              { statusOpen ? <ReplyToTopicButton /> : null}
            </div>
        );
    }
    
    else {
        return null;
    }
}

export default TopicButtons;