import { Request, Response } from 'express';
import { logoutCallback } from '@/controllers';
import debug from '@/utils/debug';

// Mock the config values
jest.mock('@/config', () => ({
  FRONTEND_URL: 'http://localhost:3000',
}));

// Mock dependencies
jest.mock('@/utils/debug');

// Test suite for the logoutCallback controller
describe('logoutCallback controller', () => {
  // Prepare mock functions
  let req: Partial<Request>;
  let res: Partial<Response>;
  let mockRedirect: jest.Mock;
  let mockJson: jest.Mock;

  beforeEach(() => {
    mockRedirect = jest.fn();
    mockJson = jest.fn();

    req = {};
    res = {
      cookie: jest.fn().mockReturnThis(), // Preserves chaining
      redirect: mockRedirect,
      json: mockJson,
    };
  });

  // Test case: should clear refresh token cookie and redirect to frontend URL
  it('should clear refresh token cookie and redirect to frontend URL', async () => {
    const requestHandler = logoutCallback();
    await requestHandler(req as Request, res as Response);

    expect(res.cookie).toHaveBeenCalledWith('refresh_token', '', { httpOnly: true, secure: true });
    expect(mockRedirect).toHaveBeenCalledWith('http://localhost:3000');
  });

  // Test case: should handle exceptions and respond with JSON error
  it('should handle exceptions and respond with JSON error', async () => {
    // Simulate throwing an error on redirect
    mockRedirect.mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    const requestHandler = logoutCallback();
    try {
      await requestHandler(req as Request, res as Response);
    } catch (error) {
      expect(mockJson).toHaveBeenCalledWith({
        success: false,
        error: 'Unexpected error',
      });
      expect(debug.controllerError).toHaveBeenCalled();
    }
  });
});
