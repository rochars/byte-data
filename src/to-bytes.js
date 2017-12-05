/*
 * to-bytes: bytes to numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const helpers = require("../src/helpers.js");

/**
 * Turn numbers and strings to bytes.
 * @param {!Array<number>|number|string} values The data.
 * @param {Object} type One of the available types.
 * @return {!Array<number>|!Array<string>|Uint8Array} the data as a byte buffer.
 */
function toBytes(values, type) {
    let bytes = writeBytes(values, type);
    helpers.makeBigEndian(bytes, type);
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
    let i = 0;
    let j = 0;
    let len = values.length;
    let bytes = [];
    while (i < len) {
        j = type.writer(bytes, checkOverflow(values[i], type), j);
        i++;
    }
    return bytes;
}

/**
 * Limit the value according to the bit depth in case of
 * overflow or underflow.
 * @param {!Array<number>|number|string} value The data.
 * @param {Object} type The maximum value.
 */
function checkOverflow(value, type) {
    if (!type.float) {
        if (value > type.max) {
            value = type.max;
        } else if(value < type.min) {
            value = type.min;
        }
    }
    return value;
}

module.exports.toBytes = toBytes;
