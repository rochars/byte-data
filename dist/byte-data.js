/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
 * byte-padding: Funcions to pad bits and bytes.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

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
 * @param {string} byte The byte as a binary or hex string.
 * @param {number} base The base.
 * @returns {string} The padded byte.
 */
function bytePadding(byte, base) {
    let offset = byte.length + 1;
    if (base == 2) {
        offset = 8;
    } else if (base == 16) {
        offset = 2;
    }
    return lPadZeros(byte, offset);
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
    let i = 0;
    while (value.length < numZeros) {
        value = '0' + value;
    }
    return value;
}

/**
 * Pad a array with zeros to the right.
 * @param {!Array<number>} byteArray The array.
 * @param {number} numZeros the max number of zeros.
 *      For 1 binary byte string it should be 8.
 *      TODO: better explanation of numZeros
 */
function fixByteArraySize(byteArray, numZeros) {
    let i = 0;
    let fix = byteArray.length % numZeros;
    if (fix) {
        fix = (fix - numZeros) * -1;
        while(i < fix) {
            byteArray.push(0);
            i++;
        }
    }
}

module.exports.fixByteArraySize = fixByteArraySize;
module.exports.padding = padding;
module.exports.paddingNibble = paddingNibble;
module.exports.paddingCrumb = paddingCrumb;
module.exports.bytePadding = bytePadding;
module.exports.lPadZeros = lPadZeros;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var int8 = new Int8Array(4)
var int32 = new Int32Array(int8.buffer, 0, 1)
var float32 = new Float32Array(int8.buffer, 0, 1)

function pack(i) {
    int32[0] = i
    return float32[0]
}

function unpack(f) {
    float32[0] = f
    return int32[0]
}

module.exports = pack
module.exports.pack = pack
module.exports.unpack = unpack

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
 * bit-depth: Configurations based on bit depth.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

/**
 * Offset for reading each bit depth.
 * @enum {number}
 */
const BitDepthOffsets = {
    1: 1,
    2: 1,
    4: 1,
    8: 1,
    16: 2,
    24: 3,
    32: 4,
    40: 5,
    48: 6,
    64: 8
};

/**
 * Max value for each bit depth.
 * @enum {number}
 */
const BitDepthMaxValues = {
    2: 4,
    4: 16,
    8: 256,
    16: 65536,
    24: 16777216,
    32: 4294967296,
    40: 1099511627776,
    48: 281474976710656
};

module.exports.BitDepthOffsets = BitDepthOffsets;
module.exports.BitDepthMaxValues = BitDepthMaxValues;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*!
 * endianness: Swap byte endianness in arrays.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/endianness
 *
 */

/**
 * Swap the endianness of units of information in a array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} offset The offset according to the bit depth.
 *  - 2 for 16-bit
 *  - 3 for 24-bit
 *  - 4 for 32-bit
 *  - 5 for 40-bit
 *  - 6 for 48-bit
 *  - 8 for 64-bit
 */
function endianness(bytes, offset) {
    let len = bytes.length;
    let i = 0;
    while (i < len) {
        byteSwap(bytes, i, offset);
        i+=offset;
    }
    return bytes;
}

/**
 * Swap the endianness of a unit of information in a array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @param {number} numBytes The number of bytes according to
 *      the bit depth of the data.
 */
function byteSwap(bytes, i, numBytes) {
    let x = 0;
    let y = numBytes - 1;
    let limit = parseInt(numBytes / 2, 10);
    let swap;
    while(x < limit) {
        swap = bytes[i+x];
        bytes[i+x] = bytes[i+y];
        bytes[i+y] = swap;
        x++;
        y--;
    }
}

module.exports.endianness = endianness;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * float: Functions to work with 16, 32 & 64 bit floats.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const pad = __webpack_require__(0);

function getBinary(bytes, rev=false) {
    let binary = "";
    let i = 0;
    let bytesLength = bytes.length;
    while(i < bytesLength) {
        let bits = pad.lPadZeros(bytes[i].toString(2), 8);
        if (rev) {
            binary = binary + bits;
        } else {
            binary = bits + binary;
        }
        i++;
    }
    return binary;
}

/**
 * Turn bytes to a float 16..
 * Thanks https://stackoverflow.com/a/8796597
 * @param {number} bytes 2 bytes representing a float 16.
 */
