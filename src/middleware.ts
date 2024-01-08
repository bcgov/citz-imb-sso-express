import { Request, Response, NextFunction, RequestHandler } from "express";
import { ProtectedRouteOptions } from "./types";
import { isJWTValid } from "./utils/kcApi";
import { getUserInfo, hasAllRoles, hasAtLeastOneRole } from "./utils/user";

/**
 * Express middleware that checks for a valid JWT in the Authorization header,
 * sets the decoded token and user information in the request object, and passes
 * control to the next middleware function.
 * @param {string | string[]} roles - (optional) Role(s) required to use the protected route.
 * @param {object} options - (optional) Additional options.
 * @property options.requireAllRoles - When false, only a single role is required from roles.
 */
export const protectedRoute = (
  roles?: string[],
  options?: ProtectedRouteOptions
): RequestHandler => {
  const routeMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // Check if Authorization header exists.
    const header = req.headers["authorization"];
    if (!header)
      return res.status(401).json({ error: "No authorization header found." });

    // Extract token from header and check if it is valid.
    const token = header.split(" ")[1];
    const isTokenValid = await isJWTValid(token);
    if (!isTokenValid)
      return res.status(401).json({
        error: "Unauthorized: Invalid token, login to get a new one.",
      });

    // Get user info and check role.
    const userInfo = getUserInfo(token);
    if (!userInfo) return res.status(404).json({ error: `User not found.` });
    const userRoles = userInfo?.client_roles;

    // Ensure proper use of function.
    if (
      roles &&
      (!Array.isArray(roles) ||
        !roles.every((item) => typeof item === "string"))
    )
      throw new Error(
        "Error: protectedRoute middleware of `citz-imb-kc-express`. Pass roles as an array of strings."
      );

    // Check for roles.
    if (roles) {
      if (options && options?.requireAllRoles === false) {
        if (!userRoles || !hasAtLeastOneRole(userRoles, roles)) {
          // User does not have at least one of the required roles.
          return res.status(403).json({
            error: `User must have at least one of the following roles: [${roles}]`,
          });
        }
      } else {
        if (!userRoles || !hasAllRoles(userRoles, roles)) {
          // User does not have all the required roles.
          return res.status(403).json({
            error: `User must have all of the following roles: [${roles}]`,
          });
        }
      }
    }

    // Set decoded token and user information in request object.
    req.token = token;
    req.user = userInfo;

    // Pass control to the next middleware function.
    next();
  };
  return routeMiddleware;
};
