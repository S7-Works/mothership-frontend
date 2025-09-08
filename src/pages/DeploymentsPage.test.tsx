import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import DeploymentsPage from './DeploymentsPage';
import * as ApiService from '../services/ApiService';

jest.mock('../services/ApiService');
jest.mock('../context/AuthContext', () => ({
  ...jest.requireActual('../context/AuthContext'),
  useAuth: () => ({
    token: 'test-token',
    user: { username: 'testuser' },
  }),
}));



test('renders deployments page and can open and submit the new deployment modal', async () => {
  (ApiService.createDeployment as jest.Mock).mockResolvedValue({});
  
  render(
    <AuthProvider>
      <MemoryRouter>
        <DeploymentsPage />
      </MemoryRouter>
    </AuthProvider>
  );

  await act(async () => {
    fireEvent.click(screen.getByLabelText('add'));
  });

  expect(screen.getByText('New Deployment')).toBeInTheDocument();

  await act(async () => {
    fireEvent.change(screen.getByLabelText(/Subdomain/i), { target: { value: 'test-subdomain' } });
    fireEvent.click(screen.getByRole('button', { name: /Deploy/i }));
  });

  expect(ApiService.createDeployment).toHaveBeenCalledWith('test-token', { subdomain: 'test-subdomain' });
});
