import { SSOOptions } from '../types';
import { Request, Response } from 'express';
import { getTokens } from '../utils/kcApi';
import { getUserInfo, normalizeUser } from '../utils/user';
import debug from '../utils/debug';

import config from '../config';
const { COOKIE_DOMAIN, FRONTEND_URL } = config;

/**
 * Redirects user to the frontend, with refresh token.
 * @method GET
 * @route /auth/login/callback
 */
export const loginCallback = (options?: SSOOptions) => {
  const request = async (req: Request, res: Response) => {
    debug.controllerCalled('loginCallback');
    try {
      debug.logQueryParams('loginCallback', req.query);
      const { code } = req.query;
      const { post_login_redirect_url } = req.cookies;

      const { access_token, refresh_token, refresh_expires_in } = await getTokens(code as string);

      const redirectURL = `${FRONTEND_URL}?refresh_expires_in=${refresh_expires_in}&post_login_redirect_url=${post_login_redirect_url}`;
      debug.loginCallbackRedirectURL(redirectURL);

      // Send response.
      res
        .cookie('refresh_token', refresh_token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          domain: COOKIE_DOMAIN,
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
        res.json({ success: false, error: error.message });
      } else {
        res.json({ success: false, error: error });
      }
    }
  };
  return request;
};
