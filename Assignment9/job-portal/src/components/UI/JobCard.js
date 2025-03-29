import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Chip, Box, Divider } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const JobCard = ({ job }) => {
  return (
    <Card 
      sx={{ 
        mb: 3, 
        borderRadius: 2,
        overflow: 'visible',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <WorkIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            {job.title}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AttachMoneyIcon color="success" sx={{ mr: 1 }} />
          <Typography variant="subtitle1" color="text.secondary">
            {job.salary}
          </Typography>
        </Box>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          {job.description}
        </Typography>
        
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          Required Skills:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {job.requiredSkills.map((skill, index) => (
            <Chip 
              key={index} 
              label={skill} 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(25, 118, 210, 0.1)', 
                color: 'primary.main',
                borderRadius: '16px',
                fontSize: '0.8rem',
                fontWeight: 500
              }} 
            />
          ))}
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 1 }}>
          <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary">
            {job.lastUpdated}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ p: 3, pt: 0 }}>
        <Button 
          size="medium" 
          href={job.applyLink} 
          target="_blank" 
          variant="contained" 
          color="primary"
          sx={{ 
            borderRadius: '20px',
            boxShadow: 'none',
            px: 3,
            '&:hover': {
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
            }
          }}
        >
          Apply Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;