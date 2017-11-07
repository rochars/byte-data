/*
 * from-bytes: convert bytes to numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const helpers = require("../src/helpers.js");
const reader = require("../src/read-bytes.js");
const bitDepths = require("../src/bit-depth.js");

/**
 * Turn a array of bytes into an array of what the bytes should represent.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. 2, 10 or 16.
 * @param {Function} reader The function to read the bytes.
 * @param {number} bitDepth The bitDepth. 1, 2, 4, 8, 16, 24, 32, 40, 48, 64.
 * @param {boolean} signed If readed numbers should be signed or not.
 * @return {!Array<number>} The values represented in the bytes.
 */
function fromBytes(bytes, base, reader, bitDepth, signed=false) {
    let numbers = [];
    let i = 0;
    let j = 0;
    let offset = bitDepths.bitDepthOffsets[bitDepth];
    let len = bytes.length - (offset -1);
    let maxBitDepthValue = bitDepths.maxBitDepth[bitDepth];
    helpers.bytesToInt(bytes, base);   
    if (signed) {
        while (i < len) {
            numbers[j] = helpers.signed(reader(bytes, i), maxBitDepthValue);
            i += offset;
            j++;
        }    
    } else {
        while (i < len) {
            numbers[j] = reader(bytes, i);
            i += offset;
            j++;
        }    
    }
    return numbers;
}

/**
 * Read numbers from a array of booleans.
 * @param {!Array<number>|Uint8Array} booleans An array of booleans.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function fromBoolean(booleans, base=10) {
    return fromBytes(booleans, base, reader.read1Bit, 1);
}

/**
 * Read 2-bit signed ints from an array of crumbs.
 * @param {!Array<number>|Uint8Array} bytes An array of crumbs.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function intFromCrumb(bytes, base=10) {
    return fromBytes(bytes, base, reader.read8Bit, 2, true);
}

/**
 * Read 4-bit signed ints from an array of nibbles.
 * @param {!Array<number>|Uint8Array} bytes An array of nibbles.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function intFromNibble(bytes, base=10) {
    return fromBytes(bytes, base, reader.read8Bit, 4, true);
}

/**
 * Read 8-bit unsigned ints from an array of bytes.
 * Just return a copy of the original array.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function uIntFrom1Byte(bytes, base=10) {
    return fromBytes(bytes, base, reader.read8Bit, 8);
}

/**
 * Read 8-bit signed ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function intFrom1Byte(bytes, base=10) {
    return fromBytes(bytes, base, reader.read8Bit, 8, true);
}

/**
 * Read 16-bit unsigned ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function uIntFrom2Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 2, bigEndian);
    return fromBytes(bytes, base, reader.read16Bit, 16);
}

/**
 * Read 16-bit signed ints from an array of bytes.
 * Thanks https://stackoverflow.com/a/38298413
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function intFrom2Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 2, bigEndian);
    return fromBytes(bytes, base, reader.read16Bit, 16, true);
}

/**
 * Read 24-bit unsigned ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function uIntFrom3Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 3, bigEndian);
    return fromBytes(bytes, base, reader.read24Bit, 24);
}

/**
 * Read 24-bit signed ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function intFrom3Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 3, bigEndian);
    return fromBytes(bytes, base, reader.read24Bit, 24, true);
}

/**
 * Read 32-bit unsigned ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function uIntFrom4Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 4, bigEndian);
    return fromBytes(bytes, base, reader.read32Bit, 32);
}

/**
 * Read 32-bit signed ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function intFrom4Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 4, bigEndian);
    return fromBytes(bytes, base, reader.read32Bit, 32, true);
}

/**
 * Read 32-bit float numbers from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function floatFrom4Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 4, bigEndian);
    return fromBytes(bytes, base, reader.read32BitFloat, 32);
}

/**
 * Read 40-bit unsigned ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function uIntFrom5Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 5, bigEndian);
    return fromBytes(bytes, base, reader.read40Bit, 40);
}

/**
 * Read 40-bit unsigned ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function intFrom5Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 5, bigEndian);
    return fromBytes(bytes, base, reader.read40Bit, 40, true);
}

/**
 * Read 48-bit unsigned ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function uIntFrom6Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 6, bigEndian);
    return fromBytes(bytes, base, reader.read48Bit, 48);
}

/**
 * Read 48-bit unsigned ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function intFrom6Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 6, bigEndian);
    return fromBytes(bytes, base, reader.read48Bit, 48, true);
}

/**
 * Read 64-bit double precision numbers from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function floatFrom8Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 8, bigEndian);
    return fromBytes(bytes, base, reader.read64Bit, 64);
}

/**
 * Convert an array of bytes to a string.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @return {string} The string.
 */
function stringFromBytes(bytes, base=10) {
    return fromBytes(bytes, base, reader.readChar, 8).join("");
}

module.exports.fromBoolean = fromBoolean;
module.exports.intFromCrumb = intFromCrumb;
module.exports.uIntFromCrumb = uIntFrom1Byte;
module.exports.intFromNibble = intFromNibble;
module.exports.uIntFromNibble = uIntFrom1Byte;
module.exports.intFrom1Byte = intFrom1Byte;
module.exports.uIntFrom1Byte = uIntFrom1Byte;
module.exports.intFrom2Bytes = intFrom2Bytes;
module.exports.uIntFrom2Bytes = uIntFrom2Bytes;
module.exports.intFrom3Bytes = intFrom3Bytes;
module.exports.uIntFrom3Bytes = uIntFrom3Bytes;
module.exports.intFrom4Bytes = intFrom4Bytes;
module.exports.uIntFrom4Bytes = uIntFrom4Bytes;
module.exports.floatFrom4Bytes = floatFrom4Bytes;
module.exports.intFrom5Bytes = intFrom5Bytes;
module.exports.uIntFrom5Bytes = uIntFrom5Bytes;
module.exports.intFrom6Bytes = intFrom6Bytes;
module.exports.uIntFrom6Bytes = uIntFrom6Bytes;
module.exports.floatFrom8Bytes = floatFrom8Bytes;
module.exports.stringFromBytes = stringFromBytes;
