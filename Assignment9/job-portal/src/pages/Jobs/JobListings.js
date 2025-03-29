import React, { useState } from 'react';
import { Container, Typography, Box, Grid, TextField, InputAdornment, Divider } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import JobCard from '../../components/UI/JobCard';
import { jobPosts } from '../../data';

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter jobs based on search term
  const filteredJobs = jobPosts.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (job.requiredSkills && job.requiredSkills.some(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Job Listings
        </Typography>
        <Typography variant="body1" paragraph>
          Browse through our current job openings and find your next career opportunity.
        </Typography>
        
        <Box sx={{ mb: 4, mt: 2 }}>
          <TextField
            fullWidth
            placeholder="Search jobs by title, description, or skills..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        <Divider sx={{ mb: 4 }} />
        
        <Typography variant="subtitle1" gutterBottom>
          Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
        </Typography>
        
        <Grid container spacing={3}>
          {filteredJobs.map(job => (
            <Grid item xs={12} key={job.id}>
              <JobCard job={job} />
            </Grid>
          ))}
          
          {filteredJobs.length === 0 && (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No jobs found matching your search criteria.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search terms or browse all available positions.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default JobListings;