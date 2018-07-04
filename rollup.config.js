/*
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview rollup configuration file.
 * @see https://github.com/rochars/byte-data
 */

import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import closure from 'rollup-plugin-closure-compiler-js';

// Legal
const license = '/*!\n'+
  ' * byte-data Copyright (c) 2017-2018 Rafael da Silva Rocha.\n'+
  ' */\n';

export default [
  // cjs bundle, es bundle
  {
    input: 'main.js',
    output: [
      {
        file: 'dist/byte-data.cjs.js',
        name: 'byte-data',
        format: 'cjs'
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
  // umd from the es bundle
  {
    input: 'dist/byte-data.js',
    output: [
      {
        file: 'dist/byte-data.umd.js',
        name: 'byte-data',
        format: 'umd'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
    ]
  },  
  // browser version from the es bundle
  {
    input: 'dist/byte-data.js',
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
