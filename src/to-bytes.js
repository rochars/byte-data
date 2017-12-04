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
 * @param {Object} type One of the available types.
 * @return {!Array<number>|!Array<string>|Uint8Array} the data as a byte buffer.
 */
function toBytes(values, type) {
    let bytes = writeBytes(values, type);
    helpers.makeBigEndian(bytes, type.be, type.bits);
    helpers.outputToBase(bytes, type.bits, type.base);
    helpers.fixFloat16Endianness(bytes, type);
    return bytes;
}

/**
 * Write values as bytes.
 * @param {!Array<number>|number|string} values The data.
 * @param {Object} type One of the available types.
 * @return {!Array<number>} the bytes.
 */
function writeBytes(values, type) {
    let bitWriter;
    if (type.char) {
        bitWriter = writer.writeString;
    } else {
        bitWriter = writer[
            'write' + type.bits + 'Bit' + (type.float ? "Float" : "")];
    }
    let i = 0;
    let j = 0;
    let len = values.length;
    let bytes = [];
    let minMax = getBitDepthMinMax(type);
    while (i < len) {
        j = bitWriter(bytes,  checkOverflow(values[i], minMax, type), j);
        i++;
    }
    return bytes;
}

/**
 * Get the minimum and maximum values accordind to the type.
 * This should be defined in bit-depth.
 * @param {Object} type The options according to the type.
 * @return {Object}
 */
function getBitDepthMinMax(type) {
    let minMax = {};
    if (type.signed) {
        minMax.max = (bitDepthLib.BitDepthMaxValues[type.bits] / 2) - 1;
        minMax.min = (bitDepthLib.BitDepthMaxValues[type.bits] / 2) * -1;
    } else {
        minMax.max = bitDepthLib.BitDepthMaxValues[type.bits] - 1;
        minMax.min = 0;
    }
    return minMax;
}

/**
 * Limit the value according to the bit depth in case of
 * overflow or underflow.
 * @param {!Array<number>|number|string} value The data.
 * @param {Object} minMax The minimum value.
 * @param {Object} options The maximum value.
 */
function checkOverflow(value, minMax, options) {
    if (!options.float) {
        if (value > minMax.max) {
            value = minMax.max;
        } else if(value < minMax.min) {
            value = minMax.min;
        }
    }
    return value;
}

module.exports.toBytes = toBytes;
