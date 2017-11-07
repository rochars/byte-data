/*
 * to-bytes: convert bytes to numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const intBits = require("int-bits");
const helpers = require("../src/helpers.js");
const writer = require("../src/write-bytes.js");
const bitDepths = require("../src/bit-depth.js");

/**
 * Turn numbers and strings to bytes.
 * @param {!Array<number>|string} numbers float64 numbers.
 * @param {number} base The base, 2, 10 or 16.
 * @param {Function} writer The function to turn the data to bytes.
 * @param {number} bitDepth The desired bitDepth for the data.
 * @param {boolean} bigEndian If the the bytes should be big endian or not.
 * @return {!Array<number>} the bytes.
 */
function toBytes(numbers, base, writer, bitDepth, bigEndian) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i < len) {            
        j = writer(bytes, numbers, i, j);
        i++;
    }
    helpers.bytesToBase(bytes, base);
    helpers.endianess(bytes, bitDepths.bitDepthOffsets[bitDepth], bigEndian);
    return bytes;
}

/**
 * Split 64 bit numbers into bytes.
 * @param {!Array<number>} numbers float64 numbers.
 * @return {!Array<number>} the bytes.
 */
function floatTo8Bytes(numbers, base=10, bigEndian=false) {
    return toBytes(numbers, base, writer.write64BitFloat, 64, bigEndian);
}

/**
 * Split 32 bit float numbers into bytes.
 * @param {!Array<number>} numbers float32 numbers.
 * @return {!Array<number>} the bytes.
 */
function floatTo4Bytes(numbers, base=10, bigEndian=false) {
    return toBytes(numbers, base, writer.write32BitFloat, 32, bigEndian);
}

/**
 * Split 48 bit int numbers into 6 bytes.
 * @param {!Array<number>} numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo6Bytes(numbers, base=10, bigEndian=false) {
    return toBytes(numbers, base, writer.write48Bit, 48, bigEndian);
}

/**
 * Split 40 bit int numbers into 5 bytes.
 * @param {!Array<number>} numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo5Bytes(numbers, base=10, bigEndian=false) {
    return toBytes(numbers, base, writer.write40Bit, 40, bigEndian);
}

/**
 * Split 32 bit int numbers into bytes.
 * @param {!Array<number>} numbers int32 numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo4Bytes(numbers, base=10, bigEndian=false) {
    return toBytes(numbers, base, writer.write32Bit, 32, bigEndian);
}

/**
 * Split 24 bit int numbers into bytes.
 * @param {!Array<number>} numbers int24 numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo3Bytes(numbers, base=10, bigEndian=false) {
    return toBytes(numbers, base, writer.write24Bit, 24, bigEndian);
}

/**
 * Split 16 bit int numbers into bytes.
 * @param {!Array<number>} numbers int16 numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo2Bytes(numbers, base=10, bigEndian=false) {
    return toBytes(numbers, base, writer.write16Bit, 16, bigEndian);
}

/**
 * Split a 8 bit int numbers into bytes
 * @param {!Array<number>} numbers int8 numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo1Byte(numbers, base=10) {
    return toBytes(numbers, base, writer.write8Bit, 8, false);
}

/**
 * 4-bit int numbers into a nibbles.
 * @param {!Array<number>} numbers int8 numbers.
 * @return {!Array<number>} the bytes.
 */
function intToNibble(numbers, base=10) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i < len) {
        bytes[j++] = numbers[i] & 0xF;
        i++;
    }
    helpers.bytesToBase(bytes, base, helpers.paddingNibble);
    return bytes;
}

/**
 * Values to crumb form.
 * @param {!Array<number>} values Array of numbers.
 * @param {number} base The base.
 * @return {!Array<number>} the crumbs.
 */
function toCrumb(values, base=10) {
    let i = 0;
    let j = 0;
    let len = values.length;
    let bytes = [];
    while (i < len) {
        bytes[j++] = values[i] < 0 ? values[i] + 4 : values[i];
        i++;
    }
    helpers.bytesToBase(bytes, base, helpers.paddingCrumb);
    return bytes;
}

/**
 * Values to boolean form.
 * @param {!Array<number>} values Array of numbers.
 * @param {number} base The base.
 * @return {!Array<number>} the booleans.
 */
function toBoolean(values, base=10) {
    let i = 0;
    let j = 0;
    let len = values.length;
    let booleans = [];
    while (i < len) {
        booleans[j++] = values[i] ? 1 : 0;
        i++;
    }
    helpers.bytesToBase(booleans, base, function(){});
    return booleans;
}

/**
 * Turn a string to an array of bytes.
 * @param {string} string The string.
 * @return {!Array<number>} the bytes.
 */
function stringToBytes(string, base=10) {
    return toBytes(string, base, writer.writeString, 8, false);
}

function floatTo2Bytes(numbers, base=10, bigEndian=false) {
    return toBytes(numbers, base, writer.write16BitFloat, 16, bigEndian);
}

module.exports.toBytes = toBytes;

// old interface
module.exports.floatTo8Bytes = floatTo8Bytes;
module.exports.floatTo4Bytes = floatTo4Bytes;
module.exports.floatTo2Bytes = floatTo2Bytes;
module.exports.intTo6Bytes = intTo6Bytes;
module.exports.intTo5Bytes = intTo5Bytes;
module.exports.intTo4Bytes = intTo4Bytes;
module.exports.intTo3Bytes = intTo3Bytes;
module.exports.intTo2Bytes = intTo2Bytes;
module.exports.intTo1Byte = intTo1Byte;
module.exports.intToNibble = intToNibble;
module.exports.toCrumb = toCrumb;
module.exports.toBoolean = toBoolean;
module.exports.stringToBytes = stringToBytes;
