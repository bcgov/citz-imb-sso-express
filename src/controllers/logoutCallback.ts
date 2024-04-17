import { SSOOptions } from '../types';
import { Request, Response } from 'express';
import debug from '../utils/debug';

import config from '../config';
const { FRONTEND_URL } = config;

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
        res.json({ success: false, error: error.message });
      } else {
        res.json({ success: false, error: error });
      }
    }
  };
  return request;
};
