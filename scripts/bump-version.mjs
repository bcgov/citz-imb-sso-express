import fs from 'fs';
import { resolve } from 'path';

/**
 * This script updates the version number in your package.json file.
 * It supports three main actions:
 * 1. Bumping the version number (major, minor, patch).
 * 2. Adding or incrementing pre-release tags (beta, rc).
 * 3. Removing pre-release tags (beta, rc).
 *
 * Note: When trying to add rc tag to a version that is already using a beta tag,
 * the beta tag will be removed and replaced with the rc tag.
 *
 * Usage:
 *   node bump-version.mjs <action> <tag>
 *
 * Actions:
 *   - bump: Bumps the version number. Requires a <tag> argument which can be "major", "minor", or "patch".
 *     Example: node bump-version.mjs bump patch
 *
 *   - add-tag: Adds or increments a pre-release tag. Requires a <tag> argument which can be "beta" or "rc".
 *     Example: node bump-version.mjs add-tag beta
 *
 *   - remove-tag: Removes any pre-release tag. Does not require a <tag> argument.
 *     Example: node bump-version.mjs remove-tag
 *
 * Examples:
 *   - Increment the patch version: node bump-version.mjs bump patch
 *   - Add the "-beta" tag: node bump-version.mjs add-tag beta
 *   - Remove any pre-release tag: node bump-version.mjs remove-tag
 *
 * The script performs the following steps:
 * 1. Reads the current version from package.json.
 * 2. Validates and parses the version number.
 * 3. Depending on the action, it either bumps the version, adds/increments a tag, or removes a tag.
 * 4. Updates the version in package.json and saves the file.
 */

// Parse and validate version numbers
const parseVersion = (version) => {
  const parts = version.split('.');
  if (parts.length !== 3 || parts.some((part) => isNaN(Number(part)))) {
    throw new Error('Invalid version number');
  }
  return parts.map(Number);
};

// Bump the version
const bumpVersion = (version, releaseType) => {
  let [major, minor, patch] = parseVersion(version);

  switch (releaseType) {
    case 'major':
      major += 1;
      minor = 0;
      patch = 0;
      break;
    case 'minor':
      minor += 1;
      patch = 0;
      break;
    case 'patch':
      patch += 1;
      break;
    default:
      throw new Error('Invalid release type. Use "major", "minor", or "patch".');
  }

  return [major, minor, patch].join('.');
};

// Add or remove beta/rc tag
const updatePreReleaseTag = (version, tag) => {
  const [mainVersion, preReleaseTag] = version.split('-');

  if (preReleaseTag && tag === 'rc' && preReleaseTag.startsWith('beta')) {
    // If the version already has a beta tag, remove it and add the rc tag
    return `${mainVersion}-${tag}`;
  }

  if (!preReleaseTag) {
    return `${mainVersion}-${tag}`;
  }

  const tagPattern = new RegExp(`^(${tag})(\\d*)$`);
  const match = preReleaseTag.match(tagPattern);

  if (match) {
    const suffix = match[2] ? parseInt(match[2], 10) + 1 : 2;
    return `${mainVersion}-${tag}${suffix}`;
  }

  return `${mainVersion}-${tag}`;
};

const removePreReleaseTag = (version) => {
  return version.split('-')[0];
};

// Update package.json
const main = (action, tag) => {
  const packagePath = resolve(process.cwd(), 'package.json');

  if (!fs.existsSync(packagePath)) {
    console.error('package.json not found!');
    process.exit(1);
  }

  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const oldVersion = packageJson.version;

  try {
    let newVersion;
    if (action === 'bump') {
      newVersion = bumpVersion(oldVersion, tag);
    } else if (action === 'add-tag') {
      newVersion = updatePreReleaseTag(oldVersion, tag);
    } else if (action === 'remove-tag') {
      newVersion = removePreReleaseTag(oldVersion);
    } else {
      throw new Error('Invalid action. Use "bump", "add-tag", or "remove-tag".');
    }

    packageJson.version = newVersion;

    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`\nVersion updated from ${oldVersion} to ${newVersion}\n`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Get the action and tag from the command line arguments
const [action, tag] = process.argv.slice(2); // "bump" | "add-tag" | "remove-tag" and "patch" | "minor" | "major" | "beta" | "rc"

if (
  !action ||
  (action === 'bump' && !tag) ||
  (action !== 'bump' && action !== 'add-tag' && action !== 'remove-tag')
) {
  console.error('Usage: node bump-version.mjs <action> <tag>');
  console.error('Actions: "bump", "add-tag", "remove-tag"');
  console.error(
    'Tags: "major", "minor", "patch", "beta", "rc" (for bump), "beta", "rc" (for add-tag/remove-tag)',
  );
  process.exit(1);
}

main(action, tag);
