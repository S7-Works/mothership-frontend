import React from 'react';
import { Container, Typography, Box, Button, Paper, Grid, Card, CardContent, CardHeader, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../components/Navbar';
import { Link as RouterLink } from 'react-router-dom';

const tiers = [
  {
    title: 'Developer',
    price: '10',
    description: [
      '1 vCPU',
      '2 GB Memory',
      '40 GB SSD Storage',
      '2 TB Data Transfer',
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    price: '20',
    description: [
        '2 vCPUs',
        '4 GB Memory',
        '80 GB SSD Storage',
        '4 TB Data Transfer',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Business',
    price: '40',
    description: [
        '4 vCPUs',
        '8 GB Memory',
        '160 GB SSD Storage',
        '5 TB Data Transfer',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];

function PricingPage() {
  return (
    <>
      <Navbar />
      <Container maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Pricing
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Simple, transparent pricing. No hidden fees.
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    component={RouterLink}
                    to="/signup"
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default PricingPage;
