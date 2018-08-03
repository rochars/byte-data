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
const polyfills = fs.readFileSync('./scripts/polyfills.js', 'utf8');
const shims = fs.readFileSync('./scripts/shims.js', 'utf8');

// GCC UMD wrapper
const outputWrapper =
  "typeof module!=='undefined'?module.exports=exports :" +
  "typeof define==='function'&&define.amd?define(['exports'],exports) :" +
  "typeof global!=='undefined'?global.byteData=exports:null; return exports;})();";

export default [
  // ES6 bundle
  {
    input: 'index.js',
    output: [
      {
        file: 'dist/byte-data.js',
        format: 'es'
      }
    ],
    plugins: [
      resolve(),
      commonjs()
    ]
  },
  // ES6 bundle, minified
  {
    input: 'dist/byte-data.js',
    output: [
      {
        file: 'dist/byte-data.min.js',
        format: 'es'
      },
    ],
    plugins: [
      terser({
          compress: {
            dead_code: true,
            unsafe: true
          }
      })
    ]
  },
  // UMD, ES3, polyfills and shims included, minified
  {
    input: 'dist/byte-data.js',
    output: [
      {
        file: 'dist/byte-data.umd.js',
        name: 'byteData',
        format: 'cjs',
        strict: false,
        banner: 'var exports=exports||{};',
        outro: shims
      }
    ],
    plugins: [
      closure({
        languageIn: 'ECMASCRIPT6',
        languageOut: 'ECMASCRIPT3',
        compilationLevel: 'ADVANCED',
        warningLevel: 'VERBOSE',
        outputWrapper: ';var byteData=(function(exports){' +
          polyfills + '%output%' +
          outputWrapper,
        assumeFunctionWrapper: true,
        rewritePolyfills: true,
        externs: [{src: externsFile + 'exports={};'}]
      }),
      terser({
        compress: {
          dead_code: true,
          unsafe: true
        }
      })
    ]
  },
];
