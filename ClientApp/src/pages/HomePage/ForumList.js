import React, { useState, useEffect } from 'react';
import axios from "axios";
import ForumListItem from './ForumListItem';


const ForumList = () => {
    const [forums, setForums] = useState(null);

    async function GetAllForums() {
        try {
            await axios.get('/api/forum/GetAllForums').then(response => {
                setForums(response.data);
            })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        GetAllForums();
    }, []);

    if (forums === null) {
        return <div>Loading...</div>
    }

    return (
      <div className="forum-groups">
        <ul className="forum-groups-list">
                {Array.isArray(forums) ? forums.map(forum => {
                    return (
                        <ForumListItem
                            key={forum.id}
                            id={forum.id}
                            title={forum.title}
                            description={forum.description}
                            slug={forum.slug}
                        />
                    )
                })
                    : null
                }                 
        </ul>
      </div>
    );
}

export default ForumList;