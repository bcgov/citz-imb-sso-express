import request from 'supertest';
import express from 'express';
import authRouter from '@/router';

// Mock the config values
jest.mock('@/config', () => ({
  BACKEND_URL: 'http://localhost:3001',
}));

// Create a basic express app for testing
const app = express();
app.use(authRouter());

// Test suite for authRouter
describe('authRouter', () => {
  // Test case: Router should handle GET /auth/login
  it('should respond to GET /auth/login', async () => {
    const response = await request(app).get('/auth/login');
    expect(response.status).toBeLessThan(500); // Checking for server response without error
  });

  // Test case: Router should handle GET /auth/login/callback
  it('should respond to GET /auth/login/callback', async () => {
    const response = await request(app).get('/auth/login/callback');
    expect(response.status).toBeLessThan(500);
  });

  // Test case: Router should handle GET /auth/logout
  it('should respond to GET /auth/logout', async () => {
    const response = await request(app).get('/auth/logout');
    expect(response.status).toBeLessThan(500);
  });

  // Test case: Router should handle GET /auth/logout/callback
  it('should respond to GET /auth/logout/callback', async () => {
    const response = await request(app).get('/auth/logout/callback');
    expect(response.status).toBeLessThan(500);
  });

  // Test case: Router should handle POST /auth/token
  it('should respond to POST /auth/token', async () => {
    const response = await request(app).post('/auth/token').send({ refreshToken: 'dummyToken' }); // Send a dummy token if needed
    expect(response.status).toBeLessThan(500);
  });
});
