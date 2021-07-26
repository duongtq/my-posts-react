import React, { Fragment } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import Helper from '../utils/Helper';

const PostEdit = ({ currentUser, postList, setPostList }) => {
    const history = useHistory();
    const id = parseInt(useParams().id);

    const post = postList.find(ele => ele.id === id);

    const defaultDateTime = Helper.getTodayDateTime(post.createdDate);

    // ALLOW ONLY AUTHOR OF THAT POST TO EDIT
    if (post.authorId !== currentUser.id) {
        return (
            <h2>You are not author of this post.</h2>
        );
    }   
    else {
        return (
            <Formik
                initialValues={{ title: post.title, description: post.description, content: post.content, createdDate: defaultDateTime }}
                validate={values => {
                
                    const errors = {};
                    if (!values.title) {
                        errors.title = 'Title should not be empty';
                    }
                    if (!values.description) {
                        errors.description = 'Description should not be empty';
                    }
                    if (!values.content) {
                        errors.content = 'Content should not be empty';
                    }
                    
                    return errors;
                }}

                onSubmit={(values, { setSubmitting }) => {
                    console.log("Editted");

                    console.log("Created date: ", values.createdDate);

                    const payload = {
                        author: currentUser.username,
                        authorId: currentUser.id,
                        content: values.content,
                        title: values.title,
                        description: values.description,
                        createdDate: values.createdDate,
                        id: id
                    }

                    axios.put(`http://localhost:8080/api/v1/posts/update/${id}`, payload, {
                        headers: {
                            'Authorization': `Bearer ${currentUser.token}`
                        }
                    }).then(response => {
                        
                        console.log("Response: ", response);
                        if (response.status === 200) {

                            setPostList(postList => postList.map(ele => {
                                if (ele.id === id) {
                                    ele.title = values.title;
                                    ele.description = values.description;
                                    ele.content = values.content;
                                    ele.createdDate = values.createdDate;
                                    ele.info = `Posted by ${post.author} on ${Helper.formatCreatedDate(values.createdDate)} - ${Helper.timeToReadCalculator(post)} ${Helper.timeToReadCalculator(post) < 1 ? 'seconds' : 'minutes'} read`;
                                }
                                return ele;
                            }));
                            
                            console.log('Post updated successfully');
                            history.push('/content');
                        }
                    }).catch(err => {
                        console.log("Update error: " + err.message);
                        history.push(`/postedit/${id}`);
                    });
                }}
            >
                {({ isSubmitting }) => (
                    <Fragment>
                        <h3>Edit post: {post.title}</h3>
                        <Form>
                            <div className="form-group mt-3 mb-3">
                                <label htmlFor="title">Title</label><br/>
                                <Field 
                                    className="form-control" 
                                    id="title" 
                                    component="textarea" 
                                    rows='2' 
                                    type="text" 
                                    name="title" 
                                    placeholder='...'
                                />
        
                                <ErrorMessage 
                                    name="title"
                                    component="div"
                                    style={{color: 'red'}}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="description">Description</label><br/>
                                <Field 
                                    className="form-control" 
                                    id="description" 
                                    component="textarea" 
                                    rows='2' 
                                    type="text" 
                                    name="description" 
                                    placeholder='...'
                                />
                                <ErrorMessage 
                                    name="description"
                                    component="div"
                                    style={{color: 'red'}}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="content">Content</label><br/>
                                <Field 
                                    className="form-control"
                                    id='content' 
                                    component="textarea"
                                    rows='10'
                                    type="text" 
                                    name="content" 
                                    placeholder='...'
                                />        
                                <ErrorMessage 
                                    name="content" 
                                    component="div"
                                    style={{ color: 'red' }} 
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="createdDate">Created on</label><br/>
                                <Field 
                                    className="form-control" 
                                    id="createdDate" 
                                    component="input" 
                                    type="datetime-local" 
                                    name="createdDate"
                                />
                            </div>

                            <div className="form-group mb-4">
                                <button 
                                    className="btn btn-warning btn-small form-control" 
                                    type="submit" 
                                    disabled={isSubmitting} >
                                        UPDATE
                                </button>
                            </div>

                        </Form>
                    </Fragment>
                )}
            </Formik>
        );
    }
}

export default PostEdit;

