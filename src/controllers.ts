import { IdentityProvider, SSOOptions } from './types';
import { Request, Response } from 'express';
import { getNewTokens, getTokens } from './utils/kcApi';
import { getLoginURL, getLogoutURL } from './utils/authUrls';
import { getUserInfo, normalizeUser } from './utils/user';
import debug from './utils/debug';

import config from './config';
const { FRONTEND_URL } = config;

/**
 * Prompts the user to login.
 * @method GET
 * @route /auth/login
 */
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const login = (options?: SSOOptions) => {
  const request = async (req: Request, res: Response) => {
    debug.controllerCalled('login');
    try {
      const { idp } = req.query;

      const redirectURL = getLoginURL(idp as IdentityProvider);
      debug.loginURL(redirectURL);
      if (!req.token) return res.redirect(redirectURL);

      return res.redirect('');
    } catch (error: unknown) {
      // Log error and send response
      debug.controllerError('login', error);
      if (error instanceof Error) {
        res.json({ success: false, error: error.message ?? error });
      } else {
        res.json({ success: false, error: error });
      }
    }
  };
  return request;
};

/**
 * Redirects user to the frontend, with refresh token.
 * @method GET
 * @route /auth/login/callback
 */
export const loginCallback = (options?: SSOOptions) => {
  const request = async (req: Request, res: Response) => {
    debug.controllerCalled('loginCallback');
    try {
      const { code } = req.query;
      const { access_token, refresh_token, refresh_expires_in } = await getTokens(code as string);

      const redirectURL = `${FRONTEND_URL}?refresh_expires_in=${refresh_expires_in}`;
      debug.loginCallbackRedirectURL(redirectURL);

      // Send response.
      res
        .cookie('refresh_token', refresh_token, {
          httpOnly: true,
          secure: true,
        })
        .redirect(redirectURL);

      // Run after login callback request.
      if (options?.afterUserLogin) {
        const user = getUserInfo(access_token);
        const normalizedUser = normalizeUser(user);
        debug.afterUserLogin(normalizedUser);

        if (normalizedUser) options.afterUserLogin(normalizedUser);
      }
    } catch (error: unknown) {
      // Log error and send response
      debug.controllerError('loginCallback', error);
      if (error instanceof Error) {
        res.json({ success: false, error: error.message ?? error });
      } else {
        res.json({ success: false, error: error });
      }
    }
  };
  return request;
};

/**
 * Logs out the user and, once finished, redirects them to /auth/logout/callback
 * @method GET
 * @route /auth/logout
 */
export const logout = (options?: SSOOptions) => {
  const request = async (req: Request, res: Response) => {
    debug.controllerCalled('logout');
    try {
      const { id_token } = req.query;
      if (!id_token) return res.status(401).send('id_token query param required');

      const redirectURL = getLogoutURL(id_token as string);
      debug.logoutURL(redirectURL);
      res.redirect(redirectURL);

      // Run after logout callback request.
      if (options?.afterUserLogout) {
        const user = getUserInfo(id_token as string);
        const normalizedUser = normalizeUser(user);
        debug.afterUserLogout(normalizedUser);

        if (normalizedUser) options.afterUserLogout(normalizedUser);
      }
    } catch (error: unknown) {
      // Log error and send response
      debug.controllerError('logout', error);
      if (error instanceof Error) {
        res.json({ success: false, error: error.message ?? error });
      } else {
        res.json({ success: false, error: error });
      }
    }
  };
  return request;
};

/**
 * Removes the user's httpOnly refresh token, and redirects back to the frontend.
 * @method GET
 * @route /auth/logout/callback
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export const logoutCallback = (options?: SSOOptions) => {
  const request = async (req: Request, res: Response) => {
    debug.controllerCalled('logoutCallback');
    try {
      res
        .cookie('refresh_token', '', { httpOnly: true, secure: true })
        .redirect(FRONTEND_URL ?? '');
    } catch (error: unknown) {
      // Log error and send response
      debug.controllerError('logoutCallback', error);
      if (error instanceof Error) {
        res.json({ success: false, error: error.message ?? error });
      } else {
        res.json({ success: false, error: error });
      }
    }
  };
  return request;
};

/**
 * Use refresh token to get a new access token.
 * @method POST
 * @route /auth/token
 */
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const refreshToken = (options?: SSOOptions) => {
  const request = async (req: Request, res: Response) => {
    debug.controllerCalled('refreshToken');
    try {
      const { refresh_token } = req.cookies;
      if (!refresh_token || refresh_token === '') {
        debug.unauthorizedTokenError(refresh_token);
        return res.status(401).send('Cookies must include refresh_token.');
      }

      const tokens = await getNewTokens(refresh_token);

      res.json(tokens);
    } catch (error: unknown) {
      // Log error and send response
      console.error(error);
      if (error instanceof Error) {
        res.json({ success: false, error: error.message ?? error });
      } else {
        res.json({ success: false, error: error });
      }
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
