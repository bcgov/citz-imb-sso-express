const { FRONTEND_PORT, PORT } = process.env;

const {
  FRONTEND_URL = `http://localhost:${FRONTEND_PORT}`,
  BACKEND_URL = `http://localhost:${PORT}`,
  SSO_AUTH_SERVER_URI = "https://dev.loginproxy.gov.bc.ca/auth/realms/standard/protocol/openid-connect",
  SM_LOGOUT_URI = "https://logontest7.gov.bc.ca/clp-cgi/logoff.cgi",
  SSO_CLIENT_ID = "",
  SSO_CLIENT_SECRET = "",
  DEBUG = "false",
} = process.env;

// Exports.
export default {
  DEBUG: Boolean(DEBUG) ?? false,
  SSO_CLIENT_ID,
  SSO_CLIENT_SECRET,
  KC_AUTHORIZATION_URI: `${SSO_AUTH_SERVER_URI}/auth`,
  KC_TOKEN_URI: `${SSO_AUTH_SERVER_URI}/token`,
  KC_INTROSPECT_URI: `${SSO_AUTH_SERVER_URI}/token/introspect`,
  KC_LOGOUT_URI: `${SSO_AUTH_SERVER_URI}/logout`,
  SM_LOGOUT_URI,
  OIDC_GRANT_TYPE: "authorization_code",
  OIDC_RESPONSE_TYPE: "code",
  OIDC_SCOPE: "email+openid",
  LOGIN_CALLBACK: "/auth/login/callback",
  LOGOUT_CALLBACK: "/auth/logout/callback",
  FRONTEND_URL,
  BACKEND_URL,
};
