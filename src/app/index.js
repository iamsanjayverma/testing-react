import React, { useContext } from 'react';
import { Link, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, UserContext } from './Auth/UserContext'; // Import UserContext
import Layout from './template/layout';
import Home from './home/index';
import Login from './login/index';
import StorePofile from './store/Profile'
import ProductPofile from './product/ProductsProfile'
import EditProduct from './product/Edit'



// Create a ProtectedRoute component to protect routes
function ProtectedRoute({ children }) {
  const userData = useContext(UserContext);

  // if (!userData) {
  //   return <Navigate to="/login" />; // Redirect to login if user is not authenticated
  // }

  return children;
}

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Use ProtectedRoute to conditionally render Home or Login */}
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="login" element={<Login />} />
            <Route path="stores/:id" element={<StorePofile />} />
            <Route path="stores/:stores_Id/products/:products_Id" element={<ProductPofile />} />
            <Route path="/stores/:stores_Id/products/:products_Id/edit" element={<EditProduct />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

const NoPage = () => {
  return (
    <>
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="text-center">
        {/* Bootstrap Icon */}
        <i className="bi bi-exclamation-triangle display-1 text-danger"></i>
        
        <h1 className="display-4 mt-4">404 - Page Not Found</h1>
        <p className="lead">Oops! The page you're looking for doesn't exist.</p>

        {/* Back to Home Button */}
        <Link to="/" className="btn btn-primary mt-3">
          <i className="bi bi-house-door"></i> Back to Home
        </Link>
      </div>
    </div>
    </>
  )
};



