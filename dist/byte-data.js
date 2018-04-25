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

/*
 * type: The Type class.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

/** @private */
let f32 = new Float32Array(1);
/** @private */
let i32 = new Int32Array(f32.buffer);
/** @private */
let f64 = new Float64Array(1);
/** @private */
let ui32 = new Uint32Array(f64.buffer);
let GenericInteger = __webpack_require__(3);

/**
 * A class to represent byte-data types.
 */
class Type extends GenericInteger {

    /**
     * @param {Object} options The type definition.
     * @param {number} options.bits Number of bits used by data of this type.
     * @param {boolean} options.char True for string/char types.
     * @param {boolean} options.float True for float types.
     *    Available only for 16, 32 and 64-bit data.
     * @param {boolean} options.base The base: 2, 10 or 16.
     * @param {boolean} options.be True for big-endian.
     * @param {boolean} options.signed True for signed types.
     */
    constructor(options) {
        super(options);
        /**
         * If this type is a char or not.
         * @type {boolean}
         */
        this.char = options["char"];
        /**
         * If this type is a floating-point number or not.
         * @type {boolean}
         */
        this.float = options["float"];
        /**
         * The base used to represent data of this type.
         * Default is 10.
         * @type {number}
         */
        this.base = options["base"] ? options["base"] : 10;
        this.buildType_();
    }

    /**
     * Read 1 16-bit float from from bytes.
     * Thanks https://stackoverflow.com/a/8796597
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     * @private
     */
    read16F_(bytes, i) {
        let int = this.read(bytes, i, {"bits": 16, "offset": 2});
        let exponent = (int & 0x7C00) >> 10;
        let fraction = int & 0x03FF;
        let floatValue;
        if (exponent) {
            floatValue =  Math.pow(2, exponent - 15) * (1 + fraction / 0x400);
        } else {
            floatValue = 6.103515625e-5 * (fraction / 0x400);
        }
        return  floatValue * (int >> 15 ? -1 : 1);
    }

    /**
     * Read 1 32-bit float from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     * @private
     */
    read32F_(bytes, i) {
        i32[0] = this.read(bytes, i, {"bits": 32, "offset": 4});
        return f32[0];
    }

    /**
     * Read 1 64-bit double from bytes.
     * Thanks https://gist.github.com/kg/2192799
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     * @private
     */
    read64F_(bytes, i) {
        let type32 = new Type({"bits": 32, "offset": 4});
        ui32[0] = type32.read(bytes, i, {"bits": 32, "offset": 4});
        ui32[1] = type32.read(bytes, i + 4, {"bits": 32, "offset": 4});
        return f64[0];
    }

    /**
     * Read 1 char from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {string}
     * @private
     */
    readChar_(bytes, i) {
        let chrs = "";
        let j = 0;
        while(j < this.offset) {
            chrs += String.fromCharCode(bytes[i+j]);
            j++;
        }
        return chrs;
    }

    /**
     * Write one 64-bit float as a binary value.
     * @param {!Array<number>} bytes An array of bytes.
     * @param {number} number The number to write as bytes.
     * @param {number} j The index being written in the byte buffer.
     * @return {number} The next index to write on the byte buffer.
     * @private
     */
    write64F_(bytes, number, j) {
        f64[0] = number;
        let type = new Type({"bits": 32, "offset": 4, "lastByteMask":255});
        j = type.write(bytes, ui32[0], j);
        return type.write(bytes, ui32[1], j);
    }

    /**
     * Write one 32-bit float as a binary value.
     * @param {!Array<number>} bytes An array of bytes.
     * @param {number} number The number to write as bytes.
     * @param {number} j The index being written in the byte buffer.
     * @return {number} The next index to write on the byte buffer.
     * @private
     */
    write32F_(bytes, number, j) {
        f32[0] = number;
        j = this.write(bytes, i32[0], j);
        return j;
    }

