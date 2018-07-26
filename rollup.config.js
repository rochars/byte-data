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
const shims = fs.readFileSync('./test/dist/shims.js', 'utf8');

// Legal
const license = '// https://github.com/rochars/byte-data\n'

// GCC UMD wrapper
const outputWrapper = license +
  shims +
  '%output%' +
  'var module=module||{};module.exports=exports;' +
  'var define=define||function(){};' +
  'define(["exports"],function(e){return module.exports;});' +
  'var byteData=exports;'

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
      terser()
    ]
  },
  // UMD, shims included, minified
  {
    input: 'dist/byte-data.js',
    output: [
      {
        file: 'dist/byte-data.umd.js',
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
        outputWrapper: outputWrapper,
        externs: [{src: externsFile + 'exports={};'}]
      }),
      terser()
    ]
  },
  // CJS, minified
  // This version is intended to run in Node.js. It does not
  // include any dependency to ensure they are loaded from the
  // ./node_modules folder.
  {
    input: 'dist/byte-data.js',
    output: [
      {
        file: 'dist/byte-data.cjs.js',
        name: 'byteData',
        format: 'cjs',
      }
    ],
    external: [
      'endianness',
      'utf8-buffer'
    ],
    plugins: [
      resolve(),
      commonjs(),
      terser()
    ]
  },
];
