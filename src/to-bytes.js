/*
 * to-bytes: convert bytes to numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const intBits = require("int-bits");
const helpers = require("../src/helpers.js");

/**
 * Unpack a 64 bit float into two words.
 * Thanks https://stackoverflow.com/a/16043259
 * @param {number} value A float64 number.
 */
function toFloat64(value) {
    let hiWord = 0;
    let loWord = 0;
    if (value <= 0.0) {
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
 * Split 64 bit numbers into bytes.
 * @param {!Array<number>} numbers float64 numbers.
 * @return {!Array<number>} the bytes.
 */
function floatTo8Bytes(numbers, base=10) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    if (base == 10) {
        while (i < len) {
            // 0s should not be signed by default
            if (numbers[i] == 0) {
                bytes = bytes.concat([0,0,0,0,0,0,0,0]);
                j+=8;
            } else {
                numbers[i] = toFloat64(numbers[i]);
                bytes[j++] = numbers[i][1] & 0xFF;
                bytes[j++] = numbers[i][1] >>> 8 & 0xFF;
                bytes[j++] = numbers[i][1] >>> 16 & 0xFF;
                bytes[j++] = numbers[i][1] >>> 24 & 0xFF;
                bytes[j++] = numbers[i][0] & 0xFF;
                bytes[j++] = numbers[i][0] >>> 8 & 0xFF;
                bytes[j++] = numbers[i][0] >>> 16 & 0xFF;
                bytes[j++] = numbers[i][0] >>> 24 & 0xFF;
            }
            i++;
        }
    } else {
        while (i < len) {
            // 0s should not be signed by default
            if (numbers[i] == 0) {
                bytes = bytes.concat([0,0,0,0,0,0,0,0]);
                j+=8;
            }else {
                numbers[i] = toFloat64(numbers[i]);
                bytes[j++] = (numbers[i][1] & 0xFF).toString(base);
                helpers.padding(bytes, base, j-1);
                bytes[j++] = (numbers[i][1] >>> 8 & 0xFF).toString(base);
                helpers.padding(bytes, base, j-1);
                bytes[j++] = (numbers[i][1] >>> 16 & 0xFF).toString(base);
                helpers.padding(bytes, base, j-1);
                bytes[j++] = (numbers[i][1] >>> 24 & 0xFF).toString(base);
                helpers.padding(bytes, base, j-1);
                bytes[j++] = (numbers[i][0] & 0xFF).toString(base);
                helpers.padding(bytes, base, j-1);
                bytes[j++] = (numbers[i][0] >>> 8 & 0xFF).toString(base);
                helpers.padding(bytes, base, j-1);
                bytes[j++] = (numbers[i][0] >>> 16 & 0xFF).toString(base);
                helpers.padding(bytes, base, j-1);
                bytes[j++] = (numbers[i][0] >>> 24 & 0xFF).toString(base);
                helpers.padding(bytes, base, j-1);
            }
            i++;
        }
    }
    return bytes;
}

/**
 * Split 32 bit float numbers into bytes.
 * @param {!Array<number>} numbers float32 numbers.
 * @return {!Array<number>} the bytes.
 */
function floatTo4Bytes(numbers, base=10) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    if (base == 10) {
        while (i < len) {            
            numbers[i] = intBits.unpack(numbers[i]);
            bytes[j++] = numbers[i] & 0xFF;
            bytes[j++] = numbers[i] >>> 8 & 0xFF;
            bytes[j++] = numbers[i] >>> 16 & 0xFF;
            bytes[j++] = numbers[i] >>> 24 & 0xFF;
            i++;
        }
    } else {
        while (i < len) {            
            numbers[i] = intBits.unpack(numbers[i]);
            bytes[j++] = ((numbers[i]) & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            bytes[j++] = ((numbers[i] >>> 8) & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            bytes[j++] = ((numbers[i] >>> 16) & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            bytes[j++] = ((numbers[i] >>> 24) & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            i++;
        }
    }
    return bytes;
}

/**
 * Split 48 bit int numbers into 6 bytes.
 * @param {!Array<number>} numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo6Bytes(numbers, base=10) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    if (base == 10) {
        while (i < len) {
            bytes[j++] = numbers[i] & 0xFF;
            bytes[j++] = numbers[i] >> 8 & 0xFF;
            bytes[j++] = numbers[i] >> 16 & 0xFF;
            bytes[j++] = numbers[i] >> 24 & 0xFF;
            bytes[j++] = numbers[i] / 0x100000000 & 0xFF;
            bytes[j++] = numbers[i] / 0x10000000000 & 0xFF;
            i++;
        }
    } else {
        while (i < len) {
            bytes[j++] = (numbers[i] & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            bytes[j++] = (numbers[i] >> 8 & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            bytes[j++] = (numbers[i] >> 16 & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            bytes[j++] = (numbers[i] >> 24 & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            bytes[j++] = (numbers[i] / 0x100000000 & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            bytes[j++] = (numbers[i] / 0x10000000000 & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            i++;
        }
    }
    return bytes;
}

/**
 * Split 40 bit int numbers into 5 bytes.
 * @param {!Array<number>} numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo5Bytes(numbers, base=10) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    if (base == 10) {
        while (i< len) {
            bytes[j++] = numbers[i] & 0xFF;
            bytes[j++] = numbers[i] >> 8 & 0xFF;
            bytes[j++] = numbers[i] >> 16 & 0xFF;
            bytes[j++] = numbers[i] >> 24 & 0xFF;
            bytes[j++] = numbers[i] / 0x100000000 & 0xFF;
            i++;
        }
    } else {
        while (i< len) {
            bytes[j++] = (numbers[i] & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            bytes[j++] = (numbers[i] >> 8 & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            bytes[j++] = (numbers[i] >> 16 & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            bytes[j++] = (numbers[i] >> 24 & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            bytes[j++] = (numbers[i] / 0x100000000 & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            i++;
        }
    }
    return bytes;
}

/**
 * Split 32 bit int numbers into bytes.
 * @param {!Array<number>} numbers int32 numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo4Bytes(numbers, base=10) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    if (base == 10) {
        while (i < len) {
            bytes[j++] = numbers[i] & 0xFF;
            bytes[j++] = numbers[i] >>> 8 & 0xFF;
            bytes[j++] = numbers[i] >>> 16 & 0xFF;
            bytes[j++] = numbers[i] >>> 24 & 0xFF;
            i++;
        }
    } else {
        while (i < len) {
            bytes[j++] = (numbers[i] & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            bytes[j++] = (numbers[i] >>> 8 & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            bytes[j++] = (numbers[i] >>> 16 & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            bytes[j++] = (numbers[i] >>> 24 & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            i++;
        }
    }
    return bytes;
}

/**
 * Split 24 bit int numbers into bytes.
 * @param {!Array<number>} numbers int24 numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo3Bytes(numbers, base=10) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    if (base == 10) {
        while (i < len) {
            bytes[j++] = numbers[i] & 0xFF;
            bytes[j++] = numbers[i] >>> 8 & 0xFF;
            bytes[j++] = numbers[i] >>> 16 & 0xFF;
            i++;
        }
    } else {
        while (i < len) {
            bytes[j++] = (numbers[i] & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            bytes[j++] = (numbers[i] >>> 8 & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            bytes[j++] = (numbers[i] >>> 16 & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            i++;
        }
    }  
    return bytes;
}

/**
 * Split 16 bit int numbers into bytes.
 * @param {!Array<number>} numbers int16 numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo2Bytes(numbers, base=10) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    if (base == 10) {
        while (i < len) {
            bytes[j++] = numbers[i] & 0xFF;
            bytes[j++] = numbers[i] >>> 8 & 0xFF;
            i++;
        }
    } else {
        while (i < len) {
            bytes[j++] = (numbers[i] & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            bytes[j++] = (numbers[i] >>> 8 & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            i++;
        }
    }
    return bytes;
}

/**
 * Split a 8 bit int numbers into bytes
 * @param {!Array<number>} numbers int8 numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo1Byte(numbers, base=10) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    if (base == 10) {
        while (i < len) {
            bytes[j++] = numbers[i] & 0xFF;
            i++;
        }
    } else {
        while (i < len) {
            bytes[j++] = (numbers[i] & 0xFF).toString(base);
            helpers.padding(bytes, base, j-1);
            i++;
        }
    }
    return bytes;
}

/**
 * 4-bit int numbers into a nibbles.
 * @param {!Array<number>} numbers int8 numbers.
 * @return {!Array<number>} the bytes.
 */
function intToNibble(numbers, base=10) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    if (base == 10) {
        while (i < len) {
            bytes[j++] = numbers[i] & 0xF;
            i++;
        }
    } else {
        while (i < len) {
            bytes[j++] = (numbers[i] & 0xF).toString(base);
            helpers.padding(bytes, base, j-1);
            if (base == 2) {
                bytes[j-1] = bytes[j-1].slice(4,8);
            }
            helpers.paddingNibble(bytes, base, j-1);
            i++;
        }
    }
    return bytes;
}

/**
 * Values to crumb form.
 * @param {!Array<number>} values Array of numbers.
 * @param {number} base The base.
 * @return {!Array<number>} the crumbs.
 */
function toCrumb(values, base=10) {
    let i = 0;
    let j = 0;
    let len = values.length;
    let bytes = [];
    if (base == 10) {
        while (i < len) {
            bytes[j++] = values[i] < 0 ? values[i] + 4 : values[i];
            i++;
        }
    } else {
        while (i < len) {
            let v = values[i] < 0 ? values[i] + 4 : values[i];
            bytes[j++] = (v).toString(base);
            helpers.padding(bytes, base, j-1);
            if (base == 2) {
                bytes[j-1] = bytes[j-1].slice(6,8);
            }
            helpers.paddingCrumb(bytes, base, j-1);
            i++;
        }
    }
    return bytes;
}

/**
 * Values to boolean form.
 * @param {!Array<number>} values Array of numbers.
 * @param {number} base The base.
 * @return {!Array<number>} the booleans.
 */
function toBoolean(values, base=10) {
    let i = 0;
    let j = 0;
    let len = values.length;
    let booleans = [];
    if (base == 10) {
        while (i < len) {
            booleans[j++] = values[i] ? 1 : 0;
            i++;
        }
    } else {
        while (i < len) {
            booleans[j++] = values[i] ? "1" : "0";
            i++;
        }
    }
    return booleans;
}

/**
 * Turn a string to an array of bytes.
 * @param {string} string The string.
 * @return {!Array<number>} the bytes.
 */
function stringToBytes(string, base=10) {
    let i = 0;
    let j = 0;
    let len = string.length;
    let bytes = [];
    if (base == 10) {
        while (i < len) {
            bytes[j++] = string.charCodeAt(i);
            helpers.padding(bytes, base, j-1);
            i++;
        }
    } else {
        while (i < len) {
            bytes[j++] = string.charCodeAt(i).toString(base);
            i++;
        }
    }
    return bytes;
}

module.exports.floatTo8Bytes = floatTo8Bytes;
module.exports.floatTo4Bytes = floatTo4Bytes;
module.exports.intTo6Bytes = intTo6Bytes;
module.exports.intTo5Bytes = intTo5Bytes;
module.exports.intTo4Bytes = intTo4Bytes;
module.exports.intTo3Bytes = intTo3Bytes;
module.exports.intTo2Bytes = intTo2Bytes;
module.exports.intTo1Byte = intTo1Byte;
module.exports.intToNibble = intToNibble;
module.exports.toCrumb = toCrumb;
module.exports.toBoolean = toBoolean;
module.exports.stringToBytes = stringToBytes;
