/*
 * https://github.com/rochars/byte-data
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview rollup configuration file.
 */

import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default [
  // cjs
  {
    input: 'main.js',
    external: ['endianness'],
    output: [
      {
        file: 'dist/byte-data.cjs.js',
        name: 'byte-data',
        format: 'cjs'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
    ]
  },
  // umd
  {
    input: 'main.js',
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
  // esm
  {
    input: 'main.js',
    output: [
      {
        file: 'dist/byte-data.js',
        format: 'es'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
    ]
  }
];
