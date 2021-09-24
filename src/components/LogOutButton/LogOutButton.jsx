import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';

function LogOutButton() {
  const dispatch = useDispatch();
  return (
    <Button
      className="navLink"
      variant="text" 
      small="small"
      onClick={() => dispatch({ type: 'LOGOUT' })}
    >
      Log Out
    </Button>
  );
}

export default LogOutButton;
