import React from 'react';
import ForumTopicItem from '../ForumTopicItem/ForumTopicItem';

import './ForumTopicList.scss';

function ForumTopicList ({topics}) {

    return (
      <div className="forum-topic-list">
        <ul>
            {/* Map over number of topics here, no more than 10 Items*/}
            {Array.isArray(topics) ? topics.map(topic => {
              return(
                <ForumTopicItem 
                  key={topic.id}
                  topicId={topic.id}
                  forumId={topic.forumId}
                  userId={topic.userId}
                  title={topic.title}
                  dateCreated={topic.dateCreated}
                  slug={topic.slug}
                />
              )
            }) : null
            }

        </ul>
      </div>
    );
}

export default ForumTopicList;