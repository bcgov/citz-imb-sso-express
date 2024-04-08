import config from '../config';
import { SSOUser } from '../types';
const { DEBUG, VERBOSE_DEBUG, PACKAGE_NAME } = config;

const controllerCalled = (controllerName: string) => {
  if (DEBUG && VERBOSE_DEBUG) console.info(`DEBUG: ${controllerName} of '${PACKAGE_NAME}' called.`);
};

const controllerError = (controllerName: string, error: unknown) => {
  console.error(`Error: ${controllerName} of '${PACKAGE_NAME}' called.`, error);
};

const afterUserLogout = (user: SSOUser | null) => {
  if (DEBUG && VERBOSE_DEBUG)
    console.info(`DEBUG: afterUserLogout function of '${PACKAGE_NAME}' called.`);
  if (!user && DEBUG)
    console.info(`DEBUG: Can't get user info in afterUserLogout function of '${PACKAGE_NAME}'.`);
};

const afterUserLogin = (user: SSOUser | null) => {
  if (DEBUG && VERBOSE_DEBUG)
    console.info(`DEBUG: afterUserLogin function of '${PACKAGE_NAME}' called.`);
  if (!user && DEBUG)
    console.info(`DEBUG: Can't get user info in afterUserLogin function of '${PACKAGE_NAME}'.`);
};

const initialized = () => {
  if (DEBUG) console.info(`DEBUG: Initialized '${PACKAGE_NAME}'.`);
};

const unauthorizedTokenError = (refresh_token: string) => {
  if (DEBUG && VERBOSE_DEBUG)
    console.info(`DEBUG: refresh_token of '${PACKAGE_NAME}' token endpoint is '${refresh_token}'.`);
};

const loginURL = (url: string) => {
  if (DEBUG && VERBOSE_DEBUG)
    console.info(`DEBUG: loginURL of '${PACKAGE_NAME}' login endpoint is '${url}'.`);
};

const logoutURL = (url: string) => {
  if (DEBUG && VERBOSE_DEBUG)
    console.info(`DEBUG: logoutURL of '${PACKAGE_NAME}' logout endpoint is '${url}'.`);
};

const loginCallbackRedirectURL = (url: string) => {
  if (DEBUG && VERBOSE_DEBUG)
    console.info(
      `DEBUG: loginCallbackRedirectURL of '${PACKAGE_NAME}' login/callback endpoint is '${url}'.`,
    );
};

const logQueryParams = (controllerName: string, query: unknown) => {
  if (DEBUG && VERBOSE_DEBUG)
    console.info(`DEBUG: Query parameters of ${controllerName} of '${PACKAGE_NAME}' are: `, query);
};

const getTokensResponse = (response: unknown) => {
  if (DEBUG && VERBOSE_DEBUG)
    console.info(`DEBUG: getTokens response of '${PACKAGE_NAME}' is: `, response);
};

export default {
  controllerCalled,
  controllerError,
  afterUserLogout,
  afterUserLogin,
  initialized,
  unauthorizedTokenError,
  loginURL,
  logoutURL,
  loginCallbackRedirectURL,
  logQueryParams,
  getTokensResponse,
};
