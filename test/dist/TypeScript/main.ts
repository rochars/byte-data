/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview TypeScript declaration tests.
 * @see https://github.com/rochars/byte-data
 */

import * as byteData from '../../../main.js'

let theType = {bits: 16}

let arr = byteData.pack(1, theType);
let num = byteData.unpack(arr, theType);

// Strings
let arrBuff = byteData.packString('abc');
let str = byteData.unpackString(arrBuff, 0);
byteData.packStringTo(str, arrBuff, 0);

// with arrays
let output = [];
byteData.pack(num, output);
byteData.packArray([num], theType);
byteData.packTo(num, theType, arr, 0);
byteData.packArrayTo([num], theType, arr, 0);
byteData.unpack(arr, theType, 0);
byteData.unpackArray(arr, theType, 0, arr.length);
byteData.unpackArrayTo(arr, theType, output, 0, arr.length);
console.log(output);

// with Typed Arrays
let buffer = new Uint8Array(2);
let outputTyped = new Uint16Array(1);
byteData.pack(num, buffer);
byteData.packArray([num], theType);
byteData.packTo(num, theType, outputTyped, 0);
byteData.packArrayTo([num], theType, buffer, 0);
byteData.unpack(buffer, theType, 0);
byteData.unpackArray(buffer, theType, 0, buffer.length);
byteData.unpackArrayTo(buffer, theType, outputTyped, 0, buffer.length);
console.log(outputTyped);