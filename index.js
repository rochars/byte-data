/*
 * byte-data
 * Pack and unpack binary data.
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

/** @private */
const endianness = require("endianness");
/** @private */
const GenericInteger = require("generic-integer");

/** @private */
const int8_ = new Int8Array(8);
/** @private */
const ui32_ = new Uint32Array(int8_.buffer);
/** @private */
const f32_ = new Float32Array(int8_.buffer);
/** @private */
const f64_ = new Float64Array(int8_.buffer);

/**
 * @type {Function}
 * @private
 */
let reader_;
/**
 * @type {Function}
 * @private
 */
let writer_;
/**
 * @type {Object}
 * @private
 */
let gInt_ = {};

/**
 * Write a number or fixed-length string to a byte buffer.
 * @param {number|string} value The value.
 * @param {!Object} theType The type definition.
 * @param {number} base The base of the output. Optional. Default is 10.
 *      Possible values are 2, 10, 16.
 * @return {!Array<number|string>}
 * @throws {Error} If the type definition is not valid.
 */
function pack(value, theType, base=10) {
    setUp_(theType);
    let packed = [];
    if (value === undefined) {
        return packed;
    }
    value = fixBadString_(value, theType);
    return toBytes_([value], theType, base);
}

/**
 * Read a number or a fixed-length string from a byte buffer.
 * @param {!Array<number|string>|!Uint8Array} buffer An array of bytes.
 * @param {!Object} theType The type definition.
 * @param {number} base The base of the input. Optional. Default is 10.
 *      Possible values are 2, 10, 16.
 * @return {number|string|null}
 * @throws {Error} If the type definition is not valid.
 */
function unpack(buffer, theType, base=10) {
    setUp_(theType);
    let values = fromBytes_(buffer.slice(0, theType["offset"]), theType, base);
    return values ? values[0] : theType["char"] ? "" : null;
}

/**
 * Write an array of numbers or a string to a byte buffer.
 * @param {!Array<number|string>} values The values.
 * @param {!Object} theType The type definition.
 * @param {number} base The base of the output. Optional. Default is 10.
 *      Possible values are 2, 10, 16.
 * @return {!Array<number|string>}
 * @throws {Error} If the type definition is not valid.
 */
function packArray(values, theType, base=10) {
    setUp_(theType);
    // Fix strings with bad length in the array
    if (theType["char"]) {
        let len = values.length;
        for (let i=0; i<len; i++) {
            values[i] = fixBadString_(values[i], theType);
        }
    }
    return toBytes_(values, theType, base);
}

/**
 * Read an array of numbers or a string from a byte buffer.
 * @param {!Array<number|string>|!Uint8Array} buffer The byte array.
 * @param {!Object} theType The type definition.
 * @param {number} base The base of the input. Optional. Default is 10.
 *      Possible values are 2, 10, 16.
 * @return {!Array<number|string>|number}
 * @throws {Error} If the type definition is not valid.
 */
function unpackArray(buffer, theType, base=10) {
    setUp_(theType);
    return fromBytes_(buffer, theType, base);
}

/**
 * Turn a byte buffer into what the bytes represent.
 * @param {!Array<number|string>|!Uint8Array} buffer An array of bytes.
 * @param {!Object} theType The type definition.
 * @param {number} base The desired base of the ouput.
 * @return {!Array<number>}
 * @private
 */
function fromBytes_(buffer, theType, base) {
    // turn to BE if BE
    if (theType["be"]) {
        endianness(buffer, theType["offset"]);
    }
    let len = buffer.length;
    // turn the input to base 10 in case it is not
    if (base != 10) {
        for(let i=0; i < len; i++) {
            buffer[i] = parseInt(buffer[i], base);
        }
    }
    // unpack the values
    let values = [];
    len = len - (theType["offset"] - 1);
    for (let i=0; i<len; i+=theType["offset"]) {
        values.push(reader_(buffer, i));
    }
    return values;
}

/**
 * Turn numbers and strings to bytes.
 * @param {!Array<number|string>} values The data.
 * @param {!Object} theType The type definition.
 * @param {number} base The desired base of the ouput.
 * @return {!Array<number|string>} the data as a byte buffer.
 * @private
 */
