import React from 'react'
import Login from './Login';

const LoginRequire = ({ currentUser, setCurrentUser, action, setAction }) => {
    return (
        <div style={{textAlign: 'center'}}>
            <h2>You must login first.</h2>
            <Login 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser} 
                action={action} 
                setAction={setAction} 
            />
        </div>
    );
}

export default LoginRequire;

