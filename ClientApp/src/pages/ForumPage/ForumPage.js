import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import ForumTitle from '../../components/ForumTitle/ForumTitle';
import ForumTopicList from '../../components/ForumTopicList/ForumTopicList';
import Pagination from '../../components/Pagination/Pagination';
import TopicButtons from '../../components/TopicButtons/TopicButtons';
import './ForumPage.scss';

function ForumPage() {
    const { forum_id, forum_slug, page_number} = useParams();

    const [forum, setForum] = useState(null);

    const [currentPage, setCurrentPage] = useState(page_number ? page_number : 1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalForumTopics, setTotalForumTopics] = useState(0);
    const [paginatedTopics, setPaginatedTopics] = useState(null);

    async function GetForumById(forumId) {
        try {
            await axios.get(`/api/forum/${forumId}`).then(response => {
                setForum(response.data);
            })
        } catch (error) {
            console.error(error);
        }
    }

    async function GetTopicsByForumId(forumId) {
        const pageSize = 10;
        try {
            const response = await axios.get(`/api/Topic/AllTopicsByForumId/${forumId}?page=${currentPage}&pageSize=${pageSize}`);
            const { totalTopics, totalPages, topics } = response.data;
            setTotalPages(totalPages);
            setTotalForumTopics(totalTopics);
            setPaginatedTopics(topics);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        GetForumById(forum_id);
        GetTopicsByForumId(forum_id);
    }, [currentPage]);

    if (forum === null) {
        return <div>Loading forum ...</div>
    }
    
    return (
      <div className="forum-page">
        <ForumTitle
            title={forum.title}
            description={forum.description}
            topicsTotal={totalForumTopics}
        />
        <TopicButtons 
            pageType="forum"
            forumId={forum_id}
            forumSlug={forum_slug}
        />
        {!paginatedTopics 
        ? 
        <p className="text-center">No topics were able to be succesfully fetched.</p> 
        :
        paginatedTopics.length > 0 ? 
        <div>
        <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            id={forum_id}
            slug={forum_slug}
            pageType="forum"
        />
        <ForumTopicList 
            topics={paginatedTopics}
            currentPage={currentPage}
        />
        <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            id={forum_id}
            slug={forum_slug}
            pageType="forum"
        />
        </div>         
        :
        <p className="text-center">No topics have been created for this forum yet.</p>
        }

      </div>
    );
}

export default ForumPage;