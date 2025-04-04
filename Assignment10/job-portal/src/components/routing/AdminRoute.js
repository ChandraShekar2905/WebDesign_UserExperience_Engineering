import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { user } = useSelector((state) => state.auth);
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (user.type !== 'admin') {
    return <Navigate to="/" />;
  }
  
  return <Outlet />;
};

export default AdminRoute;