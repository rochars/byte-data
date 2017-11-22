/*
 * from-bytes: convert bytes to numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const pad = require("../src/byte-padding.js");
const endianness = require("endianness");
const reader = require("../src/read-bytes.js");
const bitDepths = require("../src/bit-depth.js");

/**
 * Turn a array of bytes into an array of what the bytes should represent.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} bitDepth The bitDepth. 1, 2, 4, 8, 16, 24, 32, 40, 48, 64.
 * @param {Object} params The options. They are:
 *   - "signed", defaults to false
 *   - "float", defaults to false, true for floats.
 *       float is available for 16, 32 and 64 bit depths.
 *   - "base", defaults to 10, can be 2, 10 or 16
 *   - "char", defaults to false, true for strings
 *   - "be", defaults to false, true for big endian
 * @return {!Array<number>|string} The values represented in the bytes.
 */
function fromBytes(bytes, bitDepth, params={}) {
    let base = 10;
    if ("base" in params) {
        base = params.base;
    }
    if (params.be) {
        endianness.endianness(bytes, bitDepth / 8);
    }
    return readBytes(
        bytes,
        bitDepth,
        params.char,
        params.signed,
        params.float,
        base);
}

/**
 * Turn a array of bytes into an array of what the bytes should represent.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} bitDepth The bitDepth. 1, 2, 4, 8, 16, 24, 32, 40, 48, 64.
 * @param {boolean} isChar True if it is a string.
 * @param {boolean} isSigned True if the values should be signed.
 * @param {boolean} isFloat True if the values are IEEE floating point numbers.
 * @param {number} base The base, one of 2, 10 or 16.
 * @return {!Array<number>|string} The values represented in the bytes.
 */
function readBytes(bytes, bitDepth, isChar, isSigned, isFloat, base) {
    let numbers = [];
    let i = 0;
    let j = 0;
    let offset = bitDepths.bitDepthOffsets[bitDepth];
    let len = bytes.length - (offset -1);
    let maxBitDepthValue = bitDepths.maxBitDepth[bitDepth];
    bytesToInt(bytes, base);
    let bitReader = getBitReader(bitDepth, isFloat, isChar);
    let signFunction = isSigned ? signed : function(x,y){return x;};
    while (i < len) {
        numbers[j] = signFunction(bitReader(bytes, i), maxBitDepthValue);
        i += offset;
        j++;
    }
    if (isChar) {
        numbers = numbers.join("");
    }
    return numbers;
}

/**
 * Return a function to read binary data.
 * @param {number} bitDepth The bitDepth. 1, 2, 4, 8, 16, 24, 32, 40, 48, 64.
 * @param {boolean} isFloat True if the values are IEEE floating point numbers.
 * @param {boolean} isChar True if it is a string.
 * @return {Function}
 */
function getBitReader(bitDepth, isFloat, isChar) {
    let readBitDepth = bitDepth;
    if (bitDepth == 2 || bitDepth == 4) {
        readBitDepth = 8;
    }
    if (isChar) {
        return reader.readChar;
    } else {
        return reader['read' + readBitDepth + 'Bit' + (isFloat ? "Float" : "")];
    }
}

/**
 * Turn bytes to base 10.
 * @param {!Array<number>|Uint8Array} bytes The bytes as binary or hex strings.
 * @param {number} base The base.
 */
function bytesToInt(bytes, base) {
    if (base != 10) {
        let i = 0;
        let len = bytes.length;
        while(i < len) {
            bytes[i] = parseInt(bytes[i], base);
            i++;
        }
    }
}

/**
 * Turn a unsigned number to a signed number.
 * @param {number} number The number.
 * @param {number} maxValue The max range for the number bit depth.
 */
function signed(number, maxValue) {
    if (number > parseInt(maxValue / 2, 10) - 1) {
        number -= maxValue;
    }
    return number;
}

module.exports.fromBytes = fromBytes;
