import qs from 'qs';
import config from '../config';
import { encodeJWT } from './jwt';
import debug from './debug';

const {
  SSO_CLIENT_ID,
  SSO_CLIENT_SECRET,
  KC_TOKEN_URL,
  KC_INTROSPECT_URL,
  OIDC_GRANT_TYPE,
  LOGIN_CALLBACK,
  BACKEND_URL,
} = config;

/**
 * Gets decoded tokens and user information from the OIDC server using a code.
 * See https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.3
 * @param {string} code
 */
export const getTokens = async (code: string) => {
  const params = {
    grant_type: OIDC_GRANT_TYPE,
    client_id: SSO_CLIENT_ID,
    redirect_uri: BACKEND_URL + LOGIN_CALLBACK,
    code,
  };

  const headers = {
    Authorization: `Basic ${encodeJWT(`${SSO_CLIENT_ID}:${SSO_CLIENT_SECRET}`)}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const response = await fetch(KC_TOKEN_URL, {
    method: 'POST',
    headers,
    body: qs.stringify(params),
  });

  const { id_token, access_token, refresh_token, refresh_expires_in } = await response.json();
  debug.getTokensResponse({ id_token, access_token, refresh_token, refresh_expires_in });

  return {
    id_token,
    access_token,
    refresh_token,
    refresh_expires_in,
  };
};

/**
 * Checks if a JWT is valid.
 * @param jwt
 * @returns
 */
export const isJWTValid = async (jwt: string) => {
  if (!jwt || jwt === '') throw new Error('Missing jwt in isJWTValid');

  const params = {
    client_id: SSO_CLIENT_ID,
    client_secret: SSO_CLIENT_SECRET,
    token: jwt,
  };

  const headers = {
    Accept: '*/*',
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const response = await fetch(KC_INTROSPECT_URL, {
    method: 'POST',
    headers,
    body: qs.stringify(params),
  });

  const { active } = await response.json();
  return active;
};

/**
 * Get a new access_token from refresh_token.
 * @param {string} refresh_token
 * @returns
 */
export const getNewTokens = async (
  refresh_token: string,
): Promise<null | {
  access_token: string;
  id_token: string;
  expires_in: number;
}> => {
  if (!refresh_token || refresh_token === '') return null;

  // Check if refresh_token is valid.
  const isTokenValid = await isJWTValid(refresh_token);
  if (!isTokenValid) return null;

  const params = {
    grant_type: 'refresh_token',
    client_id: SSO_CLIENT_ID,
    client_secret: SSO_CLIENT_SECRET,
    refresh_token,
  };

  const response = await fetch(KC_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: qs.stringify(params),
  });

  const body = await response.json();
  const { access_token, id_token, expires_in } = body;
  if (!access_token || !id_token)
    throw new Error("Couldn't get access or id token from KC token endpoint");

  return { access_token, id_token, expires_in };
};
