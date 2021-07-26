import React from 'react'
import LoginRequire from './LoginRequire';

const Profile = ({ currentUser, setCurrentUser, action, setAction }) => {

    if (currentUser.id) {

        return (

            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-8 mx-auto my-auto">
                        <h2>Profile</h2>
                        <article>
                            <p>User ID: {currentUser.id}</p>
                            <p>Username: {currentUser.username}</p>
                            <p>Authorities: {currentUser.authorities.join(', ')}</p>
                        </article>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <LoginRequire
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                action={action}
                setAction={setAction}
            />
        );
    }

}



export default Profile;
