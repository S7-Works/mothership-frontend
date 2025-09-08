import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getLogs } from '../services/ApiService'; // We will create this function
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import Navbar from '../components/Navbar';

function LogsPage() {
  const { id } = useParams();
  const [logs, setLogs] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getLogs(token, id);
        setLogs(data.logs);
      } catch (err) {
        setError('Failed to fetch logs.');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [token, id]);

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4">Logs for {id}</Typography>
        </Box>
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        <Box component="pre" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', backgroundColor: '#f5f5f5', p: 2 }}>
          {logs}
        </Box>
      </Container>
    </>
  );
}

export default LogsPage;