function toBytes_(values, theType, base) {
    let j = 0;
    let bytes = [];
    let len = values.length;
    // pack the values
    for(let i=0; i < len; i++) {
        j = writer_(bytes, values[i], j);
    }
    // turn to BE if BE
    if (theType["be"]) {
        endianness(bytes, theType["offset"]);
    }
    // turn the output to the desired base
    if (base != 10) {
        let offset = (base == 2 ? 8 : 2) + 1;
        len = bytes.length;
        for(let i=0; i < len; i++) {
            bytes[i] = bytes[i].toString(base);
            bytes[i] = Array(offset - bytes[i].length).join("0") + bytes[i];
        }
    }
    return bytes;
}

/**
 * Read int values from bytes.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 * @private
 */
function readInt_(bytes, i) {
    return gInt_.read(bytes, i);
}

/**
 * Read 1 16-bit float from bytes.
 * Thanks https://stackoverflow.com/a/8796597
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 * @private
 */
function read16F_(bytes, i) {
    let int = gInt_.read(bytes, i);
    let exponent = (int & 0x7C00) >> 10;
    let fraction = int & 0x03FF;
    let floatValue;
    if (exponent) {
        floatValue =  Math.pow(2, exponent - 15) * (1 + fraction / 0x400);
    } else {
        floatValue = 6.103515625e-5 * (fraction / 0x400);
    }
    return floatValue * (int >> 15 ? -1 : 1);
}

/**
 * Read 1 32-bit float from bytes.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 * @private
 */
function read32F_(bytes, i) {
    ui32_[0] = gInt_.read(bytes, i);
    return f32_[0];
}

/**
 * Read 1 64-bit float from bytes.
 * Thanks https://gist.github.com/kg/2192799
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 * @private
 */
function read64F_(bytes, i) {
    ui32_[0] = gInt_.read(bytes, i);
    ui32_[1] = gInt_.read(bytes, i + 4);
    return f64_[0];
}

/**
 * Read 1 char from bytes.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {string}
 * @private
 */
function readChar_(bytes, i) {
    let chrs = "";
    for(let j=0; j < gInt_.offset; j++) {
        chrs += String.fromCharCode(bytes[i+j]);
    }
    return chrs;
}

/**
 * Write a integer value to a byte buffer.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} number The number to write as bytes.
 * @param {number} j The index being written in the byte buffer.
 * @return {!number} The next index to write on the byte buffer.
 * @private
 */
function writeInt_(bytes, number, j) {
    return gInt_.write(bytes, number, j);
}

/**
 * Write one 16-bit float as a binary value.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} number The number to write as bytes.
 * @param {number} j The index being written in the byte buffer.
 * @return {number} The next index to write on the byte buffer.
 * @private
 */
function write16F_(bytes, number, j) {
    f32_[0] = number;
    let x = ui32_[0];
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
 * Write one 32-bit float as a binary value.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} number The number to write as bytes.
 * @param {number} j The index being written in the byte buffer.
 * @return {number} The next index to write on the byte buffer.
 * @private
 */
function write32F_(bytes, number, j) {
    f32_[0] = number;
    return gInt_.write(bytes, ui32_[0], j);
}

/**
 * Write one 64-bit float as a binary value.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} number The number to write as bytes.
 * @param {number} j The index being written in the byte buffer.
 * @return {number} The next index to write on the byte buffer.
 * @private
 */
function write64F_(bytes, number, j) {
    f64_[0] = number;
    j = gInt_.write(bytes, ui32_[0], j);
    return gInt_.write(bytes, ui32_[1], j);
}

/**
 * Write one char as a byte.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {string} str The string to write as bytes.
 * @param {number} j The index being written in the byte buffer.
 * @return {number} The next index to write on the byte buffer.
 * @private
 */
function writeChar_(bytes, str, j) {
    for (let i=0; i<str.length; i++) {
        bytes[j++] = str.charCodeAt(i);
    }
    return j;
}

/**
 * Set the function to unpack the data.
 * @param {!Object} theType The type definition.
 * @private
 */
