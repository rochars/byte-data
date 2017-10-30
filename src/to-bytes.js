/*
 * to-bytes: convert bytes to numbers and strings.
 * 64-bit IEEE values must be in the -1.0 to 1.0 range.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

const intBits = require("int-bits");

/**
 * Unpack a 64 bit float into two words.
 * Thanks https://stackoverflow.com/a/16043259
 * @param {number} value A float64 number.
 */
function toFloat64(value) {
    let hiWord = 0;
    let loWord = 0;
    if (value <= 0.0) {
        hiWord = 0x80000000;
        value = -value;
    }
    let exponent = Math.floor(
        Math.log(value) / Math.log(2));
    let significand = Math.floor(
        (value / Math.pow(2, exponent)) * Math.pow(2, 52));
    loWord = significand & 0xFFFFFFFF;
    significand /= Math.pow(2, 32);
    exponent += 1023;
    hiWord = hiWord | (exponent << 20);
    hiWord = hiWord | (significand & ~(-1 << 20));
    return [hiWord, loWord];
}

/**
 * Split 64 bit numbers into bytes.
 * @param {!Array<number>} numbers float64 numbers.
 */
function floatTo8Bytes(numbers) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i < len) {
        // fix the -0 bug
        if (numbers[i] == 0) {
            bytes[j++] = 0;
            bytes[j++] = 0;
            bytes[j++] = 0;
            bytes[j++] = 0;
            bytes[j++] = 0;
            bytes[j++] = 0;
            bytes[j++] = 0;
            bytes[j++] = 0;
        }else {
            numbers[i] = toFloat64(numbers[i]);
            bytes[j++] = (numbers[i][1]) & 0xFF;
            bytes[j++] = (numbers[i][1] >> 8) & 0xFF;
            bytes[j++] = (numbers[i][1] >> 16) & 0xFF;
            bytes[j++] = (numbers[i][1] >> 24) & 0xFF;
            bytes[j++] = (numbers[i][0] >> 32) & 0xFF;
            bytes[j++] = (numbers[i][0] >> 40) & 0xFF;
            bytes[j++] = (numbers[i][0] >> 48) & 0xFF;
            bytes[j++] = (numbers[i][0] >> 56) & 0xFF;
        }
        i++;
    }
    return bytes;
    //return new Array(new Uint8Array(new Float64Array(numbers).buffer));
}

/**
 * Split 32 bit float numbers into bytes.
 * @param {!Array<number>} numbers float32 numbers.
 */
function floatTo4Bytes(numbers) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i < len) {            
        numbers[i] = intBits.unpack(numbers[i]);
        bytes[j++] = (numbers[i]) & 0xFF;
        bytes[j++] = (numbers[i] >> 8) & 0xFF;
        bytes[j++] = (numbers[i] >> 16) & 0xFF;
        bytes[j++] = (numbers[i] >> 24) & 0xFF;
        i++;
    }
    return bytes;
}

/**
 * Split 32 bit int numbers into bytes.
 * @param {!Array<number>} numbers int32 numbers.
 */
function intTo4Bytes(numbers) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i< len) {
        bytes[j++] = (numbers[i]) & 0xFF;
        bytes[j++] = (numbers[i] >> 8) & 0xFF;
        bytes[j++] = (numbers[i] >> 16) & 0xFF;
        bytes[j++] = (numbers[i] >> 24) & 0xFF;
        i++;
    }
    return bytes;
}

/**
 * Split 24 bit int numbers into bytes.
 * @param {!Array<number>} numbers int24 numbers.
 */
function intTo3Bytes(numbers) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i < len) {
        bytes[j++] = (numbers[i]) & 0xFF;
        bytes[j++] = (numbers[i] >> 8) & 0xFF;
        bytes[j++] = (numbers[i] >> 16) & 0xFF;
        i++;
    }
    return bytes;
}

/**
 * Split 16 bit int numbers into bytes.
 * @param {!Array<number>} numbers int16 numbers.
 */
function intTo2Bytes(numbers) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i < len) {
        bytes[j++] = (numbers[i]) & 0xFF;
        bytes[j++] = (numbers[i] >> 8) & 0xFF;
        i++;
    }
    return bytes;
}

/**
 * Split a 8 bit int numbers into bytes
 * @param {!Array<number>} numbers int8 numbers.
 */
function intTo1Byte(numbers) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i < len) {
        bytes[j++] = numbers[i] & 0xFF;
        i++;
    }
    return bytes;
}

/**
 * Turn a string to an array of bytes.
 * @param {string} string The string.
 */
function stringToBytes(string) {
    let i = 0;
    let j = 0;
    let len = string.length;
    let bytes = [];
    while (i < len) {
        bytes[j++] = string.charCodeAt(i);
        i++;
    }
    return bytes;
}

module.exports.floatTo8Bytes = floatTo8Bytes;
module.exports.floatTo4Bytes = floatTo4Bytes;
module.exports.intTo4Bytes = intTo4Bytes;
module.exports.intTo3Bytes = intTo3Bytes;
module.exports.intTo2Bytes = intTo2Bytes;
module.exports.intTo1Byte = intTo1Byte;
module.exports.stringToBytes = stringToBytes;
