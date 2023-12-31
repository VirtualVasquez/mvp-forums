import React from 'react';
import ForumTopicItem from '../ForumTopicItem/ForumTopicItem';

import './ForumTopicList.scss';

function ForumTopicList ({topics, currentPage}) {

    return (
      <div className="forum-topic-list">
        <ul>
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
                  currentPage={currentPage}
                />
              )
            }) : null
            }

        </ul>
      </div>
    );
}

export default ForumTopicList;