import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { store } from './store';

// Components
import Navbar from './components/Navigation/Navbar';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Auth/Login';
import Contact from './pages/Contact/Contact';

// Employee Pages
import JobListings from './pages/Jobs/JobListings';
import CompanyShowcase from './pages/Companies/CompanyShowcase';

// Admin Pages
import EmployeeList from './pages/Admin/EmployeeList';
import AddJob from './pages/Admin/AddJob';

// Protected Routes
import ProtectedRoute from './components/routing/ProtectedRoute';
import AdminRoute from './components/routing/AdminRoute';
import EmployeeRoute from './components/routing/EmployeeRoute';

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

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route element={<React.Fragment><Navbar /><Outlet /></React.Fragment>}>
                <Route path="/" element={<Navigate to="/admin/employees" replace />} />
                <Route path="/admin/employees" element={<EmployeeList />} />
                <Route path="/admin/add-job" element={<AddJob />} />
              </Route>
            </Route>
            
            {/* Employee Routes */}
            <Route element={<EmployeeRoute />}>
              <Route element={<React.Fragment><Navbar /><Outlet /></React.Fragment>}>
                <Route path="/" element={<Navigate to="/jobs" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/jobs" element={<JobListings />} />
                <Route path="/companies" element={<CompanyShowcase />} />
              </Route>
            </Route>
            
            {/* Redirect all other routes to appropriate home based on user type */}
            <Route path="*" element={<ProtectedRoute />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;