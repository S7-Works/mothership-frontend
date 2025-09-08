import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchEnvironments, terminateEnvironment, createEnvironment } from '../services/ApiService';
import { Button, Container, Typography, Box, CircularProgress, Card, CardContent, CardActions, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Navbar from '../components/Navbar';

function DashboardPage() {
  const [environments, setEnvironments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  const getEnvs = async () => {
    try {
      setLoading(true);
      const data = await fetchEnvironments(token);
      setEnvironments(data);
    } catch (err) {
      setError('Failed to fetch environments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEnvs();
  }, [token]);

  const handleLaunch = async () => {
    // In a real implementation, this would open a file dialog
    // to select a docker-compose.yml file.
    import React from 'react';
import { Container, Typography, Box, Button, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../components/Navbar';

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

function DashboardPage() {
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
          <Button variant="contained" color="secondary" size="large">
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

export default DashboardPage;

    try {
        await createEnvironment(token, { compose_content: composeContent });
        getEnvs(); // Refresh the list
    } catch (err) {
        setError('Failed to launch new environment.');
    }
  };

  const handleTerminate = async (instanceId) => {
    if (window.confirm('Are you sure you want to terminate this environment?')) {
        try {
            await terminateEnvironment(token, instanceId);
            getEnvs(); // Refresh the list
        } catch (err) {
            setError('Failed to terminate environment.');
        }
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4">Environments Dashboard</Typography>
        </Box>
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        {environments.map((env) => (
          <Card key={env.instance_id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{env.instance_id}</Typography>
              <Typography>Status: {env.status}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">Connect</Button>
              <Button size="small" color="error" onClick={() => handleTerminate(env.instance_id)}>Terminate</Button>
            </CardActions>
          </Card>
        ))}
        <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={handleLaunch}>
          <AddIcon />
        </Fab>
      </Container>
    </>
  );
}

export default DashboardPage;