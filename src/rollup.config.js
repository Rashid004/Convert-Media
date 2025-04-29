/** @format */

import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import pkg from "./package.json" assert { type: "json" };

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "esm",
      sourcemap: true,
    },
  ],
  external: ["react", "react-dom", "sharp", "fs-extra"],
  plugins: [resolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json" })],
};
