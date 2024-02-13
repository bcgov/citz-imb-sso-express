import fs from "fs";
import { resolve } from "path";

// Parse and validate version numbers
const parseVersion = (version) => {
  const parts = version.split(".");
  if (parts.length !== 3 || parts.some((part) => isNaN(part))) {
    throw new Error("Invalid version number");
  }
  return parts.map(Number);
};

// Bump the version
const bumpVersion = (version, releaseType) => {
  let [major, minor, patch] = parseVersion(version);

  switch (releaseType) {
    case "major":
      major += 1;
      minor = 0;
      patch = 0;
      break;
    case "minor":
      minor += 1;
      patch = 0;
      break;
    case "patch":
      patch += 1;
      break;
    default:
      throw new Error(
        'Invalid release type. Use "major", "minor", or "patch".'
      );
  }

  return [major, minor, patch].join(".");
};

// Update package.json
const main = (releaseType) => {
  const packagePath = resolve(process.cwd(), "package.json");

  if (!fs.existsSync(packagePath)) {
    console.error("package.json not found!");
    process.exit(1);
  }

  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  const oldVersion = packageJson.version;

  try {
    const newVersion = bumpVersion(oldVersion, releaseType);
    packageJson.version = newVersion;

    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + "\n");
    console.log(`\nVersion updated from ${oldVersion} to ${newVersion}\n`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Get the release type from the command line argument
const releaseType = process.argv[2]; // "patch" | "minor" | "major"

if (!releaseType) {
  console.error("Usage: node bump-version.mjs <release_type>");
  console.error('Release type must be "major", "minor", or "patch".');
  process.exit(1);
}

main(releaseType);
