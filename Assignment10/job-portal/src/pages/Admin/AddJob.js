import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createJob } from '../../store/slices/jobSlice';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Grid, 
  Chip,
  Stack,
  Alert,
  CircularProgress
} from '@mui/material';

const AddJob = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.jobs);
  
  const [formData, setFormData] = useState({
    companyName: '',
    title: '',
    description: '',
    salary: '',
    requiredSkills: []
  });
  const [skill, setSkill] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleAddSkill = () => {
    if (skill.trim() !== '') {
      setFormData({
        ...formData,
        requiredSkills: [...formData.requiredSkills, skill.trim()]
      });
      setSkill('');
    }
  };
  
  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      requiredSkills: formData.requiredSkills.filter(s => s !== skillToRemove)
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await dispatch(createJob(formData));
    
    if (!result.error) {
      setSuccess(true);
      setFormData({
        companyName: '',
        title: '',
        description: '',
        salary: '',
        requiredSkills: []
      });
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  };
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Job
        </Typography>
        
        <Paper sx={{ p: 3 }}>
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Job created successfully!
            </Alert>
          )}
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. $80,000 - $100,000"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    label="Add Required Skill"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                  />
                  <Button 
                    variant="outlined" 
                    onClick={handleAddSkill} 
                    sx={{ ml: 1, height: '56px' }}
                  >
                    Add
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Required Skills:
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                  {formData.requiredSkills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      onDelete={() => handleRemoveSkill(skill)}
                    />
                  ))}
                  {formData.requiredSkills.length === 0 && (
                    <Typography variant="body2" color="text.secondary">
                      No skills added yet
                    </Typography>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Create Job'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default AddJob;