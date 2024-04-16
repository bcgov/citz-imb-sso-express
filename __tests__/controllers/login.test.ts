import { Request, Response } from 'express';
import { login } from '@/controllers';
import { getLoginURL } from '@/utils/authUrls';
import debug from '@/utils/debug';

// Mock the config values
jest.mock('@/config', () => ({
  FRONTEND_URL: 'http://localhost:3000',
  COOKIE_DOMAIN: 'localhost',
}));

// Mock dependencies
jest.mock('@/utils/authUrls');
jest.mock('@/utils/debug');

// Test suite for the login controller
describe('login controller', () => {
  // Test case: should redirect to login URL if no token exists
  it('should redirect to login URL if no token exists', async () => {
    const req = {
      query: { idp: 'idir', post_login_redirect_url: 'http://localhost:3000' },
      token: null, // Simulate no token being present
    } as unknown as Request;
    const res = {
      cookie: jest.fn().mockReturnThis(),
      redirect: jest.fn().mockReturnThis(),
    } as unknown as Response;

    (getLoginURL as jest.Mock).mockReturnValueOnce('mocked_login_url');

    const requestHandler = login();
    await requestHandler(req, res);

    expect(res.cookie).toHaveBeenCalledWith('post_login_redirect_url', 'http://localhost:3000', {
      domain: 'localhost',
    });
    expect(res.redirect).toHaveBeenCalledWith('mocked_login_url');
  });

  // Test case: should redirect directly if token exists
  it('should redirect directly if token exists', async () => {
    const req = {
      query: {},
      token: 'existing_token', // Simulate token being present
    } as unknown as Request;
    const res = {
      redirect: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const requestHandler = login();
    await requestHandler(req, res);

    expect(res.redirect).toHaveBeenCalledWith('');
  });

  // Test case: should handle errors properly
  it('should handle errors properly', async () => {
    const req = {
      query: { idp: 'idir', post_login_redirect_url: 'http://localhost:3000' },
    } as unknown as Request;
    const res = {
      cookie: jest.fn().mockReturnThis(),
      redirect: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;
    const error = new Error('Failed to generate login URL');

    (getLoginURL as jest.Mock).mockImplementationOnce(() => {
      throw error;
    });

    const requestHandler = login();
    await requestHandler(req, res);

    expect(debug.controllerError).toHaveBeenCalledWith('login', error);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: error.message });
  });
});