    /**
     * Write one 16-bit float as a binary value.
     * @param {!Array<number>} bytes An array of bytes.
     * @param {number} number The number to write as bytes.
     * @param {number} j The index being written in the byte buffer.
     * @return {number} The next index to write on the byte buffer.
     * @private
     */
    write16F_(bytes, number, j) {
        f32[0] = number;
        let x = i32[0];
        let bits = (x >> 16) & 0x8000;
        let m = (x >> 12) & 0x07ff;
        let e = (x >> 23) & 0xff;
        if (e >= 103) {
            bits |= ((e - 112) << 10) | (m >> 1);
            bits += m & 1;
        }
        bytes[j++] = bits & 0xFF;
        bytes[j++] = bits >>> 8 & 0xFF;
        return j;
    }
    
    /**
     * Write one char as a byte.
     * @param {!Array<number>} bytes An array of bytes.
     * @param {string} string The string to write as bytes.
     * @param {number} j The index being written in the byte buffer.
     * @return {number} The next index to write on the byte buffer.
     * @private
     */
    writeChar_(bytes, string, j) {
        bytes[j++] = string.charCodeAt(0);
        return j;
    }

    /**
     * Build the type.
     * @private
     */
    buildType_() {
        this.setReader_();
        this.setWriter_();
        if (this.float) {
            this.min = -Infinity;
            this.max = Infinity;
        }
    }

    /**
     * Set the function to read data of this type.
     * @private
     */
    setReader_() {
        if (this.float) {
            if (this.bits == 16) {
                this.reader = this.read16F_;
            } else if(this.bits == 32) {
                this.reader = this.read32F_;
            } else if(this.bits == 64) {
                this.reader = this.read64F_;
            }
        } else if (this.char) {
            this.reader = this.readChar_;
        }
    }

    /**
     * Set the function to write data of this type.
     * @private
     */
    setWriter_() {
        if (this.float) {
            if (this.bits == 16) {
                this.writer = this.write16F_;
            } else if(this.bits == 32) {
                this.writer = this.write32F_;
            } else if(this.bits == 64) {
                this.writer = this.write64F_;
            }
        } else if (this.char) {
            this.writer = this.writeChar_;
        }
    }
}

module.exports = Type;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * byte-data
 * Pack and unpack binary data.
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

/** @private */
const rw = __webpack_require__(2);
const Type = __webpack_require__(0);

/**
 * Turn a number or fixed-length string into a byte buffer.
 * @param {number|string} value The value.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the output. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {!Array<number>|!Array<string>}
 */
