"use strict";
/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
 */
exports.__esModule = true;
/**
 * @fileoverview TypeScript declaration tests.
 * @see https://github.com/rochars/byte-data
 */
var byteData = require("../../../index.js");
var theType = { bits: 16 };
var arr = byteData.pack(1, theType);
var num = byteData.unpack(arr, theType);
// Strings
var arrBuff = byteData.packString('abc');
var str = byteData.unpackString(arrBuff, 0);
byteData.packStringTo(str, arrBuff, 0);
// with arrays
var output = [];
byteData.pack(num, output);
byteData.packArray([num], theType);
byteData.packTo(num, theType, arr, 0);
byteData.packArrayTo([num], theType, arr, 0);
byteData.unpack(arr, theType, 0);
byteData.unpackArray(arr, theType, 0, arr.length);
byteData.unpackArrayTo(arr, theType, output, 0, arr.length);
console.log(output);
// with Typed Arrays
var buffer = new Uint8Array(2);
var outputTyped = new Uint16Array(1);
byteData.pack(num, buffer);
byteData.packArray([num], theType);
byteData.packTo(num, theType, outputTyped, 0);
byteData.packArrayTo([num], theType, buffer, 0);
byteData.unpack(buffer, theType, 0);
byteData.unpackArray(buffer, theType, 0, buffer.length);
byteData.unpackArrayTo(buffer, theType, outputTyped, 0, buffer.length);
console.log(outputTyped);
