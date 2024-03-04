import { IdentityProvider, KCOptions } from './types';
import { Request, Response } from 'express';
import { getNewTokens, getTokens } from './utils/kcApi';
import { getLoginURL, getLogoutURL } from './utils/authUrls';
import { getUserInfo } from './utils/user';
import debug from './utils/debug';

import config from './config';
const { FRONTEND_URL } = config;

/**
 * Prompts the user to login.
 * @method GET
 * @route /auth/login
 */
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const login = (options?: KCOptions) => {
  const request = async (req: Request, res: Response) => {
    debug.controllerCalled('login');
    try {
      const { idp } = req.query;
      if (!req.token) return res.redirect(getLoginURL(idp as IdentityProvider));
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
export const loginCallback = (options?: KCOptions) => {
  const request = async (req: Request, res: Response) => {
    debug.controllerCalled('loginCallback');
    try {
      const { code } = req.query;
      const { access_token, refresh_token, refresh_expires_in } = await getTokens(code as string);

      // Send response.
      res
        .cookie('refresh_token', refresh_token, {
          httpOnly: true,
          secure: true,
        })
        .redirect(`${FRONTEND_URL}?refresh_expires_in=${refresh_expires_in}`);

      // Run after login callback request.
      if (options?.afterUserLogin) {
        const user = getUserInfo(access_token);
        debug.afterUserLogin(user);

        if (user) options.afterUserLogin(user);
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
export const logout = (options?: KCOptions) => {
  const request = async (req: Request, res: Response) => {
    debug.controllerCalled('logout');
    try {
      const { id_token } = req.query;
      if (!id_token) return res.status(401).send('id_token query param required');
      res.redirect(getLogoutURL(id_token as string));

      // Run after logout callback request.
      if (options?.afterUserLogout) {
        const user = getUserInfo(id_token as string);
        debug.afterUserLogout(user);

        if (user) options.afterUserLogout(user);
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
export const logoutCallback = (options?: KCOptions) => {
  const request = async (req: Request, res: Response) => {
    debug.controllerCalled('logoutCallback');
    try {
      res.cookie('refresh_token', '', { httpOnly: true, secure: true }).redirect(FRONTEND_URL);
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
export const refreshToken = (options?: KCOptions) => {
  const request = async (req: Request, res: Response) => {
    debug.controllerCalled('refreshToken');
    try {
      const { refresh_token } = req.cookies;
      if (!refresh_token || refresh_token === '')
        return res.status(401).send('Cookies must include refresh_token.');

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