function pack(value, type, base=10) {
    let values = [];
    if (type.char) {
        values = type.char ? value.slice(0, type.offset) : value;
    } else if (!Array.isArray(value)) {
        values = [value];
    }
    return rw.toBytes(values, rw.getType(type, base));
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
    let values = rw.fromBytes(
            buffer.slice(0, type.offset),
            rw.getType(type, base)
        );
    if (type.char) {
        values = values.slice(0, type.bits / 8);
    } else {
        values = values[0];
    }
    return values;
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
    return rw.toBytes(values, rw.getType(type, base));
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
    return rw.fromBytes(buffer, rw.getType(type, base));
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
 * @param {Array<number|string>} struct The struct values.
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
 * @return {Array<number|string>}
 */
function unpackStruct(buffer, def, base=10) {
    if (buffer.length < getStructDefSize(def)) {
        return [];
    }
    let struct = [];
    let i = 0;
    let j = 0;
    while (i < def.length) {
        struct = struct.concat(
                unpack(buffer.slice(j, j + def[i].offset), def[i], base)
            );
        j += def[i].offset;
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
        bits += def[i].offset;
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
/** 
 * A char.
 * @type {Object}
 */
window['byteData']['chr'] = new Type({"bits": 8, "char": true});
/**
 * A 4-char string
 * @type {Object}
 */
window['byteData']['fourCC'] = new Type({"bits": 32, "char": true});
/**
 * Booleans
 * @type {Object}
 */
window['byteData']['bool'] = new Type({"bits": 1});
/**
 * Signed 2-bit integers
 * @type {Object}
 */
window['byteData']['int2'] = new Type({"bits": 2, "signed": true});
/**
 * Unsigned 2-bit integers
 * @type {Object}
 */
window['byteData']['uInt2'] = new Type({"bits": 2});
/**
 * Signed 4-bit integers
 * @type {Object}
 */
window['byteData']['int4'] = new Type({"bits": 4, "signed": true});
/**
 * Unsigned 4-bit integers
 * @type {Object}
 */
window['byteData']['uInt4'] = new Type({"bits": 4});
/**
 * Signed 8-bit integers
 * @type {Object}
 */
window['byteData']['int8'] = new Type({"bits": 8, "signed": true});
/**
 * Unsigned 4-bit integers
 * @type {Object}
 */
window['byteData']['uInt8'] = new Type({"bits": 8});
// LE
/**
 * Signed 16-bit integers little-endian
 * @type {Object}
 */
window['byteData']['int16']  = new Type({"bits": 16, "signed": true});
/**
 * Unsigned 16-bit integers little-endian
 * @type {Object}
 */
window['byteData']['uInt16'] = new Type({"bits": 16});
/**
 * Half-precision floating-point numbers little-endian
 * @type {Object}
 */
window['byteData']['float16'] = new Type({"bits": 16, "float": true});
/**
 * Signed 24-bit integers little-endian
 * @type {Object}
 */
window['byteData']['int24'] = new Type({"bits": 24, "signed": true});
/**
 * Unsigned 24-bit integers little-endian
 * @type {Object}
 */
window['byteData']['uInt24'] = new Type({"bits": 24});
/**
 * Signed 32-bit integers little-endian
 * @type {Object}
 */
window['byteData']['int32'] = new Type({"bits": 32, "signed": true});
/**
 * Unsigned 32-bit integers little-endian
 * @type {Object}
 */
window['byteData']['uInt32'] = new Type({"bits": 32});
/**
 * Single-precision floating-point numbers little-endian
 * @type {Object}
 */
window['byteData']['float32'] = new Type({"bits": 32, "float": true});
/**
 * Signed 40-bit integers little-endian
 * @type {Object}
 */
window['byteData']['int40'] = new Type({"bits": 40, "signed": true});
/**
 * Unsigned 40-bit integers little-endian
 * @type {Object}
 */
window['byteData']['uInt40'] = new Type({"bits": 40});
/**
 * Signed 48-bit integers little-endian
 * @type {Object}
 */
window['byteData']['int48'] = new Type({"bits": 48, "signed": true});
/**
 * Unsigned 48-bit integers little-endian
 * @type {Object}
 */
window['byteData']['uInt48'] = new Type({"bits": 48});
/**
 * Double-precision floating-point numbers little-endian
 * @type {Object}
 */
window['byteData']['float64'] = new Type({"bits": 64, "float": true});
// BE
/**
 * Signed 16-bit integers big-endian
 * @type {Object}
 */
window['byteData']['int16BE']  = new Type({"bits": 16, "signed": true, "be": true});
/**
 * Unsigned 16-bit integers big-endian
 * @type {Object}
 */
window['byteData']['uInt16BE'] = new Type({"bits": 16, "be": true});
/**
 * Half-precision floating-point numbers big-endian
 * @type {Object}
 */
window['byteData']['float16BE'] = new Type({"bits": 16, "float": true, "be": true});
/**
 * Signed 24-bit integers big-endian
 * @type {Object}
 */
window['byteData']['int24BE'] = new Type({"bits": 24, "signed": true, "be": true});
/**
 * Unsigned 24-bit integers big-endian
 * @type {Object}
 */
window['byteData']['uInt24BE'] = new Type({"bits": 24, "be": true});
/**
 * Signed 32-bit integers big-endian
 * @type {Object}
 */
window['byteData']['int32BE'] = new Type({"bits": 32, "signed": true, "be": true});
/**
 * Unsigned 32-bit integers big-endian
 * @type {Object}
 */
window['byteData']['uInt32BE'] = new Type({"bits": 32, "be": true});
/**
 * Single-precision floating-point numbers big-endian
 * @type {Object}
 */
window['byteData']['float32BE'] = new Type({"bits": 32, "float": true, "be": true});
/**
 * Signed 40-bit integers big-endian
 * @type {Object}
 */
window['byteData']['int40BE'] = new Type({"bits": 40, "signed": true, "be": true});
/**
 * Unsigned 40-bit integers big-endian
 * @type {Object}
 */
window['byteData']['uInt40BE'] = new Type({"bits": 40, "be": true});
/**
 * Signed 48-bit integers big-endian
 * @type {Object}
 */
window['byteData']['int48BE'] = new Type({"bits": 48, "signed": true, "be": true});
/**
 * Unsigned 48-bit integers big-endian
 * @type {Object}
 */
window['byteData']['uInt48BE'] = new Type({"bits": 48, "be": true});
/**
 * Double-precision floating-point numbers big-endian
 * @type {Object}
 */
window['byteData']['float64BE'] = new Type({"bits": 64, "float": true, "be": true});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
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
    if (type.be) {
        endianness(buffer, type.offset);
    }
    if (type.base != 10) {
        bytesFromBase(buffer, type.base);
    }
    return readBytes(buffer, type);
}

/**
 * Turn numbers and strings to bytes.
 * @param {!Array<number>|number|string} values The data.
 * @param {Object} type One of the available types.
 * @return {!Array<number>|!Array<string>} the data as a byte buffer.
 */
function toBytes(values, type) {
    let bytes = writeBytes(values, type);
    if (type.be) {
        endianness(bytes, type.offset);
    }
    if (type.base != 10) {
        bytesToBase(bytes, type.base);
        formatOutput(bytes, type);
    }
    return bytes;
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
        values.push(type.reader(bytes, i));
        i += type.offset;
    }
    if (type.char) {
        values = values.join("");
    }
    return values;
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
        j = type.writer(bytes, values[i++], j);
    }
    return bytes;
}

