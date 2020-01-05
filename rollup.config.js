/*
 * Copyright (c) 2019 Rafael da Silva Rocha.
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
import compiler from '@ampproject/rollup-plugin-closure-compiler';

/**
 * Some extra steps are necessary to ensure the module
 * works properly in all browsers
 */

// Polyfills for the UMD to work anywhere
let polyfills = fs.readFileSync('./scripts/polyfills.min.js', 'utf8');

// A custom UMD wrapper
let outputHeader = 
'/*! https://github.com/rochars/byte-data\n' +
'Copyright (c) 2019 Rafael da Silva Rocha */\n' + polyfills +
';var byteData=(function(exports){var exports=exports||{};';

let outputFooter =
  "typeof module!=='undefined'?module.exports=exports :" +
  "typeof define==='function'&&define.amd?define(['exports'],exports) :" +
  "typeof global!=='undefined'?global.byteData=exports:null;"+
  "return exports;})();";

export default [
  {
    input: 'index.js',
    // bundle the module as CommonJS; the rest of the
    // UMD wrapper is added after compilation
    output: [
      {
        file: 'dist/byte-data.js',
        name: 'byteData',
        format: 'cjs',
        strict: false
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      // use closure compiler to transpile/compile then
      // add the rest of the UMD header and footer  
      compiler({
        language_in: 'ECMASCRIPT6',
        language_out: 'ECMASCRIPT3',
        compilation_level: 'ADVANCED',
        warning_level: 'VERBOSE',
        outputWrapper: outputHeader + '%output%' + outputFooter,
        externs: ['externs/byte-data.js']
      }),
    ]
  }
];
