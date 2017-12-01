/*
 * to-bytes: bytes to numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const writer = require("../src/write-bytes.js");
const helpers = require("../src/helpers.js");

/**
 * Turn numbers and strings to bytes.
 * @param {!Array<number>|number|string} values The data.
 * @param {number} bitDepth The bit depth of the data.
 *   Possible values are 1, 2, 4, 8, 16, 24, 32, 40, 48 or 64.
 * @param {Object} options The options:
 *   - "float": True for floating point numbers. Default is false.
 *       This option is available for 16, 32 and 64-bit numbers.
 *   - "base": The base of the output. Default is 10. Can be 2, 10 or 16.
 *   - "char": If the bytes represent a string. Default is false.
 *   - "be": If the values are big endian. Default is false (little endian).
 *   - "buffer": If the bytes should be returned as a Uint8Array.
 *       Default is false (bytes are returned as a regular array).
 * @return {!Array<number>|!Array<string>|Uint8Array} the data as a byte buffer.
 */
function toBytes(values, bitDepth, options={"base": 10}) {
    values = helpers.turnToArray(values);
    let bytes = writeBytes(values, options.char, options.float, bitDepth);
    helpers.makeBigEndian(bytes, options.be, bitDepth);
    helpers.outputToBase(bytes, bitDepth, options.base);
    if (options.buffer) {
        bytes = new Uint8Array(bytes);
    }
    return bytes;
}

/**
 * Write values as bytes.
 * @param {!Array<number>|number|string} values The data.
 * @param {boolean} isChar True if it is a string.
 * @param {boolean} isFloat True if it is a IEEE floating point number.
 * @param {number} bitDepth The bitDepth of the data.
 * @return {!Array<number>} the bytes.
 */
function writeBytes(values, isChar, isFloat, bitDepth) {
    let bitWriter;
    if (isChar) {
        bitWriter = writer.writeString;
    } else {
        bitWriter = writer['write' + bitDepth + 'Bit' + (isFloat ? "Float" : "")];
    }
    let i = 0;
    let j = 0;
    let len = values.length;
    let bytes = [];
    while (i < len) {            
        j = bitWriter(bytes, values, i, j);
        i++;
    }
    return bytes;
}

module.exports.toBytes = toBytes;
