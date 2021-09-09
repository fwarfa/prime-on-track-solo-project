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

  const handleChange = () => {
    
  }

  const handleCancel = () => {
    history.push('/home');
  }

  const handleSubmit = () => {
    console.log('form submitted');
  }

  return (
    <div className="container">
    <h3>Profile Page</h3>
    <div>
      <img src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" alt="profile picture" height="100px" width="100px"/>
    </div>
    <p>
      <a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
        Change Profile Picture
      </a>
    </p>
    <div class="collapse" id="collapseExample">
      <div class="card card-body">
        <div class="input-group">
          <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" />
        </div>
      </div>
    </div>
    <div>{user.first_name} {user.last_name}</div>
    <div>Bio: {user.bio}</div>
    <div>{user.email}</div>
    
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Edit Demographics</label>
        <input required type="text" class="form-control" placeholder="First Name" />
        <input required type="text" class="form-control" placeholder="Last Name" />
        <textarea className="form-control" rows="4" placeholder="Bio"></textarea>
        <input required type="text" className="form-control" placeholder="Email" />
        <label className="form-label">Edit username & password</label>
        <input required type="text" class="form-control" placeholder="username" />
        <input required type="text" class="form-control" placeholder="password" />
      </div>
      <button onClick={handleCancel}type="button" className="btn btn-primary">Cancel</button>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
    </div>
  );
}

export default ProfilePage;
