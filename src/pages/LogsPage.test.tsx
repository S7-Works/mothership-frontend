import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import LogsPage from './LogsPage';

jest.mock('../services/ApiService', () => ({
  getLogs: jest.fn().mockResolvedValue({ logs: 'Log line 1\nLog line 2' }),
}));

test('renders logs page with logs', async () => {
  render(
    <MemoryRouter initialEntries={['/environments/test-123/logs']}>
      <AuthProvider>
        <Routes>
          <Route path="/environments/:id/logs" element={<LogsPage />} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );

  expect(screen.getByText(/Logs for test-123/i)).toBeInTheDocument();
  // Use findByText to wait for the async call to complete
  expect(await screen.findByText(/Log line 1/i)).toBeInTheDocument();
});

