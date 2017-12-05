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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
const Type = __webpack_require__(1);

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
 * @param {Object} type The type.
 */
function makeBigEndian(bytes, type) {
    if (type.be) {
        endianness(bytes, type.offset);
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
    let theType = Object.assign(new Type({}), atype);
    theType.base = base;
    theType.single = single;
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
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

const BitReader = __webpack_require__(8);
const BitWriter = __webpack_require__(9);

/**
 * A class to represent byte-data types.
 */
class Type {

    constructor(options) {
        this.bits = options["bits"];
        this.char = options["char"];
        this.float = options["float"];
        this.be = options["be"];
        this.signed = this.float ? true : options["signed"];
        this.single = true;
        this.reader = null;
        this.writer = null;
        this.offset = 0;
        this.base = 10;
        this.min = null;
        this.max = null;
        this.build();
    }

    build() {
        if (this.bits < 8) {
            this.offset = 1;
        } else {
            this.offset = this.bits / 8;
        }
        this.setReader();
        this.setWriter();
        this.setMinMax();
    }

    /**
     * Set the function to read data of this type.
     */
    setReader() {
        this.reader = this.char ?
            BitReader["readChar"] : BitReader[
                'read' + (this.bits < 8 ? 8 : this.bits) +
                'Bit' + (this.float ? "Float" : "")];
    }

    /**
     * Set the function to write data of this type.
     */
    setWriter() {
        if (this.char) {
            this.writer = BitWriter["writeString"];
        } else {
            this.writer = BitWriter[
                'write' + this.bits + 'Bit' + (this.float ? "Float" : "")];
        }
    }

    /**
     * Set the minimum and maximum values for the type.
     */
    setMinMax() {
        let max = Math.pow(2, this.bits);
        if (this.float) {
            this.max = Infinity;
            this.min = Infinity;
        } else if (this.signed) {
            this.max = (max / 2) - 1;
            this.min = (max / 2) * -1;
        } else {
            this.max = max - 1;
            this.min = 0;
        }
    }

    /**
     * Sign a number according to the type.
     * @param {number} num The number.
     */
    sign(num) {
        if (num > this.max) {
            num -= (this.max * 2) + 2;
        }
        return num;
    }
}

module.exports = Type;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * to-bytes: bytes to numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const helpers = __webpack_require__(0);

/**
 * Turn numbers and strings to bytes.
 * @param {!Array<number>|number|string} values The data.
 * @param {Object} type One of the available types.
 * @return {!Array<number>|!Array<string>|Uint8Array} the data as a byte buffer.
 */
function toBytes(values, type) {
    let bytes = writeBytes(values, type);
    helpers.makeBigEndian(bytes, type);
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
    let i = 0;
    let j = 0;
    let len = values.length;
    let bytes = [];
    while (i < len) {
        j = type.writer(bytes, checkOverflow(values[i], type), j);
        i++;
    }
    return bytes;
}

/**
 * Limit the value according to the bit depth in case of
 * overflow or underflow.
 * @param {!Array<number>|number|string} value The data.
 * @param {Object} type The maximum value.
 */
function checkOverflow(value, type) {
    if (!type.float) {
        if (value > type.max) {
            value = type.max;
        } else if(value < type.min) {
            value = type.min;
        }
    }
    return value;
}

module.exports.toBytes = toBytes;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * float: Functions to work with 16, 32 & 64 bit floats.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const helpers = __webpack_require__(0);

/**
 * Get a binary string representation of a value described as bytes.
 * @param {Array<number>|number} bytes The bytes.
 * @param {boolean} rev If the bytes should be reversed or not.
 */
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

module.exports.decodeFloat16 = decodeFloat16;
module.exports.decodeFloat64 = decodeFloat64;
module.exports.toFloat64 = toFloat64;
module.exports.toHalf = toHalf;


/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * from-bytes: convert bytes to numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const helpers = __webpack_require__(0);

/**
 * Turn a byte buffer into what the bytes represent.
 * @param {!Array<number>|!Array<string>|Uint8Array} buffer An array of bytes.
 * @param {Object} type One of the available types.
 * @return {!Array<number>|number|string}
 */
function fromBytes(buffer, type) {
    helpers.fixFloat16Endianness(buffer, type);
    helpers.makeBigEndian(buffer, type);
    bytesToInt(buffer, type.base);
    let values = readBytes(
            buffer,
            type
        );
    if (type.single) {
        values = getSingleValue(values, type);
    }
    return values;
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
 * @return {!Array<number>|string}
 */
function readBytes(bytes, type) {
    let values = [];
    let i = 0;
    let len = bytes.length - (type.offset - 1);
    while (i < len) {
        values.push(
                type.sign(type.reader(bytes, i, type))
            );
        i += type.offset;
    }
    if (type.char) {
        values = values.join("");
    }
    return values;
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * byte-data
 * Readable data to and from byte buffers.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let toBytes = __webpack_require__(2);
let fromBytes = __webpack_require__(5);
let bitPacker = __webpack_require__(10);
let api = __webpack_require__(11);
let Type = __webpack_require__(1);

// interface
window['byteData'] = window['byteData'] ? window['byteData'] : {};window['byteData']['pack'] = api.pack;
window['byteData']['findString'] = api.findString;
window['byteData']['unpack'] = api.unpack;
window['byteData']['packArray'] = api.packArray;
window['byteData']['unpackArray'] = api.unpackArray;
window['byteData']['unpackStruct'] = api.unpackStruct;
window['byteData']['packStruct'] = api.packStruct;

// types
window['byteData']['chr'] = new Type({"bits": 8, "char": true});
window['byteData']['fourCC'] = new Type({"bits": 32, "char": true});
window['byteData']['bool'] = new Type({"bits": 1});
window['byteData']['int2'] = new Type({"bits": 2, "signed": true});
window['byteData']['uInt2'] = new Type({"bits": 2});
window['byteData']['int4'] = new Type({"bits": 4, "signed": true});
window['byteData']['uInt4'] = new Type({"bits": 4});
window['byteData']['int8'] = new Type({"bits": 8, "signed": true});
window['byteData']['uInt8'] = new Type({"bits": 8});
// LE
window['byteData']['int16']  = new Type({"bits": 16, "signed": true});
window['byteData']['uInt16'] = new Type({"bits": 16});
window['byteData']['float16'] = new Type({"bits": 16, "float": true});
window['byteData']['int24'] = new Type({"bits": 24, "signed": true});
window['byteData']['uInt24'] = new Type({"bits": 24});
window['byteData']['int32'] = new Type({"bits": 32, "signed": true});
window['byteData']['uInt32'] = new Type({"bits": 32});
window['byteData']['float32'] = new Type({"bits": 32, "float": true});
window['byteData']['int40'] = new Type({"bits": 40, "signed": true});
window['byteData']['uInt40'] = new Type({"bits": 40});
window['byteData']['int48'] = new Type({"bits": 48, "signed": true});
window['byteData']['uInt48'] = new Type({"bits": 48});
window['byteData']['float64'] = new Type({"bits": 64, "float": true});
// BE
window['byteData']['int16BE']  = new Type({"bits": 16, "signed": true, "be": true});
window['byteData']['uInt16BE'] = new Type({"bits": 16, "be": true});
window['byteData']['float16BE'] = new Type({"bits": 16, "float": true, "be": true});
window['byteData']['int24BE'] = new Type({"bits": 24, "signed": true, "be": true});
window['byteData']['uInt24BE'] = new Type({"bits": 24, "be": true});
window['byteData']['int32BE'] = new Type({"bits": 32, "signed": true, "be": true});
window['byteData']['uInt32BE'] = new Type({"bits": 32, "be": true});
window['byteData']['float32BE'] = new Type({"bits": 32, "float": true, "be": true});
window['byteData']['int40BE'] = new Type({"bits": 40, "signed": true, "be": true});
window['byteData']['uInt40BE'] = new Type({"bits": 40, "be": true});
window['byteData']['int48BE'] = new Type({"bits": 48, "signed": true, "be": true});
window['byteData']['uInt48BE'] = new Type({"bits": 48, "be": true});
window['byteData']['float64BE'] = new Type({"bits": 64, "float": true, "be": true});

// old API
window['toBytes'] = toBytes.toBytes;
window['fromBytes'] = fromBytes.fromBytes;
window['packBooleans'] = bitPacker.packBooleans;
window['unpackBooleans'] = bitPacker.unpackBooleans;
window['packCrumbs'] = bitPacker.packCrumbs;
window['unpackCrumbs'] = bitPacker.unpackCrumbs;
window['packNibbles'] = bitPacker.packNibbles;
window['unpackNibbles'] = bitPacker.unpackNibbles;


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
 * read-bytes: Function to read data from bytes.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

let helpers = __webpack_require__(0);
const floats = __webpack_require__(3);
const intBits = __webpack_require__(4);

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
        return bytes[2 + i] << 16 |
            bytes[1 + i] << 8 |
            bytes[i];
    },

    /**
     * Read 1 32-bit int from from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read32Bit": function (bytes, i) {
        return (bytes[3 + i] << 24 |
            bytes[2 + i] << 16 |
            bytes[1 + i] << 8 |
            bytes[i]) >>> 0;
    },

    /**
     * Read 1 32-bit float from from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read32BitFloat": function (bytes, i) {
        return intBits.pack(BitReader["read32Bit"](bytes, i));
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

module.exports = BitReader;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * write-bytes: Functions to turn data into bytes.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const floats = __webpack_require__(3);
const intBits = __webpack_require__(4);

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


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * byte-data
 * Readable data to and from byte buffers.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let toBytes = __webpack_require__(2);
let fromBytes = __webpack_require__(5);
let helpers = __webpack_require__(0);
let Type = __webpack_require__(1);

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
 * @param {!Array<number>|Uint8Array} buffer A byte buffer.
 * @param {string} text Some string to look for.
 * @return {number} The start index of the first occurrence, -1 if not found
 */
function findString(buffer, text) {
    let found = "";
    for (let i = 0; i < buffer.length; i++) {
        found = unpack(
                buffer.slice(i, i + text.length + 1),
                new Type({"bits": text.length * 8, "char": true})
            );
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
 * @param {!Array<Object>} def The struct type definition.
 * @param {number} base The base of the output. Optional. Default is 10.
 * @return {!Array<number>|!Array<string>}
 */
function packStruct(struct, def, base=10) {
    if (struct.length < def.length) {
        return [];
    }
    let bytes = [];
    for (let i = 0; i < def.length; i++) {
        bytes = bytes.concat(pack(struct[i], def[i], base));
    }
    return bytes;
}

/**
 * Turn a byte buffer into a structure.
 * A struct is an array of values of not necessarily the same type.
 * @param {!Array<number>|!Array<string>|Uint8Array} buffer The byte buffer.
 * @param {!Array<Object>} def The struct type definition.
 * @param {number} base The base of the input. Optional. Default is 10.
 * @return {Array}
 */
function unpackStruct(buffer, def, base=10) {
    if (buffer.length < getStructBits(def)) {
        return [];
    }
    let struct = [];
    let i = 0;
    let j = 0;
    while (i < def.length) {
        let bits = def[i].bits < 8 ? 1 : def[i].bits / 8;
        struct = struct.concat(
                unpack(buffer.slice(j, j + bits), def[i], base)
            );
        j += bits;
        i++;
    }
    return struct;
}

function getStructBits(def) {
    let bits = 0;
    for (let i = 0; i < def.length; i++) {
        bits += def[i].bits / 8;
    }
    return bits;
}

module.exports.pack = pack;
module.exports.findString = findString;
module.exports.unpack = unpack;
module.exports.packArray = packArray;
module.exports.unpackArray = unpackArray;
module.exports.unpackStruct = unpackStruct;
module.exports.packStruct = packStruct;


/***/ })
/******/ ]);