import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Application, urlencoded, json } from 'express';
import router from './router';
import { SSOOptions } from './types';
import debug from './utils/debug';

import config from './config';
import { checkForUpdates } from './utils';
const { FRONTEND_URL } = config;

export { protectedRoute } from './middleware';
export { hasRoles, hasAllRoles, hasAtLeastOneRole } from './utils/user';

export const sso = (app: Application, options?: SSOOptions) => {
  /**
   * Middleware for parsing request bodies.
   * @module body-parser
   * @property {Function} urlencodedParser - Middleware for parsing URL-encoded data from the request body.
   * @property {Function} jsonParser - Middleware for parsing JSON data from the request body.
   */
  app.use(urlencoded({ extended: false }));
  app.use(json());

  /**
   * Sets the default view engine for the application to EJS (Embedded JavaScript).
   *
   * The `view engine` setting is used by Express to automatically render views
   * with the specified engine. By setting it to EJS, you can use EJS templates
   * to generate HTML output in your application.
   */
  app.set('view engine', 'ejs');

  // Allows for use of req.cookies
  app.use(cookieParser());

  /**
   * Middleware for enabling Cross-Origin Resource Sharing (CORS) on the server.
   * @module cors
   * @property {boolean} credentials - Whether to allow credentials to be included in CORS requests.
   */
  app.use(
    cors({
      origin: FRONTEND_URL,
      credentials: true,
    }),
  );

  // Routes defined in ./router file.
  app.use('/auth', router(options));

  // Check for updates
  checkForUpdates();

  debug.initialized();
};
