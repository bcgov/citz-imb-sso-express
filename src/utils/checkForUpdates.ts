import packageJson from '../../package.json';

const getLatestVersion = async (packageName: string): Promise<string> => {
  const response = await fetch(`https://registry.npmjs.org/${packageName}`);
  const data = await response.json();
  return data['dist-tags'].latest;
};

// Console Colors
const RESET = '\x1b[0m';
const WHITE = '\x1b[1m\x1b[37m';
const BACKGROUND_RED = '\x1b[1m\x1b[41m';

/**
 * Checks for updated versions of the package and if available, logs to console.
 * Requires NODE_ENV to be set to 'development'.
 */
export const checkForUpdates = async () => {
  try {
    const packageName = packageJson.name;
    const currentVersion = packageJson.version;
    const latestVersion = await getLatestVersion(packageName);

    if (process.env.NODE_ENV === 'development' && currentVersion !== latestVersion) {
      console.log(
        `\n${BACKGROUND_RED}${WHITE}Update available for ${packageName}: ${currentVersion} -> ${latestVersion}${RESET}\n`,
      );
    }
  } catch (error) {
    console.error('Error checking for updates:', error);
  }
};