/**
 * Get the full type spec for the reading/writing.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the input.
 * @return {Object}
 */
function getType(type, base) {
    let theType = Object.assign(new Type({}), type);
    theType.base = base;
    return theType;
}

/**
 * Turn bytes to base 10 from base 2 or 16.
 * @param {!Array<number>|Uint8Array} bytes The bytes as binary or hex strings.
 * @param {number} base The base.
 */
function bytesFromBase(bytes, base) {
    let i = 0;
    let len = bytes.length;
    while(i < len) {
        bytes[i] = parseInt(bytes[i], base);
        i++;
    }
}

/**
 * Turn the output to the correct base.
 * @param {Array} bytes The bytes.
 * @param {Object} type The type.
 */
function formatOutput(bytes, type) {
    let i = 0;
    let len = bytes.length;
    let offset = (type.base == 2 ? 8 : 2) + 1;
    while(i < len) {
        bytes[i] = Array(offset - bytes[i].length).join("0") + bytes[i];
        i++;
    }
}

/**
 * Turn bytes from base 10 to base 2 or 16.
 * @param {!Array<string>|Array<number>} bytes The bytes.
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

module.exports.getType = getType;
module.exports.toBytes = toBytes;
module.exports.fromBytes = fromBytes;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*!
 * generic-integer
 * Pack and unpack any integer from 1 to 53-Bit.
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * https://github.com/rochars/generic-integer
 * 
 */

/**
 * A class to read and write any integer from 1 to 53-Bit.
 */
class GenericInteger {

    /**
     * @param {Object} options The type definition.
     * @param {number} options.bits Number of bits used by data of this type.
     * @param {boolean} options.be True for big-endian.
     * @param {boolean} options.signed True for signed types.
     */
    constructor(options) {
        /**
         * The max number of bits used by data of this type.
         * @type {number}
         */
        this.bits = options["bits"];
        /**
         * If this type is big-endian or not.
         * @type {boolean}
         */
        this.be = options["be"];
        /**
         * If this type it is signed or not.
         * @type {boolean}
         */
        this.signed = options["signed"];
        /**
         * The function to read values of this type from buffers.
         * @type {Function}
         */
        this.reader = this.read;
        /**
         * The function to write values of this type to buffers.
         * @type {Function}
         */
        this.writer = this.write;
        /**
         * The number of bytes used by data of this type.
         * @type {number}
         */
        this.offset = 0;
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
        /**
         * The word size.
         * @type {number}
         * @private
         */
        this.realBits_ = this.bits;
        /**
         * The mask to be used in the last byte of this type.
         * @type {number}
         * @private
         */
        this.lastByteMask_ = 255;
        this.build_();
    }

