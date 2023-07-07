import React from 'react';
import ThreadHeader from '../../components/ThreadHeader/ThreadHeader';
import Pagination from '../../components/Pagination/Pagination';
import Thread from '../../components/Thread/Thread';

function ThreadPage () {

    return (
      <div>
        <ThreadHeader />
        <Pagination />
        <Thread />
        <Pagination />
      
      </div>
    );
}

export default ThreadPage;