import React from 'react';
import { Container, Typography, Box, Button, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../components/Navbar';
import { Link as RouterLink } from 'react-router-dom';

const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  textAlign: 'center',
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
  color: theme.palette.common.white,
}));

const FeatureSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  margin: theme.spacing(4, 0),
}));

const CodeBlock = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[900],
  color: theme.palette.common.white,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  fontFamily: 'monospace',
  whiteSpace: 'pre-wrap',
  overflowX: 'auto',
}));

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Mothership
          </Typography>
          <Typography variant="h5" component="p" paragraph>
            Your all-in-one platform for seamless development environments. Launch, manage, and collaborate on projects with ease.
          </Typography>
          <Button component={RouterLink} to="/signup" variant="contained" color="secondary" size="large">
            Get Started
          </Button>
        </Container>
      </HeroSection>

      <Container maxWidth="lg">
        <FeatureSection elevation={3}>
          <Typography variant="h4" component="h2" gutterBottom align="center">
            How It Works
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                1. Define Your Environment
              </Typography>
              <Typography paragraph>
                Create a simple `docker-compose.yml` file to define the services your application needs. Mothership handles the rest.
              </Typography>
              <CodeBlock>
                {`version: '3.8'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
  redis:
    image: redis:alpine`}
              </CodeBlock>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                2. Launch with the CLI
              </Typography>
              <Typography paragraph>
                Use our intuitive command-line tool to launch your environment into the cloud in seconds.
              </Typography>
              <CodeBlock>
                {`$ mship launch -f docker-compose.yml`}
              </CodeBlock>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                3. Connect and Develop
              </Typography>
              <Typography paragraph>
                Mothership provides you with a secure connection URL. Access your running services and start coding.
              </Typography>
              <CodeBlock>
                {`$ mship connect <environment-id>`}
              </CodeBlock>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                4. Terminate with Ease
              </Typography>
              <Typography paragraph>
                When you're done, simply terminate the environment. You only pay for what you use.
              </Typography>
              <CodeBlock>
                {`$ mship terminate <environment-id>`}
              </CodeBlock>
            </Grid>
          </Grid>
        </FeatureSection>
      </Container>
    </>
  );
}

export default HomePage;
