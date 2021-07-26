import React, { Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';

const Login = ({ currentUser, setCurrentUser, action, setAction }) => {
    return (
        <Fragment>
        <div className="clearfix">

        </div>
        <Formik
            initialValues={{ username: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.username) {
                    errors.username = <span style={{color: 'red'}}>  Required</span>  ;
                }
                if (!values.password) {
                    errors.password = <span style={{color: 'red'}}>  Required</span>;
                }
            }}

            onSubmit={(values, { setSubmitting }) => {
                values.wrongCredential = false;
                console.log("Submitted");

                axios.post('http://localhost:8080/authenticate', {
                    username: values.username,
                    password: values.password
                })
                .then(response => {
                    if (response.data.userId) {
                        setCurrentUser({
                            id: response.data.userId,
                            username: response.data.username,
                            authorities: response.data.authorities,
                            token: response.data.jwtToken
                        });
                        setAction(action => "LOGOUT");


                    }
                })
                .catch(err => {
                    console.log('Error login: ', err.message);
                    document.getElementById('wrongCredential').textContent = 'Incorrect username/password. Please try again.'

                    setTimeout(() => {
                        document.getElementById('wrongCredential').textContent = '';
                    }, 2500);
                });
            }}
        >
            {({ isSubmitting }) => (
                <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-8 mx-auto my-auto">
                <Form>
                    <div className="form-group">
                        <Field className="mt-2 form-control" type="text" name="username" placeholder="Username" />
                        <ErrorMessage name="username" component="div"/><br/>
                    </div>
                    
                    <div className="form-group">
                        <Field className="form-control" type="password" name="password" placeholder="Password" />
                        <ErrorMessage name="password" component="div"/><br/>
                    </div>
                    
                    <div className="mb-2">
                        <span id="wrongCredential" style={{ color: 'red' }}></span><br/>
                    </div>
                    
                    <div className="form-group ">
                        <button className="btn btn-primary shadow-none form-control" type="submit">LOGIN</button>
                    </div>
                </Form>
                </div>
                
                </div>
            </div>
            )}
        </Formik>
        </Fragment>
    );
}

export default Login;

