import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// import { makeStyles } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';
// import Badge from '@material-ui/core/Badge';

// import { styled } from '@mui/material/styles';
// import Badge from '@mui/material/Badge';
// import Avatar from '@mui/material/Avatar';

// const StyledBadge = styled(Badge)(({ theme }) => ({
//   '& .MuiBadge-badge': {
//     backgroundColor: '#44b700',
//     color: '#44b700',
//     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//     '&::after': {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       borderRadius: '50%',
//       animation: 'ripple 1.2s infinite ease-in-out',
//       border: '1px solid currentColor',
//       content: '""',
//     },
//   },
//   '@keyframes ripple': {
//     '0%': {
//       transform: 'scale(.8)',
//       opacity: 1,
//     },
//     '100%': {
//       transform: 'scale(2.4)',
//       opacity: 0,
//     },
//   },
// }));


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

    {/* <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
    >
      <Avatar alt="Farah" src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" />
    </StyledBadge> */}
    
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
