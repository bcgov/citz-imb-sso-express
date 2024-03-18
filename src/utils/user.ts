import { CombinedSSOUser, HasRolesOptions, SSOUser } from '../types';
import { parseJWT } from './jwt';

import config from '../config';
const { PACKAGE_NAME } = config;

// Gets user information from parsing an access token JWT.
export const getUserInfo = (access_token: string): SSOUser | null => {
  const data = parseJWT(access_token);
  if (!data) return null;
  return data?.payload;
};

// Checks if user has all the roles in the requiredRoles array.
export const hasAllRoles = (userRoles: string[], requiredRoles: string[]) =>
  requiredRoles.every((role) => userRoles.includes(role));

// Checks if user has at least one role in requiredRoles array.
export const hasAtLeastOneRole = (userRoles: string[], requiredRoles: string[]) =>
  requiredRoles.some((role) => userRoles.includes(role));

// Return true if the user has the specified roles.
export const hasRoles = (user: SSOUser, roles: string[], options?: HasRolesOptions) => {
  const userRoles = user?.client_roles;

  // Ensure proper use of function.
  if (!roles || !Array.isArray(roles) || !roles.every((item) => typeof item === 'string'))
    throw new Error(
      `Error: hasRoles function of '${PACKAGE_NAME}'. Pass roles as an array of strings.`,
    );

  // Return false because user does not have any roles
  if (!userRoles) return false;

  // User must have all roles in roles array unless requireAllRoles === false
  if (options && options?.requireAllRoles === false) return hasAtLeastOneRole(userRoles, roles);
  else return hasAllRoles(userRoles, roles);
};

// Combine properties of each user type into a single object
export const normalizeUser = (userInfo: CombinedSSOUser | null): SSOUser | null => {
  if (!userInfo) return null;
  const {
    name = '',
    preferred_username,
    email,
    display_name,
    client_roles = [],
    scope = '',
    identity_provider,
  } = userInfo;

  // Normalize properties
  let guid = userInfo?.idir_user_guid ?? '';
  let username = userInfo?.idir_username ?? '';
  let first_name = userInfo?.given_name ?? '';
  let last_name = userInfo?.family_name ?? '';

  if (
    identity_provider === 'bceidbasic' ||
    identity_provider === 'bceidbusiness' ||
    identity_provider === 'bceidboth'
  ) {
    // BCeID
    guid = userInfo?.bceid_user_guid ?? '';
    username = userInfo?.bceid_username ?? '';
    first_name = userInfo?.display_name.split(' ')[0];
    last_name = userInfo?.display_name.split(' ')[1];
  } else if (identity_provider === 'githubbcgov' || identity_provider === 'githubpublic') {
    // GitHub
    guid = userInfo?.github_id ?? '';
    username = userInfo?.github_username ?? '';
    first_name = userInfo?.display_name.split(' ')[0];
    last_name = userInfo?.display_name.split(' ')[1];
  }

  // Normalized user
  const user = {
    guid,
    preferred_username,
    username,
    email,
    name,
    display_name,
    first_name,
    last_name,
    client_roles,
    scope,
    identity_provider,
  };

  return user;
};
