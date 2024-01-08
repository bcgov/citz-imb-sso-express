import { unlinkSync, readdirSync, statSync } from "fs";
import { resolve, join } from "path";

/**
 * Removes all *.d.ts files from the build directory except bundle.d.ts
 * The final build should just include a single bundle.d.ts file.
 */

const buildDir = resolve("build");

const removeDtsFiles = (directory) => {
  const files = readdirSync(directory);

  files.forEach((file) => {
    const filePath = join(directory, file);
    const fileStat = statSync(filePath);

    if (fileStat.isDirectory()) {
      removeDtsFiles(filePath); // Recursively process subdirectories
    } else if (file.endsWith(".d.ts") && file !== "bundle.d.ts") {
      unlinkSync(filePath); // Remove the file if it's a .d.ts file (other than bundle.d.ts)
    }
  });
};

removeDtsFiles(buildDir);
