import React from 'react';
import GroupTitle from '../../components/GroupTitle/GroupTitle';
import GroupThreadList from '../../components/GroupThreadList/GroupThreadList'
import './GroupPage.scss';

function GroupPage () {

    return (
      <div className="group-page">
        <GroupTitle />
        <GroupThreadList />
      </div>
    );
}

export default GroupPage;