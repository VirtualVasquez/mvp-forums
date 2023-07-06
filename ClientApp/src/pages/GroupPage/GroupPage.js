import React from 'react';
import GroupTitle from '../../components/GroupTitle/GroupTitle';
import Pagination from '../../components/Pagination/Pagination';
import './GroupPage.scss';

function GroupPage () {

    return (
      <div className="group-page">
        <GroupTitle />
        <Pagination />
      </div>
    );
}

export default GroupPage;