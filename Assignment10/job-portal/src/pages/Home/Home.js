import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useSelector(state => state.auth);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Find Your Dream Job Today
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Browse through hundreds of job opportunities and take the next step in your career
        </Typography>
        
        {!user && (
          <Button 
            component={Link} 
            to="/login" 
            variant="contained" 
            size="large" 
            sx={{ mt: 2 }}
          >
            Get Started
          </Button>
        )}
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Job Listings
            </Typography>
            <Typography align="center" paragraph>
              Explore our extensive collection of job listings across various industries and expertise levels.
            </Typography>
            <Button 
              component={Link} 
              to="/jobs" 
              variant="outlined" 
              sx={{ mt: 'auto' }}
            >
              Browse Jobs
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Top Companies
            </Typography>
            <Typography align="center" paragraph>
              Discover industry-leading companies that are looking for talents like you.
            </Typography>
            <Button 
              component={Link} 
              to="/companies" 
              variant="outlined" 
              sx={{ mt: 'auto' }}
            >
              View Companies
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Contact Us
            </Typography>
            <Typography align="center" paragraph>
              Have questions or need assistance? Reach out to our support team.
            </Typography>
            <Button 
              component={Link} 
              to="/contact" 
              variant="outlined" 
              sx={{ mt: 'auto' }}
            >
              Get in Touch
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;