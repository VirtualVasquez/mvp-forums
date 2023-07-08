import React from 'react';
import ThreadHeader from '../../components/ThreadHeader/ThreadHeader';
import Pagination from '../../components/Pagination/Pagination';
import Thread from '../../components/Thread/Thread';
import ReplyForm from '../../components/ReplyForm/ReplyForm';
import './ThreadPage.scss'

function scollToReply(){
  let target = document.getElementById("reply-form");
  target.scrollIntoView({ behavior: "smooth"});
}

function ThreadPage () {

    return (
      <div className="thread-page">
        <ThreadHeader />
        <div className="button-container">
          <button 
            className="to-reply-form"
            onClick={scollToReply}
          >
            <strong>REPLY TO THIS TOPIC</strong>
          </button>
        </div>
        <Pagination />
        <Thread />
        <Pagination />
        <ReplyForm />      
      </div>
    );
}

export default ThreadPage;