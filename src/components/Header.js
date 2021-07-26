import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../assets/logo.jpeg';
import Login from './Login';
import Homepage from './Homepage';
import PostList from './PostList';
import Profile from './Profile';
import PostDetail from './PostDetail';
import PostEdit from './PostEdit';
import Signup from './Signup';

const Header = ({ postList, setPostList, currentUser, setCurrentUser, action, setAction }) => {

    const onLoginLogoutHandler = () => {
        if (action === "LOGOUT") {
            setAction(action => "LOGIN");
            setCurrentUser({
                id: null,
                username: null,
                authority: null,
                token: null
            });
            setPostList(postList => []);
        }
    }

    const renderLoginLogout = () => {
        if (action === "LOGIN") {
            return <Login currentUser={currentUser} setCurrentUser={setCurrentUser} action={action} setAction={setAction} />
        } else {
            return <h2>Login Successfully</h2>
        }
    }

    return (
        <BrowserRouter>
            <header>
                <div>
                    <nav>
                        <a href="/homepage">
                            <img src='https://github.com/duongtq/my-posts-react/blob/master/src/assets/logo.jpeg' alt="" />
                        </a>

                        <ul>
                            <li>
                                <Link to="/signup">
                                    SIGN-UP
                                </Link>
                            </li>

                            <li onClick={onLoginLogoutHandler} >
                                <Link to="/login">{action}</Link>
                            </li>
                            <li>
                                <Link to="/profile">PROFILE</Link>
                            </li>
                            <li>
                                <Link to="/content">CONTENT</Link>
                            </li>
                            <li>
                                <Link to="/homepage">HOME</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <Switch>
                <Route path="/signup">
                    <Signup />
                </Route>

                <Route path="/homepage">
                    <Homepage />
                </Route>
                <Route path="/content">
                    <PostList 
                        currentUser={currentUser} 
                        setCurrentUser={setCurrentUser} 
                        postList={postList} 
                        setPostList={setPostList} 
                        action={action} 
                        setAction={setAction} 
                    />
                </Route>
                <Route path="/profile">
                    <Profile 
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}
                        action={action}
                        setAction={setAction}
                    />
                </Route>
                <Route path="/login">
                    {renderLoginLogout()}
                </Route>
                <Route path="/postdetail/:id">
                    <PostDetail postList={postList} />
                </Route>
                <Route path="/postedit/:id">
                    <PostEdit currentUser={currentUser} postList={postList} setPostList={setPostList} />
                </Route> 
            </Switch>
        </BrowserRouter>
    );
}

export default Header;

