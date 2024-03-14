import { Router } from 'express';
import { login, loginCallback, logout, logoutCallback, refreshToken } from './controllers';
import { SSOOptions } from './types';

const router = Router();

const authRouter = (options?: SSOOptions) => {
  /**
   * Prompts the user to login.
   * @method GET
   * @route /auth/login
   */
  router.get('/login', login(options));

  /**
   * Redirects user to the frontend, with tokens.
   * @method GET
   * @route /auth/login/callback
   */
  router.get('/login/callback', loginCallback(options));

  /**
   * Logs out the user and, once finished, redirects to /auth/logout/callback
   * @method GET
   * @route /auth/logout
   */
  router.get('/logout', logout(options));

  /**
   * Removes the user's httpOnly refresh token, and redirects back to the frontend.
   * @method GET
   * @route /auth/logout/callback
   */
  router.get('/logout/callback', logoutCallback(options));

  /**
   * Use refresh token to get a new access token.
   * @method POST
   * @route /auth/token
   */
  router.post('/token', refreshToken(options));

  return router;
};

export default authRouter;
