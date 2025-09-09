import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Link } from '@mui/material';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { token, logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link component={RouterLink} to="/" color="inherit" underline="none">
                        Mothership
                    </Link>
                </Typography>
                {token ? (
                    <>
                        <Button color="inherit" component={RouterLink} to="/dashboard">Dashboard</Button>
                        <Button color="inherit" component={RouterLink} to="/deployments">Deployments</Button>
                        <Button color="inherit" component={RouterLink} to="/teams">Teams</Button>
                        <Button color="inherit" onClick={logout}>Logout</Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={RouterLink} to="/pricing">Pricing</Button>
                        <Button color="inherit" component={RouterLink} to="/login">Login</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
