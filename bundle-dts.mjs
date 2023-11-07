import { readdirSync, writeFileSync, statSync } from "fs";
import { resolve, join } from "path";

const buildDir = resolve("build");

let exportsStr = "";

function processDirectory(directory) {
  const files = readdirSync(directory);

  files.forEach((file) => {
    const filePath = join(directory, file);
    const fileStat = statSync(filePath);

    if (fileStat.isDirectory()) {
      processDirectory(filePath); // Recursively inspect the directory
    } else if (file.endsWith(".d.ts")) {
      const relativePath = filePath.substring(
        buildDir.length + 1,
        filePath.length - 5
      ); // Subtracting .d.ts from the end
      exportsStr += `export * from './${relativePath.replace(/\\/g, "/")}';\n`; // Replace backslashes with forward slashes for module paths
    }
  });
}

processDirectory(buildDir);

// Write the aggregated types to aggregated.d.ts
writeFileSync(join(buildDir, "bundle.d.ts"), exportsStr);
