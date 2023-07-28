import React from 'react';
import './CreateTopicPage.scss';

function CreateTopicForm () {

    return (
        <div className="create-topic-form-wrapper">
            <form id="create-topic-form">
                <label htmlFor="title">
                    Title <span className='required'>REQUIRED</span>
                </label>
                <input type="text" id="title" name="title" required></input>
                <label htmlFor="topic-text">
                    Topic Text <span className='required'>REQUIRED</span>
                </label>
                <textarea id="topic-text" name="topic-text" required></textarea>
                <button type="submit">Submit Topic</button> 
            </form>
        </div>
    );
}

export default CreateTopicForm;