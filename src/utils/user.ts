import { KeycloakUser } from "../types";
import { parseJWT } from "./jwt";

// Gets user information from parsing an access token JWT.
export const getUserInfo = (access_token: string): KeycloakUser | null => {
  const data = parseJWT(access_token);
  if (!data) return null;
  return data.payload;
};

// Checks if user has all the roles in the requiredRoles array.
export const hasAllRoles = (userRoles: string[], requiredRoles: string[]) =>
  requiredRoles.every((role) => userRoles.includes(role));

// Checks if user has at least one role in requiredRoles array.
export const hasAtLeastOneRole = (
  userRoles: string[],
  requiredRoles: string[]
) => requiredRoles.some((role) => userRoles.includes(role));
