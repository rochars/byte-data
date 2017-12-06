/**
 * bit-parser: Functions to read and write bytes.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 * Float32 based on int-bits: https://github.com/Jam3/int-bits
 */

let f32 = new Float32Array(1);
let i32 = new Int32Array(f32.buffer);


/**
 * Functions to read data from bytes.
 * @enum {Function}
 */
const BitReader = {

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
     * Thanks https://stackoverflow.com/a/8796597
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read16BitFloat": function (bytes, i) {
        let binary = parseInt(getBinary([bytes[i], bytes[i+1]]), 2);
        let exponent = (binary & 0x7C00) >> 10;
        let fraction = binary & 0x03FF;
        let floatValue;
        if (exponent) {
            floatValue =  Math.pow(2, exponent - 15) * (1 + fraction / 0x400);
        } else {
            floatValue = 6.103515625e-5 * (fraction / 0x400);
        }
        return  floatValue * (binary >> 15 ? -1 : 1);
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
     * Thanks https://gist.github.com/kg/2192799
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} x The index to read.
     * @return {number}
     */
    "read64BitFloat": function (bytes, x) {
        let binary = getBinary(bytes.slice(x, x + 8));
        let significandBin = "1" + binary.substr(1 + 11, 52);
        let val = 1;
        let significand = 0;
        let i = 0;
        while (i < significandBin.length) {
            significand += val * parseInt(significandBin.charAt(i), 10);
            val = val / 2;
            i++;
        }
        let sign = (binary.charAt(0) == "1") ? -1 : 1;
        let doubleValue = sign * significand *
            Math.pow(2, parseInt(binary.substr(1, 11), 2) - 1023);
        return doubleValue == -0 ? 0 : doubleValue;
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

/**
 * Functions to write data to bytes.
 * @enum {Function}
 */
let BitWriter = {

    "write64BitFloat": function(bytes, number, j) {
        let bits = toFloat64(number);
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
        let bits = toHalf(number);
        bytes[j] = bits & 0xFF;
        bytes[j+1] = bits >>> 8 & 0xFF;
        return j+2;
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

/**
 * Get a binary string representation of a value described as bytes.
 * @param {Array<number>|number} bytes The bytes.
 * @return {string}
 */
function getBinary(bytes) {
    let binary = "";
    let i = 0;
    let bytesLength = bytes.length;
    while(i < bytesLength) {
        let bits = bytes[i].toString(2);
        binary = Array(9 - bits.length).join("0") + bits + binary;
        i++;
    }
    return binary;
}

/**
 * Unpack a 64 bit float into two words.
 * Thanks https://stackoverflow.com/a/16043259
 * @param {number} value A float64 number.
 * @return {!Array<number>}
 */
function toFloat64(value) {
    if (value == 0) {
        return [0, 0];
    }
    let hiWord = 0;
    let loWord = 0;
    if (value <= 0) {
        hiWord = 0x80000000;
        value = -value;
    }
    let exponent = Math.floor(
        Math.log(value) / Math.log(2));
    let significand = Math.floor(
        (value / Math.pow(2, exponent)) * Math.pow(2, 52));
    loWord = significand & 0xFFFFFFFF;
    significand /= Math.pow(2, 32);
    exponent += 1023;
    hiWord = hiWord | (exponent << 20);
    hiWord = hiWord | (significand & ~(-1 << 20));
    return [hiWord, loWord];
}

/**
 * to-half: int bits of half-precision floating point values
 * Based on:
 * https://mail.mozilla.org/pipermail/es-discuss/2017-April/047994.html
 * https://github.com/rochars/byte-data
 * @param {number} val The float16 value.
 * @return {number}
 */
function toHalf(val) {
    f32[0] = val;
    let x = i32[0];
    let bits = (x >> 16) & 0x8000;
    let m = (x >> 12) & 0x07ff;
    let e = (x >> 23) & 0xff;
    if (e < 103) {
        return bits;
    }
    bits |= ((e - 112) << 10) | (m >> 1);
    bits += m & 1;
    return bits;
}

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
    let byte = "";
    while (j >= 0) {
        let bits = bytes[j + i].toString(2);
        byte += Array(9 - bits.length).join("0") + bits;
        j--;
    }
    return parseInt(byte, 2);
}

module.exports.BitWriter = BitWriter;
module.exports.BitReader = BitReader;
