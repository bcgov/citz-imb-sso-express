import { SSOOptions } from '../types';
import { Request, Response } from 'express';
import { getNewTokens } from '../utils/kcApi';
import debug from '../utils/debug';

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
