#!/bin/bash

# Create rollup.config.cjs with CommonJS syntax
cat > rollup.config.cjs << 'EOF'
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const fs = require('fs');

// Read package.json
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'esm',
      sourcemap: true
    }
  ],
  external: ['react', 'react-dom', 'sharp', 'fs-extra', 'express'],
  plugins: [
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' })
  ]
};
EOF

# Update package.json script to use the .cjs file
if grep -q "\"build\": \"rollup -c\"" package.json; then
  sed -i 's/"build": "rollup -c"/"build": "rollup -c rollup.config.cjs"/g' package.json
  sed -i 's/"dev": "rollup -c -w"/"dev": "rollup -c rollup.config.cjs -w"/g' package.json
  echo "Updated package.json scripts to use rollup.config.cjs"
else
  echo "Package.json build script not found or already updated"
fi

# Create dist directory if it doesn't exist
mkdir -p dist

# Install any missing dependencies
npm install --no-save rimraf @rollup/plugin-typescript @rollup/plugin-commonjs @rollup/plugin-node-resolve

echo "Setup complete. Now try running: npm run build"