import { HasRolesOptions, KeycloakUser } from '../types';
import { parseJWT } from './jwt';

import config from '../config';
const { PACKAGE_NAME } = config;

// Gets user information from parsing an access token JWT.
export const getUserInfo = (access_token: string): KeycloakUser | null => {
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
export const hasRoles = (user: KeycloakUser, roles: string[], options?: HasRolesOptions) => {
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
