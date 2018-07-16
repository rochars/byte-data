/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview TypeScript declaration tests.
 * @see https://github.com/rochars/byte-data
 */

import * as byteData from '../../main.js'

let theType = {bits: 16}

let arr = byteData.pack(1, theType);
let num = byteData.unpack(arr, theType);

// Strings
arr = byteData.packString('abc');
let str = byteData.unpackString(arr, 0);
byteData.packStringTo(str, arr, 0);

// Numbers
let output = [];
byteData.pack(num, theType);
byteData.packArray([num], theType);
byteData.packTo(num, theType, arr, 0);
byteData.packArrayTo([num], theType, arr, 0);
byteData.unpack(arr, theType, 0);
byteData.unpackArray(arr, theType, 0, arr.length);
byteData.unpackArrayTo(arr, theType, output, 0, arr.length);
