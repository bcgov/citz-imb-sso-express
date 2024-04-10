/* eslint-disable @typescript-eslint/no-explicit-any */
import qs from 'qs';
import { getTokens, isJWTValid, getNewTokens } from '@/utils/kcApi';

// Mock the fetch function
const mockedFetch = jest.fn().mockResolvedValue({
  ok: true,
  json: jest.fn(),
});
(global as any).fetch = mockedFetch;

// Mock qs module
jest.mock('qs', () => ({
  stringify: jest.fn((params) => {
    return Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
      .join('&');
  }),
}));

// Mock the config values
jest.mock('@/config', () => ({
  SSO_CLIENT_ID: 'client_id',
  SSO_CLIENT_SECRET: 'client_secret',
  KC_TOKEN_URL: 'http://login.ca/token',
  KC_INTROSPECT_URL: 'http://login.ca/token/introspect',
  OIDC_GRANT_TYPE: 'code',
  LOGIN_CALLBACK: '/auth/login/callback',
  BACKEND_URL: 'http://localhost:3001',
}));

// Test suite for getTokens function
describe('getTokens function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case: should fetch tokens successfully
  it('should fetch tokens successfully', async () => {
    const mockResponse = {
      id_token: 'mockIdToken',
      access_token: 'mockAccessToken',
      refresh_token: 'mockRefreshToken',
      refresh_expires_in: 3600,
    };
    mockedFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const tokens = await getTokens('mockCode');

    expect(tokens).toEqual(mockResponse);
    expect(qs.stringify).toHaveBeenCalledTimes(1);
    expect(mockedFetch).toHaveBeenCalledTimes(1);
  });

  // Test case: should throw an error if fetch fails
  it('should throw an error if fetch fails', async () => {
    mockedFetch.mockRejectedValueOnce(new Error('Fetch error'));

    await expect(getTokens('mockCode')).rejects.toThrow('Fetch error');
  });
});

// Test suite for isJWTValid function
describe('isJWTValid function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case: should return true for a valid JWT
  it('should return true for a valid JWT', async () => {
    const mockResponse = { active: true };
    mockedFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const isValid = await isJWTValid('mockJWT');

    expect(isValid).toBe(true);
    expect(mockedFetch).toHaveBeenCalledTimes(1);
  });

  // Test case: should return false for an invalid JWT
  it('should return false for an invalid JWT', async () => {
    const mockResponse = { active: false };
    mockedFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const isValid = await isJWTValid('mockJWT');

    expect(isValid).toBe(false);
    expect(mockedFetch).toHaveBeenCalledTimes(1);
  });

  // Test case: should throw an error if fetch fails
  it('should throw an error if fetch fails', async () => {
    mockedFetch.mockRejectedValueOnce(new Error('Fetch error'));

    await expect(isJWTValid('mockJWT')).rejects.toThrow('Fetch error');
  });
});

// Test suite for getNewTokens function
describe('getNewTokens function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case: should return null when refresh_token is empty
  it('should return null when refresh_token is empty', async () => {
    const tokens = await getNewTokens('');
    expect(tokens).toBeNull();
  });

  // Test case: should return null when refresh_token is invalid
  it('should return null when refresh_token is invalid', async () => {
    // Mock isJWTValid to return false
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce({ active: false }) } as any);

    const tokens = await getNewTokens('invalid_refresh_token');
    expect(tokens).toBeNull();
  });

  // Test case: should return new tokens when refresh_token is valid
  it('should return new tokens when refresh_token is valid', async () => {
    const mockResponse = {
      access_token: 'new_access_token',
      id_token: 'new_id_token',
      expires_in: 3600,
    };
    // Mock isJWTValid to return true
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce({ active: true }) } as any);
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(mockResponse) } as any);

    const tokens = await getNewTokens('valid_refresh_token');
    expect(tokens).toEqual(mockResponse);
  });

  // Test case: should throw an error if fetch fails
  it('should throw an error if fetch fails', async () => {
    // Mock isJWTValid to return true
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce({ active: true }) } as any);
    // Mock fetch to reject the request
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Fetch error'));

    await expect(getNewTokens('valid_refresh_token')).rejects.toThrow('Fetch error');
  });
});
