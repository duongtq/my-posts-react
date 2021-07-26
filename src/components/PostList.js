import React, { useState, useEffect } from 'react';
import Post from './Post';
import LoginRequire from './LoginRequire';
import axios from 'axios';

const PostList = ({ currentUser, setCurrentUser, postList, setPostList, action, setAction }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState(0);
    // 0: none
    // 1: title asc (A-Z)
    // 2: title desc (Z-A)
    // 3: date asc (oldest -> latest)
    // 4: date desc (latest -> oldest)

    useEffect(() => {
        if (currentUser.token && postList.length === 0) {
            axios.get('http://localhost:8080/api/v1/posts', {
                headers: {
                    'Authorization': `Bearer ${currentUser.token}`
                }
            })
            .then(response => {
                setPostList(response.data);
            })
            .catch(err => {
                console.log("Error fetching data from server.");
            });
        }
    });

    const changeFilterType = () => {
        const filterType = parseInt(document.getElementById('filter').value);
        console.log("Filter type: ", filterType);
        setFilter(filter => filterType);
    }

    const filterPostList = (filterType) => {
        if (filterType === 0) {
            return postList.sort((post1, post2) => {
                if (post1.id < post2.id) return -1;
                if (post1.id > post2.id) return 1;
                return 0;
            });
        }

        if (filterType === 1) {
            return postList.sort((post1, post2) => {
                if (post1.title < post2.title) return -1;
                if (post1.title > post2.title) return 1;
                return 0;
            });
        }
        if (filterType === 2) {
            return postList.sort((post1, post2) => {
                if (post1.title > post2.title) return -1;
                if (post1.title < post2.title) return 1;
                return 0;
            });
        }


        if (filterType === 3) {
            return postList.sort((post1, post2) => {
                const date1 = new Date(post1.createdDate);
                const date2 = new Date(post2.createdDate);

                if (date1 < date2) return -1;
                if (date1 > date2) return 1;
                return 0;
            });
        }

        if (filterType === 4) {
            return postList.sort((post1, post2) => {
                const date1 = new Date(post1.createdDate);
                const date2 = new Date(post2.createdDate);

                if (date1 > date2) return -1;
                if (date1 < date2) return 1;
                return 0;
            });
        }

    }

    const filtered = filterPostList(filter);
    if (!currentUser.id) {
        return (
            <LoginRequire 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser} 
                action={action} 
                setAction={setAction}
            />
        );
    }
    else {   
        return (
            <div className="container mt-3 mb-3">
                <div className="row">
                    <div className="col-lg-8 col-md-8 mx-auto my-auto">
                        {/* <h2>Post List</h2> */}
                        <div className="mt-4 mb-4">
                            <input style={{width: '200px', height: '40px'}} type="text" placeholder="Search by title..." onChange={(evt) => setSearchTerm(evt.target.value)} />
                            <select style={{width: '200px', height: '40px'}} id="filter" onChange={() => changeFilterType()}>
                                <option value="0" defaultChecked='true'>None</option>
                                <option value="1">Title (A - Z)</option>
                                <option value="2">Title (Z - A)</option>
                                <option value="3">Date (ASC)</option>
                                <option value="4">Date (DESC)</option>
                            </select>
                        </div>
                        
                        {filtered
                            .filter(ele => ele.title.includes(searchTerm))
                            .map(ele => <Post key={ele.id} data={ele} currentUser={currentUser}/>)}
                    </div>
                
                </div>
            </div>
        );
    }
}

export default PostList;

