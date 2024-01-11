import { IdentityProvider, KCOptions } from "./types";
import { Request, Response } from "express";
import { getNewTokens, getTokens } from "./utils/kcApi";
import { getLoginURL, getLogoutURL } from "./utils/authUrls";
import { getUserInfo } from "./utils/user";
import { debugControllerCalled } from "./utils/debug";
import config from "./config";

const { FRONTEND_URL, DEBUG } = config;

/**
 * Prompts the user to login.
 * @method GET
 * @route /auth/login
 */
export const login = (options?: KCOptions) => {
  const request = async (req: Request, res: Response) => {
    if (DEBUG) debugControllerCalled("login");
    try {
      const { idp } = req.query;
      if (!req.token) return res.redirect(getLoginURL(idp as IdentityProvider));
      return res.redirect("");
    } catch (error: any) {
      console.error("Keycloak: Error in login controller", error);
      res.json({ success: false, error: error.message ?? error });
    }
  };
  return request;
};

/**
 * Redirects user to the frontend, with refresh token.
 * @method GET
 * @route /auth/login/callback
 */
export const loginCallback = (options?: KCOptions) => {
  const request = async (req: Request, res: Response) => {
    if (DEBUG) debugControllerCalled("loginCallback");
    try {
      const { code } = req.query;
      const { access_token, refresh_token, refresh_expires_in } =
        await getTokens(code as string);

      // Send response.
      res
        .cookie("refresh_token", refresh_token, {
          httpOnly: true,
          secure: true,
        })
        .redirect(`${FRONTEND_URL}?refresh_expires_in=${refresh_expires_in}`);

      // Run after login callback request.
      if (options?.afterUserLogin) {
        const user = getUserInfo(access_token);

        // DEBUG
        if (!user && DEBUG)
          console.log(
            "DEBUG: Can't get user info in afterUserLogin function of `citz-imb-kc-express`."
          );
        else if (DEBUG)
          console.log("DEBUG: afterUserLogin of `citz-imb-kc-express` called.");

        if (user) options.afterUserLogin(user);
      }
    } catch (error: any) {
      console.error(
        "Error: loginCallback controller of `citz-imb-kc-express`",
        error
      );
      res.json({ success: false, error: error.message ?? error });
    }
  };
  return request;
};

/**
 * Logs out the user and, once finished, redirects them to /auth/logout/callback
 * @method GET
 * @route /auth/logout
 */
export const logout = (options?: KCOptions) => {
  const request = async (req: Request, res: Response) => {
    if (DEBUG) debugControllerCalled("logout");
    try {
      const { id_token } = req.query;
      if (!id_token)
        return res.status(401).send("id_token query param required");
      res.redirect(getLogoutURL(id_token as string));

      // Run after logout callback request.
      if (options?.afterUserLogout) {
        const user = getUserInfo(id_token as string);

        // DEBUG
        if (!user && DEBUG)
          console.log(
            "DEBUG: Can't get user info in afterUserLogout function of `citz-imb-kc-express`."
          );
        else if (DEBUG)
          console.log(
            "DEBUG: afterUserLogout function of `citz-imb-kc-express` called."
          );

        if (user) options.afterUserLogout(user);
      }
    } catch (error: any) {
      console.error("Error: logout controller of `citz-imb-kc-express`", error);
      res.json({ success: false, error: error.message ?? error });
    }
  };
  return request;
};

/**
 * Removes the user's httpOnly refresh token, and redirects back to the frontend.
 * @method GET
 * @route /auth/logout/callback
 */
export const logoutCallback = (options?: KCOptions) => {
  const request = async (req: Request, res: Response) => {
    if (DEBUG) debugControllerCalled("logoutCallback");
    try {
      res
        .cookie("refresh_token", "", { httpOnly: true, secure: true })
        .redirect(FRONTEND_URL);
    } catch (error: any) {
      console.error(
        "Error: logoutCallback controller of `citz-imb-kc-express`",
        error
      );
    }
  };
  return request;
};

/**
 * Use refresh token to get a new access token.
 * @method POST
 * @route /auth/token
 */
export const refreshToken = (options?: KCOptions) => {
  const request = async (req: Request, res: Response) => {
    if (DEBUG) debugControllerCalled("refreshToken");
    try {
      const { refresh_token } = req.cookies;
      if (!refresh_token || refresh_token === "")
        return res.status(401).send("Cookies must include refresh_token.");

      const tokens = await getNewTokens(refresh_token);

      res.json(tokens);
    } catch (error: any) {
      console.error(error);
      res.json({ success: false, error: error.message ?? error });
    }
  };
  return request;
};

export default {
  login,
  loginCallback,
  logout,
  logoutCallback,
  refreshToken,
};
