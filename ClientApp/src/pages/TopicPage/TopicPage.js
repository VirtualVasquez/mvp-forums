import React from 'react';
import TopicHeader from '../../components/TopicHeader/TopicHeader';
import Pagination from '../../components/Pagination/Pagination';
import Topic from '../../components/Topic/Topic';
import ReplyForm from '../../components/ReplyForm/ReplyForm';
import './TopicPage.scss'

function scollToReply(){
  let target = document.getElementById("reply-form");
  target.scrollIntoView({ behavior: "smooth"});
}

function TopicPage () {

    return (
      <div className="topic-page">
        <TopicHeader />
        <div className="button-container">
          <button 
            className="to-reply-form"
            onClick={scollToReply}
          >
            <strong>REPLY TO THIS TOPIC</strong>
          </button>
        </div>
        <Pagination />
        <Topic />
        <Pagination />
        <ReplyForm />      
      </div>
    );
}

export default TopicPage;