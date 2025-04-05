import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../store/slices/jobSlice';
import { Container, Typography, Box, Grid, TextField, InputAdornment, Divider, CircularProgress, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import JobCard from '../../components/UI/JobCard';

const JobListings = () => {
  const dispatch = useDispatch();
  const { jobs, isLoading, error } = useSelector(state => state.jobs);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);
  
  // Filter jobs based on search term
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (job.requiredSkills && job.requiredSkills.some(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  if (isLoading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Job Listings
        </Typography>
        <Typography variant="body1" paragraph>
          Browse through our current job openings and find your next career opportunity.
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
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
            <Grid item xs={12} key={job._id || job.id}>
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