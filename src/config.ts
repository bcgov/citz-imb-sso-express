const {
  FRONTEND_URL,
  BACKEND_URL,
  SSO_AUTH_SERVER_URL = 'https://dev.loginproxy.gov.bc.ca/auth/realms/standard/protocol/openid-connect',
  SM_LOGOUT_URL = 'https://logontest7.gov.bc.ca/clp-cgi/logoff.cgi',
  COOKIE_DOMAIN = '.gov.bc.ca',
  SSO_CLIENT_ID,
  SSO_CLIENT_SECRET,
  DEBUG = 'false',
  VERBOSE_DEBUG = 'false',
} = process.env;

// Note: COOKIE_DOMAIN defaults to either 'localhost' or '.gov.bc.ca'.
// If FRONTEND_URL includes 'localhost', then that will be the value.

// Exports.
const config = {
  DEBUG: DEBUG === 'true',
  VERBOSE_DEBUG: VERBOSE_DEBUG === 'true',
  PACKAGE_NAME: 'citz-imb-sso-express',
  SSO_CLIENT_ID,
  SSO_CLIENT_SECRET,
  COOKIE_DOMAIN: COOKIE_DOMAIN ?? FRONTEND_URL?.includes('localhost') ? 'localhost' : '.gov.bc.ca',
  KC_AUTHORIZATION_URL: `${SSO_AUTH_SERVER_URL}/auth`,
  KC_TOKEN_URL: `${SSO_AUTH_SERVER_URL}/token`,
  KC_INTROSPECT_URL: `${SSO_AUTH_SERVER_URL}/token/introspect`,
  KC_LOGOUT_URL: `${SSO_AUTH_SERVER_URL}/logout`,
  SM_LOGOUT_URL,
  OIDC_GRANT_TYPE: 'authorization_code',
  OIDC_RESPONSE_TYPE: 'code',
  OIDC_SCOPE: 'email+openid',
  LOGIN_CALLBACK: '/auth/login/callback',
  LOGOUT_CALLBACK: '/auth/logout/callback',
  FRONTEND_URL,
  BACKEND_URL,
};

// Throw error if env vars are not set.
if (!FRONTEND_URL || !BACKEND_URL || !SSO_CLIENT_ID || !SSO_CLIENT_SECRET)
  throw new Error(
    `One or more environment variables were undefined for package ${config.PACKAGE_NAME}. 
    Ensure [FRONTEND_URL, BACKEND_URL, SSO_CLIENT_ID, SSO_CLIENT_SECRET] variables are set.`,
  );

export default config;
