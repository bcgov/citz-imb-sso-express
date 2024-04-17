import { SSOOptions } from '../types';
import { Request, Response } from 'express';
import { getLogoutURL } from '../utils/authUrls';
import { getUserInfo, normalizeUser } from '../utils/user';
import debug from '../utils/debug';

/**
 * Logs out the user and, once finished, redirects them to /auth/logout/callback
 * @method GET
 * @route /auth/logout
 */
export const logout = (options?: SSOOptions) => {
  const request = async (req: Request, res: Response) => {
    debug.controllerCalled('logout');
    try {
      debug.logQueryParams('logout', req.query);
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
        res.json({ success: false, error: error.message });
      } else {
        res.json({ success: false, error: error });
      }
    }
  };
  return request;
};
