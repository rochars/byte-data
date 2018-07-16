"use strict";
/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
 */
exports.__esModule = true;
/**
 * @fileoverview TypeScript declaration tests.
 * @see https://github.com/rochars/byte-data
 */
var byteData = require("../../main.js");
var theType = { bits: 16 };
var arr = byteData.pack(1, theType);
var num = byteData.unpack(arr, theType);
// Strings
arr = byteData.packString('abc');
var str = byteData.unpackString(arr, 0);
byteData.packStringTo(str, arr, 0);
// Numbers
var output = [];
byteData.pack(num, theType);
byteData.packArray([num], theType);
byteData.packTo(num, theType, arr, 0);
byteData.packArrayTo([num], theType, arr, 0);
byteData.unpack(arr, theType, 0);
byteData.unpackArray(arr, theType, 0, arr.length);
byteData.unpackArrayTo(arr, theType, output, 0, arr.length);
