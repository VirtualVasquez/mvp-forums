import React from 'react';
import CreateTopicForm from './CreateTopicForm';
import { useParams } from 'react-router-dom';
import './CreateTopicPage.scss';

function CreateTopicPage () {
    //use this id in the axios request to add a new topic to the forum
    const {forum_id} = useParams();
    console.log(forum_id);
    return (
      <div className="create-topic-page">
        <div><h1>Create New Topic</h1></div>
        <CreateTopicForm /> 
      </div>
    );
}

export default CreateTopicPage;