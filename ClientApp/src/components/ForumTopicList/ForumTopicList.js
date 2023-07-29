import React from 'react';
import Pagination from '../Pagination/Pagination';
import ForumTopicItem from '../ForumTopicItem/ForumTopicItem';

import './ForumTopicList.scss';

function ForumTopicList () {

    return (
      <div className="forum-topic-list">
        <Pagination />
        <ul>
            {/* Map over number of topics here, no more than 10 Items*/}
            <ForumTopicItem />
            <ForumTopicItem />
            <ForumTopicItem />
        </ul>
        <Pagination />
      </div>
    );
}

export default ForumTopicList;