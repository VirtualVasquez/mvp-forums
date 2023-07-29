import React from 'react';
import ForumTopicItem from '../ForumTopicItem/ForumTopicItem';

import './ForumTopicList.scss';

function ForumTopicList ({topics}) {

    return (
      <div className="forum-topic-list">
        <ul>
            {/* Map over number of topics here, no more than 10 Items*/}
            <ForumTopicItem />
            <ForumTopicItem />
            <ForumTopicItem />
        </ul>
      </div>
    );
}

export default ForumTopicList;