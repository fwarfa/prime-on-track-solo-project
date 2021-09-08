import React from 'react'
import { useHistory } from 'react-router-dom'


function HomePage() {
    const history = useHistory();

    const handleClick = () => {
        history.push('/jobEntry')
    }

    return (
        <div>
            <h1>Home Page!</h1>
            <button onClick={handleClick}>New Job Hunt</button>
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
