import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import MyAppBar from '../AppBar/AppBar';
import UserPage from '../UserPage/UserPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import HomePage from '../HomePage/HomePage';
import NewJobEntryPage from '../NewJobEntryPage/NewJobEntryPage';
import DashboardPage from '../DashboardPage/DashboardPage';
import EditJobEntry from '../EditJobEntry/EditJobEntry';


import './App.css';
import LoginForm from '../LoginForm/LoginForm';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  const jobHuntInfo = useSelector(store => store.jobHunt);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'FETCH_JOB_HUNT' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav 
          jobHuntInfo={jobHuntInfo}
        />
        <Switch>
          <Redirect exact from="/" to="/home" />
          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <MyAppBar />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ProfilePage else shows LoginPage
            exact
            path="/profile"
          >
            <ProfilePage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/newJobEntry"
          >
            <NewJobEntryPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/dashboard/:id"
          >
            <DashboardPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/editJobEntry"
          >
            <EditJobEntry />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              
              <HomePage />
              :
              // Otherwise, show the Landing page
              <LoginPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
