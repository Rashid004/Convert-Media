/** @format */

const typescript = require("@rollup/plugin-typescript");
const commonjs = require("@rollup/plugin-commonjs");
const resolve = require("@rollup/plugin-node-resolve");
const fs = require("fs");

// Read package.json
const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));

module.exports = {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "esm",
      sourcemap: true,
    },
  ],
  external: ["react", "react-dom", "sharp", "fs-extra", "express"],
  plugins: [resolve(), commonjs(), typescript({ tsconfig: "./tsconfig.json" })],
};
