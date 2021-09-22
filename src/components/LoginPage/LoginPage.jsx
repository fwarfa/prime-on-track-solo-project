import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';

function LoginPage() {
  const history = useHistory();

  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
