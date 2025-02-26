// index.js
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Auth/UserContext';
import Dashboard from './dashboard'

function Index() {
  const userData = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // if (!userData) {
    //   navigate('/login'); // Redirect to login if not authenticated
    // }
  }, [userData, navigate]);

  if (!userData) {
    return null; // Prevent rendering if user is not logged in
  }

  return (
    <>
    <Dashboard/>
    </>
  );
}

export default Index;
