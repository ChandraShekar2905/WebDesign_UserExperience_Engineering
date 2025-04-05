import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // Redirect based on user type
  if (user.type === 'admin') {
    return <Navigate to="/admin/employees" />;
  } else {
    return <Navigate to="/jobs" />;
  }
};

export default ProtectedRoute;