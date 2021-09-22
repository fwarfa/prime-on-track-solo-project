import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Material UI Imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';

function ProfilePage() {
  const history = useHistory();
  const user = useSelector(store => store.user);

  // let profileObject = {
  //   firstName: '',
  //   lastName: '',
  //   bio: '',
  //   email: '',
  //   profileImageUrl: '',
  //   username: '',
  //   password: ''
  // }

  // const [profileUpdate, setProfileUpdate] = useState(profileObject);

  const handleCancel = () => {
    history.push('/home');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('form submitted');
  }

  return (
    <div>
    <Typography variant="h4">Profile Page</Typography>
    <Button style={{marginRight: 10}} variant="contained" size="small" >Change Profile Picture</Button>
    <br />
    <div>{user.first_name} {user.last_name}</div>
    <div>Bio: {user.bio}</div>
    <div>{user.email}</div>
    
    <form onSubmit={handleSubmit}>
        <InputLabel >Edit Demographics</InputLabel>
        <TextField 
          placeholder="First Name" 
          style={{marginTop: 10}} 
          fullWidth 
          name="fistName" 
          label="First Name" 
          variant="outlined" 
          size="small" 
        />
        <TextField 
          placeholder="Last Name" 
          style={{marginTop: 10}} 
          fullWidth 
          name="lastName" 
          label="Last Name" 
          variant="outlined" 
          size="small" 
        />
        <TextField 
          placeholder="Bio" 
          style={{marginTop: 10}} 
          fullWidth 
          name="bio" 
          label="Bio" 
          variant="outlined" 
          size="small" 
        />
        <TextField 
            placeholder="Email" 
            style={{marginTop: 10}} 
            fullWidth 
            name="email" 
            label="Email" 
            variant="outlined" 
            size="small" 
          />

        <InputLabel>Edit username & password</InputLabel>
        <TextField 
          placeholder="username" 
          style={{marginTop: 10}} 
          fullWidth 
          name="username" 
          label="username" 
          variant="outlined" 
          size="small" 
          />
         <TextField 
          placeholder="password" 
          style={{marginTop: 10}} 
          fullWidth 
          name="password" 
          label="username" 
          variant="outlined" 
          size="small" 
          type="password"
          />
        <Button style={{marginRight: 10}} variant="contained" size="small" onClick={handleCancel}type="button">Cancel</Button>
        <Button style={{marginRight: 10}} variant="contained" size="small" type="submit">Save</Button>
      </form>
    </div>
  );
}

export default ProfilePage;
