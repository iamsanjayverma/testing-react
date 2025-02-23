import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { useUser } from '../Auth/UserContext';


const index = () => {
    const apiKey = process.env.REACT_APP_STORE_SECRET_KEY;
    const apiUrl = process.env.REACT_APP_STORE_API_LOGIN_URL;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


    // console.log(location)

    const handleSubmit = (event) => {
        // Prevent the default form submission
        event.preventDefault();
    
        if (!email || !password) {
            setError('Please fill in all fields.');
            return;
        }
    
        const form_data = { email, password };
    
        // Fetch API request to PHP backend
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ apiKey,
            },
            body: JSON.stringify(form_data),
        })
        .then((response) => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.message || 'Login failed');
                });
            }
            return response.json();
        })
        .then(data => {
            // console.log(data);
   
            // Check if `data` contains the 'message' field and handle accordingly
            if (data.message === 'Login successful') {
                setSuccess(data.message);
                // setAuthenticated(true);
                setTimeout(() => {
                    window.location.href = '/'; // Navigate after a successful login
                }, 2500);
    
                
            } else {
                // setError('Login failed, please try again.');
                setError(data.message);
            }
            // setError('');
        })
        .catch((error) => {
            console.log(error);
            setError(error.message);
            setSuccess('');
        });
    };
    

    return (
        <section>
            <div className="container h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-lg-4 col-sm-6">
                        <form onSubmit={handleSubmit} className="border p-4 rounded bg-light shadow">
                            <h2 className="text-center">Login</h2>
                            {success && <div className="alert alert-success" role="alert">{success}</div>}
                            {error && <div className="alert alert-danger" role="alert">{error}</div>}
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); }} // Correctly update email state
                                    required
                                    aria-describedby="emailHelp"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value); }} // Correctly update password state
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => { setShowPassword(!showPassword); }}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                        {showPassword ? ' Hide' : ' Show'}
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-outline-success w-100">Login</button>

                            
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default index;
