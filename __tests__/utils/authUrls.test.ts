import qs from 'qs';
import { getLoginURL, getLogoutURL } from '@/utils/authUrls';
import { IdentityProvider } from '@/types';

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
  KC_AUTHORIZATION_URL: 'http://login.ca/auth',
  KC_LOGOUT_URL: 'http://login.ca/logout',
  SM_LOGOUT_URL: 'http://sm.ca/logout',
  OIDC_RESPONSE_TYPE: 'code',
  OIDC_SCOPE: 'email+openid',
  LOGIN_CALLBACK: '/auth/login/callback',
  LOGOUT_CALLBACK: '/auth/logout/callback',
  BACKEND_URL: 'http://localhost:3001',
}));

const CONFIG = {
  SSO_CLIENT_ID: 'client_id',
  KC_AUTHORIZATION_URL: 'http://login.ca/auth',
  KC_LOGOUT_URL: 'http://login.ca/logout',
  SM_LOGOUT_URL: 'http://sm.ca/logout',
  OIDC_RESPONSE_TYPE: 'code',
  OIDC_SCOPE: 'email+openid',
  LOGIN_CALLBACK: '/auth/login/callback',
  LOGOUT_CALLBACK: '/auth/logout/callback',
  BACKEND_URL: 'http://localhost:3001',
};

const {
  SSO_CLIENT_ID,
  KC_AUTHORIZATION_URL,
  KC_LOGOUT_URL,
  SM_LOGOUT_URL,
  OIDC_RESPONSE_TYPE,
  OIDC_SCOPE,
  LOGIN_CALLBACK,
  LOGOUT_CALLBACK,
  BACKEND_URL,
} = CONFIG;

// Test suite for getLoginURL function
describe('getLoginURL function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case: getLoginURL function without kc_idp_hint
  it('should return correct login URL without kc_idp_hint', () => {
    const result = getLoginURL();

    const params = {
      client_id: SSO_CLIENT_ID,
      response_type: OIDC_RESPONSE_TYPE,
      scope: OIDC_SCOPE,
      redirect_uri: encodeURIComponent(`${BACKEND_URL}${LOGIN_CALLBACK}`),
      kc_idp_hint: undefined,
    };

    expect(qs.stringify).toHaveBeenCalledWith(params, { encode: false });

    const expectedURL = `${KC_AUTHORIZATION_URL}?${qs.stringify(params, { encode: false })}`;
    expect(result).toBe(expectedURL);
  });

  // Test case: getLoginURL function with kc_idp_hint
  it('should return correct login URL with kc_idp_hint', () => {
    const kcIdpHint: IdentityProvider = 'idir';
    const result = getLoginURL(kcIdpHint);

    const params = {
      client_id: SSO_CLIENT_ID,
      response_type: OIDC_RESPONSE_TYPE,
      scope: OIDC_SCOPE,
      redirect_uri: encodeURIComponent(`${BACKEND_URL}${LOGIN_CALLBACK}`),
      kc_idp_hint: kcIdpHint,
    };

    expect(qs.stringify).toHaveBeenCalledWith(params, { encode: false });

    const expectedURL = `${KC_AUTHORIZATION_URL}?${qs.stringify(params, { encode: false })}`;
    expect(result).toBe(expectedURL);
  });
});

// Test suite for getLogoutURL function
describe('getLogoutURL function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case for getLogoutURL function
  it('should return correct logout URL', () => {
    const idToken = 'example_id_token';
    const result = getLogoutURL(idToken);

    const kcParams = {
      id_token_hint: idToken,
      post_logout_redirect_uri: encodeURIComponent(`${BACKEND_URL}${LOGOUT_CALLBACK}`),
    };
    const smParams = {
      retnow: 1,
      returl: encodeURIComponent(`${KC_LOGOUT_URL}?${qs.stringify(kcParams, { encode: false })}`),
    };

    expect(qs.stringify).toHaveBeenCalledWith(kcParams, { encode: false });

    const expectedURL = `${SM_LOGOUT_URL}?${qs.stringify(smParams, { encode: false })}`;
    expect(result).toBe(expectedURL);
  });
});
