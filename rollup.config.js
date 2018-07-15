/*
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview rollup configuration file.
 * @see https://github.com/rochars/byte-data
 */

import closure from 'rollup-plugin-closure-compiler-js';
import babel from 'rollup-plugin-babel';
import fs from 'fs';

// Externs
const externsFile = fs.readFileSync('./externs/byte-data.js', 'utf8');

// Legal
const license = '/*!\n'+
  ' * byte-data Copyright (c) 2017-2018 Rafael da Silva Rocha. MIT license.\n'+
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
    ]
  },
  // umd bundle
  {
    input: 'main.js',
    output: [
      {
        file: 'dist/byte-data.umd.js',
        name: 'byteData',
        format: 'umd'
      }
    ],
    plugins: [
      babel()
    ]
  },  
  // browser bundle
  {
    input: 'main.js',
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
