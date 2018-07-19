/*
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview rollup configuration file.
 * @see https://github.com/rochars/byte-data
 */

import closure from 'rollup-plugin-closure-compiler-js';
import fs from 'fs';

// Externs
const externsFile = fs.readFileSync('./externs/byte-data.js', 'utf8');

// Legal
const license = '/*!\n'+
  ' * byte-data Copyright (c) 2017-2018 Rafael da Silva Rocha. MIT license.\n'+
  ' */\n';

let UMDBanner = "(function (global, factory) {" +
  "typeof exports === 'object' && typeof module !== 'undefined' ? " +
  "module.exports = factory() :" +
  "typeof define === 'function' && define.amd ? define(factory) :" +
  "(global.byteData = factory());" +
  "}(this, (function () { 'use strict';";
let UMDFooter = "return byteData; })));"

export default [
  // es bundle
  {
    input: 'main.js',
    output: [
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
      //babel()
      closure({
        languageIn: 'ECMASCRIPT6',
        languageOut: 'ECMASCRIPT5',
        compilationLevel: 'SIMPLE',
        warningLevel: 'VERBOSE',
        outputWrapper: UMDBanner + '%output%' + UMDFooter,
        externs: [{src: externsFile}]
      })
    ]
  },
];
