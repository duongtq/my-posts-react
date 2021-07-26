import React from 'react'
import Helper from '../utils/Helper';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';


const Post = ({ data, currentUser }) => {

    const post = {
        id: data.id,
        author: data.author,
        title: data.title,
        description: data.description,
        content: data.content,
        createdDate: data.createdDate,
        authorId: data.authorId,
        info: `Posted by ${data.author} on ${Helper.formatCreatedDate(data.createdDate)} - ${Helper.timeToReadCalculator(data)} ${Helper.timeToReadCalculator(data) < 1 ? 'seconds' : 'minutes'} read`
    }

    return (
        <article className="mt-4 mb-4">
            <h2 style={{ fontSize: '3em' }}>{post.title}</h2>
            <h3 style={{ fontSize: '2em' }}>{post.description}</h3>
            <p className="post-info" style={{ fontSize: '1.5em' }}>{post.info}</p>

            <button className="post-edit btn btn-info shadow-none" type="button">
                <Link to={`/postedit/${post.id}`}>
                    EDIT
                </Link>
            </button>

            <button className="post-detail btn btn-warning shadow-none" type="button">
                <Link to={`/postdetail/${post.id}`}>
                    DETAIL
                </Link>
            </button>
            <hr />
        </article>

    );
}

export default Post;
