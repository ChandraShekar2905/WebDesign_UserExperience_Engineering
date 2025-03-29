import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in when the app loads
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function
const login = async (email, password) => {
  try {
    console.log('Attempting login with:', email);
    
    // Using Assignment 8 backend with MongoDB
    const response = await axios.post('http://localhost:8000/api/auth/login', {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Login response:', response.data);
    
    if (!response.data) {
      throw new Error('Invalid credentials');
    }

    setCurrentUser(response.data.user);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};
  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};