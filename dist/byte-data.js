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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
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
/***/ (function(module, exports, __webpack_require__) {

/*!
 * byte-data
 * Bytes to and from numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 * byte-data is licensed as follows:

Copyright (c) 2017 Rafael da Silva Rocha.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


int-bits is licensed as follows:

The MIT License (MIT) Copyright (c) 2015 Jam3

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 */

// TODO: 48-bit

let toBytes = __webpack_require__(2);
let fromBytes = __webpack_require__(3);

window['floatTo8Bytes'] = toBytes.floatTo8Bytes;
window['floatTo4Bytes'] = toBytes.floatTo4Bytes;
window['intTo4Bytes'] = toBytes.intTo4Bytes;
window['intTo3Bytes'] = toBytes.intTo3Bytes;
window['intTo2Bytes'] = toBytes.intTo2Bytes;
window['uIntTo1Byte'] = toBytes.uIntTo1Byte;
window['stringToBytes'] = toBytes.stringToBytes;

window['uIntFrom1Byte'] = fromBytes.uIntFrom1Byte;
window['intFrom2Bytes'] = fromBytes.intFrom2Bytes;
module.exports.uIntFrom2Bytes = fromBytes.uIntFrom2Bytes;
window['intFrom3Bytes'] = fromBytes.intFrom3Bytes;
module.exports.uIntFrom3Bytes = fromBytes.uIntFrom3Bytes;
window['intFrom4Bytes'] = fromBytes.intFrom4Bytes;
module.exports.uIntFrom4Bytes = fromBytes.uIntFrom4Bytes;
window['floatFrom4Bytes'] = fromBytes.floatFrom4Bytes;
window['floatFrom8Bytes'] = fromBytes.floatFrom8Bytes;
window['stringFromBytes'] = fromBytes.stringFromBytes;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * to-bytes: convert bytes to numbers and strings.
 * 64-bit IEEE values must be in the -1.0 to 1.0 range.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

const intBits = __webpack_require__(0);

/**
 * Unpack a 64 bit float into two words.
 * Thanks https://stackoverflow.com/a/16043259
 * @param {number} value A float64 number.
 
function toFloat64(value) {
    let hiWord = 0;
    let loWord = 0;
    switch (value) {
        case 0.0:
            hiWord = 0x40000000;
            break;
        default:
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
            break;
    }
    return [hiWord, loWord];
}
*/
/**
 * Split 64 bit numbers into bytes.
 * @param {!Array<number>} numbers float64 numbers.
 */
function floatTo8Bytes(numbers) {
    /*
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i < len) {
        numbers[i] = toFloat64(numbers[i]);
        bytes[j++] = (numbers[i][1]) & 0xFF;
        bytes[j++] = (numbers[i][1] >> 8) & 0xFF;
        bytes[j++] = (numbers[i][1] >> 16) & 0xFF;
        bytes[j++] = (numbers[i][1] >> 24) & 0xFF;
        bytes[j++] = (numbers[i][0]) & 0xFF;
        bytes[j++] = (numbers[i][0] >> 8) & 0xFF;
        bytes[j++] = (numbers[i][0] >> 16) & 0xFF;
        bytes[j++] = (numbers[i][0] >> 24) & 0xFF;
        i++;
    }
    */
    return new Uint8Array(new Float64Array(numbers).buffer);
}

/**
 * Split 32 bit float numbers into bytes.
 * @param {!Array<number>} numbers float32 numbers.
 */
function floatTo4Bytes(numbers) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i < len) {            
        numbers[i] = intBits.unpack(numbers[i]);
        bytes[j++] = (numbers[i]) & 0xFF;
        bytes[j++] = (numbers[i] >> 8) & 0xFF;
        bytes[j++] = (numbers[i] >> 16) & 0xFF;
        bytes[j++] = (numbers[i] >> 24) & 0xFF;
        i++;
    }
    return bytes;
}

/**
 * Split 32 bit int numbers into bytes.
 * @param {!Array<number>} numbers int32 numbers.
 */
