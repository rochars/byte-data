/*
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview rollup configuration file.
 * @see https://github.com/rochars/byte-data
 */

import closure from 'rollup-plugin-closure-compiler-js';

// Externs
const fs = require('fs');
const externsFile = fs.readFileSync('./externs.js', 'utf8');

// Legal
const license = '/*!\n'+
  ' * byte-data Copyright (c) 2017-2018 Rafael da Silva Rocha.\n'+
  ' */\n';

let CJSBanner = "'use strict';Object.defineProperty(" +
  "exports, '__esModule', { value: true });";
let CJSFooter = 'exports.unpackString = byteData.unpackString;' +
  'exports.packString = byteData.packString;' +
  'exports.packStringTo = byteData.packStringTo;' +
  'exports.pack = byteData.pack;' +
  'exports.packArray = byteData.packArray;' +
  'exports.packTo = byteData.packTo;' +
  'exports.packArrayTo = byteData.packArrayTo;' +
  'exports.unpack = byteData.unpack;' +
  'exports.unpackArray = byteData.unpackArray;' +
  'exports.unpackFrom = byteData.unpackFrom;' +
  'exports.unpackArrayFrom = byteData.unpackArrayFrom;' +
  'exports.unpackArrayTo = byteData.unpackArrayTo;';

let UMDBanner = '(function (global, factory) {' +
  "typeof exports === 'object' && " +
  "typeof module !== 'undefined' ? factory(exports) :" +
  "typeof define === 'function' && define.amd ? " +
  "define(['exports'], factory) :" +
  '(factory((global.byteData = {})));' +
  '}(this, (function (exports) {;' + CJSBanner;
let UMDFooter = CJSFooter + '})));';

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
        format: 'iife'
      }
    ],
    plugins: [
      closure({
        languageIn: 'ECMASCRIPT6',
        languageOut: 'ECMASCRIPT5',
        compilationLevel: 'WHITESPACE_ONLY',
        warningLevel: 'VERBOSE',
        preserveTypeAnnotations: true,
        outputWrapper: UMDBanner + '%output%' + UMDFooter
      })
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
