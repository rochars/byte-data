/*
 * https://github.com/rochars/byte-data
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview webpack configuration file.
 * Three dist files are created:
 * - byte-data.cjs.js, CommonJS dist for Node. No dependencies included.
 * - byte-data.umd.js, UMD with dependencies included.
 * - byte-data.min.js, Compiled for browsers. All dependencies included.
 */

const ClosureCompiler = require('google-closure-compiler-js').webpack;

module.exports = [
  // CommonJS dist, no dependencies in the bundle.
  // Will be the one in the "main" field of package.json.
  {
    target: 'node',
    entry: './main.js',
    output: {
      filename: './dist/byte-data.cjs.js',
      libraryTarget: "commonjs"
    },
    externals: {
      'byte-data': 'byte-data',
      "alawmulaw": "alawmulaw",
      "base64-arraybuffer": "base64-arraybuffer",
      "bitdepth": "bitdepth",
      "byte-data": "byte-data",
      "imaadpcm": "imaadpcm",
      "riff-chunks": "riff-chunks"
    }
  },
  // UMD with dependencies in the bundle.
  // Will be the one in the "browser" field of package.json.
  {
    entry: './main.js',
    resolve: {
      mainFields: ['module', 'main']
    },
    output: {
      filename: './dist/byte-data.umd.js',
      library: "byteData",
      libraryTarget: "umd"
    }
  },
  // Browser dist with dependencies, compiled.
  {
    entry: './main.js',
    resolve: {
      mainFields: ['module', 'main']
    },
    output: {
      filename: './dist/byte-data.min.js',
      library: "byteData",
      libraryTarget: "window"
    },
    plugins: [
      new ClosureCompiler({
        options: {
          languageIn: 'ECMASCRIPT6',
          languageOut: 'ECMASCRIPT5',
          compilationLevel: 'ADVANCED',
          warningLevel: 'VERBOSE',
          exportLocalPropertyDefinitions: true,
          generateExports: true
        },
      })
    ]
  }
];
