import React from 'react';
import TopicHeader from '../../components/TopicHeader/TopicHeader';
import Pagination from '../../components/Pagination/Pagination';
import Topic from '../../components/Topic/Topic';
import ReplyForm from '../../components/ReplyForm/ReplyForm';
import TopicButtons from '../../components/TopicButtons/TopicButtons';
import './TopicPage.scss'

function TopicPage () {

    return (
      <div className="topic-page">
        <TopicHeader />
        <TopicButtons 
            pageType="topic"
            statusOpen={true}
        />
        <Pagination />
        <Topic />
        <Pagination />
        <ReplyForm />      
      </div>
    );
}

export default TopicPage;