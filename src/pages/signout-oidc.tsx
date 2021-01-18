import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { signoutRedirectCallback } from '../services/auth/user-service';


function SignoutOidc() {
  const history = useHistory()
  useEffect(() => {
    async function signoutAsync() {
      await signoutRedirectCallback();
      history.push('/home')
    }
    signoutAsync()
  }, [history]);

  return (
    <div>
      Redirecting...
    </div>
  )
}

export default SignoutOidc