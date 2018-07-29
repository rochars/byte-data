/*
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview rollup configuration file.
 * @see https://github.com/rochars/byte-data
 */

import closure from 'rollup-plugin-closure-compiler-js';
import {terser} from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import fs from 'fs';

// Externs
const externsFile = fs.readFileSync('./externs/byte-data.js', 'utf8');

// Shims for the UMD
const shims = fs.readFileSync('./shims.js', 'utf8');

// Legal
const license = '// https://github.com/rochars/byte-data\n'

// GCC UMD wrapper
const outputWrapper =
  "var byteData=exports;" +
  "typeof module!=='undefined'?module.exports=exports :" +
  "typeof define==='function'&&define.amd?define(['exports'],exports) :" +
  "typeof global!=='undefined'?global.byteData=exports:null;";

export default [
  // ES6 bundle
  {
    input: 'main.js',
    output: [
      {
        file: 'dist/byte-data.js',
        format: 'es'
      },
    ],
    plugins: [
      resolve(),
      commonjs()
    ]
  },
  // ES6 bundle
  {
    input: 'main.js',
    output: [
      {
        file: 'dist/byte-data.es6.min.js',
        format: 'es'
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      terser()
    ]
  },
  // UMD, minified
  {
    input: 'main.js',
    output: [
      {
        file: 'dist/byte-data.es5.umd.js',
        name: 'byteData',
        format: 'cjs',
        strict: false,
        banner: 'var exports=exports||{};'
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      closure({
        languageIn: 'ECMASCRIPT6',
        languageOut: 'ECMASCRIPT5',
        compilationLevel: 'ADVANCED',
        warningLevel: 'VERBOSE',
        outputWrapper: license + '%output%' + outputWrapper,
        externs: [{src: externsFile + 'exports={};'}]
      }),
      terser()
    ]
  },
  // UMD, shims included, minified
  {
    input: 'main.js',
    output: [
      {
        file: 'dist/byte-data.es3.umd.js',
        name: 'byteData',
        format: 'cjs',
        strict: false,
        banner: 'var exports=exports||{};'
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      closure({
        languageIn: 'ECMASCRIPT6',
        languageOut: 'ECMASCRIPT3',
        compilationLevel: 'ADVANCED',
        warningLevel: 'VERBOSE',
        outputWrapper: license + shims + '%output%' + outputWrapper,
        externs: [{src: externsFile + 'exports={};'}]
      }),
      terser()
    ]
  },
];
