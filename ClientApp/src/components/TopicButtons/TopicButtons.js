import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './TopicButtons.scss'

function NewTopicButton({id, slug}){
    return(
        <Link to={`/forum/${id}/${slug}/addTopic`}>
        <button>
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
        onClick={scollToReply}
      >
        <strong>REPLY TO THIS TOPIC</strong>
      </button>
    )
}


function TopicButtons ({pageType, statusOpen}) {
    
    const {forum_id, forum_slug} = useParams();

    if (pageType == "forum"){
        return(            
            <div className="button-container">
                <NewTopicButton 
                    id={forum_id}
                    slug={forum_slug}
                />
            </div>
        )
    }

    if (pageType == "topic"){
        //may need to change how this is setup later
        //if button exists on "topic" page, param values will
        //be of topic, not forum.
        //need to ensure values of the forum are correctly 
        //being passed through and used.
        return (
            <div className="button-container">
              <NewTopicButton 
                id={forum_id}
                slug={forum_slug}
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