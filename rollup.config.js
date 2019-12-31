/*
 * Copyright (c) 2017-2019 Rafael da Silva Rocha.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

/**
 * @fileoverview rollup configuration file.
 * @see https://github.com/rochars/byte-data
 */

import fs from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import closure from 'rollup-plugin-closure-compiler-js';
import {terser} from 'rollup-plugin-terser';

/**
 * A lot of extras are necessary to ensure the module works properly
 * in all browsers (including IE6)!
 */

// Externs are loaded as a string to allow items
// to be dinamycally included
let externsFile = fs.readFileSync('./externs/byte-data.js', 'utf8');
externsFile += 'exports={};'

// Polyfills for the UMD to work anywhere
const polyfills = fs.readFileSync('./scripts/polyfills.js', 'utf8');

// A custom UMD wrapper
const outputWrapper =
  "typeof module!=='undefined'?module.exports=exports :" +
  "typeof define==='function'&&define.amd?define(['exports'],exports) :" +
  "typeof global!=='undefined'?global.byteData=exports:null;"+
  "return exports;})();";

export default [
  // Compiles a ES3 UMD, polyfills included.
  // Rollup initially generates this as a CommonJS module;
  // UMD wrapper and polyfills are included later.
  {
    input: 'index.js',
    output: [
      {
        file: 'dist/byte-data.js',
        name: 'byteData',
        format: 'cjs',
        strict: false,
        banner: 'var exports=exports||{};'
      }
    ],
    plugins: [
      resolve(),
      commonjs(),
      // compile with gcc using polyfills to keep
      // it working in older environments.
      // The UMD wrapper is included here.
      closure({
        languageIn: 'ECMASCRIPT6',
        languageOut: 'ECMASCRIPT3',
        compilationLevel: 'ADVANCED',
        warningLevel: 'VERBOSE',
        outputWrapper: ';var byteData=(function(exports){' +
          polyfills + '%output%' +
          outputWrapper,
        assumeFunctionWrapper: true,
        rewritePolyfills: false,
        externs: [{src: externsFile}]
      }),
      // minify the output, now with a UMD wrapper
      // and polyfills.
      terser({
        compress: {
          dead_code: true,
          unsafe: true
        }
      })
    ]
  },
];
