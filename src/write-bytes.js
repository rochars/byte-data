/*
 * Functions to turn data into bytes.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const float = require("../src/float.js");
const intBits = require("int-bits");

function write64Bit(bytes, numbers, i, j) {
    let number = float.toFloat64(numbers[i]);
    bytes[j++] = number[1] & 0xFF;
    bytes[j++] = number[1] >>> 8 & 0xFF;
    bytes[j++] = number[1] >>> 16 & 0xFF;
    bytes[j++] = number[1] >>> 24 & 0xFF;
    bytes[j++] = number[0] & 0xFF;
    bytes[j++] = number[0] >>> 8 & 0xFF;
    bytes[j++] = number[0] >>> 16 & 0xFF;
    bytes[j++] = number[0] >>> 24 & 0xFF;
    return j;
}

// https://github.com/majimboo/c-struct
function write48Bit(bytes, numbers, i, j) {
    bytes[j++] = numbers[i] & 0xFF;
    bytes[j++] = numbers[i] >> 8 & 0xFF;
    bytes[j++] = numbers[i] >> 16 & 0xFF;
    bytes[j++] = numbers[i] >> 24 & 0xFF;
    bytes[j++] = numbers[i] / 0x100000000 & 0xFF;
    bytes[j++] = numbers[i] / 0x10000000000 & 0xFF;
    return j;
}

// https://github.com/majimboo/c-struct
function write40Bit(bytes, numbers, i, j) {
    bytes[j++] = numbers[i] & 0xFF;
    bytes[j++] = numbers[i] >> 8 & 0xFF;
    bytes[j++] = numbers[i] >> 16 & 0xFF;
    bytes[j++] = numbers[i] >> 24 & 0xFF;
    bytes[j++] = numbers[i] / 0x100000000 & 0xFF;
    return j;
}

function write32BitFloat(bytes, numbers, i, j) {
    numbers[i] = intBits.unpack(numbers[i]);
    bytes[j++] = numbers[i] & 0xFF;
    bytes[j++] = numbers[i] >>> 8 & 0xFF;
    bytes[j++] = numbers[i] >>> 16 & 0xFF;
    bytes[j++] = numbers[i] >>> 24 & 0xFF;
    return j;
}

function write32Bit(bytes, numbers, i, j) {
    bytes[j++] = numbers[i] & 0xFF;
    bytes[j++] = numbers[i] >>> 8 & 0xFF;
    bytes[j++] = numbers[i] >>> 16 & 0xFF;
    bytes[j++] = numbers[i] >>> 24 & 0xFF;
    return j;
}

function write24Bit(bytes, numbers, i, j) {
    bytes[j++] = numbers[i] & 0xFF;
    bytes[j++] = numbers[i] >>> 8 & 0xFF;
    bytes[j++] = numbers[i] >>> 16 & 0xFF;
    return j;
}

function write16Bit(bytes, numbers, i, j) {
    bytes[j++] = numbers[i] & 0xFF;
    bytes[j++] = numbers[i] >>> 8 & 0xFF;
    return j;
}

function write16BitFloat(bytes, numbers, i, j) {
    numbers[i] = float.toHalf(numbers[i]);
    bytes[j++] = numbers[i] >>> 8 & 0xFF;
    bytes[j++] = numbers[i] & 0xFF;
    return j;
}

function write8Bit(bytes, numbers, i, j) {
    bytes[j++] = numbers[i] & 0xFF;
    return j;
}

function write4Bit(bytes, numbers, i, j) {
    bytes[j++] = numbers[i] & 0xF;
    return j;
}

function write2Bit(bytes, numbers, i, j) {
    bytes[j++] = numbers[i] < 0 ? numbers[i] + 4 : numbers[i];
    return j;
}

function write1Bit(bytes, numbers, i, j) {
    bytes[j++] = numbers[i] ? 1 : 0;
    return j;
}

function writeString(bytes, string, i, j) {
    bytes[j++] = string.charCodeAt(i);
    return j;
}

module.exports.write64Bit = write64Bit;
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
