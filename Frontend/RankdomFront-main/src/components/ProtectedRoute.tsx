import { Navigate } from 'react-router-dom';

// Simulating an authentication function (you could replace this with your actual logic)
const isAuthenticated = () => {
  // We need abids token ongo bongo, but it works by simply moving is ! from isAuthenticated atm.
  return localStorage.getItem('authToken') !== null;
};

// ProtectedRoute component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/Login" />;
  }

  // If authenticated, render the protected route
  return children;
};

export default ProtectedRoute;
