/*
 * to-bytes: convert bytes to numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const intBits = require("int-bits");
const pad = require("../src/byte-padding.js");
const endianness = require("endianness");
const writer = require("../src/write-bytes.js");
const bitDepths = require("../src/bit-depth.js");

/**
 * Turn numbers and strings to bytes.
 * @param {!Array<number>|string} numbers float64 numbers.
 * @param {number} bitDepth The desired bitDepth for the data.
 * @param {Object} params The params. defaults to:
 *   - "float", defaults to false, true for floats.
 *       float is available for 16, 32 and 64 bit depths.
 *   - "base", defaults to 10, can be 2, 10 or 16
 *   - "char", defaults to false, true for strings
 *   - "be", defaults to false, true for big endian
 * @return {!Array<number>} the bytes.
 */
function toBytes(numbers, bitDepth, params={}) {
    let base = 10;
    if ("base" in params) {
        base = params.base;
    }
    let isBigEndian = params.be;
    let isChar = params.char;
    let isFloat = params.float;
    let bytes = writeBytes(numbers, isChar, isFloat, isBigEndian, bitDepth);
    outputToBase(bytes, bitDepth, base);
    return bytes;
}

/**
 * Turn the output to the correct base.
 * @param {!Array<number>} bytes The bytes.
 * @param {number} bitDepth The bitDepth of the data.
 * @param {number} base The base.
 */
function outputToBase(bytes, bitDepth, base) {
    if (bitDepth == 4) {
        bytesToBase(bytes, base, pad.paddingNibble);
    } else if (bitDepth == 2) {
        bytesToBase(bytes, base, pad.paddingCrumb);
    } else if(bitDepth == 1) {
        bytesToBase(bytes, base, function(){});
    }else {
        bytesToBase(bytes, base);
    }
}

/**
 * Write values as bytes.
 * @param {!Array<number>|string} numbers The values.
 * @param {boolean} isChar True if it is a string.
 * @param {boolean} isFloat True if it is a IEEE floating point number.
 * @param {boolean} isBigEndian True if the bytes should be big enadian.
 * @param {number} bitDepth The bitDepth of the data.
 * @return {!Array<number>} the bytes.
 */
function writeBytes(numbers, isChar, isFloat, isBigEndian, bitDepth) {
    let bitWriter;
    if (isChar) {
        bitWriter = writer.writeString;
    } else {
        bitWriter = writer['write' + bitDepth + 'Bit' + (isFloat ? "Float" : "")];
    }
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i < len) {            
        j = bitWriter(bytes, numbers, i, j);
        i++;
    }
    if (isBigEndian) {
        endianness.endianness(bytes, bitDepths.bitDepthOffsets[bitDepth]);
    }
    return bytes;
}

/**
 * Turn bytes to base.
 * @param {!Array<string>|!Array<number>} bytes The bytes.
 * @param {number} base The base.
 * @param {Function} padFunction The function to use for padding.
 */
function bytesToBase(bytes, base, padFunction=pad.padding) {
    if (base != 10) {
        let i = 0;
        let len = bytes.length;
        while (i < len) {
            bytes[i] = bytes[i].toString(base);
            padFunction(bytes, base, i);
            i++;
        }
    }
}

module.exports.toBytes = toBytes;
