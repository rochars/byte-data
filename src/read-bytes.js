/*
 * Function to read data from arrays of bytes.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

let helpers = require("../src/helpers.js");

/**
 * Read 1 24-bit int from from bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to start reading.
 */
function read24Bit(bytes, i) {
    return bytes[2 + i] << 16 |
            bytes[1 + i] << 8 |
            bytes[i];
}

/**
 * Read 1 32-bit int from from bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to start reading.
 */
function read32Bit(bytes, i) {
    return bytes[3 + i] << 24 |
        bytes[2 + i] << 16 |
        bytes[1 + i] << 8 |
        bytes[i];
}

/**
 * Read 1 40-bit int from from bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to start reading.
 */
function read40Bit(bytes, i) {
    return parseInt(
        helpers.bytePadding(bytes[4 + i].toString(2), 2) +
        helpers.bytePadding(bytes[3 + i].toString(2), 2) +
        helpers.bytePadding(bytes[2 + i].toString(2), 2) +
        helpers.bytePadding(bytes[1 + i].toString(2), 2) +
        helpers.bytePadding(bytes[i].toString(2), 2), 2);
}

/**
 * Read 1 48-bit int from from bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to start reading.
 */
function read48Bit(bytes, i) {
    return parseInt(
        helpers.bytePadding(bytes[5 + i].toString(2), 2) +
        helpers.bytePadding(bytes[4 + i].toString(2), 2) +
        helpers.bytePadding(bytes[3 + i].toString(2), 2) +
        helpers.bytePadding(bytes[2 + i].toString(2), 2) +
        helpers.bytePadding(bytes[1 + i].toString(2), 2) +
        helpers.bytePadding(bytes[i].toString(2) ,2), 2);
}

module.exports.read24Bit = read24Bit;
module.exports.read32Bit = read32Bit;
module.exports.read40Bit = read40Bit;
module.exports.read48Bit = read48Bit;