function decodeFloat16 (bytes) {
    let binary = parseInt(getBinary(bytes, true), 2);
    let exponent = (binary & 0x7C00) >> 10;
    let fraction = binary & 0x03FF;
    let floatValue;
    if (exponent) {
        floatValue =  Math.pow(2, exponent - 15) * (1 + fraction / 0x400);
    } else {
        floatValue = 6.103515625e-5 * (fraction / 0x400);
    }
    return  floatValue * (binary >> 15 ? -1 : 1);
}

/**
 * Turn an array of bytes into a float 64.
 * Thanks https://gist.github.com/kg/2192799
 * @param {!Array<number>} bytes 8 bytes representing a float 64.
 */
function decodeFloat64(bytes) {
    if (bytes.toString() == "0,0,0,0,0,0,0,0") {
        return 0;
    }
    let binary = getBinary(bytes);
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
    return doubleValue;
}

/**
 * Unpack a 64 bit float into two words.
 * Thanks https://stackoverflow.com/a/16043259
 * @param {number} value A float64 number.
 */
function toFloat64(value) {
    if (value == 0) {
        return [0, 0];
    }
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

let floatView = new Float32Array(1);
let int32View = new Int32Array(floatView.buffer);

/**
 * to-half: int bits of half-precision floating point values
 * Based on:
 * https://mail.mozilla.org/pipermail/es-discuss/2017-April/047994.html
 * https://github.com/rochars/byte-data
 */
function toHalf(val) {
    floatView[0] = val;
    let x = int32View[0];
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

module.exports.getBinary = getBinary;
module.exports.decodeFloat16 = decodeFloat16;
module.exports.decodeFloat64 = decodeFloat64;
module.exports.toFloat64 = toFloat64;
module.exports.toHalf = toHalf;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * byte-data
 * Readable data to and from byte buffers.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let toBytes = __webpack_require__(6);
let fromBytes = __webpack_require__(8);
let bitPacker = __webpack_require__(10);
let bitDepth = __webpack_require__(2);

/**
 * Find and return the start index of some string.
 * Return -1 if the string is not found.
 * @param {!Array<number>|Uint8Array} bytes Array of bytes.
 * @param {string} chunk Some string to look for.
 * @return {number} The start index of the first occurrence, -1 if not found
 */
function findString(bytes, chunk) {
    let found = "";
    for (let i = 0; i < bytes.length; i++) {
        found = fromBytes.fromBytes(bytes.slice(i, i + chunk.length),
            8, {"char": true});
        if (found == chunk) {
            return i;
        }
    }
    return -1;
}

window['findString'] = findString;

window['toBytes'] = toBytes.toBytes;
window['fromBytes'] = fromBytes.fromBytes;

window['packBooleans'] = bitPacker.packBooleans;
window['unpackBooleans'] = bitPacker.unpackBooleans;
window['packCrumbs'] = bitPacker.packCrumbs;
window['unpackCrumbs'] = bitPacker.unpackCrumbs;
window['packNibbles'] = bitPacker.packNibbles;
window['unpackNibbles'] = bitPacker.unpackNibbles;

module.exports.BitDepthOffsets = bitDepth.BitDepthOffsets;
module.exports.BitDepthMaxValues = bitDepth.BitDepthMaxValues;

// types
window['floatLE'] = {"float": true, "single": true};
window['intLE'] = {"signed": true, "single": true};
window['uIntLE'] = {"single": true};
window['floatBE'] = {"float": true, "single": true, "be": true};
window['intBE'] = {"signed": true, "single": true, "be": true};
window['uIntBE'] = {"single": true, "be": true};
window['char'] = {"char": true, "single": true};

window['floatArrayLE'] = {"float": true};
window['intArrayLE'] = {"signed": true};
window['uIntArrayLE'] = {};
window['floatArrayBE'] = {"float": true, "be": true};
window['intArrayBE'] = {"signed": true, "be": true};
window['uIntArrayBE'] = {"be": true};
window['str'] = {"char": true};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * to-bytes: bytes to numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const intBits = __webpack_require__(1);
const pad = __webpack_require__(0);
const endianness = __webpack_require__(3);
const writer = __webpack_require__(7);
const bitDepths = __webpack_require__(2);

/**
 * Turn numbers and strings to bytes.
 * @param {!Array<number>|number|string} values The data.
 * @param {number} bitDepth The bit depth of the data.
 *   Possible values are 1, 2, 4, 8, 16, 24, 32, 40, 48 or 64.
 * @param {Object} options The options:
 *   - "float": True for floating point numbers. Default is false.
 *       This option is available for 16, 32 and 64-bit numbers.
 *   - "base": The base of the output. Default is 10. Can be 2, 10 or 16.
 *   - "char": If the bytes represent a string. Default is false.
 *   - "be": If the values are big endian. Default is false (little endian).
 *   - "buffer": If the bytes should be returned as a Uint8Array.
 *       Default is false (bytes are returned as a regular array).
 * @return {!Array<number>|Uint8Array} the data as a byte buffer.
 */
function toBytes(values, bitDepth, options={}) {
    if (!options.char && typeof values != "string") {
        values = turnToArray(values);
    }
    let base = 10;
    if ("base" in options) {
        base = options.base;
    }
    let bytes = writeBytes(values, options.char, options.float, bitDepth);
    makeBigEndian(bytes, options.be, bitDepth);
    outputToBase(bytes, bitDepth, base);
    if (options.buffer) {
        bytes = new Uint8Array(bytes);
    }
    return bytes;
}

/**
 * Make a single value an array in case it is not.
 * @param {!Array<number>|number|string} values The value or values.
 * @return {!Array<number>}
 */
function turnToArray(values) {
    if (!Array.isArray(values)) {
        values = [values];
    }
    return values;
}

/**
 * Turn the output to the correct base.
 * @param {!Array<number>} bytes The bytes.
 * @param {number} bitDepth The bit depth of the data.
 * @param {number} base The desired base for the output data.
 */
function outputToBase(bytes, bitDepth, base) {
    if (bitDepth == 4) {
        bytesToBase(bytes, base, pad.paddingNibble);
    } else if (bitDepth == 2) {
        bytesToBase(bytes, base, pad.paddingCrumb);
    } else if(bitDepth == 1) {
        bytesToBase(bytes, base, function(){});
    }else {
        bytesToBase(bytes, base);
    }
}

/**
 * Write values as bytes.
 * @param {!Array<number>|number|string} values The data.
 * @param {boolean} isChar True if it is a string.
 * @param {boolean} isFloat True if it is a IEEE floating point number.
 * @param {number} bitDepth The bitDepth of the data.
 * @return {!Array<number>} the bytes.
 */
function writeBytes(values, isChar, isFloat, bitDepth) {
    let bitWriter;
    if (isChar) {
        bitWriter = writer.writeString;
    } else {
        bitWriter = writer['write' + bitDepth + 'Bit' + (isFloat ? "Float" : "")];
    }
    let i = 0;
    let j = 0;
    let len = values.length;
    let bytes = [];
    while (i < len) {            
        j = bitWriter(bytes, values, i, j);
        i++;
    }
    return bytes;
}

/**
 * Write values as bytes.
 * @param {!Array<number>} bytes The values.
 * @param {boolean} isBigEndian True if the bytes should be big endian.
 * @param {number} bitDepth The bitDepth of the data.
 */
function makeBigEndian(bytes, isBigEndian, bitDepth) {
    if (isBigEndian) {
        endianness.endianness(bytes, bitDepths.BitDepthOffsets[bitDepth]);
    }
}

/**
 * Turn bytes to base.
 * @param {!Array<string>|!Array<number>} bytes The bytes.
 * @param {number} base The base.
 * @param {Function} padFunction The function to use for padding.
 */
function bytesToBase(bytes, base, padFunction=pad.padding) {
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

module.exports.toBytes = toBytes;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Functions to turn data into bytes.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const float = __webpack_require__(4);
const intBits = __webpack_require__(1);

function write64Bit(bytes, numbers, i, j) {
    let bits = float.toFloat64(numbers[i]);
    j = write32Bit(bytes, bits, 1, j);
    return write32Bit(bytes, bits, 0, j);
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
    let bits = intBits.unpack(numbers[i]);
    bytes[j++] = bits & 0xFF;
    bytes[j++] = bits >>> 8 & 0xFF;
    bytes[j++] = bits >>> 16 & 0xFF;
    bytes[j++] = bits >>> 24 & 0xFF;
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
    let bits = float.toHalf(numbers[i]);
    bytes[j++] = bits  >>> 8 & 0xFF;
    bytes[j++] = bits  & 0xFF;
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


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * from-bytes: convert bytes to numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const endianness = __webpack_require__(3);
const reader = __webpack_require__(9);
const bitDepths = __webpack_require__(2);

/**
 * Turn a byte buffer into what the bytes represent.
 * @param {!Array<number>|Uint8Array} buffer An array of bytes.
 * @param {number} bitDepth The bit depth of the data.
 *   Possible values are 1, 2, 4, 8, 16, 24, 32, 40, 48 or 64.
 * @param {Object} options The options. They are:
 *   - "signed": If the numbers are signed. Default is false (unsigned).
 *   - "float": True for floating point numbers. Default is false.
 *       This option is available for 16, 32 and 64-bit numbers.
 *   - "base": The base of the input. Default is 10. Can be 2, 10 or 16.
 *   - "char": If the bytes represent a string. Default is false.
 *   - "be": If the values are big endian. Default is false (little endian).
 *   - "single": If it should return a single value instead of an array.
 *       Default is false.
 * @return {!Array<number>|string}
 */
function fromBytes(buffer, bitDepth, options={}) {
    let base = 10;
    if ("base" in options) {
        base = options.base;
    }
    if (options.be) {
        endianness.endianness(buffer, bitDepth / 8);
    }
    bytesToInt(buffer, base);
    let bitReader = getBitReader(bitDepth, options.float, options.char);
    let values = readBytes(buffer, bitDepth, options.signed, bitReader);
    if (options.char) {
        values = values.join("");
    }
    if (options.single) {
        values = values[0];
    }
    return values;
}

/**
 * Turn a array of bytes into an array of what the bytes should represent.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} bitDepth The bitDepth. 1, 2, 4, 8, 16, 24, 32, 40, 48, 64.
 * @param {boolean} isSigned True if the values should be signed.
 * @param {Function} bitReader The function to read the bytes.
 * @return {!Array<number>|string}
 */
function readBytes(bytes, bitDepth, isSigned, bitReader) {
    let values = [];
    let i = 0;
    let j = 0;
    let offset = bitDepths.BitDepthOffsets[bitDepth];
    let len = bytes.length - (offset -1);
    let maxBitDepthValue = bitDepths.BitDepthMaxValues[bitDepth];
    let signFunction = isSigned ? signed : function(x,y){return x;};
    while (i < len) {
        values[j] = signFunction(bitReader(bytes, i), maxBitDepthValue);
        i += offset;
        j++;
    }
    return values;
}

/**
 * Return a function to read binary data.
 * @param {number} bitDepth The bitDepth. 1, 2, 4, 8, 16, 24, 32, 40, 48, 64.
 * @param {boolean} isFloat True if the values are IEEE floating point numbers.
 * @param {boolean} isChar True if it is a string.
 * @return {Function}
 */
function getBitReader(bitDepth, isFloat, isChar) {
    let bitReader;
    if (isChar) {
        bitReader = reader.readChar;
    } else {
        bitReader = reader[getReaderFunctionName(bitDepth, isFloat)];
    }
    return bitReader;
}

/**
 * Build a bit reading function name based on the arguments.
 * @param {number} bitDepth The bitDepth. 1, 2, 4, 8, 16, 24, 32, 40, 48, 64.
 * @param {boolean} isFloat True if the values are IEEE floating point numbers.
 * @return {string}
 */
function getReaderFunctionName(bitDepth, isFloat) {
    return 'read' +
        ((bitDepth == 2 || bitDepth == 4) ? 8 : bitDepth) +
        'Bit' +
        (isFloat ? "Float" : "");
}

/**
 * Turn bytes to base 10.
 * @param {!Array<number>|Uint8Array} bytes The bytes as binary or hex strings.
 * @param {number} base The base.
 */
function bytesToInt(bytes, base) {
    if (base != 10) {
        let i = 0;
        let len = bytes.length;
        while(i < len) {
            bytes[i] = parseInt(bytes[i], base);
            i++;
        }
    }
}

/**
 * Turn a unsigned number to a signed number.
 * @param {number} number The number.
 * @param {number} maxValue The max range for the number bit depth.
 */
function signed(number, maxValue) {
    if (number > parseInt(maxValue / 2, 10) - 1) {
        number -= maxValue;
    }
    return number;
}

module.exports.fromBytes = fromBytes;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Function to read data from bytes.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */


let pad = __webpack_require__(0);
const float = __webpack_require__(4);
const intBits = __webpack_require__(1);

/**
 * Read a group of bytes by turning it to bits.
 * Useful for 40 & 48-bit, but underperform.
 * TODO find better alternative for 40 & 48-bit.
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
        bits += pad.bytePadding(bytes[j + i].toString(2), 2);
        j--;
    }
    return parseInt(bits, 2);
}

/**
 * Read 1 1-bit int from from booleans.
 * @param {!Array<number>|Uint8Array} bytes An array of booleans.
 * @param {number} i The index to read.
 * @return {number}
 */
function read1Bit(bytes, i) {
    return parseInt(bytes[i], 2);
}

/**
 * Read 1 8-bit int from from bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 */
function read8Bit(bytes, i) {
    return bytes[i];
}

/**
 * Read 1 16-bit int from from bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 */
function read16Bit(bytes, i) {
    return bytes[1 + i] << 8 | bytes[i];
}

/**
 * Read 1 16-bit float from from bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 */
function read16BitFloat(bytes, i) {
    return float.decodeFloat16(bytes.slice(i,i+2));
}

/**
 * Read 1 24-bit int from from bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 */
function read24Bit(bytes, i) {
    return bytes[2 + i] << 16 |
        bytes[1 + i] << 8 |
        bytes[i];
}

/**
 * Read 1 32-bit int from from bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 */
function read32Bit(bytes, i) {
    return (bytes[3 + i] << 24 |
        bytes[2 + i] << 16 |
        bytes[1 + i] << 8 |
        bytes[i]) >>> 0;
}

/**
 * Read 1 32-bit float from from bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 */
function read32BitFloat(bytes, i) {
    return intBits.pack(read32Bit(bytes, i));
}

/**
 * Read 1 40-bit int from from bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 */
function read40Bit(bytes, i) {
    return readBytesAsBits(bytes, i, 5);
}

/**
 * Read 1 48-bit int from bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 */
function read48Bit(bytes, i) {
    return readBytesAsBits(bytes, i, 6);
}

/**
 * Read 1 64-bit double from bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 */
function read64Bit(bytes, i) {
    return float.decodeFloat64(bytes.slice(i,i+8));
}

/**
 * Read 1 char from bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {string}
 */
function readChar(bytes, i) {
    return String.fromCharCode(bytes[i]);
}

module.exports.readChar = readChar;
module.exports.read1Bit = read1Bit;
module.exports.read8Bit = read8Bit;
module.exports.read16Bit = read16Bit;
module.exports.read16BitFloat = read16BitFloat;
module.exports.read24Bit = read24Bit;
module.exports.read32Bit = read32Bit;
module.exports.read32BitFloat = read32BitFloat;
module.exports.read40Bit = read40Bit;
module.exports.read48Bit = read48Bit;
module.exports.read64Bit = read64Bit;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * bit-packer: Pack and unpack nibbles, crumbs and booleans into bytes.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

let pad = __webpack_require__(0);

/**
 * Pack 2 nibbles in 1 byte.
 * @param {!Array<number>} nibbles Array of nibbles.
 * @return {!Array<number>} Pairs of neebles packed as one byte.
 */
function packNibbles(nibbles) {
    let packed = [];
    let i = 0;
    let j = 0;
    let len = nibbles.length;
    if (len % 2) {
        nibbles.push(0);
    }
    while (i < len) {
        packed[j++] = parseInt(
            nibbles[i].toString(16) + nibbles[i+1].toString(16), 16);
        i+=2;
    }
    return packed;
}

/**
 * Unpack a byte into 2 nibbles.
 * @param {!Array<number>|Uint8Array} bytes Array of bytes.
 * @return {!Array<number>} The nibbles.
 */
function unpackNibbles(bytes) {
    let unpacked = [];
    let i = 0;
    let j = 0;
    let len = bytes.length;
    while (i < len) {
        unpacked[j++] = parseInt(bytes[i].toString(16)[0], 16);
        unpacked[j++] = parseInt(bytes[i].toString(16)[1], 16);
        i++;
    }
    return unpacked;
}

/**
 * Pack 4 crumbs in 1 byte.
 * @param {!Array<number>} crumbs Array of crumbs.
 * @return {!Array<number>} 4 crumbs packed as one byte.
 */
function packCrumbs(crumbs) {
    let packed = [];
    let i = 0;
    let j = 0;
    pad.fixByteArraySize(crumbs, 4);
    let len = crumbs.length - 3;
    while (i < len) {
        packed[j++] = parseInt(
            pad.lPadZeros(crumbs[i].toString(2), 2) +
            pad.lPadZeros(crumbs[i+1].toString(2), 2) +
            pad.lPadZeros(crumbs[i+2].toString(2), 2) +
            pad.lPadZeros(crumbs[i+3].toString(2), 2), 2);
        i+=4;
    }
    return packed;
}

/**
 * Unpack a byte into 4 crumbs.
 * @param {!Array<number>|Uint8Array} crumbs Array of bytes.
 * @return {!Array<number>} The crumbs.
 */
function unpackCrumbs(crumbs) {
    let unpacked = [];
    let i = 0;
    let j = 0;
    let len = crumbs.length;
    let bitCrumb;
    console.log(len);
    while (i < len) {
        bitCrumb = pad.lPadZeros(crumbs[i].toString(2), 8);
        unpacked[j++] = parseInt(bitCrumb[0] + bitCrumb[1], 2);
        unpacked[j++] = parseInt(bitCrumb[2] + bitCrumb[3], 2);
        unpacked[j++] = parseInt(bitCrumb[4] + bitCrumb[5], 2);
        unpacked[j++] = parseInt(bitCrumb[6] + bitCrumb[7], 2);
        i++;
    }
    return unpacked;
}

/**
 * Pack 8 booleans in 1 byte.
 * @param {!Array<number>} booleans Array of booleans.
 * @return {!Array<number>} 4 crumbs packed as one byte.
 */
function packBooleans(booleans) {
    let packed = [];
    let i = 0;
    let j = 0;
    pad.fixByteArraySize(booleans, 8);
    let len = booleans.length - 7;
    while (i < len) {
        packed[j++] = parseInt(
            booleans[i].toString(2) +
            booleans[i+1].toString(2) +
            booleans[i+2].toString(2) +
            booleans[i+3].toString(2) +
            booleans[i+4].toString(2) +
            booleans[i+5].toString(2) +
            booleans[i+6].toString(2) +
            booleans[i+7].toString(2), 2);
        i+=8;
    }
    return packed;
}

/**
 * Unpack a byte into 8 booleans.
 * @param {!Array<number>|Uint8Array} booleans Array of bytes.
 * @return {!Array<number>} The booleans.
 */
function unpackBooleans(booleans) {
    let unpacked = [];
    let i = 0;
    let j = 0;
    let len = booleans.length;
    let bitBoolean;
    while (i < len) {
        bitBoolean = pad.lPadZeros(booleans[i].toString(2), 8);
        unpacked[j++] = parseInt(bitBoolean[0], 2);
        unpacked[j++] = parseInt(bitBoolean[1], 2);
        unpacked[j++] = parseInt(bitBoolean[2], 2);
        unpacked[j++] = parseInt(bitBoolean[3], 2);
        unpacked[j++] = parseInt(bitBoolean[4], 2);
        unpacked[j++] = parseInt(bitBoolean[5], 2);
        unpacked[j++] = parseInt(bitBoolean[6], 2);
        unpacked[j++] = parseInt(bitBoolean[7], 2);
        i++;
    }
    return unpacked;
}

module.exports.packBooleans = packBooleans;
module.exports.unpackBooleans = unpackBooleans;
module.exports.packCrumbs = packCrumbs;
module.exports.unpackCrumbs = unpackCrumbs;
module.exports.packNibbles = packNibbles;
module.exports.unpackNibbles = unpackNibbles;


/***/ })
/******/ ]);