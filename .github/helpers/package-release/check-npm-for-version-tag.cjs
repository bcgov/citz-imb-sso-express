/**
 * Checks that the tagged version of a package exists in the NPM registry.
 * @param {string} packageName - Property 'name' of package.json
 * @param {string} version - Property 'version' of package.json
 * @param {string} tag - Version tag such as 'beta' or 'rc'
 */
export const checkNPMForVersionTag = async (packageName, version, tag) => {
  const url = `https://registry.npmjs.org/${encodeURIComponent(packageName)}`;
  const taggedVersion = `${version}-${tag}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const packageData = await response.json();

    if (packageData.versions && packageData.versions[taggedVersion]) {
      console.log(`Success: ${taggedVersion} exists for package ${packageName}.`);
    } else {
      console.error(`Error: ${taggedVersion} does not exist for package ${packageName}.`);
      process.exit(1);
    }
  } catch (error) {
    console.error('Error fetching data from npm registry:', error.message);
    process.exit(1);
  }
};
