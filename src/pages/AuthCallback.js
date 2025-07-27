// src/pages/AuthCallback.js
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const { isLoading, error, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard'); 
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (error) return <div>Oops! {error.message}</div>;
  return <div>Loading...</div>;
};

export default AuthCallback;
