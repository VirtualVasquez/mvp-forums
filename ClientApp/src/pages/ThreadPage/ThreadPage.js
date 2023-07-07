import React from 'react';
import ThreadHeader from '../../components/ThreadHeader/ThreadHeader';
import Pagination from '../../components/Pagination/Pagination';
import Thread from '../../components/Thread/Thread';
import './ThreadPage.scss'


function ThreadPage () {

    return (
      <div className="thread-page">
        <ThreadHeader />
        <div className="button-container">
          <button className="to-reply-form">
            <strong>REPLY TO THIS TOPIC</strong>
          </button>
        </div>

        <Pagination />
        <Thread />
        <Pagination />
      
      </div>
    );
}

export default ThreadPage;