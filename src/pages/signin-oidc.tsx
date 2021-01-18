import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { signinRedirectCallback } from '../services/auth/user-service';




function SigninOidc() {
  const history = useHistory();
  useEffect(() => {
    async function signinAsync() {
      await signinRedirectCallback();
      history.push('/home');
    }
    signinAsync()
  }, [history]);

  return (
    <div>
      Redirecting...
    </div>
  )
}

export default SigninOidc