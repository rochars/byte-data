/*
 * https://github.com/rochars/byte-data
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview rollup configuration file.
 */

import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import closure from 'rollup-plugin-closure-compiler-js';

// Legal
const license = '/*!\n'+
  ' * byte-data Copyright (c) 2017-2018 Rafael da Silva Rocha.\n'+
  ' */\n';

// Read externs definitions
const fs = require('fs');
const externals = fs.readFileSync('./externs.js', 'utf8');

export default [
  // cjs
  {
    input: 'main.js',
    external: ['endianness'],
    output: [
      {
        file: 'dist/byte-data.cjs.js',
        name: 'byte-data',
        format: 'cjs'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
    ]
  },
  // umd, es
  {
    input: 'main.js',
    output: [
      {
        file: 'dist/byte-data.umd.js',
        name: 'byte-data',
        format: 'umd'
      },
      {
        file: 'dist/byte-data.js',
        format: 'es'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
    ]
  },  
  // browser
  {
    input: './main.js',
    output: [
      {
        file: 'dist/byte-data.min.js',
        name: 'byteData',
        format: 'iife'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      closure({
        languageIn: 'ECMASCRIPT6',
        languageOut: 'ECMASCRIPT5',
        compilationLevel: 'SIMPLE',
        warningLevel: 'VERBOSE',
        outputWrapper: license + '%output%window.byteData=byteData;'
      })
    ]
  }
];