function setReader_(theType) {
    if (theType["float"]) {
        if (theType["bits"] == 16) {
            reader_ = read16F_;
        } else if(theType["bits"] == 32) {
            reader_ = read32F_;
        } else if(theType["bits"] == 64) {
            reader_ = read64F_;
        }
    } else if (theType["char"]) {
        reader_ = readChar_;
    } else {
        reader_ = readInt_;
    }
}

/**
 * Set the function to pack the data.
 * @param {!Object} theType The type definition.
 * @private
 */
function setWriter_(theType) {
    if (theType["float"]) {
        if (theType["bits"] == 16) {
            writer_ = write16F_;
        } else if(theType["bits"] == 32) {
            writer_ = write32F_;
        } else if(theType["bits"] == 64) {
            writer_ = write64F_;
        }
    } else if (theType["char"]) {
        writer_ = writeChar_;
    } else {
        writer_ = writeInt_;
    }   
}

/**
 * Validate the type and set up the packing/unpacking functions.
 * @param {!Object} theType The type definition.
 * @throws {Error} If the type definition is not valid.
 * @private
 */
function setUp_(theType) {
    validateType_(theType);
    theType["offset"] = theType["bits"] < 8 ? 1 : Math.ceil(theType["bits"] / 8);
    setReader_(theType);
    setWriter_(theType);
    if (!theType["char"]) {
        gInt_ = new GenericInteger(
            theType["bits"] == 64 ? 32 : theType["bits"],
            theType["float"] ? false : theType["signed"]);    
    } else {
        // Workaround; should not use GenericInteger when type["char"]
        gInt_.offset = theType["bits"] < 8 ? 1 : Math.ceil(theType["bits"] / 8);
    }
}

/**
 * Validate the type definition.
 * @param {!Object} theType The type definition.
 * @throws {Error} If the type definition is not valid.
 * @private
 */
function validateType_(theType) {
    if (!theType) {
        throw new Error("Undefined type.");
    }
    if (theType["float"]) {
        if ([16,32,64].indexOf(theType["bits"]) == -1) {
            throw new Error("Not a supported float type.");
        }
    } else {
        if (theType["char"]) {
            if (theType["bits"] < 8 || theType["bits"] % 2) {
                throw new Error("Wrong offset for type char.");  
            }
        } else {
            if (theType["bits"] < 1 || theType["bits"] > 53) {
                throw new Error("Not a supported type.");  
            }
        }
    }
}

/**
 * Fix strings with bad length by either truncating when length is
 * greater than the defined in the type or turning them to "" if
 * length is smaller than defined in the type. If the value is not a
 * string, just return the value.
 * @param {string|number} value The string to fix.
 * @param {!Object} theType The type definition.
 * @return {string|number}
 * @private
 */
function fixBadString_(value, theType) {
    if (value.constructor == String) {
        if (value.length >= theType["offset"]) {
            value = value.slice(0, theType["offset"]);
        } else {
            value = "";
        }
    }
    return value;
}

// Types
/**
 * A char.
 * @type {!Object}
 */
module.exports.chr = {"bits": 8, "char": true};
/**
 * A 4-char string
 * @type {!Object}
 */
module.exports.fourCC = {"bits": 32, "char": true};
/**
 * Booleans
 * @type {!Object}
 */
module.exports.bool = {"bits": 1};
/**
 * Signed 2-bit integers
 * @type {!Object}
 */
module.exports.int2 = {"bits": 2, "signed": true};
/**
 * Unsigned 2-bit integers
 * @type {!Object}
 */
module.exports.uInt2 = {"bits": 2};
/**
 * Signed 4-bit integers
 * @type {!Object}
 */
module.exports.int4 = {"bits": 4, "signed": true};
/**
 * Unsigned 4-bit integers
 * @type {!Object}
 */
module.exports.uInt4 = {"bits": 4};
/**
 * Signed 8-bit integers
 * @type {!Object}
 */
module.exports.int8 = {"bits": 8, "signed": true};
/**
 * Unsigned 4-bit integers
 * @type {!Object}
 */
