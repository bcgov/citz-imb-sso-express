import { IdentityProvider, SSOOptions } from '../types';
import { Request, Response } from 'express';
import { getLoginURL } from '../utils/authUrls';
import debug from '../utils/debug';

import config from '../config';
const { COOKIE_DOMAIN } = config;

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
      debug.logQueryParams('login', req.query);
      const { idp, post_login_redirect_url } = req.query;

      const redirectURL = getLoginURL(idp as IdentityProvider);
      debug.loginURL(redirectURL);
      if (!req.token)
        return res
          .cookie('post_login_redirect_url', post_login_redirect_url, {
            domain: COOKIE_DOMAIN,
          })
          .redirect(redirectURL);

      return res.redirect('');
    } catch (error: unknown) {
      // Log error and send response
      debug.controllerError('login', error);
      if (error instanceof Error) {
        res.json({ success: false, error: error.message });
      } else {
        res.json({ success: false, error: error });
      }
    }
  };
  return request;
};
