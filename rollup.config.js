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

// Externs
const fs = require('fs');
const externsFile = fs.readFileSync('./externs.js', 'utf8');

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
        name: 'bytedata',
        format: 'iife',
        banner: license,
        footer: 'window.byteData=bytedata;'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      closure({
        languageIn: 'ECMASCRIPT6',
        languageOut: 'ECMASCRIPT5',
        compilationLevel: 'ADVANCED',
        warningLevel: 'VERBOSE',
        externs: [{src: externsFile}]
      })
    ]
  }
];
