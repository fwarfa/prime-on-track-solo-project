import React from 'react';
import { useDispatch } from 'react-redux';
import {Button} from "@material-ui/core";

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
