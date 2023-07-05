import React from 'react';
import ForumGroupsItem from './ForumGroupsItem';

function ForumGroupsList () {

    return (
      <div className="forum-groups">
        <ul className="forum-groups-list">
          <ForumGroupsItem />    
          <ForumGroupsItem />                
        </ul>
      </div>
    );
}

export default ForumGroupsList;