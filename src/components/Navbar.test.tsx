import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Navbar from './Navbar';

test('renders navbar with links', () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    </MemoryRouter>
  );

  expect(screen.getByText(/Mothership/i)).toBeInTheDocument();
  expect(screen.getByText(/Environments/i)).toBeInTheDocument();
  expect(screen.getByText(/Teams/i)).toBeInTheDocument();
  expect(screen.getByText(/Logout/i)).toBeInTheDocument();
});
