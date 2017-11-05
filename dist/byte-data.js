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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports) {

/*
 * Helper functions.
 * TODO This needs refactoring.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

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
 * Turn an array of bytes into a float 64.
 * Thanks https://gist.github.com/kg/2192799
 * @param {!Array<number>} bytes 8 bytes representing a float 64.
 */
function decodeFloat(bytes) {
    if (bytes.toString() == "0,0,0,0,0,0,0,0") {
        return 0;
    }
    let binary = "";
    let bits;
    let i = 0;
    let bytesLength = bytes.length;
    while(i < bytesLength) {
        bits = bytes[i].toString(2);
        while (bits.length < 8) {
            bits = "0" + bits;
        }
        binary = bits + binary;
        i++;
    }
    let significandBin = "1" + binary.substr(1 + 11, 52);
    let val = 1;
    let significand = 0;
    i = 0;
    while (i < significandBin.length) {
        significand += val * parseInt(significandBin.charAt(i), 10);
        val = val / 2;
        i++;
    }
    let sign = (binary.charAt(0) == "1") ? -1 : 1;
    let doubleValue = sign * significand *
        Math.pow(2, parseInt(binary.substr(1, 11), 2) - 1023);
    return doubleValue === 2 ? 0 : doubleValue;
}

/**
 * Padding for binary strings.
 * @param {!Array<string>} bytes The bytes as binary strings.
 * @param {number} base The base.
 * @param {number} index The byte to pad.
 */
function padding(bytes, base, index) {
    let offset = bytes[index].length + 1;
    if (base == 2 && bytes[index].length < 8) {
        offset = 9;
    }else if (base == 16) {
        offset = 3;
    }
    if (bytes[index].length < offset -1) {
        bytes[index] = 
            new Array((offset - bytes[index].length)).join("0")  + bytes[index];    
    }
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
    } else if(base == 16 && nibbles[index].length == 2 && nibbles[index][0] == "0") {
        nibbles[index] = nibbles[index][1];
    }
}   

/**
 * Fix the size of crumbs.
 * @param {!Array<string>} crumbs The nibble as a binary or hex string.
 * @param {number} base The base.
 * @param {number} index The nibble offset.
 */
function paddingCrumb(crumbs, base, index) {
    if ((base == 2) && crumbs[index].length < 2) {
        crumbs[index] = '0' + crumbs[index];
    }
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
        offset = 9;
    } else if (base == 16) {
        offset = 3;   
    }
    if (byte.length < offset -1) {
        byte = new Array((offset - byte.length)).join("0")  + byte;
    }
    return byte;
}

/**
 * Turn bytes to base 10.
 * @param {!Array<string>|!Array<number>} bytes The bytes as binary or hex strings.
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
 * Turn bytes to base.
 * @param {!Array<string>|!Array<number>} bytes The bytes.
 * @param {number} base The base.
 */
function bytesToBase(bytes, base) {
    if (base != 10) {
        let i = 0;
        let len = bytes.length;
        while (i < len) {
            bytes[i] = bytes[i].toString(base);
            padding(bytes, base, i);
            i++;
        }
    }
}

module.exports.bytesToBase = bytesToBase;
module.exports.bytesToInt = bytesToInt;
module.exports.decodeFloat = decodeFloat;
module.exports.toFloat64 = toFloat64;
module.exports.padding = padding;
module.exports.paddingNibble = paddingNibble;
module.exports.paddingCrumb = paddingCrumb;
module.exports.bytePadding = bytePadding;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * byte-data
 * Bytes to and from numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

let toBytes = __webpack_require__(3);
let fromBytes = __webpack_require__(4);

/**
 * Find and return the start offset of some string.
 * @param {!Array<number>|Uint8Array} bytes Array of bytes.
 * @param {string} chunk Some string to look for.
 * @return {number} The start offset of the first occurrence found.
 */
function findString(bytes, chunk) {
    let found = "";
    for (let i = 0; i < bytes.length; i++) {
        found = fromBytes.stringFromBytes(bytes.slice(i, i + chunk.length));
        if (found == chunk) {
            return i;
        }
    }
    return -1;
}

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

window['packNibbles'] = packNibbles;
window['unpackNibbles'] = unpackNibbles;

window['findString'] = findString;
window['stringToBytes'] = toBytes.stringToBytes;
window['stringFromBytes'] = fromBytes.stringFromBytes;

