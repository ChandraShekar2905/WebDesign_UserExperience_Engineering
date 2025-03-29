// Improved Navbar.js component
import React, { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useScrollTrigger,
  Slide
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Hide navbar on scroll down
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Companies', path: '/companies' },
    { name: 'Contact', path: '/contact' }
  ];

  // Checking if a nav item is active
  const isActive = (path) => location.pathname === path;

  // Mobile drawer content
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" component="div" sx={{ my: 2, fontWeight: 700, letterSpacing: '1px' }}>
        JOB PORTAL
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.name} 
            component={Link} 
            to={item.path}
            sx={{ 
              textAlign: 'center',
              color: isActive(item.path) ? 'primary.main' : 'inherit',
              bgcolor: isActive(item.path) ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
              textDecoration: 'none',
              py: 1
            }}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
        {currentUser && (
          <ListItem 
            button
            onClick={handleLogout}
            sx={{ textAlign: 'center', py: 1 }}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <HideOnScroll>
      <AppBar position="sticky" elevation={1} sx={{ bgcolor: 'white', color: 'text.primary' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Mobile hamburger icon */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Logo - visible on all screens */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                flexGrow: { xs: 1, md: 0 },
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'primary.main',
                textDecoration: 'none',
                display: 'flex'
              }}
            >
              JOB PORTAL
            </Typography>

            {/* Desktop navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={Link}
                  to={item.path}
                  sx={{ 
                    my: 2, 
                    mx: 1,
                    color: isActive(item.path) ? 'primary.main' : 'text.primary',
                    fontWeight: isActive(item.path) ? 600 : 400,
                    position: 'relative',
                    '&::after': isActive(item.path) ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 5,
                      left: '25%',
                      width: '50%',
                      height: '2px',
                      bgcolor: 'primary.main'
                    } : {},
                    '&:hover': {
                      bgcolor: 'rgba(25, 118, 210, 0.04)'
                    }
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>

            {/* Logout button - always visible */}
            <Box sx={{ flexGrow: 0 }}>
              {currentUser ? (
                <Button 
                  onClick={handleLogout} 
                  color="primary" 
                  variant="outlined"
                  sx={{ 
                    display: { xs: 'none', md: 'block' },
                    borderRadius: '20px'
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button 
                  component={Link} 
                  to="/login" 
                  color="primary"
                  variant="contained"
                  sx={{ 
                    display: { xs: 'none', md: 'block' },
                    borderRadius: '20px'
                  }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>

        {/* Mobile navigation drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240 
            },
          }}
        >
          {drawer}
        </Drawer>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;