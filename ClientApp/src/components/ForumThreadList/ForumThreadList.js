import React from 'react';
import Pagination from '../Pagination/Pagination';
import ForumThreadItem from '../ForumThreadItem/ForumThreadItem';

import './ForumThreadList.scss';

function ForumThreadList () {

    return (
      <div className="Forum-thread-list">
        <Pagination />
        <ul>
            {/* Map over number of threads here, no more than 10 Items*/}
            <ForumThreadItem />
            <ForumThreadItem />
            <ForumThreadItem />
        </ul>
        <Pagination />
      </div>
    );
}

export default ForumThreadList;