window['doubleTo8Bytes'] = toBytes.floatTo8Bytes;
window['floatTo8Bytes'] = toBytes.floatTo8Bytes;
window['floatTo4Bytes'] = toBytes.floatTo4Bytes;
window['intTo6Bytes'] = toBytes.intTo6Bytes;
window['intTo5Bytes'] = toBytes.intTo5Bytes;
window['intTo4Bytes'] = toBytes.intTo4Bytes;
window['intTo3Bytes'] = toBytes.intTo3Bytes;
window['intTo2Bytes'] = toBytes.intTo2Bytes;
window['intTo1Byte'] = toBytes.intTo1Byte;
window['intToNibble'] = toBytes.intToNibble;
module.exports.toCrumb = toBytes.toCrumb;
module.exports.toBoolean = toBytes.toBoolean;

window['floatFrom8Bytes'] = fromBytes.floatFrom8Bytes;
window['doubleFrom8Bytes'] = fromBytes.floatFrom8Bytes;
module.exports.intFrom6Bytes = fromBytes.intFrom6Bytes;
module.exports.uIntFrom6Bytes = fromBytes.uIntFrom6Bytes;
module.exports.intFrom5Bytes = fromBytes.intFrom5Bytes;
window['uIntFrom5Bytes'] = fromBytes.uIntFrom5Bytes;
window['intFrom4Bytes'] = fromBytes.intFrom4Bytes;
window['uIntFrom4Bytes'] = fromBytes.uIntFrom4Bytes;
window['floatFrom4Bytes'] = fromBytes.floatFrom4Bytes;
window['intFrom3Bytes'] = fromBytes.intFrom3Bytes;
window['uIntFrom3Bytes'] = fromBytes.uIntFrom3Bytes;
window['intFrom2Bytes'] = fromBytes.intFrom2Bytes;
window['uIntFrom2Bytes'] = fromBytes.uIntFrom2Bytes;
window['intFrom1Byte'] = fromBytes.intFrom1Byte;
window['uIntFrom1Byte'] = fromBytes.uIntFrom1Byte;
window['intFromNibble'] = fromBytes.intFromNibble;
window['uIntFromNibble'] = fromBytes.uIntFromNibble;
module.exports.intFromCrumb = fromBytes.intFromCrumb;
module.exports.uIntFromCrumb = fromBytes.uIntFromCrumb;
module.exports.fromBoolean = fromBytes.fromBoolean;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * to-bytes: convert bytes to numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const intBits = __webpack_require__(0);
const helpers = __webpack_require__(1);

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
    while (i < len) {
        // 0s should not be signed by default
        if (numbers[i] == 0) {
            bytes = bytes.concat([0,0,0,0,0,0,0,0]);
            j+=8;
        } else {
            numbers[i] = helpers.toFloat64(numbers[i]);
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
    helpers.bytesToBase(bytes, base);
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
    while (i < len) {            
        numbers[i] = intBits.unpack(numbers[i]);
        bytes[j++] = numbers[i] & 0xFF;
        bytes[j++] = numbers[i] >>> 8 & 0xFF;
        bytes[j++] = numbers[i] >>> 16 & 0xFF;
        bytes[j++] = numbers[i] >>> 24 & 0xFF;
        i++;
    }
    helpers.bytesToBase(bytes, base);
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

    while (i < len) {
        bytes[j++] = numbers[i] & 0xFF;
        bytes[j++] = numbers[i] >> 8 & 0xFF;
        bytes[j++] = numbers[i] >> 16 & 0xFF;
        bytes[j++] = numbers[i] >> 24 & 0xFF;
        bytes[j++] = numbers[i] / 0x100000000 & 0xFF;
        bytes[j++] = numbers[i] / 0x10000000000 & 0xFF;
        i++;
    }
    helpers.bytesToBase(bytes, base);
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
    while (i< len) {
        bytes[j++] = numbers[i] & 0xFF;
        bytes[j++] = numbers[i] >> 8 & 0xFF;
        bytes[j++] = numbers[i] >> 16 & 0xFF;
        bytes[j++] = numbers[i] >> 24 & 0xFF;
        bytes[j++] = numbers[i] / 0x100000000 & 0xFF;
        i++;
    }
    helpers.bytesToBase(bytes, base);
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
    helpers.bytesToBase(bytes, base);
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
    while (i < len) {
        bytes[j++] = numbers[i] & 0xFF;
        bytes[j++] = numbers[i] >>> 8 & 0xFF;
        bytes[j++] = numbers[i] >>> 16 & 0xFF;
        i++;
    }
    helpers.bytesToBase(bytes, base);
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
    while (i < len) {
        bytes[j++] = numbers[i] & 0xFF;
        bytes[j++] = numbers[i] >>> 8 & 0xFF;
        i++;
    }
    helpers.bytesToBase(bytes, base);
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
    while (i < len) {
        bytes[j++] = numbers[i] & 0xFF;
        i++;
    }
    helpers.bytesToBase(bytes, base);
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * from-bytes: convert bytes to numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const intBits = __webpack_require__(0);
const helpers = __webpack_require__(1);

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
    while (i < len) {
        samples[i] = parseInt(parseInt(booleans[i], base), 2);
        i++;
    }
    return samples;
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
        samples[i] = crumbs[i];
        if (samples[i] > 1) {
            samples[i] -= 4;
        }
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
        samples[i] = nibbles[i];
        if (samples[i] > 7) {
            samples[i] -= 16;
        }
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
    if (base == 10) {
        return [].slice.call(bytes);
    } else {
        let samples = [];
        let i = 0;
        let len = bytes.length;
        while (i < len) {
            samples[i] = parseInt(bytes[i], base);
            i++;
        }
        return samples;
    }
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
        samples[i] = bytes[i];
        if (samples[i] > 127) {
            samples[i] -= 256;
        }
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
        samples[j] = (bytes[1 + i] << 8) | bytes[i];
        if (bytes[1 + i] & (1 << 7)) {
           samples[j] = 0xFFFF0000 | samples[j];
        }
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
        samples[j] = read24Bit(bytes, i);
        if ((samples[j] & 0x00800000) > 0) {
            samples[j] = samples[j] | 0xFF000000;
        } else {  
            samples[j] = samples[j] & 0x00FFFFFF;
        } 
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
        samples[j] = read24Bit(bytes, i);
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
        samples[j] = read32Bit(bytes, i);
        if ((samples[j] & 0x80000000) < 0) {
            samples[j] = samples[j] & 0xFFFFFFFF;  
        }
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
        samples[j] = read32Bit(bytes, i);
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
        samples[j] = intBits.pack(read32Bit(bytes, i));
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
        samples[j] = read40Bit(bytes, i);
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
        samples[j] = read40Bit(bytes, i);
        if (samples[i] > 549755813887) {
            samples[i] -= 1099511627776;
        }
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
        samples[j] = read48Bit(bytes, i);
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
        samples[j] = read48Bit(bytes, i);
        if (samples[i] > 140737488355327) {
            samples[i] -= 281474976710656;
        }
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
    if (base == 10) {
        while (i < len) {
            string += String.fromCharCode(bytes[i]);
            i++;
        }
    } else {
        while (i < len) {
            string += String.fromCharCode(parseInt(bytes[i], base));
            i++;
        }
    }
    return string;
}

/**
 * Read 1 24-bit int from from bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to start reading.
 */
function read24Bit(bytes, i) {
    return ( bytes[2 + i] << 16 |
            bytes[1 + i] << 8 |
            bytes[i]
        );
}

/**
 * Read 1 32-bit int from from bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to start reading.
 */
function read32Bit(bytes, i) {
    return (bytes[3 + i] << 24 |
            bytes[2 + i] << 16 |
            bytes[1 + i] << 8 |
            bytes[i]
        );
}

/**
 * Read 1 40-bit int from from bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to start reading.
 */
function read40Bit(bytes, i) {
    return parseInt(
        helpers.bytePadding(bytes[4 + i].toString(2), 2) +
        helpers.bytePadding(bytes[3 + i].toString(2), 2) +
        helpers.bytePadding(bytes[2 + i].toString(2), 2) +
        helpers.bytePadding(bytes[1 + i].toString(2), 2) +
        helpers.bytePadding(bytes[i].toString(2), 2), 2);
}

/**
 * Read 1 48-bit int from from bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to start reading.
 */
function read48Bit(bytes, i) {
    return parseInt(
        helpers.bytePadding(bytes[5 + i].toString(2), 2) +
        helpers.bytePadding(bytes[4 + i].toString(2), 2) +
        helpers.bytePadding(bytes[3 + i].toString(2), 2) +
        helpers.bytePadding(bytes[2 + i].toString(2), 2) +
        helpers.bytePadding(bytes[1 + i].toString(2), 2) +
        helpers.bytePadding(bytes[i].toString(2) ,2), 2);
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


/***/ })
/******/ ]);