function intTo4Bytes(numbers) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i< len) {
        bytes[j++] = (numbers[i]) & 0xFF;
        bytes[j++] = (numbers[i] >> 8) & 0xFF;
        bytes[j++] = (numbers[i] >> 16) & 0xFF;
        bytes[j++] = (numbers[i] >> 24) & 0xFF;
        i++;
    }
    return bytes;
}

/**
 * Split 24 bit int numbers into bytes.
 * @param {!Array<number>} numbers int24 numbers.
 */
function intTo3Bytes(numbers) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i < len) {
        bytes[j++] = (numbers[i]) & 0xFF;
        bytes[j++] = (numbers[i] >> 8) & 0xFF;
        bytes[j++] = (numbers[i] >> 16) & 0xFF;
        i++;
    }
    return bytes;
}

/**
 * Split 16 bit int numbers into bytes.
 * @param {!Array<number>} numbers int16 numbers.
 */
function intTo2Bytes(numbers) {
    let i = 0;
    let j = 0;
    let len = numbers.length;
    let bytes = [];
    while (i < len) {
        bytes[j++] = (numbers[i]) & 0xFF;
        bytes[j++] = (numbers[i] >> 8) & 0xFF;
        i++;
    }
    return bytes;
}

/**
 * Split unsigned 8 bit int numbers into bytes :)
 * @param {!Array<number>} numbers uInt8 numbers.
 */
function uIntTo1Byte(numbers) {
    return numbers.slice();
}

/**
 * Turn a string to an array of bytes.
 * @param {string} string The string.
 */
function stringToBytes(string) {
    let i = 0;
    let j = 0;
    let len = string.length;
    let bytes = [];
    while (i < len) {
        bytes[j++] = string.charCodeAt(i);
        i++;
    }
    return bytes;
}

module.exports.floatTo8Bytes = floatTo8Bytes;
module.exports.floatTo4Bytes = floatTo4Bytes;
module.exports.intTo4Bytes = intTo4Bytes;
module.exports.intTo3Bytes = intTo3Bytes;
module.exports.intTo2Bytes = intTo2Bytes;
module.exports.uIntTo1Byte = uIntTo1Byte;
module.exports.stringToBytes = stringToBytes;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * from-bytes: convert bytes to numbers and strings.
 * 64-bit IEEE values must be in the -1.0 to 1.0 range.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

const intBits = __webpack_require__(0);

/**
 * Turn an array of bytes into a float 64.
 * Thanks https://gist.github.com/kg/2192799
 * @param {!Array<number>} bytes 8 bytes representing a float 64.
 */
