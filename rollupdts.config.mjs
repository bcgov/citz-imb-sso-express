import dts from "rollup-plugin-dts";
import multiEntry from "@rollup/plugin-multi-entry";

export default [
  {
    input: "build/**/*.d.ts",
    output: [{ file: "build/bundle.d.ts", format: "es" }],
    plugins: [dts(), multiEntry()],
  },
];
