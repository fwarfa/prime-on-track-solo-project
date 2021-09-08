import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'


function HomePage() {
    const history = useHistory();
    const user = useSelector(store => store.user);

    const onNewJobHunt = () => {
        history.push('/newJobEntry')
    }

    const onEditProfile = () => {
        history.push('/profile')
    }


    return (
        <div>
            <h1>Home Page!</h1>

            <div>
                <img src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" alt="profile picture" height="100px" width="100px"/> 
            </div>
            <div>{user.first_name} {user.last_name}</div>
            <div>Bio: {user.bio}</div>
            <div>{user.email}</div>
            <button onClick={onEditProfile}>Edit Profile</button>
            <br />
            <button onClick={onNewJobHunt}>New Job Hunt</button>
            <h2>Job Hunt History</h2>
            <ul>
                <li>IT ANALYST</li>
                <li>SOFTWARE ENGINEER</li>
                <li>PATIENT ACCESS REP</li>
                <li>PACKAGER</li>
            </ul>
        </div>
    )
}

export default HomePage
