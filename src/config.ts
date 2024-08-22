const {
  FRONTEND_URL,
  BACKEND_URL,
  SSO_AUTH_SERVER_URL = 'https://dev.loginproxy.gov.bc.ca/auth/realms/standard/protocol/openid-connect',
  SM_LOGOUT_URL = 'https://logontest7.gov.bc.ca/clp-cgi/logoff.cgi',
  COOKIE_DOMAIN = FRONTEND_URL?.includes('localhost') ? 'localhost' : '.gov.bc.ca',
  SSO_CLIENT_ID,
  SSO_CLIENT_SECRET,
  DEBUG = 'false',
  VERBOSE_DEBUG = 'false',
} = process.env;

// Exports.
const config = {
  DEBUG: DEBUG === 'true',
  VERBOSE_DEBUG: VERBOSE_DEBUG === 'true',
  PACKAGE_NAME: 'citz-imb-sso-express',
  SSO_CLIENT_ID: SSO_CLIENT_ID?.trim(),
  SSO_CLIENT_SECRET: SSO_CLIENT_SECRET?.trim(),
  COOKIE_DOMAIN: COOKIE_DOMAIN.trim(),
  KC_AUTHORIZATION_URL: `${SSO_AUTH_SERVER_URL.trim()}/auth`,
  KC_TOKEN_URL: `${SSO_AUTH_SERVER_URL.trim()}/token`,
  KC_INTROSPECT_URL: `${SSO_AUTH_SERVER_URL.trim()}/token/introspect`,
  KC_LOGOUT_URL: `${SSO_AUTH_SERVER_URL.trim()}/logout`,
  SM_LOGOUT_URL: SM_LOGOUT_URL.trim(),
  OIDC_GRANT_TYPE: 'authorization_code',
  OIDC_RESPONSE_TYPE: 'code',
  OIDC_SCOPE: 'email+openid',
  LOGIN_CALLBACK: '/auth/login/callback',
  LOGOUT_CALLBACK: '/auth/logout/callback',
  FRONTEND_URL: FRONTEND_URL?.trim(),
  BACKEND_URL: BACKEND_URL?.trim(),
};

// Throw error if env vars are not set.
if (!FRONTEND_URL || !BACKEND_URL || !SSO_CLIENT_ID || !SSO_CLIENT_SECRET)
  throw new Error(
    `One or more environment variables were undefined for package ${config.PACKAGE_NAME}. 
    Ensure [FRONTEND_URL, BACKEND_URL, SSO_CLIENT_ID, SSO_CLIENT_SECRET] variables are set.`,
  );

// Log all variables.
if (config.DEBUG && config.VERBOSE_DEBUG)
  console.info(`DEBUG: Configuration variables for '${config.PACKAGE_NAME}': `, config);

export default config;
