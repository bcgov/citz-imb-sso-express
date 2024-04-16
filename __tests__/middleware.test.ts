import { Request, Response, NextFunction } from 'express';
import { protectedRoute } from '@/middleware';
import { isJWTValid } from '@/utils/kcApi';
import { getUserInfo, hasAllRoles, hasAtLeastOneRole, normalizeUser } from '@/utils/user';

// Mock utility functions
jest.mock('@/utils/kcApi', () => ({
  isJWTValid: jest.fn(),
  getTokens: jest.fn(),
  getNewTokens: jest.fn(),
}));
jest.mock('@/utils/user', () => ({
  getUserInfo: jest.fn(),
  normalizeUser: jest.fn(),
  hasAllRoles: jest.fn(),
  hasAtLeastOneRole: jest.fn(),
  hasRoles: jest.fn(),
}));

// Mock the config values
jest.mock('@/config', () => ({
  PACKAGE_NAME: 'package_name',
}));

// Test suite for protectedRoute middleware
describe('protectedRoute middleware', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {} as Response;
    next = jest.fn() as NextFunction;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test case: no authorization header
  it('should return 401 if no authorization header is found', async () => {
    // Mocking req.headers to be an empty object
    req.headers = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();

    const middleware = protectedRoute();
    await middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'No authorization header found.' });
  });

  // Test case: invalid token
  it('should return 401 if token is invalid', async () => {
    // Mocking req.headers with an invalid token
    req.headers = { authorization: 'Bearer invalid_token' };
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    (isJWTValid as jest.Mock).mockResolvedValueOnce(false);

    const middleware = protectedRoute();
    await middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Unauthorized: Invalid token, re-log to get a new one.',
    });
  });

  // Test case: user info not found
  it('should return 404 if user info is not found', async () => {
    // Mocking req.headers with a valid token
    req.headers = { authorization: 'Bearer valid_token' };
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    (isJWTValid as jest.Mock).mockResolvedValueOnce(true);
    (getUserInfo as jest.Mock).mockReturnValueOnce(null);

    const middleware = protectedRoute();
    await middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found.' });
  });

  // Test case: user has all required roles
  it('user has all required roles', async () => {
    req.headers = { authorization: 'Bearer valid_token' };
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    (isJWTValid as jest.Mock).mockResolvedValueOnce(true);
    (getUserInfo as jest.Mock).mockReturnValueOnce({ client_roles: ['admin', 'user'] });
    (normalizeUser as jest.Mock).mockReturnValueOnce({ client_roles: ['admin', 'user'] });
    (hasAtLeastOneRole as jest.Mock).mockReturnValueOnce(true);
    (hasAllRoles as jest.Mock).mockReturnValueOnce(true);

    const middleware = protectedRoute(['admin', 'user']);
    await middleware(req, res, next);

    expect(res.status).not.toHaveBeenCalledWith(403);
    expect(next).toHaveBeenCalled();
  });

  // Test case: user does not have all required roles
  it('should return 403 if user does not have all required roles', async () => {
    req.headers = { authorization: 'Bearer valid_token' };
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    (isJWTValid as jest.Mock).mockResolvedValueOnce(true);
    (getUserInfo as jest.Mock).mockReturnValueOnce({ client_roles: ['user'] });
    (normalizeUser as jest.Mock).mockReturnValueOnce({ client_roles: ['user'] });
    (hasAtLeastOneRole as jest.Mock).mockReturnValueOnce(false);
    (hasAllRoles as jest.Mock).mockReturnValueOnce(false);

    const middleware = protectedRoute(['admin', 'user']);
    await middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: 'User must have all of the following roles: [admin,user]',
    });
    expect(next).not.toHaveBeenCalled();
  });

  // Test case: user has at least one required role (using options)
  it('user has at least one required role (using options)', async () => {
    req.headers = { authorization: 'Bearer valid_token' };
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    (isJWTValid as jest.Mock).mockResolvedValueOnce(true);
    (getUserInfo as jest.Mock).mockReturnValueOnce({ client_roles: ['user'] });
    (normalizeUser as jest.Mock).mockReturnValueOnce({ client_roles: ['user'] });
    (hasAtLeastOneRole as jest.Mock).mockReturnValueOnce(true);
    (hasAllRoles as jest.Mock).mockReturnValueOnce(false);

    const middleware = protectedRoute(['admin', 'user'], { requireAllRoles: false });
    await middleware(req, res, next);

    expect(res.status).not.toHaveBeenCalledWith(403);
    expect(next).toHaveBeenCalled();
  });

  // Test case: user does not have at least one required role (using options)
  it('should return 403 if user does not have at least one required role (using options)', async () => {
    req.headers = { authorization: 'Bearer valid_token' };
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();
    (isJWTValid as jest.Mock).mockResolvedValueOnce(true);
    (getUserInfo as jest.Mock).mockReturnValueOnce({ client_roles: ['guest'] });
    (normalizeUser as jest.Mock).mockReturnValueOnce({ client_roles: ['guest'] });
    (hasAtLeastOneRole as jest.Mock).mockReturnValueOnce(false);
    (hasAllRoles as jest.Mock).mockReturnValueOnce(false);

    const middleware = protectedRoute(['admin', 'user'], { requireAllRoles: false });
    await middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: 'User must have at least one of the following roles: [admin,user]',
    });
    expect(next).not.toHaveBeenCalled();
  });
});
