import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Navbar from './components/Navigation/Navbar';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import JobListings from './pages/Jobs/JobListings';
import CompanyShowcase from './pages/Companies/CompanyShowcase';
import Contact from './pages/Contact/Contact';
import Login from './pages/Auth/Login';

// Creating a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32',
      light: '#60ad5e',
      dark: '#005005',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff8f00',
      light: '#ffc046',
      dark: '#c56000',
      contrastText: '#000000',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    }
  },
});

// Navigation wrapper that conditionally shows the Navbar
const NavigationWrapper = ({ children }) => {
  // Get current location to check if we're on the login page
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  
  return (
    <>
      {!isLoginPage && <Navbar />}
      {children}
    </>
  );
};

// Custom route guard component
const RequireAuth = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <NavigationWrapper>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
              <Route path="/about" element={<RequireAuth><About /></RequireAuth>} />
              <Route path="/jobs" element={<RequireAuth><JobListings /></RequireAuth>} />
              <Route path="/companies" element={<RequireAuth><CompanyShowcase /></RequireAuth>} />
              <Route path="/contact" element={<RequireAuth><Contact /></RequireAuth>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </NavigationWrapper>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;