/*
 * write-bytes: Functions to turn data into bytes.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const floats = require("../src/floats.js");
const intBits = require("int-bits");

const BitWriter = {

    // https://github.com/majimboo/c-struct
    "write48Bit": function (bytes, number, j) {
        bytes[j++] = number & 0xFF;
        bytes[j++] = number >> 8 & 0xFF;
        bytes[j++] = number >> 16 & 0xFF;
        bytes[j++] = number >> 24 & 0xFF;
        bytes[j++] = number / 0x100000000 & 0xFF;
        bytes[j++] = number / 0x10000000000 & 0xFF;
        return j;
    },

    // https://github.com/majimboo/c-struct
    "write40Bit": function (bytes, number, j) {
        bytes[j++] = number & 0xFF;
        bytes[j++] = number >> 8 & 0xFF;
        bytes[j++] = number >> 16 & 0xFF;
        bytes[j++] = number >> 24 & 0xFF;
        bytes[j++] = number / 0x100000000 & 0xFF;
        return j;
    },

    "write32BitFloat": function (bytes, number, j) {
        let bits = intBits.unpack(number);
        bytes[j++] = bits & 0xFF;
        bytes[j++] = bits >>> 8 & 0xFF;
        bytes[j++] = bits >>> 16 & 0xFF;
        bytes[j++] = bits >>> 24 & 0xFF;
        return j;
    },

    "write32Bit": function (bytes, number, j) {
        bytes[j++] = number & 0xFF;
        bytes[j++] = number >>> 8 & 0xFF;
        bytes[j++] = number >>> 16 & 0xFF;
        bytes[j++] = number >>> 24 & 0xFF;
        return j;
    },

    "write24Bit": function (bytes, number, j) {
        bytes[j++] = number & 0xFF;
        bytes[j++] = number >>> 8 & 0xFF;
        bytes[j++] = number >>> 16 & 0xFF;
        return j;
    },

    "write16Bit": function (bytes, number, j) {
        bytes[j++] = number & 0xFF;
        bytes[j++] = number >>> 8 & 0xFF;
        return j;
    },

    "write16BitFloat": function (bytes, number, j) {
        let bits = floats.toHalf(number);
        bytes[j++] = bits >>> 8 & 0xFF;
        bytes[j++] = bits & 0xFF;
        return j;
    },

    "write8Bit": function (bytes, number, j) {
        bytes[j++] = number & 0xFF;
        return j;
    },

    "write4Bit": function (bytes, number, j) {
        bytes[j++] = number & 0xF;
        return j;
    },

    "write2Bit": function (bytes, number, j) {
        bytes[j++] = number < 0 ? number + 4 : number;
        return j;
    },

    "write1Bit": function (bytes, number, j) {
        bytes[j++] = number ? 1 : 0;
        return j;
    },

    "writeString": function (bytes, string, j) {
        bytes[j++] = string.charCodeAt(0);
        return j;
    },

    "write64BitFloat": function(bytes, number, j) {
        let bits = floats.toFloat64(number);
        j = BitWriter["write32Bit"](bytes, bits[1], j);
        return BitWriter["write32Bit"](bytes, bits[0], j);
    },

};

module.exports = BitWriter;
