import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About Our Job Portal
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our job portal, a platform dedicated to connecting talented professionals with 
          leading companies across various industries. Our mission is to simplify the job search 
          process and help both job seekers and employers find their perfect match.
        </Typography>
        <Typography variant="body1" paragraph>
          Established in 2023, we have quickly grown to become a trusted resource for career 
          opportunities and professional development. Our team of experienced recruiters and 
          career advisors work tirelessly to ensure that we provide the most relevant and 
          high-quality job listings.
        </Typography>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          What We Offer
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                For Job Seekers
              </Typography>
              <Typography variant="body2">
                Access to exclusive job opportunities, personalized job recommendations, 
                career resources, and direct connections with hiring managers.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                For Employers
              </Typography>
              <Typography variant="body2">
                Access to a pool of qualified candidates, advanced filtering options, 
                employer branding opportunities, and dedicated recruitment support.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Our Expertise
              </Typography>
              <Typography variant="body2">
                Specialization across tech, marketing, design, data science, customer support, 
                and project management sectors with industry-specific insights.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Our Values
        </Typography>
        <Typography variant="body1" paragraph>
          We believe in transparency, equality, and continuous improvement. Our platform is 
          designed to provide equal opportunities for all professionals regardless of their 
          background or experience level. We are committed to creating a diverse and inclusive 
          job marketplace where talent is the only currency that matters.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;