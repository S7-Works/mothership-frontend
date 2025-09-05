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
    const composeContent = "version: '3.8'\nservices:\n  web:\n    image: nginx:latest\n    ports:\n      - '8080:80'";
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