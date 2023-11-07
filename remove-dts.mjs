import { unlinkSync, readdirSync } from "fs";
import { resolve, join } from "path";

const buildDir = resolve("build");
const files = readdirSync(buildDir);

// Remove all other .d.ts files except bundle.d.ts
files.forEach((file) => {
  if (file.endsWith(".d.ts") && file !== "index.d.ts") {
    unlinkSync(join(buildDir, file));
  }
});
