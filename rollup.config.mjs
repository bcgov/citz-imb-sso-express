import dts from "rollup-plugin-dts";

export default {
  input: "build/bundle.d.ts",
  output: {
    file: "build/index.d.ts",
    format: "es",
  },
  plugins: [dts()],
};