    /**
     * Read a integer number from a byte buffer.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    read(bytes, i=0) {
        if (this.bits > 32) {
            return this.readBits_(bytes, i);
        }
        let num = 0;
        let x = this.offset - 1;
        while (x > 0) {
            num = (bytes[x + i] << x * 8) | num;
            x--;
        }
        num = (bytes[i] | num) >>> 0;
        return this.overflow_(this.sign_(num));
    }

    /**
     * Write one integer number to a byte buffer.
     * @param {!Array<number>} bytes An array of bytes.
     * @param {number} number The number.
     * @param {number} j The index being written in the byte buffer.
     * @return {number} The next index to write on the byte buffer.
     */
    write(bytes, number, j=0) {
        number = this.overflow_(number);
        let mask = 255;
        j = this.writeFirstByte_(bytes, number, j);
        for (let i = 2; i <= this.offset; i++) {
            if (i == this.offset) {
                mask = this.lastByteMask_;
            }
            bytes[j++] = Math.floor(number / Math.pow(2, ((i - 1) * 8))) & mask;
        }
        return j;
    }

    /**
     * Read a integer number from a byte buffer by turning the bytes
     * to a string of bits.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     * @private
     */
    readBits_(bytes, i=0) {
        let binary = "";
        let j = 0;
        while(j < this.offset) {
            let bits = bytes[i + j].toString(2);
            binary = Array(9 - bits.length).join("0") + bits + binary;
            j++;
        }
        return this.overflow_(this.sign_(parseInt(binary, 2)));
    }

    /**
     * Build the type.
     * @private
     */
    build_() {
        this.validateWordSize_();
        this.setRealBits_();
        this.setLastByteMask_();
        this.setMinMax_();
        this.offset = this.bits < 8 ? 1 : Math.ceil(this.realBits_ / 8);
    }

    /**
     * Sign a number according to the type.
     * @param {number} num The number.
     * @return {number}
     * @private
     */
    sign_(num) {
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
     * @private
     */
    overflow_(value) {
        if (value > this.max) {
            value = this.max;
        } else if (value < this.min) {
            value = this.min;
        }
        return value;
    }

    /**
     * Set the minimum and maximum values for the type.
     * @private
     */
    setMinMax_() {
        let max = Math.pow(2, this.bits);
        if (this.signed) {
            this.max = max / 2 -1;
            this.min = -max / 2;
        } else {
            this.max = max - 1;
            this.min = 0;
        }
    }

    /**
     * Validate the number of bits.
     * @private
     */
    validateWordSize_() {
        if (this.bits < 1 || this.bits > 64) {
            throw Error("Not a supported type.");
        }
    }

    /**
     * Set the real bit depth for data with bit count different from the
     * standard types (1, 2, 4, 8, 16, 32, 40, 48, 64): the closest bigger
     * standard number of bits. The data is then treated as data of the
     * standard type on all aspects except for the min and max values.
     * Ex: a 11-bit uInt is treated as 16-bit uInt with a max value of 2048.
     * @private
     */
    setRealBits_() {
        if (this.bits > 8) {
            if (this.bits <= 16) {
                this.realBits_ = 16;
            } else if (this.bits <= 24) {
                this.realBits_ = 24;
            } else if (this.bits <= 32) {
                this.realBits_ = 32;
            } else if (this.bits <= 40) {
                this.realBits_ = 40;
            } else if (this.bits <= 48) {
                this.realBits_ = 48;
            } else if (this.bits <= 56) {
                this.realBits_ = 56;
            } else {
                this.realBits_ = 64;
            }
        } else {
            this.realBits_ = this.bits;
        }
    }

    /**
     * Set the mask that should be used when writing the last byte of
     * data of the type.
     * @private
     */
    setLastByteMask_() {
        let r = 8 - (this.realBits_ - this.bits);
        this.lastByteMask_ = Math.pow(2, r > 0 ? r : 8) -1;
    }

    /**
     * Write the first byte of a integer number.
     * @param {!Array<number>} bytes An array of bytes.
     * @param {number} number The number.
     * @param {number} j The index being written in the byte buffer.
     * @return {number} The next index to write on the byte buffer.
     * @private
     */
    writeFirstByte_(bytes, number, j) {
        if (this.bits < 8) {
            bytes[j++] = number < 0 ? number + Math.pow(2, this.bits) : number;
        } else {
            bytes[j++] = number & 255;
        }
        return j;
    }
}

module.exports = GenericInteger;


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