module.exports.uInt8 = {"bits": 8};
// LE
/**
 * Signed 16-bit integers little-endian
 * @type {!Object}
 */
module.exports.int16  = {"bits": 16, "signed": true};
/**
 * Unsigned 16-bit integers little-endian
 * @type {!Object}
 */
module.exports.uInt16 = {"bits": 16};
/**
 * Half-precision floating-point numbers little-endian
 * @type {!Object}
 */
module.exports.float16 = {"bits": 16, "float": true};
/**
 * Signed 24-bit integers little-endian
 * @type {!Object}
 */
module.exports.int24 = {"bits": 24, "signed": true};
/**
 * Unsigned 24-bit integers little-endian
 * @type {!Object}
 */
module.exports.uInt24 = {"bits": 24};
/**
 * Signed 32-bit integers little-endian
 * @type {!Object}
 */
module.exports.int32 = {"bits": 32, "signed": true};
/**
 * Unsigned 32-bit integers little-endian
 * @type {!Object}
 */
module.exports.uInt32 = {"bits": 32};
/**
 * Single-precision floating-point numbers little-endian
 * @type {!Object}
 */
module.exports.float32 = {"bits": 32, "float": true};
/**
 * Signed 40-bit integers little-endian
 * @type {!Object}
 */
module.exports.int40 = {"bits": 40, "signed": true};
/**
 * Unsigned 40-bit integers little-endian
 * @type {!Object}
 */
module.exports.uInt40 = {"bits": 40};
/**
 * Signed 48-bit integers little-endian
 * @type {!Object}
 */
module.exports.int48 = {"bits": 48, "signed": true};
/**
 * Unsigned 48-bit integers little-endian
 * @type {!Object}
 */
module.exports.uInt48 = {"bits": 48};
/**
 * Double-precision floating-point numbers little-endian
 * @type {!Object}
 */
module.exports.float64 = {"bits": 64, "float": true};
// BE
/**
 * Signed 16-bit integers big-endian
 * @type {!Object}
 */
module.exports.int16BE  = {"bits": 16, "signed": true, "be": true};
/**
 * Unsigned 16-bit integers big-endian
 * @type {!Object}
 */
module.exports.uInt16BE = {"bits": 16, "be": true};
/**
 * Half-precision floating-point numbers big-endian
 * @type {!Object}
 */
module.exports.float16BE = {"bits": 16, "float": true, "be": true};
/**
 * Signed 24-bit integers big-endian
 * @type {!Object}
 */
module.exports.int24BE = {"bits": 24, "signed": true, "be": true};
/**
 * Unsigned 24-bit integers big-endian
 * @type {!Object}
 */
module.exports.uInt24BE = {"bits": 24, "be": true};
/**
 * Signed 32-bit integers big-endian
 * @type {!Object}
 */
module.exports.int32BE = {"bits": 32, "signed": true, "be": true};
/**
 * Unsigned 32-bit integers big-endian
 * @type {!Object}
 */
module.exports.uInt32BE = {"bits": 32, "be": true};
/**
 * Single-precision floating-point numbers big-endian
 * @type {!Object}
 */
module.exports.float32BE = {"bits": 32, "float": true, "be": true};
/**
 * Signed 40-bit integers big-endian
 * @type {!Object}
 */
module.exports.int40BE = {"bits": 40, "signed": true, "be": true};
/**
 * Unsigned 40-bit integers big-endian
 * @type {!Object}
 */
module.exports.uInt40BE = {"bits": 40, "be": true};
/**
 * Signed 48-bit integers big-endian
 * @type {!Object}
 */
module.exports.int48BE = {"bits": 48, "signed": true, "be": true};
/**
 * Unsigned 48-bit integers big-endian
 * @type {!Object}
 */
module.exports.uInt48BE = {"bits": 48, "be": true};
/**
 * Double-precision floating-point numbers big-endian
 * @type {!Object}
 */
module.exports.float64BE = {"bits": 64, "float": true, "be": true};

// Methods
module.exports.pack = pack;
module.exports.unpack = unpack;
module.exports.packArray = packArray;
module.exports.unpackArray = unpackArray;
