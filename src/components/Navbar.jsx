import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Link } from '@mui/material';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link component={RouterLink} to="/dashboard" color="inherit" underline="none">
                        Mothership
                    </Link>
                </Typography>
                <Button color="inherit" component={RouterLink} to="/dashboard">Environments</Button>
                <Button color="inherit" component={RouterLink} to="/teams">Teams</Button>
                <Button color="inherit" onClick={logout}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
