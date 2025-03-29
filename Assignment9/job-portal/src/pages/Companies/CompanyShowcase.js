import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
import { companies } from '../../data';

const CompanyShowcase = () => {
  const [displayCompanies, setDisplayCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend URL where images are stored
  const BACKEND_URL = 'http://localhost:8000';

  useEffect(() => {
    setDisplayCompanies(companies);
    setLoading(false);
  }, []);

  // Function to get image filename based on company name
  const getImageFilename = (companyName) => {
    // Extracting the first word only, then converting to lowercase
    const firstWordOnly = companyName.split(' ')[0].toLowerCase();
    return `${firstWordOnly}.png`;
  };

  if (loading) {
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
          Company Showcase
        </Typography>
        <Typography variant="body1" paragraph>
          Explore our partner companies that are looking for talented professionals like you.
        </Typography>
        
        <Grid container spacing={3}>
          {displayCompanies.map((company) => (
            <Grid item xs={12} sm={6} md={4} key={company.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`${BACKEND_URL}/images/${getImageFilename(company.name)}`}
                  alt={company.name}
                  onError={(e) => {
                    console.log(`Image failed to load: ${e.target.src}`);
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=random&size=300`;
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {company.name}
                  </Typography>
                  <Typography>
                    {company.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default CompanyShowcase;