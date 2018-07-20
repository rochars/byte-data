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
  ' * https://github.com/rochars/byte-data.\n'+
  ' */\n';

// GCC wrapper
const outputWrapper = license + 'var window=window||{};'+
  '%output%' +
  'var module=module||{};module.exports=exports;' +
  'var define=define||function(){};' +
  'define(["exports"],function(exports){return module.exports;});'

export default [
  // ES6 bundle
  {
    input: 'main.js',
    output: [
      {
        file: 'dist/byte-data.js',
        format: 'es'
      },
    ]
  },
  // ES5 UMD
  {
    input: 'main.js',
    output: [
      {
        file: 'dist/byte-data.umd.js',
        name: 'byteData',
        format: 'cjs',
        banner: 'var exports=exports||{};' +
        'window["byteData"]=exports;'
      }
    ],
    plugins: [
      closure({
        languageIn: 'ECMASCRIPT6',
        languageOut: 'ECMASCRIPT5',
        compilationLevel: 'ADVANCED',
        warningLevel: 'VERBOSE',
        outputWrapper: outputWrapper,
        externs: [{src: externsFile + 'exports={};'}]
      }),
    ]
  },
];
