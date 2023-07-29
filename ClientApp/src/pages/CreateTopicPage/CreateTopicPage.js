import React from 'react';
import CreateTopicForm from './CreateTopicForm';
import './CreateTopicPage.scss';

function CreateTopicPage () {
    return (
      <div className="create-topic-page">
        <div><h1>Create New Topic</h1></div>
        <CreateTopicForm /> 
      </div>
    );
}

export default CreateTopicPage;