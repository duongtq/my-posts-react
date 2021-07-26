import React from 'react'
import { useParams } from 'react-router-dom';

const PostDetail = ({ postList }) => {
    const id = parseInt(useParams().id);

    const post = postList.find(ele => ele.id === id);

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8 col-md-8 mx-auto my-auto">
                    <div>
                        <h2 style={{fontSize: '50px'}}>{post.title}</h2>
                        <h3 style={{fontSize: '40px'}}>{post.description}</h3>
                        <p className="mt-4">{post.content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;
