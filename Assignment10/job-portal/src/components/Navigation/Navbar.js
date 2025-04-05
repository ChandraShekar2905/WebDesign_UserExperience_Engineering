import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
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
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    // Set navigation items based on user type
    let roleSpecificLinks = [];
    
    if (user && user.type === 'admin') {
      roleSpecificLinks = [
        { name: 'EMPLOYEES', path: '/admin/employees' },
        { name: 'ADD JOB', path: '/admin/add-job' }
      ];
    } else if (user && user.type === 'employee') {
      roleSpecificLinks = [
        { name: 'HOME', path: '/home' },
        { name: 'ABOUT', path: '/about' },
        { name: 'CONTACT', path: '/contact' },
        { name: 'JOBS', path: '/jobs' },
        { name: 'COMPANIES', path: '/companies' }
      ];
    }
    
    // Set the nav items - no common links anymore
    setNavItems(roleSpecificLinks);
  }, [user]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

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
              bgcolor: isActive(item.path) ? 'rgba(46, 125, 50, 0.08)' : 'transparent',
              textDecoration: 'none',
              py: 1
            }}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
        {user && (
          <ListItem 
            button
            onClick={handleLogout}
            sx={{ textAlign: 'center', py: 1 }}
          >
            <ListItemText primary="LOGOUT" />
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
                      bgcolor: 'rgba(46, 125, 50, 0.04)'
                    }
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>

            {/* User info and logout button */}
            <Box sx={{ flexGrow: 0 }}>
              {user ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
                    {user.fullName || user.name} ({user.type})
                  </Typography>
                  <Button 
                    onClick={handleLogout} 
                    color="primary" 
                    variant="outlined"
                    sx={{ 
                      display: { xs: 'none', md: 'block' },
                      borderRadius: '20px'
                    }}
                  >
                    LOGOUT
                  </Button>
                </Box>
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
                  LOGIN
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