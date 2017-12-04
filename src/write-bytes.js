/*
 * write-bytes: Functions to turn data into bytes.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const floats = require("../src/floats.js");
const intBits = require("int-bits");

function write64BitFloat(bytes, number, j) {
    let bits = floats.toFloat64(number);
    j = write32Bit(bytes, bits[1], j);
    return write32Bit(bytes, bits[0], j);
}

// https://github.com/majimboo/c-struct
function write48Bit(bytes, number, j) {
    bytes[j++] = number & 0xFF;
    bytes[j++] = number >> 8 & 0xFF;
    bytes[j++] = number >> 16 & 0xFF;
    bytes[j++] = number >> 24 & 0xFF;
    bytes[j++] = number / 0x100000000 & 0xFF;
    bytes[j++] = number / 0x10000000000 & 0xFF;
    return j;
}

// https://github.com/majimboo/c-struct
function write40Bit(bytes, number, j) {
    bytes[j++] = number & 0xFF;
    bytes[j++] = number >> 8 & 0xFF;
    bytes[j++] = number >> 16 & 0xFF;
    bytes[j++] = number >> 24 & 0xFF;
    bytes[j++] = number / 0x100000000 & 0xFF;
    return j;
}

function write32BitFloat(bytes, number, j) {
    let bits = intBits.unpack(number);
    bytes[j++] = bits & 0xFF;
    bytes[j++] = bits >>> 8 & 0xFF;
    bytes[j++] = bits >>> 16 & 0xFF;
    bytes[j++] = bits >>> 24 & 0xFF;
    return j;
}

function write32Bit(bytes, number, j) {
    bytes[j++] = number & 0xFF;
    bytes[j++] = number >>> 8 & 0xFF;
    bytes[j++] = number >>> 16 & 0xFF;
    bytes[j++] = number >>> 24 & 0xFF;
    return j;
}

function write24Bit(bytes, number, j) {
    bytes[j++] = number & 0xFF;
    bytes[j++] = number >>> 8 & 0xFF;
    bytes[j++] = number >>> 16 & 0xFF;
    return j;
}

function write16Bit(bytes, number, j) {
    bytes[j++] = number & 0xFF;
    bytes[j++] = number >>> 8 & 0xFF;
    return j;
}

function write16BitFloat(bytes, number, j) {
    let bits = floats.toHalf(number);
    bytes[j++] = bits >>> 8 & 0xFF;
    bytes[j++] = bits & 0xFF;
    return j;
}

function write8Bit(bytes, number, j) {
    bytes[j++] = number & 0xFF;
    return j;
}

function write4Bit(bytes, number, j) {
    bytes[j++] = number & 0xF;
    return j;
}

function write2Bit(bytes, number, j) {
    bytes[j++] = number < 0 ? number + 4 : number;
    return j;
}

function write1Bit(bytes, number, j) {
    bytes[j++] = number ? 1 : 0;
    return j;
}

function writeString(bytes, string, j) {
    bytes[j++] = string.charCodeAt(0);
    return j;
}

module.exports.write64BitFloat = write64BitFloat;
module.exports.write48Bit = write48Bit;
module.exports.write40Bit = write40Bit;
module.exports.write32BitFloat = write32BitFloat;
module.exports.write32Bit = write32Bit;
module.exports.write24Bit = write24Bit;
module.exports.write16Bit = write16Bit;
module.exports.write16BitFloat = write16BitFloat;
module.exports.write8Bit = write8Bit;
module.exports.write4Bit = write4Bit;
module.exports.write2Bit = write2Bit;
module.exports.write1Bit = write1Bit;
module.exports.writeString = writeString;
