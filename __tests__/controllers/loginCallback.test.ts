import { Request, Response } from 'express';
import { loginCallback } from '@/controllers';
import { getTokens } from '@/utils/kcApi';
import { getUserInfo, normalizeUser } from '@/utils/user';
import debug from '@/utils/debug';

// Mock the config values
jest.mock('@/config', () => ({
  COOKIE_DOMAIN: 'localhost',
  FRONTEND_URL: 'http://localhost:3000',
}));

// Mock dependencies
jest.mock('@/utils/kcApi');
jest.mock('@/utils/user');
jest.mock('@/utils/debug');

// Test suite for the loginCallback controller
describe('loginCallback controller', () => {
  // Test case: should redirect to frontend URL with refresh token
  it('should redirect to frontend URL with refresh token', async () => {
    const req = {
      query: { code: 'mocked_code' },
      cookies: { post_login_redirect_url: 'mocked_post_login_redirect_url' },
    } as unknown as Request;
    const res = {
      cookie: jest.fn().mockReturnThis(),
      redirect: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const tokens = {
      access_token: 'mocked_access_token',
      refresh_token: 'mocked_refresh_token',
      refresh_expires_in: 3600,
    };

    (getTokens as jest.Mock).mockResolvedValueOnce(tokens);

    const requestHandler = loginCallback();
    await requestHandler(req, res);

    expect(res.cookie).toHaveBeenCalledWith('refresh_token', 'mocked_refresh_token', {
      httpOnly: true,
      secure: true,
      domain: 'localhost',
    });
    expect(res.redirect).toHaveBeenCalledWith(
      `http://localhost:3000?refresh_expires_in=3600&post_login_redirect_url=mocked_post_login_redirect_url`,
    );
  });

  // Test case: should handle errors during token retrieval
  it('should handle errors during token retrieval', async () => {
    const req = {
      query: { code: 'mocked_code' },
      cookies: { post_login_redirect_url: 'mocked_post_login_redirect_url' },
    } as unknown as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;
    const error = new Error('Error retrieving tokens');

    (getTokens as jest.Mock).mockRejectedValueOnce(error);

    const requestHandler = loginCallback();
    await requestHandler(req, res);

    expect(debug.controllerError).toHaveBeenCalledWith('loginCallback', error);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: error.message });
  });

  // Test case: should execute afterUserLogin callback if provided
  it('should execute afterUserLogin callback if provided', async () => {
    const req = {
      query: { code: 'mocked_code' },
      cookies: { post_login_redirect_url: 'mocked_post_login_redirect_url' },
    } as unknown as Request;
    const res = {
      cookie: jest.fn().mockReturnThis(),
      redirect: jest.fn().mockReturnThis(),
    } as unknown as Response;
    const options = {
      afterUserLogin: jest.fn(),
    };

    const tokens = {
      access_token: 'mocked_access_token',
      refresh_token: 'mocked_refresh_token',
      refresh_expires_in: 3600,
    };

    (getTokens as jest.Mock).mockResolvedValueOnce(tokens);
    const user = { name: 'John Doe' };

    // Mocking getUserInfo and normalizeUser for full control over their outputs
    (getUserInfo as jest.Mock).mockReturnValue(user);
    (normalizeUser as jest.Mock).mockReturnValue(user);

    const requestHandler = loginCallback(options);
    await requestHandler(req, res);

    expect(options.afterUserLogin).toHaveBeenCalledWith(user);
    expect(debug.afterUserLogin).toHaveBeenCalledWith(user);
  });
});
