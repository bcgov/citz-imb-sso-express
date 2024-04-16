import { Request, Response } from 'express';
import { logout } from '@/controllers';
import { getLogoutURL } from '@/utils/authUrls';
import debug from '@/utils/debug';
import { getUserInfo, normalizeUser } from '@/utils/user';

// Mock the config values
jest.mock('@/config', () => ({
  COOKIE_DOMAIN: 'localhost',
}));

// Mock dependencies
jest.mock('@/utils/authUrls');
jest.mock('@/utils/user');
jest.mock('@/utils/debug');

// Test suite for the logout controller
describe('logout controller', () => {
  // Test case: should redirect to logout URL if id_token exists
  it('should redirect to logout URL if id_token exists', async () => {
    const req = {
      query: { id_token: 'mocked_id_token' },
    } as unknown as Request;
    const res = {
      redirect: jest.fn(),
    } as unknown as Response;

    (getLogoutURL as jest.Mock).mockReturnValueOnce('mocked_logout_url');

    const requestHandler = logout();
    await requestHandler(req, res);

    expect(res.redirect).toHaveBeenCalledWith('mocked_logout_url');
  });

  // Test case: should return 401 if id_token is missing
  it('should return 401 if id_token is missing', async () => {
    const req = {
      query: {},
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const requestHandler = logout();
    await requestHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('id_token query param required');
  });

  // Test case: should handle errors during logout process
  it('should handle errors during logout process', async () => {
    const req = {
      query: { id_token: 'mocked_id_token' },
    } as unknown as Request;
    const res = {
      redirect: jest.fn(),
      json: jest.fn(),
    } as unknown as Response;
    const error = new Error('Error during logout');

    (getLogoutURL as jest.Mock).mockImplementationOnce(() => {
      throw error;
    });

    const requestHandler = logout();
    await requestHandler(req, res);

    expect(debug.controllerError).toHaveBeenCalledWith('logout', error);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: error.message });
  });

  // Test case: should execute afterUserLogout callback if provided
  it('should execute afterUserLogout callback if provided', async () => {
    const req = {
      query: { id_token: 'mocked_id_token' },
    } as unknown as Request;
    const res = {
      redirect: jest.fn(),
    } as unknown as Response;
    const options = {
      afterUserLogout: jest.fn(),
    };

    const user = { name: 'John Doe' };
    (getUserInfo as jest.Mock).mockReturnValue(user);
    (normalizeUser as jest.Mock).mockReturnValue(user);

    (getLogoutURL as jest.Mock).mockReturnValueOnce('mocked_logout_url');

    const requestHandler = logout(options);
    await requestHandler(req, res);

    expect(options.afterUserLogout).toHaveBeenCalledWith(user);
    expect(debug.afterUserLogout).toHaveBeenCalled();
  });
});
