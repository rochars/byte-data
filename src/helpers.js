/*
 * helpers: functions to work with bytes and byte arrays.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const endianness = require("endianness");
const bitDepths = require("../src/bit-depth.js");

/**
 * Padding for binary strings.
 * @param {!Array<string>} bytes The bytes as binary strings.
 * @param {number} base The base.
 * @param {number} index The byte to pad.
 */
function padding(bytes, base, index) {
    bytes[index] = bytePadding(bytes[index], base);
}

/**
 * Padding with 0s for byte strings.
 * @param {string} theByte The byte as a binary or hex string.
 * @param {number} base The base.
 * @returns {string} The padded byte.
 */
function bytePadding(theByte, base) {
    let offset = theByte.length + 1;
    if (base == 2) {
        offset = 8;
    } else if (base == 16) {
        offset = 2;
    }
    return lPadZeros(theByte, offset);
}

/**
 * Fix the size of nibbles.
 * @param {!Array<string>} nibbles The nibble as a binary or hex string.
 * @param {number} base The base.
 * @param {number} index The nibble offset.
 */
function paddingNibble(nibbles, base, index) {
    if (base == 2 && nibbles[index].length < 4) {
        nibbles[index] = 
            new Array((5 - nibbles[index].length)).join("0")  + nibbles[index];
    }
}   

/**
 * Fix the size of crumbs.
 * @param {!Array<string>} crumbs The nibble as a binary or hex string.
 * @param {number} base The base.
 * @param {number} index The nibble offset.
 */
function paddingCrumb(crumbs, base, index) {
    if ((base == 2 || base == 16) && crumbs[index].length < 2) {
        crumbs[index] = '0' + crumbs[index];
    }
}   

/**
 * Pad a string with zeros to the left.
 * TODO: This should support both arrays and strings.
 * @param {string} value The string (representing a binary or hex value).
 * @param {number} numZeros the max number of zeros.
 *      For 1 binary byte string it should be 8.
 */
function lPadZeros(value, numZeros) {
    while (value.length < numZeros) {
        value = '0' + value;
    }
    return value;
}

/**
 * Swap the endianness to big endian.
 * @param {!Array<number>} bytes The values.
 * @param {boolean} isBigEndian True if the bytes should be big endian.
 * @param {number} bitDepth The bitDepth of the data.
 */
function makeBigEndian(bytes, isBigEndian, bitDepth) {
    if (isBigEndian) {
        endianness(bytes, bitDepths.BitDepthOffsets[bitDepth]);
    }
}

/**
 * Turn bytes to base 2, 10 or 16.
 * @param {!Array<string>|!Array<number>} bytes The bytes.
 * @param {number} base The base.
 * @param {Function} padFunction The function to use for padding.
 */
function bytesToBase(bytes, base, padFunction=padding) {
    if (base != 10) {
        let i = 0;
        let len = bytes.length;
        while (i < len) {
            bytes[i] = bytes[i].toString(base);
            padFunction(bytes, base, i);
            i++;
        }
    }
}

/**
 * Turn the output to the correct base.
 * @param {!Array<number>} bytes The bytes.
 * @param {number} bitDepth The bit depth of the data.
 * @param {number} base The desired base for the output data.
 */
function outputToBase(bytes, bitDepth, base) {
    if (bitDepth == 4) {
        bytesToBase(bytes, base, paddingNibble);
    } else if (bitDepth == 2) {
        bytesToBase(bytes, base, paddingCrumb);
    } else if(bitDepth == 1) {
        bytesToBase(bytes, base, function(){});
    }else {
        bytesToBase(bytes, base);
    }
}

/**
 * Turn a unsigned number to a signed number.
 * @param {number} num The number.
 * @param {number} maxValue The max range for the number bit depth.
 */
function signed(num, maxValue) {
    if (num > parseInt(maxValue / 2, 10) - 1) {
        num -= maxValue;
    }
    return num;
}

/**
 * Fix the endianness of float16 bytes (r/w is always big-endian).
 * @param {!Array<number>|Uint8Array} bytes The bytes.
 * @param {Object} options The type.
 */
function fixFloat16Endianness(bytes, options) {
    if (options.float && options.bits == 16) {
        endianness(bytes, 2);
    }
}

/**
 * Get the full type spec for the reading/writing.
 * @param {Object} atype One of the available types.
 * @param {number} base The base of the input.
 * @param {boolean} single True if its a single value, false for array.
 * @return {Object}
 */
function getType(atype, base, single) {
    let theType = Object.assign({}, atype);
    theType.base = base;
    theType.single = single;
    if (theType.bits == 64) {
        theType.float = true;
    }
    if (theType.float) {
        theType.signed = true;
    }
    theType.offset = theType.bits < 8 ? 1 : theType.bits / 8;
    return theType;
}

/**
 * Make a single value an array in case it is not.
 * If the value is a string it stays a string.
 * @param {!Array<number>|number|string} values The value or values.
 * @return {!Array<number>|string}
 */
function turnToArray(values) {
    if (!Array.isArray(values) && typeof values != "string") {
        values = [values];
    }
    return values;
}

module.exports.makeBigEndian = makeBigEndian;
module.exports.bytesToBase = bytesToBase;
module.exports.outputToBase = outputToBase;
module.exports.signed = signed;
module.exports.padding = padding;
module.exports.paddingNibble = paddingNibble;
module.exports.paddingCrumb = paddingCrumb;
module.exports.bytePadding = bytePadding;
module.exports.lPadZeros = lPadZeros;
module.exports.fixFloat16Endianness = fixFloat16Endianness;
module.exports.getType = getType;
module.exports.turnToArray = turnToArray;
