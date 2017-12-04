/*
 * from-bytes: convert bytes to numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const reader = require("../src/read-bytes.js");
const bitDepths = require("../src/bit-depth.js");
const helpers = require("../src/helpers.js");

/**
 * Turn a byte buffer into what the bytes represent.
 * @param {!Array<number>|!Array<string>|Uint8Array} buffer An array of bytes.
 * @param {Object} type One of the available types.
 * @return {!Array<number>|number|string}
 */
function fromBytes(buffer, type) {
    let bitDepth = type.bits;
    helpers.fixFloat16Endianness(buffer, type);
    helpers.makeBigEndian(buffer, type.be, bitDepth);
    bytesToInt(buffer, type.base);
    let values = readBytes(
            buffer,
            type,
            getBitReader(type)
        );
    if (type.single) {
        values = getSingleValue(values, type);
    }
    return values;
}

/**
 * Return a function to read binary data.
 * @param {Object} type One of the available types.
 * @return {Function}
 */
function getBitReader(type) {
    return type.char ?
        reader.readChar : reader[getReaderName(type.bits, type.float)];
}

/**
 * Return the first value from the result value array.
 * @param {!Array<number>|string} values The values.
 * @param {Object} type One of the available types.
 * @return {number|string}
 */
function getSingleValue(values, type) {
    if (type.char) {
        values = values.slice(0, type.bits / 8);
    } else {
        values = values[0];
    }
    return values;
}

/**
 * Turn a array of bytes into an array of what the bytes should represent.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {Object} type The type.
 * @param {Function} bitReader The function to read the bytes.
 * @return {!Array<number>|string}
 */
function readBytes(bytes, type, bitReader) {
    let values = [];
    let i = 0;
    let offset = type.bits < 8 ? 1 : type.bits / 8;
    let len = bytes.length - (offset -1);
    let maxBitDepthValue = bitDepths.BitDepthMaxValues[type.bits];
    let signFunction = type.signed && !type.float ?
        helpers.signed : function(x){return x;};
    while (i < len) {
        values.push(signFunction(bitReader(bytes, i, type), maxBitDepthValue));
        i += offset;
    }
    if (type.char) {
        values = values.join("");
    }
    return values;
}

/**
 * Build a bit reading function name based on the arguments.
 * @param {number} bits The bitDepth. 1, 2, 4, 8, 16, 24, 32, 40, 48, 64.
 * @param {boolean} float True if the values are IEEE floating point numbers.
 * @return {string}
 */
function getReaderName(bits, float) {
    return 'read' + (bits < 8 ? 8 : bits) +
        'Bit' + (float ? "Float" : "");
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

module.exports.fromBytes = fromBytes;
