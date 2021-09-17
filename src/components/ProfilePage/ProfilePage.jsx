import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'


function ProfilePage() {
  const history = useHistory();
  const user = useSelector(store => store.user);

  let profileObject = {
    firstName: '',
    lastName: '',
    bio: '',
    email: '',
    profileImageUrl: '',
    username: '',
    password: ''
  }
  const [profileUpdate, setProfileUpdate] = useState(profileObject);

  // const handleChange = () => {
    
  // }

  const handleCancel = () => {
    history.push('/home');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('form submitted');
  }

  return (
    <div>
    <h3>Profile Page</h3>
    <div>
      <img src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" alt="profile picture" height="100px" width="100px"/>
    </div>
    <a href="#">Change Profile Picture</a>
    <div >
      <input type="file"/>
    </div>
    <div>{user.first_name} {user.last_name}</div>
    <div>Bio: {user.bio}</div>
    <div>{user.email}</div>
    
    <form onSubmit={handleSubmit}>
      <div>
        <label >Edit Demographics</label>
        <input required type="text" placeholder="First Name" />
        <input required type="text" placeholder="Last Name" />
        <textarea rows="4" placeholder="Bio"></textarea>
        <input required type="text" placeholder="Email" />
        <label>Edit username & password</label>
        <input required type="text" placeholder="username" />
        <input required type="text" placeholder="password" />
      </div>
      <button onClick={handleCancel}type="button">Cancel</button>
      <button type="submit">Save</button>
    </form>
    </div>
  );
}

export default ProfilePage;
