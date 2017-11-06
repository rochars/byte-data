/*
 * to-bytes: convert bytes to numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const intBits = require("int-bits");
const helpers = require("../src/helpers.js");

/**
 * Split 64 bit numbers into bytes.
 * @param {!Array<number>} numbers float64 numbers.
 * @return {!Array<number>} the bytes.
 */
function floatTo8Bytes(numbers, base=10, bigEndian=false) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i < len) {
        // 0s should not be signed by default
        if (numbers[i] == 0) {
            bytes = bytes.concat([0,0,0,0,0,0,0,0]);
            j+=8;
        } else {
            numbers[i] = helpers.toFloat64(numbers[i]);
            bytes[j++] = numbers[i][1] & 0xFF;
            bytes[j++] = numbers[i][1] >>> 8 & 0xFF;
            bytes[j++] = numbers[i][1] >>> 16 & 0xFF;
            bytes[j++] = numbers[i][1] >>> 24 & 0xFF;
            bytes[j++] = numbers[i][0] & 0xFF;
            bytes[j++] = numbers[i][0] >>> 8 & 0xFF;
            bytes[j++] = numbers[i][0] >>> 16 & 0xFF;
            bytes[j++] = numbers[i][0] >>> 24 & 0xFF;
        }
        i++;
    }
    helpers.bytesToBase(bytes, base);
    helpers.endianess(bytes, 8, bigEndian);
    return bytes;
}

/**
 * Split 32 bit float numbers into bytes.
 * @param {!Array<number>} numbers float32 numbers.
 * @return {!Array<number>} the bytes.
 */
function floatTo4Bytes(numbers, base=10, bigEndian=false) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i < len) {            
        numbers[i] = intBits.unpack(numbers[i]);
        bytes[j++] = numbers[i] & 0xFF;
        bytes[j++] = numbers[i] >>> 8 & 0xFF;
        bytes[j++] = numbers[i] >>> 16 & 0xFF;
        bytes[j++] = numbers[i] >>> 24 & 0xFF;
        i++;
    }
    helpers.bytesToBase(bytes, base);
    helpers.endianess(bytes, 4, bigEndian);
    return bytes;
}

/**
 * Split 48 bit int numbers into 6 bytes.
 * @param {!Array<number>} numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo6Bytes(numbers, base=10, bigEndian=false) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i < len) {
        bytes[j++] = numbers[i] & 0xFF;
        bytes[j++] = numbers[i] >> 8 & 0xFF;
        bytes[j++] = numbers[i] >> 16 & 0xFF;
        bytes[j++] = numbers[i] >> 24 & 0xFF;
        bytes[j++] = numbers[i] / 0x100000000 & 0xFF;
        bytes[j++] = numbers[i] / 0x10000000000 & 0xFF;
        i++;
    }
    helpers.bytesToBase(bytes, base);
    helpers.endianess(bytes, 6, bigEndian);
    return bytes;
}

/**
 * Split 40 bit int numbers into 5 bytes.
 * @param {!Array<number>} numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo5Bytes(numbers, base=10, bigEndian=false) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i< len) {
        bytes[j++] = numbers[i] & 0xFF;
        bytes[j++] = numbers[i] >> 8 & 0xFF;
        bytes[j++] = numbers[i] >> 16 & 0xFF;
        bytes[j++] = numbers[i] >> 24 & 0xFF;
        bytes[j++] = numbers[i] / 0x100000000 & 0xFF;
        i++;
    }
    helpers.bytesToBase(bytes, base);
    helpers.endianess(bytes, 5, bigEndian);
    return bytes;
}

/**
 * Split 32 bit int numbers into bytes.
 * @param {!Array<number>} numbers int32 numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo4Bytes(numbers, base=10, bigEndian=false) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i < len) {
        bytes[j++] = (numbers[i] & 0xFF).toString(base);
        helpers.padding(bytes, base, j-1);
        bytes[j++] = (numbers[i] >>> 8 & 0xFF).toString(base);
        helpers.padding(bytes, base, j-1);
        bytes[j++] = (numbers[i] >>> 16 & 0xFF).toString(base);
        helpers.padding(bytes, base, j-1);
        bytes[j++] = (numbers[i] >>> 24 & 0xFF).toString(base);
        helpers.padding(bytes, base, j-1);
        i++;
    }
    helpers.bytesToBase(bytes, base);
    helpers.endianess(bytes, 4, bigEndian);
    return bytes;
}

/**
 * Split 24 bit int numbers into bytes.
 * @param {!Array<number>} numbers int24 numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo3Bytes(numbers, base=10, bigEndian=false) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i < len) {
        bytes[j++] = numbers[i] & 0xFF;
        bytes[j++] = numbers[i] >>> 8 & 0xFF;
        bytes[j++] = numbers[i] >>> 16 & 0xFF;
        i++;
    }
    helpers.bytesToBase(bytes, base);
    helpers.endianess(bytes, 3, bigEndian);
    return bytes;
}

/**
 * Split 16 bit int numbers into bytes.
 * @param {!Array<number>} numbers int16 numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo2Bytes(numbers, base=10, bigEndian=false) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i < len) {
        bytes[j++] = numbers[i] & 0xFF;
        bytes[j++] = numbers[i] >>> 8 & 0xFF;
        i++;
    }
    helpers.bytesToBase(bytes, base);
    helpers.endianess(bytes, 2, bigEndian);
    return bytes;
}

/**
 * Split a 8 bit int numbers into bytes
 * @param {!Array<number>} numbers int8 numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo1Byte(numbers, base=10) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i < len) {
        bytes[j++] = numbers[i] & 0xFF;
        i++;
    }
    helpers.bytesToBase(bytes, base);
    return bytes;
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
    let i = 0;
    let j = 0;
    let len = string.length;
    let bytes = [];
    while (i < len) {
        bytes[j++] = string.charCodeAt(i);
        helpers.padding(bytes, base, j-1);
        i++;
    }
    helpers.bytesToBase(bytes, base);
    return bytes;
}

module.exports.floatTo8Bytes = floatTo8Bytes;
module.exports.floatTo4Bytes = floatTo4Bytes;
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
