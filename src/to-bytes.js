/*
 * to-bytes: bytes to numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const writer = require("../src/write-bytes.js");
const helpers = require("../src/helpers.js");
const bitDepthLib = require("../src/bit-depth.js");

/**
 * Turn numbers and strings to bytes.
 * @param {!Array<number>|number|string} values The data.
 * @param {number} bitDepth The bit depth of the data.
 *   Possible values are 1, 2, 4, 8, 16, 24, 32, 40, 48 or 64.
 * @param {Object} options The options:
 *   - "float": True for floating point numbers. Default is false.
 *       This option is available for 16, 32 and 64-bit numbers.
 *   - "signed": True for signed values. Default is false.
 *   - "base": The base of the output. Default is 10. Can be 2, 10 or 16.
 *   - "char": If the bytes represent a string. Default is false.
 *   - "be": If the values are big endian. Default is false (little endian).
 *       Default is false (bytes are returned as a regular array).
 * @return {!Array<number>|!Array<string>|Uint8Array} the data as a byte buffer.
 */
function toBytes(values, bitDepth, options={"base": 10, "signed": false}) {
    let bytes = writeBytes(values, options, bitDepth);
    helpers.makeBigEndian(bytes, options.be, bitDepth);
    helpers.outputToBase(bytes, bitDepth, options.base);
    helpers.fixFloat16Endianness(bytes, options);
    //if (options.buffer) {
    //    bytes = new Uint8Array(bytes);
    //}
    return bytes;
}

/**
 * Write values as bytes.
 * @param {!Array<number>|number|string} values The data.
 * @param {Object} options The options according to the type.
 * @param {number} bitDepth The bitDepth of the data.
 * @return {!Array<number>} the bytes.
 */
function writeBytes(values, options, bitDepth) {
    let bitWriter;
    if (options.char) {
        bitWriter = writer.writeString;
    } else {
        bitWriter = writer['write' + bitDepth + 'Bit' + (options.float ? "Float" : "")];
    }
    let i = 0;
    let j = 0;
    let len = values.length;
    let bytes = [];
    let minMax = getBitDepthMinMax(options, bitDepth);
    while (i < len) {
        checkOverflow(values, i, minMax, options);
        j = bitWriter(bytes, values, i, j, options.signed);
        i++;
    }
    return bytes;
}

/**
 * Get the minimum and maximum values accordind to the type.
 * @param {Object} options The options according to the type.
 * @param {number} bitDepth The bit depth of the data.
 * @return {Object}
 */
function getBitDepthMinMax(options, bitDepth) {
    let minMax = {};
    if (options.signed) {
        minMax.max = (bitDepthLib.BitDepthMaxValues[bitDepth] / 2) - 1;
        minMax.min = (bitDepthLib.BitDepthMaxValues[bitDepth] / 2) * -1;
    } else {
        minMax.max = bitDepthLib.BitDepthMaxValues[bitDepth] - 1;
        minMax.min = 0;
    }
    return minMax;
}

/**
 * Limit the value according to the bit depth in case of
 * overflow or underflow.
 * @param {!Array<number>|number|string} values The data.
 * @param {number} index The index of the value in the array.
 * @param {Object} minMax The minimum value.
 * @param {Object} options The maximum value.
 */
function checkOverflow(values, index, minMax, options) {
    if (!options.float) {
        if (values[index] > minMax.max) {
            values[index] = minMax.max;
        } else if(values[index] < minMax.min) {
            values[index] = minMax.min;
        }
    }
}

module.exports.toBytes = toBytes;
