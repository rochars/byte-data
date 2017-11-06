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
    if ((base == 2 || base == 16) && crumbs[index].length < 2) {
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

/**
 * Read a group of bytes by turning it to bits.
 * Useful for values > 32-bit, but will underperform.
 * TODO find better alternative for > 32-bit.
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
        bits += bytePadding(bytes[j + i].toString(2), 2);
        j--;
    }
    return parseInt(bits, 2);
}

/**
 * Swap the endianees of bytes in an array of bytes.
 * TODO better implementation.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} offset The swap offset according to the bit depth.
 *      2 for 16-bit, 3 for 24-bit, 4 for 32-bit,
 *      5 for 40-bit, 6 for 48-bit, 8 for 64-bit
 */
function swapEndianess(bytes, offset) {
    let len = bytes.length;
    let i = 0;
    let swap;
    while (i < len) {
        if (offset == 2) {
            swap = bytes[i];
            bytes[i] = bytes[i+1];
            bytes[i+1] = swap;
        } else if(offset == 3) {
            swap = bytes[i];
            bytes[i] = bytes[i+2];
            bytes[i+2] = swap;
        } else if(offset == 4) {
            swap = bytes[i];
            bytes[i] = bytes[i+3];
            bytes[i+3] = swap;
            swap = bytes[i+1];
            bytes[i+2] = bytes[i+2];
            bytes[i+2] = swap;
        } else if(offset == 5) {
            swap = bytes[i];
            bytes[i] = bytes[i+4];
            bytes[i+4] = swap;
            swap = bytes[i+1];
            bytes[i+1] = bytes[i+3];
            bytes[i+3] = swap;
        }
        else if(offset == 6) {
            swap = bytes[i];
            bytes[i] = bytes[i+5];
            bytes[i+5] = swap;
            swap = bytes[i+1];
            bytes[i+1] = bytes[i+4];
            bytes[i+4] = swap;
            swap = bytes[i+2];
            bytes[i+2] = bytes[i+3];
            bytes[i+3] = swap;
        }
        else if(offset == 8) {
            swap = bytes[i];
            bytes[i] = bytes[i+7];
            bytes[i+7] = swap;
            swap = bytes[i+1];
            bytes[i+1] = bytes[i+6];
            bytes[i+6] = swap;
            swap = bytes[i+2];
            bytes[i+2] = bytes[i+5];
            bytes[i+5] = swap;
            swap = bytes[i+3];
            bytes[i+3] = bytes[i+4];
            bytes[i+4] = swap;
        }
        i+=offset;
    }
}

/**
 * Make the resulting byte array big endian or little endian.
 * Default is little endian.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} offset The swap offset according to the bit depth.
 *      2 for 16-bit, 3 for 24-bit, 4 for 32-bit,
 *      5 for 40-bit, 6 for 48-bit, 8 for 64-bit
 * @param {boolean} bigEndian If the bytes are big endian or not.
 */
function endianess(bytes, offset, bigEndian) {
    if (bigEndian) {
        swapEndianess(bytes, offset);
    }
    return bytes;
}

module.exports.endianess = endianess;
module.exports.swapEndianess = swapEndianess;
module.exports.readBytesAsBits = readBytesAsBits;
module.exports.signed = signed;
module.exports.bytesToBase = bytesToBase;
module.exports.bytesToInt = bytesToInt;
module.exports.decodeFloat = decodeFloat;
module.exports.toFloat64 = toFloat64;
module.exports.padding = padding;
module.exports.paddingNibble = paddingNibble;
module.exports.paddingCrumb = paddingCrumb;
module.exports.bytePadding = bytePadding;


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

const intBits = __webpack_require__(1);
const helpers = __webpack_require__(0);

/**
 * Split 64 bit numbers into bytes.
 * @param {!Array<number>} numbers float64 numbers.
 * @return {!Array<number>} the bytes.
 */
function floatTo8Bytes(numbers, base=10, bigEndian=false) {
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
    helpers.endianess(bytes, 8, bigEndian);
    return bytes;
}

/**
 * Split 32 bit float numbers into bytes.
 * @param {!Array<number>} numbers float32 numbers.
 * @return {!Array<number>} the bytes.
 */
function floatTo4Bytes(numbers, base=10, bigEndian=false) {
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
    helpers.endianess(bytes, 4, bigEndian);
    return bytes;
}

/**
 * Split 48 bit int numbers into 6 bytes.
 * @param {!Array<number>} numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo6Bytes(numbers, base=10, bigEndian=false) {
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
    helpers.endianess(bytes, 6, bigEndian);
    return bytes;
}

/**
 * Split 40 bit int numbers into 5 bytes.
 * @param {!Array<number>} numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo5Bytes(numbers, base=10, bigEndian=false) {
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
    helpers.endianess(bytes, 5, bigEndian);
    return bytes;
}

/**
 * Split 32 bit int numbers into bytes.
 * @param {!Array<number>} numbers int32 numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo4Bytes(numbers, base=10, bigEndian=false) {
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
    helpers.endianess(bytes, 4, bigEndian);
    return bytes;
}

/**
 * Split 24 bit int numbers into bytes.
 * @param {!Array<number>} numbers int24 numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo3Bytes(numbers, base=10, bigEndian=false) {
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
    helpers.endianess(bytes, 3, bigEndian);
    return bytes;
}

/**
 * Split 16 bit int numbers into bytes.
 * @param {!Array<number>} numbers int16 numbers.
 * @return {!Array<number>} the bytes.
 */
function intTo2Bytes(numbers, base=10, bigEndian=false) {
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
    helpers.endianess(bytes, 2, bigEndian);
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
    while (i < len) {
        bytes[j++] = numbers[i] & 0xF;
        i++;
    }
    helpers.bytesToBase(bytes, base, helpers.paddingNibble);
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
    while (i < len) {
        bytes[j++] = values[i] < 0 ? values[i] + 4 : values[i];
        i++;
    }
    helpers.bytesToBase(bytes, base, helpers.paddingCrumb);
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
    while (i < len) {
        booleans[j++] = values[i] ? 1 : 0;
        i++;
    }
    helpers.bytesToBase(booleans, base, function(){});
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
    while (i < len) {
        bytes[j++] = string.charCodeAt(i);
        helpers.padding(bytes, base, j-1);
        i++;
    }
    helpers.bytesToBase(bytes, base);
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

const helpers = __webpack_require__(0);
const reader = __webpack_require__(5);

/**
 * Offset for reading each bit depth.
 * @enum {number}
 */
const bitDepthOffsets = {
    1: 1,
    2: 1,
    4: 1,
    8: 1,
    16: 2,
    24: 3,
    32: 4,
    40: 5,
    48: 6,
    64: 8,
};

/**
 * Max value for each bit depth.
 * @enum {number}
 */
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
 * Turn a array of bytes into an array of what the bytes should represent.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. 2, 10 or 16.
 * @param {Function} reader The function to read the bytes.
 * @param {number} bitDepth The bitDepth. 1, 2, 4, 8, 16, 24, 32, 40, 48, 64.
 * @param {boolean} signed If readed numbers should be signed or not.
 * @return {!Array<number>} The values represented in the bytes.
 */
function fromBytes(bytes, base, reader, bitDepth, signed=false) {
    let numbers = [];
    let i = 0;
    let j = 0;
    let len = bytes.length;
    let offset = bitDepthOffsets[bitDepth];
    let maxBitDepthValue = maxBitDepth[bitDepth];
    helpers.bytesToInt(bytes, base);   
    if (signed) {
        while (i < len) {
            numbers[j] = helpers.signed(reader(bytes, i), maxBitDepthValue);
            i += offset;
            j++;
        }    
    } else {
        while (i < len) {
            numbers[j] = reader(bytes, i);
            i += offset;
            j++;
        }    
    }
    return numbers;
}

/**
 * Read numbers from a array of booleans.
 * @param {!Array<number>|Uint8Array} booleans An array of booleans.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function fromBoolean(booleans, base=10) {
    return fromBytes(booleans, base, reader.read1Bit, 1);
}

/**
 * Read 2-bit signed ints from an array of crumbs.
 * @param {!Array<number>|Uint8Array} bytes An array of crumbs.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function intFromCrumb(bytes, base=10) {
    return fromBytes(bytes, base, reader.read8Bit, 2, true);
}

/**
 * Read 4-bit signed ints from an array of nibbles.
 * @param {!Array<number>|Uint8Array} bytes An array of nibbles.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function intFromNibble(bytes, base=10) {
    return fromBytes(bytes, base, reader.read8Bit, 4, true);
}

/**
 * Read 8-bit unsigned ints from an array of bytes.
 * Just return a copy of the original array.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function uIntFrom1Byte(bytes, base=10) {
    return fromBytes(bytes, base, reader.read8Bit, 8);
}

/**
 * Read 8-bit signed ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @return {!Array<number>} The numbers.
 */
function intFrom1Byte(bytes, base=10) {
    return fromBytes(bytes, base, reader.read8Bit, 8, true);
}

/**
 * Read 16-bit unsigned ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function uIntFrom2Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 2, bigEndian);
    return fromBytes(bytes, base, reader.read16Bit, 16);
}

/**
 * Read 16-bit signed ints from an array of bytes.
 * Thanks https://stackoverflow.com/a/38298413
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function intFrom2Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 2, bigEndian);
    return fromBytes(bytes, base, reader.read16Bit, 16, true);
}

/**
 * Read 24-bit unsigned ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function uIntFrom3Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 3, bigEndian);
    return fromBytes(bytes, base, reader.read24Bit, 24);
}

/**
 * Read 24-bit signed ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function intFrom3Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 3, bigEndian);
    return fromBytes(bytes, base, reader.read24Bit, 24, true);
}

/**
 * Read 32-bit unsigned ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function uIntFrom4Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 4, bigEndian);
    return fromBytes(bytes, base, reader.read32Bit, 32);
}

/**
 * Read 32-bit signed ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function intFrom4Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 4, bigEndian);
    return fromBytes(bytes, base, reader.read32Bit, 32, true);
}

/**
 * Read 32-bit float numbers from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function floatFrom4Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 4, bigEndian);
    return fromBytes(bytes, base, reader.read32BitFloat, 32);
}

/**
 * Read 40-bit unsigned ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function uIntFrom5Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 5, bigEndian);
    return fromBytes(bytes, base, reader.read40Bit, 40);
}

/**
 * Read 40-bit unsigned ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function intFrom5Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 5, bigEndian);
    return fromBytes(bytes, base, reader.read40Bit, 40, true);
}

/**
 * Read 48-bit unsigned ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function uIntFrom6Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 6, bigEndian);
    return fromBytes(bytes, base, reader.read48Bit, 48);
}

/**
 * Read 48-bit unsigned ints from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function intFrom6Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 6, bigEndian);
    return fromBytes(bytes, base, reader.read48Bit, 48, true);
}

/**
 * Read 64-bit double precision numbers from an array of bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base The base. Defaults to 10.
 * @param {boolean} bigEndian If the bytes are big endian. Defaults to false.
 * @return {!Array<number>} The numbers.
 */
function floatFrom8Bytes(bytes, base=10, bigEndian=false) {
    helpers.endianess(bytes, 8, bigEndian);
    return fromBytes(bytes, base, reader.read64Bit, 64);
}

/**
 * Convert an array of bytes to a string.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @return {string} The string.
 */
function stringFromBytes(bytes, base=10) {
    return fromBytes(bytes, base, reader.readChar, 8).join("");
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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Function to read data from arrays of bytes.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

let helpers = __webpack_require__(0);
const intBits = __webpack_require__(1);

/**
 * Read 1 1-bit int from from booleans.
 * @param {!Array<number>|Uint8Array} bytes An array of booleans.
 * @param {number} i The index to read.
 * @return {number}
 */
function read1Bit(bytes, i) {
    return parseInt(bytes[i], 2);
}

// read2Bit, read4Bit == read8Bit

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
    return helpers.readBytesAsBits(bytes, i, 5);
}

/**
 * Read 1 48-bit int from bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 */
function read48Bit(bytes, i) {
    return helpers.readBytesAsBits(bytes, i, 6);
}

/**
 * Read 1 64-bit double from bytes.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 */
function read64Bit(bytes, i) {
    return helpers.decodeFloat(bytes.slice(i,i+8));
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
module.exports.read24Bit = read24Bit;
module.exports.read32Bit = read32Bit;
module.exports.read32BitFloat = read32BitFloat;
module.exports.read40Bit = read40Bit;
module.exports.read48Bit = read48Bit;
module.exports.read64Bit = read64Bit;


/***/ })
/******/ ]);