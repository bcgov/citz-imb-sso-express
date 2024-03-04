import config from '../config';
import { KeycloakUser } from '../types';
const { DEBUG, VERBOSE_DEBUG, PACKAGE_NAME } = config;

const controllerCalled = (controllerName: string) => {
  if (DEBUG && VERBOSE_DEBUG) console.info(`DEBUG: ${controllerName} of '${PACKAGE_NAME}' called.`);
};

const controllerError = (controllerName: string, error: unknown) => {
  console.error(`Error: ${controllerName} of '${PACKAGE_NAME}' called.`, error);
};

const afterUserLogout = (user: KeycloakUser | null) => {
  if (DEBUG && VERBOSE_DEBUG)
    console.info(`DEBUG: afterUserLogout function of '${PACKAGE_NAME}' called.`);
  if (!user && DEBUG)
    console.info(`DEBUG: Can't get user info in afterUserLogout function of '${PACKAGE_NAME}'.`);
};

const afterUserLogin = (user: KeycloakUser | null) => {
  if (DEBUG && VERBOSE_DEBUG)
    console.info(`DEBUG: afterUserLogin function of '${PACKAGE_NAME}' called.`);
  if (!user && DEBUG)
    console.info(`DEBUG: Can't get user info in afterUserLogin function of '${PACKAGE_NAME}'.`);
};

const initialized = () => {
  if (DEBUG) console.info(`DEBUG: Initialized '${PACKAGE_NAME}'.`);
};

export default {
  controllerCalled,
  controllerError,
  afterUserLogout,
  afterUserLogin,
  initialized,
};
