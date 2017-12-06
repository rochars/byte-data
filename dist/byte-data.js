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
/***/ (function(module, exports, __webpack_require__) {

/**
 * type: The Type class.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

/** @private */
const bitParser = __webpack_require__(3);

/**
 * A class to represent byte-data types.
 */
class Type {

    constructor(options) {
        /**
         * The max number of bits used by data of this type.
         * @type {number}
         */
        this.bits = options["bits"];
        /**
         * If this type represent floating-point values or not.
         * @type {boolean}
         */
        this.char = options["char"];
        /**
         * If this type it is signed or not.
         * @type {boolean}
         */
        this.float = options["float"];
        /**
         * If this type is big-endian or not.
         * @type {boolean}
         */
        this.be = options["be"];
        /**
         * If this type it is signed or not.
         * @type {boolean}
         */
        this.signed = this.float ? true : options["signed"];
        /**
         * If this type represent a single value or an array.
         * @type {boolean}
         */
        this.single = true;
        /**
         * The function to read values of this type from buffers.
         * @type {Function}
         */
        this.reader = null;
        /**
         * The function to write values of this type to buffers.
         * @type {Function}
         */
        this.writer = null;
        /**
         * The number of bytes used by data of this type.
         * @type {number}
         */
        this.offset = 0;
        /**
         * The base used to represent data of this type.
         * @type {number}
         */
        this.base = 10;
        /**
         * Min value for numbers of this type.
         * @type {number}
         */
        this.min = -Infinity;
        /**
         * Max value for numbers of this type.
         * @type {number}
         */
        this.max = Infinity;
        this.build_();
    }

    /**
     * Sign a number according to the type.
     * @param {number} num The number.
     * @return {number}
     */
    sign(num) {
        if (num > this.max) {
            num -= (this.max * 2) + 2;
        }
        return num;
    }

    /**
     * Limit the value according to the bit depth in case of
     * overflow or underflow.
     * @param {number} value The data.
     * @return {number}
     */
    overflow(value) {
        if (value > this.max) {
            value = this.max;
        } else if (value < this.min) {
            value = this.min;
        }
        return value;
    }

    /**
     * Build the type.
     * @private
     */
    build_() {
        this.offset = this.bits < 8 ? 1 : this.bits / 8;
        this.setReader_();
        this.setWriter_();
        if (!this.float) {
            this.setMinMax_();
        }
    }

    /**
     * Set the function to read data of this type.
     * @private
     */
    setReader_() {
        this.reader = this.char ?
            bitParser.BitReader["readChar"] : bitParser.BitReader[
                'read' + (this.bits < 8 ? 8 : this.bits) +
                'Bit' + (this.float ? "Float" : "")];
    }

    /**
     * Set the function to write data of this type.
     * @private
     */
    setWriter_() {
        if (this.char) {
            this.writer = bitParser.BitWriter["writeString"];
        } else {
            this.writer = bitParser.BitWriter[
                'write' + this.bits + 'Bit' + (this.float ? "Float" : "")];
        }
    }

    /**
     * Set the minimum and maximum values for the type.
     * @private
     */
    setMinMax_() {
        let max = Math.pow(2, this.bits);
        if (this.signed) {
            this.max = (max / 2) - 1;
            this.min = (max / 2) * -1;
        } else {
            this.max = max - 1;
            this.min = 0;
        }
    }
}

module.exports = Type;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * byte-data
 * Readable data to and from byte buffers.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

/** @private */
const rw = __webpack_require__(2);

/** @private */
let Type = __webpack_require__(0);

/**
 * Turn a number or fixed-length string into a byte buffer.
 * @param {number|string} value The value.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the output. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {!Array<number>|!Array<string>}
 */
function pack(value, type, base=10) {
    let theType = rw.getType(type, base, true);
    value = theType.char ? value.slice(0, type.bits / 8) : value;
    return rw.toBytes(rw.turnToArray(value), theType);
}

/**
 * Turn a byte buffer into a number or a fixed-length string.
 * @param {!Array<number>|!Array<string>|Uint8Array} buffer An array of bytes.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the input. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {number|string}
 */
function unpack(buffer, type, base=10) {
    return rw.fromBytes(buffer, rw.getType(type, base, true));
}

/**
 * Turn a array of numbers or a string into a byte buffer.
 * @param {!Array<number>|string} values The values.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the output. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {!Array<number>|!Array<string>}
 */
function packArray(values, type, base=10) {
    return rw.toBytes(values, rw.getType(type, base, false));
}

/**
 * Turn a byte buffer into a array of numbers or a string.
 * @param {!Array<number>|!Array<string>|Uint8Array} buffer The byte array.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the input. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {!Array<number>|string}
 */
function unpackArray(buffer, type, base=10) {
    return rw.fromBytes(buffer, rw.getType(type, base, false));
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
 *      Possible values are 2, 10 or 16.
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
 * Turn a byte buffer into a struct.
 * A struct is an array of values of not necessarily the same type.
 * @param {!Array<number>|!Array<string>|Uint8Array} buffer The byte buffer.
 * @param {!Array<Object>} def The struct type definition.
 * @param {number} base The base of the input. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {Array}
 */
function unpackStruct(buffer, def, base=10) {
    if (buffer.length < getStructDefSize(def)) {
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

/**
 * Get the length in bytes of a struct definition.
 * @param {!Array<Object>} def The struct type definition.
 * @return {number} The length of the structure in bytes.
 * @private
 */
function getStructDefSize(def) {
    let bits = 0;
    for (let i = 0; i < def.length; i++) {
        bits += def[i].bits / 8;
    }
    return bits;
}

// interface
window['byteData'] = window['byteData'] ? window['byteData'] : {};window['byteData']['pack'] = pack;
window['byteData']['unpack'] = unpack;
window['byteData']['packArray'] = packArray;
window['byteData']['unpackArray'] = unpackArray;
window['byteData']['unpackStruct'] = unpackStruct;
window['byteData']['packStruct'] = packStruct;
window['byteData']['findString'] = findString;
window['byteData']['Type'] = Type;

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * from-bytes: Numbers and strings from bytes.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const Type = __webpack_require__(0);
const endianness = __webpack_require__(4);

/**
 * Turn a byte buffer into what the bytes represent.
 * @param {!Array<number>|!Array<string>|Uint8Array} buffer An array of bytes.
 * @param {Object} type One of the available types.
 * @return {!Array<number>|number|string}
 */
function fromBytes(buffer, type) {
    makeBigEndian(buffer, type);
    bytesFromBase(buffer, type.base);
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
 * Turn numbers and strings to bytes.
 * @param {!Array<number>|number|string} values The data.
 * @param {Object} type One of the available types.
 * @return {!Array<number>|!Array<string>|Uint8Array} the data as a byte buffer.
 */
function toBytes(values, type) {
    let bytes = writeBytes(values, type);
    makeBigEndian(bytes, type);
    if (type.base != 10) {
        bytesToBase(bytes, type.base);
        formatOutput(bytes, type);
    }
    return bytes;
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
function bytesFromBase(bytes, base) {
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
 * Swap the endianness to big endian.
 * @param {!Array<number>|!Array<string>|Uint8Array} bytes The values.
 * @param {Object} type The type.
 */
function makeBigEndian(bytes, type) {
    if (type.be) {
        endianness(bytes, type.offset);
    }
}

/**
 * Turn the output to the correct base.
 * @param {Array} bytes The bytes.
 * @param {Object} type The type.
 */
function formatOutput(bytes, type) {
    if (type.bits > 1) {
        let i = 0;
        let len = bytes.length;
        let offset;
        while(i < len) {
            if (type.bits == 2) {
                offset = (type.base == 2 ? 2 : 2) + 1;
            } else  if (type.bits == 4) {
                offset = (type.base == 2 ? 4 : 1) + 1;
            } else if (type.bits >= 4) {
                offset = (type.base == 2 ? 8 : 2) + 1;
            }
            bytes[i] = Array(offset - bytes[i].length).join("0") + bytes[i];
            i++;
        }
    }
}

/**
 * Turn bytes to base 2, 10 or 16.
 * @param {!Array<string>|!Array<number>|null} bytes The bytes.
 * @param {number} base The base.
 */
function bytesToBase(bytes, base) {
    let i = 0;
    let len = bytes.length;
    while (i < len) {
        bytes[i] = bytes[i].toString(base);
        i++;
    }
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
        j = type.writer(bytes, type.overflow(values[i]), j);
        i++;
    }
    return bytes;
}

module.exports.getType = getType;
module.exports.turnToArray = turnToArray;
module.exports.toBytes = toBytes;
module.exports.fromBytes = fromBytes;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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


/***/ }),
/* 4 */
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


/***/ })
/******/ ]);