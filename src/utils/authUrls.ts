import qs from 'qs';
import { IdentityProvider } from '../types';
import config from '../config';

const {
  SSO_CLIENT_ID,
  KC_AUTHORIZATION_URI,
  KC_LOGOUT_URI,
  SM_LOGOUT_URI,
  OIDC_RESPONSE_TYPE,
  OIDC_SCOPE,
  LOGIN_CALLBACK,
  LOGOUT_CALLBACK,
  BACKEND_URL,
} = config;

/**
 * Gets the authorization URL to redirect the user to the OIDC server for authentication.
 * See https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1
 * @param {IdentityProvider} kc_idp_hint
 * @returns {string}
 */
export const getLoginURL = (kc_idp_hint?: IdentityProvider) => {
  const params = {
    client_id: SSO_CLIENT_ID,
    response_type: OIDC_RESPONSE_TYPE,
    scope: OIDC_SCOPE,
    redirect_uri: encodeURIComponent(`${BACKEND_URL}${LOGIN_CALLBACK}`),
    kc_idp_hint,
  };

  return `${KC_AUTHORIZATION_URI}?${qs.stringify(params, { encode: false })}`;
};

/**
 * Gets the logout URL to redirect the user to the OIDC server for logout.
 * @param id_token
 * @returns
 */
export const getLogoutURL = (id_token: string) => {
  const kcParams = {
    id_token_hint: id_token,
    post_logout_redirect_uri: encodeURIComponent(`${BACKEND_URL}${LOGOUT_CALLBACK}`),
  };

  const smParams = {
    retnow: 1,
    returl: encodeURIComponent(`${KC_LOGOUT_URI}?${qs.stringify(kcParams, { encode: false })}`),
  };

  return `${SM_LOGOUT_URI}?${qs.stringify(smParams, { encode: false })}`;
};