function decodeFloat(bytes) {
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
 * Read 8-bit samples from an array of bytes representing a wave file.
 * @param {Uint8Array} bytes Wave file as an array of bytes.
 */
function uIntFrom1Byte(bytes) {
    let samples = [];
    let i = 0;
    let j = 0;
    while (i < bytes.length) {
        samples[j] = bytes[i];
        j++;
        i++;
    }
    return samples;
}

/**
 * Read 16-bit samples from an array of bytes representing a wave file.
 * @param {Uint8Array} bytes Wave file as an array of bytes.
 */
function intFrom2Bytes(bytes) {
    let samples = [];
    let i = 0;
    let j = 0;
    while (i < bytes.length) {
        samples[j] = (bytes[1 + i] << 8) | bytes[i];        
         // Thanks https://stackoverflow.com/a/38298413
        if (bytes[1 + i] & (1 << 7)) {
           samples[j] = 0xFFFF0000 | samples[j];
        }           
        j++;
        i+=2;
    }
    return samples;
}

/**
 * Read 16-bit samples from an array of bytes representing a wave file.
 * @param {Uint8Array} bytes Wave file as an array of bytes.
 */
function uIntFrom2Bytes(bytes) {
    let samples = [];
    let i = 0;
    let j = 0;
    while (i < bytes.length) {
        samples[j] = (bytes[1 + i] << 8) | bytes[i];                 
        j++;
        i+=2;
    }
    return samples;
}

/**
 * Read 24-bit samples from an array of bytes representing a wave file.
 * @param {Uint8Array} bytes Wave file as an array of bytes.
 */
function intFrom3Bytes(bytes) {
    let samples = [];
    let i = 0;
    let j = 0;
    while (i < bytes.length) {
        samples[j] = (
                bytes[2 + i] << 16 |
                bytes[1 + i] << 8 |
                bytes[i]
            );
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
 * Read 24-bit samples from an array of bytes representing a wave file.
 * @param {Uint8Array} bytes Wave file as an array of bytes.
 */
function uIntFrom3Bytes(bytes) {
    let samples = [];
    let i = 0;
    let j = 0;
    while (i < bytes.length) {
        samples[j] = (
                bytes[2 + i] << 16 |
                bytes[1 + i] << 8 |
                bytes[i]
            );
        j++;
        i+=3;
    }
    return samples;
}

/**
 * Read 32-bit samples from an array of bytes representing a wave file.
 * @param {Uint8Array} bytes Wave file as an array of bytes.
 */
function intFrom4Bytes(bytes) {
    let samples = [];
    let i = 0;
    let j = 0;
    while (i < bytes.length) {
        samples[j] = (
                bytes[3 + i] << 24 |
                bytes[2 + i] << 16 |
                bytes[1 + i] << 8 |
                bytes[i]
            );
        if ((samples[j] & 0x80000000) < 0) {
            samples[j] = samples[j] & 0xFFFFFFFF;  
        }
        j++;
        i+=4;
    }
    return samples;
}

/**
 * Read 32-bit samples from an array of bytes representing a wave file.
 * @param {Uint8Array} bytes Wave file as an array of bytes.
 */
function uIntFrom4Bytes(bytes) {
    let samples = [];
    let i = 0;
    let j = 0;
    while (i < bytes.length) {
        samples[j] = (
                bytes[3 + i] << 24 |
                bytes[2 + i] << 16 |
                bytes[1 + i] << 8 |
                bytes[i]
            );
        samples[j] = samples[j] >>> 0;
        j++;
        i+=4;
    }
    return samples;
}

/**
 * Read 8-bit IEEE samples from an array of bytes representing a wave file.
 * @param {Uint8Array} bytes Wave file as an array of bytes.
 */
function floatFrom4Bytes(bytes) {
    let samples = [];
    let i = 0;
    let j = 0;
    while (i < bytes.length) {
        samples[j] = intBits.pack(
                bytes[3 + i] << 24 |
                bytes[2 + i] << 16 |
                bytes[1 + i] << 8 |
                bytes[i]
            );
        j++;
        i+=4;
    }
    return samples;
}

/**
 * Read 64-bit samples from an array of bytes representing a wave file.
 * @param {Uint8Array} bytes Wave file as an array of bytes.
 */
function floatFrom8Bytes(bytes) {
    let samples = [];
    let i = 0;
    let j = 0;
    while (i < bytes.length) {
        samples[j] = decodeFloat([
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
 * @param {Uint8Array} bytes An array of bytes.
 * @returns {string} The string.
 */
function stringFromBytes(bytes) {
    let string = "";
    let i = 0;
    while (i < bytes.length) {
        string += String.fromCharCode(bytes[i]);
        i++;
    }    
    return string;
}

module.exports.uIntFrom1Byte = uIntFrom1Byte;
module.exports.intFrom2Bytes = intFrom2Bytes;
module.exports.uIntFrom2Bytes = uIntFrom2Bytes;
module.exports.intFrom3Bytes = intFrom3Bytes;
module.exports.uIntFrom3Bytes = uIntFrom3Bytes;
module.exports.intFrom4Bytes = intFrom4Bytes;
module.exports.uIntFrom4Bytes = uIntFrom4Bytes;
module.exports.floatFrom4Bytes = floatFrom4Bytes;
module.exports.floatFrom8Bytes = floatFrom8Bytes;
module.exports.stringFromBytes = stringFromBytes;


/***/ })
/******/ ]);