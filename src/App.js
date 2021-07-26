import React, { useState } from 'react'
import Header from './components/Header';
import 'bootstrap';
import './App.css';

const App = () => {
  // Data:
  // user:
  //   id
  //   username
  //   authority
  //   token
  // post list:

  const [postList, setPostList] = useState([]);

  const [action, setAction] = useState("LOGIN");

  const [currentUser, setCurrentUser] = useState({
    id: null,
    username: null,
    authorities: null,
    token: null
  });

  return (
    <div className="container">
      <Header 
        postList={postList} 
        setPostList={setPostList} 
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        action={action}
        setAction={setAction} />
    </div>
  );
}

export default App;
