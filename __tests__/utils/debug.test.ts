import debug from '@/utils/debug';

// Mock the config values
jest.mock('@/config', () => ({
  DEBUG: true,
  VERBOSE_DEBUG: true,
  PACKAGE_NAME: 'test-package',
}));

// Test suite for debug functions
describe('debug functions', () => {
  // Test case: controllerCalled function
  it('controllerCalled - should log debug info if DEBUG and VERBOSE_DEBUG are true', () => {
    // Mocking console.info
    const mockConsoleInfo = jest.spyOn(console, 'info').mockImplementation();

    debug.controllerCalled('testController');
    expect(mockConsoleInfo).toHaveBeenCalledWith("DEBUG: testController of 'test-package' called.");

    // Restore the mock
    mockConsoleInfo.mockRestore();
  });

  // Test case: controllerError function
  it('controllerError - should log error with controller name and package name', () => {
    // Mocking console.error
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation();

    debug.controllerError('testController', new Error('test error'));
    expect(mockConsoleError).toHaveBeenCalledWith(
      "Error: testController of 'test-package' called.",
      expect.any(Error),
    );

    // Restore the mock
    mockConsoleError.mockRestore();
  });

  // Test case: afterUserLogout function
  it('afterUserLogout - should log debug info if DEBUG is true and user is null', () => {
    // Mocking console.info
    const mockConsoleInfo = jest.spyOn(console, 'info').mockImplementation();

    debug.afterUserLogout(null);
    expect(mockConsoleInfo).toHaveBeenCalledWith(
      "DEBUG: afterUserLogout function of 'test-package' called.",
    );

    // Restore the mock
    mockConsoleInfo.mockRestore();
  });

  // Test case: afterUserLogin function
  it('afterUserLogin - should log debug info if DEBUG is true and user is null', () => {
    // Mocking console.info
    const mockConsoleInfo = jest.spyOn(console, 'info').mockImplementation();

    debug.afterUserLogin(null);
    expect(mockConsoleInfo).toHaveBeenCalledWith(
      "DEBUG: afterUserLogin function of 'test-package' called.",
    );

    // Restore the mock
    mockConsoleInfo.mockRestore();
  });

  // Test case: initialized function
  it('initialized - should log debug info if DEBUG is true', () => {
    // Mocking console.info
    const mockConsoleInfo = jest.spyOn(console, 'info').mockImplementation();

    debug.initialized();
    expect(mockConsoleInfo).toHaveBeenCalledWith("DEBUG: Initialized 'test-package'.");

    // Restore the mock
    mockConsoleInfo.mockRestore();
  });

  // Test case: unauthorizedTokenError function
  it('unauthorizedTokenError - should log debug info if DEBUG and VERBOSE_DEBUG are true', () => {
    // Mocking console.info
    const mockConsoleInfo = jest.spyOn(console, 'info').mockImplementation();

    debug.unauthorizedTokenError('test-refresh-token');
    expect(mockConsoleInfo).toHaveBeenCalledWith(
      "DEBUG: refresh_token of 'test-package' token endpoint is 'test-refresh-token'.",
    );

    // Restore the mock
    mockConsoleInfo.mockRestore();
  });

  // Test case: loginURL function
  it('loginURL - should log debug info if DEBUG and VERBOSE_DEBUG are true', () => {
    // Mocking console.info
    const mockConsoleInfo = jest.spyOn(console, 'info').mockImplementation();

    debug.loginURL('test-login-url');
    expect(mockConsoleInfo).toHaveBeenCalledWith(
      "DEBUG: loginURL of 'test-package' login endpoint is 'test-login-url'.",
    );

    // Restore the mock
    mockConsoleInfo.mockRestore();
  });

  // Test case: logoutURL function
  it('logoutURL - should log debug info if DEBUG and VERBOSE_DEBUG are true', () => {
    // Mocking console.info
    const mockConsoleInfo = jest.spyOn(console, 'info').mockImplementation();

    debug.logoutURL('test-logout-url');
    expect(mockConsoleInfo).toHaveBeenCalledWith(
      "DEBUG: logoutURL of 'test-package' logout endpoint is 'test-logout-url'.",
    );

    // Restore the mock
    mockConsoleInfo.mockRestore();
  });

  // Test case: loginCallbackRedirectURL function
  it('loginCallbackRedirectURL - should log debug info if DEBUG and VERBOSE_DEBUG are true', () => {
    // Mocking console.info
    const mockConsoleInfo = jest.spyOn(console, 'info').mockImplementation();

    debug.loginCallbackRedirectURL('test-callback-url');
    expect(mockConsoleInfo).toHaveBeenCalledWith(
      "DEBUG: loginCallbackRedirectURL of 'test-package' login/callback endpoint is 'test-callback-url'.",
    );

    // Restore the mock
    mockConsoleInfo.mockRestore();
  });

  // Test case: logQueryParams function
  it('logQueryParams - should log debug info if DEBUG and VERBOSE_DEBUG are true', () => {
    // Mocking console.info
    const mockConsoleInfo = jest.spyOn(console, 'info').mockImplementation();

    debug.logQueryParams('testController', { param1: 'value1', param2: 'value2' });
    expect(mockConsoleInfo).toHaveBeenCalledWith(
      "DEBUG: Query parameters of testController of 'test-package' are: ",
      { param1: 'value1', param2: 'value2' },
    );

    // Restore the mock
    mockConsoleInfo.mockRestore();
  });

  // Test case: getTokensResponse function
  it('getTokensResponse - should log debug info if DEBUG and VERBOSE_DEBUG are true', () => {
    // Mocking console.info
    const mockConsoleInfo = jest.spyOn(console, 'info').mockImplementation();

    debug.getTokensResponse({ access_token: 'token123', expires_in: 3600 });
    expect(mockConsoleInfo).toHaveBeenCalledWith(
      "DEBUG: getTokens response of 'test-package' is: ",
      { access_token: 'token123', expires_in: 3600 },
    );

    // Restore the mock
    mockConsoleInfo.mockRestore();
  });
});
