import { readdirSync, rmdirSync, statSync } from "fs";
import { resolve, join } from "path";

/**
 * Removes all empty directories within build directory.
 * Clean up.
 */

const buildDir = resolve("build");

const removeEmptyDirectories = (directory) => {
  const files = readdirSync(directory);

  if (files.length === 0) {
    // Directory is empty, remove it
    rmdirSync(directory);
    return;
  }

  files.forEach((file) => {
    const filePath = join(directory, file);
    const fileStat = statSync(filePath);

    if (fileStat.isDirectory()) {
      removeEmptyDirectories(filePath); // Recursively process subdirectories

      // Check again if the directory is empty after removing subdirectories
      if (readdirSync(directory).length === 0) {
        rmdirSync(directory);
      }
    }
  });
};

removeEmptyDirectories(buildDir);
