import { getUserInfo, hasAllRoles, hasAtLeastOneRole, hasRoles, normalizeUser } from '@/utils/user';
import { parseJWT } from '@/utils/jwt';
import { OriginalSSOUser, SSOUser } from '@/types';

// Mock the parseJWT function
jest.mock('@/utils/jwt', () => ({
  parseJWT: jest.fn(),
}));

// Mock the config values
jest.mock('@/config', () => ({
  PACKAGE_NAME: 'test-package',
}));

// Mock user data
const mockUser = {
  preferred_username: 'testUser',
  display_name: 'Test User',
  client_roles: ['role1', 'role2', 'role3'],
};

// Test suite for getUserInfo function
describe('getUserInfo function', () => {
  // Test case: should return null when access token is invalid
  it('should return null when access token is invalid', () => {
    (parseJWT as jest.Mock).mockReturnValueOnce(null);
    const userInfo = getUserInfo('invalid_access_token');
    expect(userInfo).toBeNull();
  });

  // Test case: should return user information when access token is valid
  it('should return user information when access token is valid', () => {
    (parseJWT as jest.Mock).mockReturnValueOnce({ payload: mockUser });
    const userInfo = getUserInfo('valid_access_token');
    expect(userInfo).toEqual(mockUser);
  });

  // Test case: should return null when user information is null
  it('should return null when user information is null', () => {
    (parseJWT as jest.Mock).mockReturnValueOnce({ payload: null });
    const userInfo = getUserInfo('valid_access_token');
    expect(userInfo).toBeNull();
  });

  // Test case: should return null when client_roles of userInfo is not defined
  it('should return [] when client_roles of userInfo is not defined', () => {
    const userInfo = { preferred_username: 'testUser' } as OriginalSSOUser;
    const result = normalizeUser(userInfo);
    expect(result?.client_roles).toStrictEqual([]);
  });

  // Test case: should normalize user data correctly for identity_provider 'idir'
  it('should normalize user data correctly for identity_provider idir', () => {
    const userInfo = {
      preferred_username: 'testUser',
      display_name: 'Test User',
      identity_provider: 'idir',
      given_name: 'Test',
      family_name: 'User',
    } as OriginalSSOUser;
    const normalizedUser = normalizeUser(userInfo);
    expect(normalizedUser?.identity_provider).toBe('idir');
    expect(normalizedUser?.first_name).toBe('Test');
    expect(normalizedUser?.last_name).toBe('User');
  });

  // Test case: should normalize user data correctly for identity_provider 'azureidir'
  it('should normalize user data correctly for identity_provider azureidir', () => {
    const userInfo = {
      preferred_username: 'testUser',
      display_name: 'Test User',
      given_name: 'Test',
      family_name: 'User',
      identity_provider: 'azureidir',
    } as OriginalSSOUser;
    const normalizedUser = normalizeUser(userInfo);
    expect(normalizedUser?.identity_provider).toBe('azureidir');
    expect(normalizedUser?.first_name).toBe('Test');
    expect(normalizedUser?.last_name).toBe('User');
  });

  // Test case: should normalize user data correctly for identity_provider 'bceidbasic'
  it('should normalize user data correctly for identity_provider bceidbasic', () => {
    const userInfo = {
      preferred_username: 'testUser',
      display_name: 'Test User',
      identity_provider: 'bceidbasic',
    } as OriginalSSOUser;
    const normalizedUser = normalizeUser(userInfo);
    expect(normalizedUser?.identity_provider).toBe('bceidbasic');
    expect(normalizedUser?.first_name).toBe('Test');
    expect(normalizedUser?.last_name).toBe('User');
  });

  // Test case: should normalize user data correctly for identity_provider 'bceidbusiness'
  it('should normalize user data correctly for identity_provider bceidbusiness', () => {
    const userInfo = {
      preferred_username: 'testUser',
      display_name: 'Test User',
      identity_provider: 'bceidbusiness',
    } as OriginalSSOUser;
    const normalizedUser = normalizeUser(userInfo);
    expect(normalizedUser?.identity_provider).toBe('bceidbusiness');
    expect(normalizedUser?.first_name).toBe('Test');
    expect(normalizedUser?.last_name).toBe('User');
  });

  // Test case: should normalize user data correctly for identity_provider 'bceidboth'
  it('should normalize user data correctly for identity_provider bceidboth', () => {
    const userInfo = {
      preferred_username: 'testUser',
      display_name: 'Test User',
      identity_provider: 'bceidboth',
    } as OriginalSSOUser;
    const normalizedUser = normalizeUser(userInfo);
    expect(normalizedUser?.identity_provider).toBe('bceidboth');
    expect(normalizedUser?.first_name).toBe('Test');
    expect(normalizedUser?.last_name).toBe('User');
  });

  // Test case: should normalize user data correctly for identity_provider 'githubbcgov'
  it('should normalize user data correctly for identity_provider githubbcgov', () => {
    const userInfo = {
      preferred_username: 'testUser',
      display_name: 'Test User',
      identity_provider: 'githubbcgov',
    } as OriginalSSOUser;
    const normalizedUser = normalizeUser(userInfo);
    expect(normalizedUser?.identity_provider).toBe('githubbcgov');
    expect(normalizedUser?.first_name).toBe('Test');
    expect(normalizedUser?.last_name).toBe('User');
  });

  // Test case: should normalize user data correctly for identity_provider 'githubpublic'
  it('should normalize user data correctly for identity_provider githubpublic', () => {
    const userInfo = {
      preferred_username: 'testUser',
      display_name: 'Test User',
      identity_provider: 'githubpublic',
    } as OriginalSSOUser;
    const normalizedUser = normalizeUser(userInfo);
    expect(normalizedUser?.identity_provider).toBe('githubpublic');
    expect(normalizedUser?.first_name).toBe('Test');
    expect(normalizedUser?.last_name).toBe('User');
  });
});

