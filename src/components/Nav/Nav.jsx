import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav({jobHuntInfo}) {
  const user = useSelector((store) => store.user);

   let currentJobHuntId = undefined;
    if (jobHuntInfo.length > 0) {
      for (let hunt of jobHuntInfo) {
        if (hunt.end_date === null) {
            currentJobHuntId = hunt.id
        }
        console.log('currentJobHuntId ', currentJobHuntId);
        break;
      }
    }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">On Track</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        }
        
        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/home">
              Home
            </Link>

            <Link className="navLink" to="/profile">
              Profile
            </Link>

            <Link className="navLink" to={`/dashboard/${currentJobHuntId}`}>
              Dashboard
            </Link>
          </>
        )}
        <Link className="navLink" to="/about">
          About
        </Link>
        {user.id && (
          <>
          <LogOutButton className="navLink" />
        </>
        )}
      </div>
    </div>
  );
}

export default Nav;
