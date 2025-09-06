import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';

function CliLoginPage() {
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const pollUrl = params.get('pollUrl');

        if (token && pollUrl) {
            // In a real implementation, we would make a POST request
            // to the pollUrl with the token.
            // For now, we'll just log it.
            console.log(`Sending token to ${pollUrl}`);
        }
    }, [location]);

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Authentication Successful!
                </Typography>
                <Typography variant="body1">
                    You can now return to your terminal.
                </Typography>
            </Box>
        </Container>
    );
}

export default CliLoginPage;