// Test suite for hasAllRoles function
describe('hasAllRoles function', () => {
  // Test case: should return true when user has all required roles
  it('should return true when user has all required roles', () => {
    const userRoles = ['role1', 'role2', 'role3'];
    const requiredRoles = ['role1', 'role2'];
    const result = hasAllRoles(userRoles, requiredRoles);
    expect(result).toBe(true);
  });

  // Test case: should return false when user does not have all required roles
  it('should return false when user does not have all required roles', () => {
    const userRoles = ['role1', 'role3'];
    const requiredRoles = ['role1', 'role2'];
    const result = hasAllRoles(userRoles, requiredRoles);
    expect(result).toBe(false);
  });
});

// Test suite for hasAtLeastOneRole function
describe('hasAtLeastOneRole function', () => {
  // Test case: should return true when user has at least one required role
  it('should return true when user has at least one required role', () => {
    const userRoles = ['role1', 'role3'];
    const requiredRoles = ['role1', 'role2'];
    const result = hasAtLeastOneRole(userRoles, requiredRoles);
    expect(result).toBe(true);
  });

  // Test case: should return false when user does not have any required role
  it('should return false when user does not have any required role', () => {
    const userRoles = ['role3'];
    const requiredRoles = ['role1', 'role2'];
    const result = hasAtLeastOneRole(userRoles, requiredRoles);
    expect(result).toBe(false);
  });
});

// Test suite for hasRoles function
describe('hasRoles function', () => {
  // Test case: should return true when user has all required roles
  it('should return true when user has all required roles', () => {
    const result = hasRoles(mockUser as SSOUser, ['role1', 'role2']);
    expect(result).toBe(true);
  });

  // Test case: should return false when user does not have all required roles
  it('should return false when user does not have all required roles', () => {
    const result = hasRoles(mockUser as SSOUser, ['role1', 'role4']);
    expect(result).toBe(false);
  });

  // Test case: should return true when user has at least one required role and requireAllRoles is false
  it('should return true when user has at least one required role and requireAllRoles is false', () => {
    const result = hasRoles(mockUser as SSOUser, ['role1', 'role4'], { requireAllRoles: false });
    expect(result).toBe(true);
  });
});

// Test suite for normalizeUser function
describe('Test suite for normalizeUser function', () => {
  // Test case: should return null when userInfo is null
  it('should return null when userInfo is null', () => {
    const normalizedUser = normalizeUser(null);
    expect(normalizedUser).toBeNull();
  });

  // Test case: should normalize user data correctly
  it('should normalize user data correctly', () => {
    const originalUser = {
      preferred_username: 'testUser',
      display_name: 'Test User',
      client_roles: ['role1', 'role2'],
      identity_provider: 'bceidbasic',
    };
    const normalizedUser = normalizeUser(originalUser as OriginalSSOUser);
    expect(normalizedUser).toEqual({
      guid: '',
      preferred_username: 'testUser',
      username: '',
      email: undefined,
      name: '',
      display_name: 'Test User',
      first_name: 'Test',
      last_name: 'User',
      client_roles: ['role1', 'role2'],
      scope: '',
      identity_provider: 'bceidbasic',
      originalData: originalUser,
      hasRoles: expect.any(Function),
    });
  });
});
