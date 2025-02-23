// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create a UserContext
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = process.env.REACT_APP_STORE_SECRET_KEY;
  const apiUrl = process.env.REACT_APP_STORE_API_LOGIN_VIEW_URL;

  const checkAuthentication = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': 'Bearer '+ apiKey,
        },
      });
      const data = await response.json();
      if (data.loggedIn) {
        console.log(data, "ok context")
        setUserData({
          username: data.user.username,
          email: data.user.email,
        });
      } else {
        setUserData(null); // If not logged in, set userData to null
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthentication(); // Check authentication on mount
  }, []);


  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};
