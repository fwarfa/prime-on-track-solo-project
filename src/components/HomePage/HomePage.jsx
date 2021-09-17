import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

function HomePage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const jobHuntInfo = useSelector(store => store.jobHunt);

    useEffect(() => {
        dispatch({
            type: 'FETCH_JOB_HUNT'
        });
    }, [])

    let openHunt;
    if (jobHuntInfo.length > 0) {
        for (let hunt of jobHuntInfo) {
            if (hunt.end_date === null) {
                console.log('this was hit');
                openHunt = hunt;
            }
        }
    }

    const onNewJobHunt = () => {
        history.push('/newJobEntry')
    }

    const onEditProfile = () => {
        history.push('/profile')
    }

    const onViewClick = (huntId) => {
        console.log('hunt id is', huntId);
        history.push(`/dashboard/${huntId}`)
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
            <p>Job Hunt History</p>
            { jobHuntInfo.some(hunt => hunt.end_date !== null) ?
                jobHuntInfo.filter(hunt => hunt.end_date !== null).map((hunt) => (
                    <ul key={hunt.id}>
                        <li>{hunt.job_hunt_title}</li>
                        <li>{hunt.end_date}</li>
                        <li><button onClick={() => onViewClick(hunt.id)}>view</button></li>
                    </ul>
                ))
                :
                <p>You Have No Previous Job Hunts</p>
            } 
        </div>
    )
}

export default HomePage
