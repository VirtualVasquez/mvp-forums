import React from 'react';

function ForumGroupsTable () {

    return (
      <div className="forum-groups">
        <ul>
          <li>
            <div className="dataItem-icon">
              <span>
                <i>
                  
                </i>
              </span>
            </div>
            <div className="dataItem-main">
              <h4 className="dataItem_title">
                Forum Title
              </h4>
              <div className="dataItem_meta">
                <p>
                  Forum Title Meta Description
                </p>
              </div>
            </div>
            <div className="dataItem-stats">
              <dl>
                <dt>
                  9k
                </dt>
                <dd>
                  posts
                </dd>
              </dl>
            </div>
            <ul className="dataItem-lastPoster">
              <li>"User Icon here"</li>
              <li className="dataItem-lastPoster-title">Title Thread in Forum</li>
              <li>
                By "so-and-so", "Timestamp"
              </li>              
            </ul>              
          </li>
        </ul>
      </div>
    );
}

export default ForumGroupsTable;