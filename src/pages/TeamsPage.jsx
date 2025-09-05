import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchOrgsAndTeams } from '../services/ApiService';
import { Container, Typography, Box, CircularProgress, Card, CardContent } from '@mui/material';
import Navbar from '../components/Navbar';

function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const getTeams = async () => {
      try {
        const data = await fetchOrgsAndTeams(token);
        setTeams(data);
      } catch (err) {
        setError('Failed to fetch teams.');
      } finally {
        setLoading(false);
      }
    };
    getTeams();
  }, [token]);

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4">Your Teams and Organizations</Typography>
        </Box>
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        {teams.map((team) => (
          <Card key={team.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">{team.name}</Typography>
              <Typography>Role: {team.role}</Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </>
  );
}

export default TeamsPage;