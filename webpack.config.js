/*
 * https://github.com/rochars/wavefile
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview webpack configuration file.
 */

const ClosureCompiler = require('google-closure-compiler-js').webpack;

module.exports = [
  // Browser dist with dependencies, compiled.
  {
    entry: './main.js',
    mode: 'production',
    resolve: {
      mainFields: ['module', 'main']
    },
    optimization: {minimize:false},
    output: {
      filename: 'byte-data.min.js',
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
        }
      })
    ]
  }
];
