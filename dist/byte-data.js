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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * helpers: functions to work with bytes and byte arrays.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const endianness = __webpack_require__(7);
const bitDepths = __webpack_require__(1);

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


/***/ }),
/* 1 */
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
    1: 2,
    2: 4,
    4: 16,
    8: 256,
    16: 65536,
    24: 16777216,
    32: 4294967296,
    40: 1099511627776,
    48: 281474976710656,
    64: Infinity // FIXME 53-bit limit!
};

module.exports.BitDepthOffsets = BitDepthOffsets;
module.exports.BitDepthMaxValues = BitDepthMaxValues;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * float: Functions to work with 16, 32 & 64 bit floats.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const helpers = __webpack_require__(0);

function getBinary(bytes, rev=false) {
    let binary = "";
    let i = 0;
    let bytesLength = bytes.length;
    while(i < bytesLength) {
        let bits = helpers.lPadZeros(bytes[i].toString(2), 8);
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
function decodeFloat16(bytes) {
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
/* 3 */
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
window['byteData'] = window['byteData'] || {};window['byteData']['pack'] = pack
window['byteData']['unpack'] = unpack

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * byte-data
 * Readable data to and from byte buffers.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let toBytes = __webpack_require__(5);
let fromBytes = __webpack_require__(8);
let bitPacker = __webpack_require__(10);
let bitDepth = __webpack_require__(1);
let helpers = __webpack_require__(0);

/**
 * Turn a number or string into a byte buffer.
 * @param {number|string} value The value.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the output. Optional. Default is 10.
 * @return {!Array<number>|!Array<string>}
 */
function pack(value, type, base=10) {
    let theType = helpers.getType(type, base, true);
    value = theType.char ? value.slice(0, type.bits / 8) : value;
    return toBytes.toBytes(helpers.turnToArray(value), theType);
}

/**
 * Turn a byte buffer into a readable value.
 * @param {!Array<number>|!Array<string>|Uint8Array} buffer An array of bytes.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the input. Optional. Default is 10.
 * @return {number|string}
 */
function unpack(buffer, type, base=10) {
    return fromBytes.fromBytes(buffer, helpers.getType(type, base, true));
}

/**
 * Turn a array of numbers into a byte buffer.
 * @param {!Array<number>|string} values The values.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the output. Optional. Default is 10.
 * @return {!Array<number>|!Array<string>}
 */
function packArray(values, type, base=10) {
    return toBytes.toBytes(values, helpers.getType(type, base, false));
}

/**
 * Turn a byte array into a sequence of readable values.
 * @param {!Array<number>|!Array<string>|Uint8Array} buffer The byte array.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the input. Optional. Default is 10.
 * @return {!Array<number>|string}
 */
function unpackArray(buffer, type, base=10) {
    return fromBytes.fromBytes(buffer, helpers.getType(type, base, false));
}

/**
 * Find and return the start index of some string.
 * Return -1 if the string is not found.
 * @param {!Array<number>|Uint8Array} bytes Array of bytes.
 * @param {string} text Some string to look for.
 * @return {number} The start index of the first occurrence, -1 if not found
 */
function findString(bytes, text) {
    let found = "";
    for (let i = 0; i < bytes.length; i++) {
        found = fromBytes.fromBytes(
            bytes.slice(i, i + text.length),
            {"bits": 8, "char": true, "single": false});
        if (found == text) {
            return i;
        }
    }
    return -1;
}

/**
 * Turn a struct into a byte buffer.
 * A struct is an array of values of not necessarily the same type.
 * @param {Array} struct The struct values.
 * @param {Array} def The struct type definition.
 * @param {number} base The base of the output. Optional. Default is 10.
 * @return {!Array<number>|!Array<string>}
 */
function packStruct(struct, def, base=10) {
    let bytes = [];
    for (let i = 0; i < struct.length; i++) {
        bytes = bytes.concat(pack(struct[i], def[i], base));
    }
    return bytes;
}

/**
 * Turn a byte buffer into a structure.
 * A struct is an array of values of not necessarily the same type.
 * @param {Array} buffer The byte buffer.
 * @param {Array} def The struct type definition.
 * @param {number} base The base of the input. Optional. Default is 10.
 * @return {!Array<number>|!Array<string>}
 */
function unpackStruct(buffer, def, base=10) {
    let struct = [];
    let i = 0;
    let j = 0;
    while (j < buffer.length) {
        let bits = def[i].bits < 8 ? 1 : def[i].bits / 8;
        struct = struct.concat(
                unpack(buffer.slice(j, j + bits), def[i], base)
            );
        j += bits;
        i++;
    }
    return struct;
}

// interface
window['byteData'] = window['byteData'] || {};window['byteData']['pack'] = pack;
window['byteData']['unpack'] = unpack;
window['byteData']['packArray'] = packArray;
window['byteData']['unpackArray'] = unpackArray;
window['byteData']['unpackStruct'] = unpackStruct;
window['byteData']['packStruct'] = packStruct;

// types: LE
window['byteData']['chr'] = {"bits": 8, "char": true, "single": true};
module.exports.fourCC = {"bits": 32, "char": true, "single": true};
window['byteData']['bool'] = {"bits": 1, "single": true};
window['byteData']['int2'] = {"bits": 2, "signed": true, "single": true};
window['byteData']['uInt2'] = {"bits": 2, "single": true};
window['byteData']['int4'] = {"bits": 4, "signed": true, "single": true};
window['byteData']['uInt4'] = {"bits": 4, "single": true};
window['byteData']['int8'] = {"bits": 8, "signed": true, "single": true};
window['byteData']['uInt8'] = {"bits": 8, "single": true};
window['byteData']['int16']  = {"bits": 16, "signed": true, "single": true};
window['byteData']['uInt16'] = {"bits": 16, "single": true};
window['byteData']['float16'] = {"bits": 16, "float": true, "single": true};
window['byteData']['int24'] = {"bits": 24, "signed": true, "single": true};
window['byteData']['uInt24'] = {"bits": 24, "single": true};
window['byteData']['int32'] = {"bits": 32, "signed": true, "single": true};
window['byteData']['uInt32'] = {"bits": 32, "single": true};
window['byteData']['float32'] = {"bits": 32, "float": true, "single": true};
window['byteData']['int40'] = {"bits": 40, "signed": true, "single": true};
window['byteData']['uInt40'] = {"bits": 40, "single": true};
window['byteData']['int48'] = {"bits": 48, "signed": true, "single": true};
window['byteData']['uInt48'] = {"bits": 48, "single": true};
window['byteData']['float64'] = {"bits": 64, "float": true, "single": true};

// types: BE
window['byteData']['int16BE']  = {
    "bits": 16, "signed": true, "single": true, "be": true};
window['byteData']['uInt16BE'] = {
    "bits": 16, "single": true, "be": true};
window['byteData']['float16BE'] = {
    "bits": 16, "float": true, "single": true, "be": true};
window['byteData']['int24BE'] = {
    "bits": 24, "signed": true, "single": true, "be": true};
window['byteData']['uInt24BE'] = {
    "bits": 24, "single": true, "be": true};
window['byteData']['int32BE'] = {
    "bits": 32, "signed": true, "single": true, "be": true};
window['byteData']['uInt32BE'] = {
    "bits": 32, "single": true, "be": true};
window['byteData']['float32BE'] = {
    "bits": 32, "float": true, "single": true, "be": true};
window['byteData']['int40BE'] = {
    "bits": 40, "signed": true, "single": true, "be": true};
window['byteData']['uInt40BE'] = {
    "bits": 40, "single": true, "be": true};
window['byteData']['int48BE'] = {
    "bits": 48, "signed": true, "single": true, "be": true};
window['byteData']['uInt48BE'] = {
    "bits": 48, "single": true, "be": true};
window['byteData']['float64BE'] = {
    "bits": 64, "float": true, "single": true, "be": true};

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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * to-bytes: bytes to numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const writer = __webpack_require__(6);
const helpers = __webpack_require__(0);
const bitDepthLib = __webpack_require__(1);

/**
 * Turn numbers and strings to bytes.
 * @param {!Array<number>|number|string} values The data.
 * @param {Object} type One of the available types.
 * @return {!Array<number>|!Array<string>|Uint8Array} the data as a byte buffer.
 */
function toBytes(values, type) {
    let bytes = writeBytes(values, type);
    helpers.makeBigEndian(bytes, type.be, type.bits);
    helpers.outputToBase(bytes, type.bits, type.base);
    helpers.fixFloat16Endianness(bytes, type);
    return bytes;
}

/**
 * Write values as bytes.
 * @param {!Array<number>|number|string} values The data.
 * @param {Object} type One of the available types.
 * @return {!Array<number>} the bytes.
 */
function writeBytes(values, type) {
    let bitWriter;
    if (type.char) {
        bitWriter = writer.writeString;
    } else {
        bitWriter = writer[
            'write' + type.bits + 'Bit' + (type.float ? "Float" : "")];
    }
    let i = 0;
    let j = 0;
    let len = values.length;
    let bytes = [];
    let minMax = getBitDepthMinMax(type);
    while (i < len) {
        j = bitWriter(bytes,  checkOverflow(values[i], minMax, type), j);
        i++;
    }
    return bytes;
}

/**
 * Get the minimum and maximum values accordind to the type.
 * This should be defined in bit-depth.
 * @param {Object} type The options according to the type.
 * @return {Object}
 */
function getBitDepthMinMax(type) {
    let minMax = {};
    if (type.signed) {
        minMax.max = (bitDepthLib.BitDepthMaxValues[type.bits] / 2) - 1;
        minMax.min = (bitDepthLib.BitDepthMaxValues[type.bits] / 2) * -1;
    } else {
        minMax.max = bitDepthLib.BitDepthMaxValues[type.bits] - 1;
        minMax.min = 0;
    }
    return minMax;
}

/**
 * Limit the value according to the bit depth in case of
 * overflow or underflow.
 * @param {!Array<number>|number|string} value The data.
 * @param {Object} minMax The minimum value.
 * @param {Object} options The maximum value.
 */
function checkOverflow(value, minMax, options) {
    if (!options.float) {
        if (value > minMax.max) {
            value = minMax.max;
        } else if(value < minMax.min) {
            value = minMax.min;
        }
    }
    return value;
}

module.exports.toBytes = toBytes;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * write-bytes: Functions to turn data into bytes.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const floats = __webpack_require__(2);
const intBits = __webpack_require__(3);

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


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*!
 * endianness
 * Swap endianness in byte arrays.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/endianness
 *
 */

/**
 * Swap the endianness of units of information in a byte array.
 * The original array is modified in-place.
 * @param {!Array<number>|!Array<string>|Uint8Array} bytes The bytes.
 * @param {number} offset The number of bytes of each unit of information.
 */
function endianness(bytes, offset) {
    let len = bytes.length;
    let i = 0;
    while (i < len) {
        swap(bytes, offset, i);
        i += offset;
    }
}

/**
 * Swap the endianness of a unit of information in a byte array.
 * The original array is modified in-place.
 * @param {!Array<number>|!Array<string>|Uint8Array} bytes The bytes.
 * @param {number} offset The number of bytes of the unit of information.
 * @param {number} index The start index of the unit of information.
 */
function swap(bytes, offset, index) {
    let x = 0;
    let y = offset - 1;
    let limit = parseInt(offset / 2, 10);
    while(x < limit) {
        let theByte = bytes[index + x];
        bytes[index + x] = bytes[index + y];
        bytes[index + y] = theByte;
        x++;
        y--;
    }
}

module.exports = endianness;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * from-bytes: convert bytes to numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const reader = __webpack_require__(9);
const bitDepths = __webpack_require__(1);
const helpers = __webpack_require__(0);

/**
 * Turn a byte buffer into what the bytes represent.
 * @param {!Array<number>|!Array<string>|Uint8Array} buffer An array of bytes.
 * @param {Object} type One of the available types.
 * @return {!Array<number>|number|string}
 */
function fromBytes(buffer, type) {
    let bitDepth = type.bits;
    helpers.fixFloat16Endianness(buffer, type);
    helpers.makeBigEndian(buffer, type.be, bitDepth);
    bytesToInt(buffer, type.base);
    let values = readBytes(
            buffer,
            type,
            getBitReader(type)
        );
    if (type.single) {
        values = getSingleValue(values, type);
    }
    return values;
}

/**
 * Return a function to read binary data.
 * @param {Object} type One of the available types.
 * @return {Function}
 */
function getBitReader(type) {
    return type.char ?
        reader.readChar : reader[getReaderName(type.bits, type.float)];
}

/**
 * Return the first value from the result value array.
 * @param {!Array<number>|string} values The values.
 * @param {Object} type One of the available types.
 * @return {number|string}
 */
function getSingleValue(values, type) {
    if (type.char) {
        values = values.slice(0, type.bits / 8);
    } else {
        values = values[0];
    }
    return values;
}

/**
 * Turn a array of bytes into an array of what the bytes should represent.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {Object} type The type.
 * @param {Function} bitReader The function to read the bytes.
 * @return {!Array<number>|string}
 */
function readBytes(bytes, type, bitReader) {
    let values = [];
    let i = 0;
    let offset = type.bits < 8 ? 1 : type.bits / 8;
    let len = bytes.length - (offset -1);
    let maxBitDepthValue = bitDepths.BitDepthMaxValues[type.bits];
    let signFunction = type.signed && !type.float ?
        helpers.signed : function(x){return x;};
    while (i < len) {
        values.push(signFunction(bitReader(bytes, i, type), maxBitDepthValue));
        i += offset;
    }
    if (type.char) {
        values = values.join("");
    }
    return values;
}

/**
 * Build a bit reading function name based on the arguments.
 * @param {number} bits The bitDepth. 1, 2, 4, 8, 16, 24, 32, 40, 48, 64.
 * @param {boolean} float True if the values are IEEE floating point numbers.
 * @return {string}
 */
function getReaderName(bits, float) {
    return 'read' + (bits < 8 ? 8 : bits) +
        'Bit' + (float ? "Float" : "");
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

module.exports.fromBytes = fromBytes;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * read-bytes: Function to read data from bytes.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

let helpers = __webpack_require__(0);
const floats = __webpack_require__(2);
const intBits = __webpack_require__(3);

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
    return floats.decodeFloat16(bytes.slice(i,i+2));
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
function read64BitFloat(bytes, i) {
    return floats.decodeFloat64(bytes.slice(i,i+8));
}

/**
 * Read 1 char from bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {string}
 */
function readChar(bytes, i, type) {
    let chrs = "";
    let j = 0;
    let len = type.bits / 8;
    while(j < len) {
        chrs += String.fromCharCode(bytes[i+j]);
        j++;
    }
    return chrs;
}

module.exports.readChar = readChar;
module.exports.read8Bit = read8Bit;
module.exports.read16Bit = read16Bit;
module.exports.read16BitFloat = read16BitFloat;
module.exports.read24Bit = read24Bit;
module.exports.read32Bit = read32Bit;
module.exports.read32BitFloat = read32BitFloat;
module.exports.read40Bit = read40Bit;
module.exports.read48Bit = read48Bit;
module.exports.read64BitFloat = read64BitFloat;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * bit-packer: Pack and unpack nibbles, crumbs and booleans into bytes.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

let helpers = __webpack_require__(0);

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
    fixByteArraySize(crumbs, 4);
    let len = crumbs.length - 3;
    while (i < len) {
        packed[j++] = parseInt(
            helpers.lPadZeros(crumbs[i].toString(2), 2) +
            helpers.lPadZeros(crumbs[i+1].toString(2), 2) +
            helpers.lPadZeros(crumbs[i+2].toString(2), 2) +
            helpers.lPadZeros(crumbs[i+3].toString(2), 2), 2);
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
    while (i < len) {
        bitCrumb = helpers.lPadZeros(crumbs[i].toString(2), 8);
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
    fixByteArraySize(booleans, 8);
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
        bitBoolean = helpers.lPadZeros(booleans[i].toString(2), 8);
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

module.exports.packBooleans = packBooleans;
module.exports.unpackBooleans = unpackBooleans;
module.exports.packCrumbs = packCrumbs;
module.exports.unpackCrumbs = unpackCrumbs;
module.exports.packNibbles = packNibbles;
module.exports.unpackNibbles = unpackNibbles;


/***/ })
/******/ ]);