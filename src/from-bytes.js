/*
 * from-bytes: convert bytes to numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const intBits = require("int-bits");
const helpers = require("../src/helpers.js");
const reader = require("../src/read-bytes.js");

const maxBitDepth = {
    2: 4,
    4: 16,
    8: 256,
    16: 65536,
    24: 16777216,
    32: 4294967296,
    40: 1099511627776,
    48: 281474976710656
};

/**
 * Read numbers from a array of booleans.
 * @param {!Array<number>|Uint8Array} booleans An array of booleans.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function fromBoolean(booleans, base=10) {
    let samples = [];
    let i = 0;
    let len = booleans.length;
    helpers.bytesToInt(booleans, base);
    while (i < len) {
        samples[i] = parseInt(booleans[i], 2);
        i++;
    }
    return samples;
}

function signed(number, bitDepth) {
    if (number > parseInt(maxBitDepth[bitDepth] / 2, 10) - 1) {
        number -= maxBitDepth[bitDepth];
    }
    return number;
}

/**
 * Read 2-bit signed ints from an array of crumbs.
 * @param {!Array<number>|Uint8Array} crumbs An array of crumbs.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function intFromCrumb(crumbs, base=10) {
    let samples = [];
    let i = 0;
    let len = crumbs.length;
    helpers.bytesToInt(crumbs, base);   
    while (i < len) {
        samples[i] = signed(crumbs[i], 2);
        i++;
    }
    return samples;
}

/**
 * Read 4-bit signed ints from an array of nibbles.
 * @param {!Array<number>|Uint8Array} nibbles An array of nibbles.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function intFromNibble(nibbles, base=10) {
    let samples = [];
    let i = 0;
    let len = nibbles.length;
    helpers.bytesToInt(nibbles, base);
    while (i < len) {
        samples[i] = signed(nibbles[i], 4);
        i++;
    }
    return samples;
}

/**
 * Read 8-bit unsigned ints from an array of bytes.
 * Just return a copy of the original array.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function uIntFrom1Byte(bytes, base=10) {
    helpers.bytesToInt(bytes, base);
    return [].slice.call(bytes);
}

/**
 * Read 8-bit signed ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function intFrom1Byte(bytes, base=10) {
    let samples = [];
    let i = 0;
    let len = bytes.length;
    helpers.bytesToInt(bytes, base);
    while (i < len) {
        samples[i] = signed(bytes[i], 8);
        i++;
    }
    return samples;
}

/**
 * Read 16-bit signed ints from an array of bytes.
 * Thanks https://stackoverflow.com/a/38298413
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function intFrom2Bytes(bytes, base=10) {
    let samples = [];
    let i = 0;
    let j = 0;
    let len = bytes.length;
    helpers.bytesToInt(bytes, base);
    while (i < len) {
        samples[j] = (bytes[1 + i] << 8) |
                bytes[i];
        samples[j] = signed(samples[j], 16);
        j++;
        i+=2;
    }
    return samples;
}

/**
 * Read 16-bit unsigned ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function uIntFrom2Bytes(bytes, base=10) {
    let samples = [];
    let i = 0;
    let j = 0;
    let len = bytes.length;
    helpers.bytesToInt(bytes, base);   
    while (i < len) {
        samples[j] = (bytes[1 + i] << 8) | bytes[i];
        j++;
        i+=2;
    }
    return samples;
}

/**
 * Read 24-bit signed ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function intFrom3Bytes(bytes, base=10) {
    let samples = [];
    let i = 0;
    let j = 0;
    let len = bytes.length;
    helpers.bytesToInt(bytes, base);
    while (i < len) {
        samples[j] = reader.read24Bit(bytes, i);
        samples[j] = signed(samples[j], 24);
        j++;
        i+=3;
    }
    return samples;
}

/**
 * Read 24-bit unsigned ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function uIntFrom3Bytes(bytes, base=10) {
    let samples = [];
    let i = 0;
    let j = 0;
    let len = bytes.length;
    helpers.bytesToInt(bytes, base);
    while (i < len) {
        samples[j] = reader.read24Bit(bytes, i);
        j++;
        i+=3;
    }
    return samples;
}

/**
 * Read 32-bit signed ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function intFrom4Bytes(bytes, base=10) {
    let samples = [];
    let i = 0;
    let j = 0;
    let len = bytes.length;
    helpers.bytesToInt(bytes, base);
    while (i < len) {
        samples[j] = reader.read32Bit(bytes, i);
        samples[j] = signed(samples[j], 32);
        j++;
        i+=4;
    }
    return samples;
}

/**
 * Read 32-bit unsigned ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function uIntFrom4Bytes(bytes, base=10) {
    let samples = [];
    let i = 0;
    let j = 0;
    let len = bytes.length;
    helpers.bytesToInt(bytes, base);
    while (i < len) {
        samples[j] = reader.read32Bit(bytes, i);
        samples[j] = samples[j] >>> 0;
        j++;
        i+=4;
    }
    return samples;
}

/**
 * Read 32-bit IEEE numbers from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function floatFrom4Bytes(bytes, base=10) {
    let samples = [];
    let i = 0;
    let j = 0;
    let len = bytes.length;
    helpers.bytesToInt(bytes, base);
    while (i < len) {
        samples[j] = intBits.pack(reader.read32Bit(bytes, i));
        j++;
        i+=4;
    }
    return samples;
}

/**
 * Read 40-bit unsigned ints from an array of bytes.
 * TODO: This is implementation is slower than other bytes.
 *       Find an alternative.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function uIntFrom5Bytes(bytes, base=10) {
    let samples = [];
    let i = 0;
    let j = 0;
    let len = bytes.length;
    helpers.bytesToInt(bytes, base);
    while (i < len) {
        samples[j] = reader.read40Bit(bytes, i);
        j++;
        i+=5;
    }
    return samples;
}

/**
 * Read 40-bit unsigned ints from an array of bytes.
 * TODO: This is implementation is slower than other bytes.
 *       Find an alternative.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function intFrom5Bytes(bytes, base=10) {
    let samples = [];
    let i = 0;
    let j = 0;
    let len = bytes.length;
    helpers.bytesToInt(bytes, base);
    while (i < len) {
        samples[j] = reader.read40Bit(bytes, i);
        samples[j] = signed(samples[j], 40);
        j++;
        i+=5;
    }
    return samples;
}

/**
 * Read 48-bit unsigned ints from an array of bytes.
 * TODO: This is implementation is slower than other bytes.
 *       Find an alternative.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function uIntFrom6Bytes(bytes, base=10) {
    let samples = [];
    let i = 0;
    let j = 0;
    let len = bytes.length;
    helpers.bytesToInt(bytes, base);
    while (i < len) {
        samples[j] = reader.read48Bit(bytes, i);
        j++;
        i+=6;
    }
    return samples;
}

/**
 * Read 48-bit unsigned ints from an array of bytes.
 * TODO: This is implementation is slower than other bytes.
 *       Find an alternative.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function intFrom6Bytes(bytes, base=10) {
    // 281474976710656
    let samples = [];
    let i = 0;
    let j = 0;
    let len = bytes.length;
    helpers.bytesToInt(bytes, base);
    while (i < len) {
        samples[j] = reader.read48Bit(bytes, i);
        samples[j] = signed(samples[j], 48);
        j++;
        i+=6;
    }
    return samples;
}

/**
 * Read 64-bit numbers from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function floatFrom8Bytes(bytes, base=10) {
    let samples = [];
    let i = 0;
    let j = 0;
    let len = bytes.length;
    helpers.bytesToInt(bytes, base);
    while (i < len) {
        samples[j] = helpers.decodeFloat([
                bytes[i],
                bytes[1 + i],
                bytes[2 + i],
                bytes[3 + i],
                bytes[4 + i],
                bytes[5 + i],
                bytes[6 + i],
                bytes[7 + i]
            ]);
        j++;
        i+=8;
    }    
    return samples;
}

/**
 * Convert an array of bytes to a string.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @return {string} The string.
 */
