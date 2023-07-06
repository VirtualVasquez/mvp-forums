import React from 'react';
import Pagination from '../Pagination/Pagination';
import GroupThreadItem from '../GroupThreadItem/GroupThreadItem';

import './GroupThreadList.scss';

function GroupThreadList () {

    return (
      <div className="group-thread-list">
        <Pagination />
        <ul>
            {/* Map over number of threads here, no more than 10 Items*/}
            <GroupThreadItem />
            <GroupThreadItem />
            <GroupThreadItem />
        </ul>
        <Pagination />
      </div>
    );
}

export default GroupThreadList;