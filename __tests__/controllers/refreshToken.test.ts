import { Request, Response } from 'express';
import { refreshToken } from '@/controllers';
import { getNewTokens } from '@/utils/kcApi';
import debug from '@/utils/debug';

// Mock the config values
jest.mock('@/config', () => ({
  FRONTEND_URL: 'http://localhost:3000',
  COOKIE_DOMAIN: 'localhost',
}));

// Mock the config values
jest.mock('@/utils/kcApi');
jest.mock('@/utils/debug');

// Test suite for the refreshToken controller
describe('refreshToken controller', () => {
  // Test case: should return new tokens if refresh token exists
  it('should return new tokens if refresh token exists', async () => {
    const req = {
      cookies: { refresh_token: 'valid_refresh_token' },
    } as unknown as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    const expectedTokens = {
      access_token: 'new_access_token',
      refresh_token: 'new_refresh_token',
    };

    (getNewTokens as jest.Mock).mockResolvedValueOnce(expectedTokens);

    const requestHandler = refreshToken();
    await requestHandler(req, res);

    expect(res.json).toHaveBeenCalledWith(expectedTokens);
  });

  // Test case: should handle errors during token renewal
  it('should handle errors during token renewal', async () => {
    const req = {
      cookies: { refresh_token: 'valid_refresh_token' },
    } as unknown as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;
    const error = new Error('Token renewal failed');

    (getNewTokens as jest.Mock).mockRejectedValueOnce(error);

    const requestHandler = refreshToken();
    await requestHandler(req, res);

    expect(res.json).toHaveBeenCalledWith({ success: false, error: error.message });
  });

  // Test case: should return 401 if refresh token is missing or empty
  it('should return 401 if refresh token is missing or empty', async () => {
    const req = {
      cookies: { refresh_token: '' }, // Testing with an empty string
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    const requestHandler = refreshToken();
    await requestHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(debug.unauthorizedTokenError).toHaveBeenCalledWith('');
    expect(res.send).toHaveBeenCalledWith('Cookies must include refresh_token.');
  });
});
