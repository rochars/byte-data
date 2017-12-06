/**
 * bit-parser: Functions to read and write bytes.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 * Float32 based on int-bits: https://github.com/Jam3/int-bits
 */

const helpers = require("../src/helpers.js");
const floats = require("../src/floats.js");
let i8 = new Int8Array(4);
let i32 = new Int32Array(i8.buffer, 0, 1);
let f32 = new Float32Array(i8.buffer, 0, 1);

/**
 * Read a group of bytes by turning it to bits.
 * Useful for 40 & 48-bit, but underperform.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @param {number} numBytes The number of bytes
 *      (1 for 8-bit, 2 for 16-bit, etc).
 * @return {number}
 */
function readBytesAsBits(bytes, i, numBytes) {
    let j = numBytes-1;
    let bits = "";
    while (j >= 0) {
        bits += helpers.bytePadding(bytes[j + i].toString(2), 2);
        j--;
    }
    return parseInt(bits, 2);
}

let BitReader = {

    /**
     * Read 1 8-bit int from from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read8Bit": function (bytes, i) {
        return bytes[i];
    },

    /**
     * Read 1 16-bit int from from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read16Bit": function (bytes, i) {
        return bytes[1 + i] << 8 | bytes[i];
    },

    /**
     * Read 1 16-bit float from from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read16BitFloat": function (bytes, i) {
        return floats.decodeFloat16(bytes.slice(i,i+2));
    },

    /**
     * Read 1 24-bit int from from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read24Bit": function (bytes, i) {
        return bytes[2 + i] << 16 | BitReader["read16Bit"](bytes, i);
    },

    /**
     * Read 1 32-bit int from from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read32Bit": function (bytes, i) {
        return (bytes[3 + i] << 24 |
            BitReader["read24Bit"](bytes, i)) >>> 0;
    },

    /**
     * Read 1 32-bit float from from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read32BitFloat": function (bytes, i) {
        i32[0] = BitReader["read32Bit"](bytes, i);
        return f32[0];
    },

    /**
     * Read 1 40-bit int from from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read40Bit": function (bytes, i) {
        return readBytesAsBits(bytes, i, 5);
    },

    /**
     * Read 1 48-bit int from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read48Bit": function (bytes, i) {
        return readBytesAsBits(bytes, i, 6);
    },

    /**
     * Read 1 64-bit double from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read64BitFloat": function (bytes, i) {
        return floats.decodeFloat64(bytes.slice(i,i+8));
    },

    /**
     * Read 1 char from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {string}
     */
    "readChar": function (bytes, i, type) {
        let chrs = "";
        let j = 0;
        let len = type.bits / 8;
        while(j < len) {
            chrs += String.fromCharCode(bytes[i+j]);
            j++;
        }
        return chrs;
    }
};

let BitWriter = {

    "write64BitFloat": function(bytes, number, j) {
        let bits = floats.toFloat64(number);
        j = BitWriter["write32Bit"](bytes, bits[1], j);
        return BitWriter["write32Bit"](bytes, bits[0], j);
    },

    // Thanks https://github.com/majimboo/c-struct
    "write48Bit": function (bytes, number, j) {
        j = BitWriter["write40Bit"](bytes, number, j);
        bytes[j++] = number / 0x10000000000 & 0xFF;
        return j;
    },

    // Thanks https://github.com/majimboo/c-struct
    "write40Bit": function (bytes, number, j) {
        j = BitWriter["write32Bit"](bytes, number, j);
        bytes[j++] = number / 0x100000000 & 0xFF;
        return j;
    },

    "write32BitFloat": function (bytes, number, j) {
        f32[0] = number;
        j = BitWriter["write32Bit"](bytes, i32[0], j);
        return j;
    },

    "write32Bit": function (bytes, number, j) {
        j = BitWriter["write24Bit"](bytes, number, j);
        bytes[j++] = number >>> 24 & 0xFF;
        return j;
    },

    "write24Bit": function (bytes, number, j) {
        j = BitWriter["write16Bit"](bytes, number, j);
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
    }
};

module.exports.BitWriter = BitWriter;
module.exports.BitReader = BitReader;