function stringFromBytes(bytes, base=10) {
    let string = "";
    let i = 0;
    let len = bytes.length;
    helpers.bytesToInt(bytes, base);
    while (i < len) {
        string += String.fromCharCode(bytes[i]);
        i++;
    }
    return string;
}

module.exports.fromBoolean = fromBoolean;
module.exports.intFromCrumb = intFromCrumb;
module.exports.uIntFromCrumb = uIntFrom1Byte;
module.exports.intFromNibble = intFromNibble;
module.exports.uIntFromNibble = uIntFrom1Byte;
module.exports.intFrom1Byte = intFrom1Byte;
module.exports.uIntFrom1Byte = uIntFrom1Byte;
module.exports.intFrom2Bytes = intFrom2Bytes;
module.exports.uIntFrom2Bytes = uIntFrom2Bytes;
module.exports.intFrom3Bytes = intFrom3Bytes;
module.exports.uIntFrom3Bytes = uIntFrom3Bytes;
module.exports.intFrom4Bytes = intFrom4Bytes;
module.exports.uIntFrom4Bytes = uIntFrom4Bytes;
module.exports.floatFrom4Bytes = floatFrom4Bytes;
module.exports.intFrom5Bytes = intFrom5Bytes;
module.exports.uIntFrom5Bytes = uIntFrom5Bytes;
module.exports.intFrom6Bytes = intFrom6Bytes;
module.exports.uIntFrom6Bytes = uIntFrom6Bytes;
module.exports.floatFrom8Bytes = floatFrom8Bytes;
module.exports.stringFromBytes = stringFromBytes;
