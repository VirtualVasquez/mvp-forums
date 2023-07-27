import React from 'react';
import { Link } from 'react-router-dom';
import './TopicButtons.scss'



function NewTopicButton(){
    return(
        <button>
            <Link>
                <strong>START NEW TOPIC</strong>
            </Link>
        </button>
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

    if (pageType == "forum"){
        return(            
            <div className="button-container">
                <NewTopicButton />
            </div>
        )
    }

    if (pageType == "topic"){
        return (
            <div className="button-container">
              <NewTopicButton />
              { statusOpen ? <ReplyToTopicButton /> : null}
            </div>
        );
    }
    
    else {
        return null;
    }
}

export default TopicButtons;