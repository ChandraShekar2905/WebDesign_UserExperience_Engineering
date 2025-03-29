import { Navigate }  from 'react-router-dom';
import  { useAuth }  from '../context/AuthContext';

// Function to check if the user is authenticated
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };
  
  // Higher-order component to protect routes that require authentication

  
  export const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();
    
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    
    return children;
  };
  
  