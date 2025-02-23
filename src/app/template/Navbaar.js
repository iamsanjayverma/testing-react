// Navbaar.js
import React, { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../Auth/UserContext'; // Import the UserContext

function Navbaar() {
  const userData = useContext(UserContext); // Get the userData from context
  const navigate = useNavigate();
  // const { setUserData } = useContext(UserContext); // Assuming you have a setter in context

  const handleSignout = () => {
    fetch('https://admin.kesho.in/api/logout_session.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer my-secret',
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Logged out successfully") {
          // Clear user data from context
          // setUserData(null); // Update context to reflect user is logged out
          // Redirect the user to the login page or homepage
          navigate('/login');
          window.location.reload(); 
        } else {
          // Handle any errors here
          console.error("Error logging out");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <nav className="navbar navbar-light bg-light p-3">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src='/img/kesho-logo.png' alt="Kesho Logo" />
        </a>
        <div className="navbar-text">
          {userData ? (
            <>
              Welcome, {userData.username} <br />
              {userData.email}
              <button onClick={handleSignout} className="btn btn-link">Sign out</button>
            </>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbaar;
