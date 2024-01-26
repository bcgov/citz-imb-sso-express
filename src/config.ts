const {
  FRONTEND_URL = "",
  BACKEND_URL = "",
  SSO_AUTH_SERVER_URI = "https://dev.loginproxy.gov.bc.ca/auth/realms/standard/protocol/openid-connect",
  SM_LOGOUT_URI = "https://logontest7.gov.bc.ca/clp-cgi/logoff.cgi",
  SSO_CLIENT_ID = "",
  SSO_CLIENT_SECRET = "",
  DEBUG = "false",
  VERBOSE_DEBUG = "false",
} = process.env;

if (DEBUG === "true" && VERBOSE_DEBUG === "true") {
  console.log(`DEBUG: 'citz-imb-kc-express' environment variables:
  SSO_CLIENT_ID=${SSO_CLIENT_ID}
  SSO_CLIENT_SECRET=${SSO_CLIENT_SECRET}
  FRONTEND_URL=${FRONTEND_URL}
  BACKEND_URL=${BACKEND_URL}`);
}

// Exports.
export default {
  DEBUG: DEBUG === "true",
  VERBOSE_DEBUG: VERBOSE_DEBUG === "true",
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
