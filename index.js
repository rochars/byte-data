/*!
 * byte-data
 * Pack and unpack binary data.
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

/** @private */
const Type = require("./src/type");
/** @private */
const endianness = require("endianness");

/**
 * Turn a number or fixed-length string into a byte buffer.
 * @param {number|string} value The value.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the output. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {!Array<number|string>}
 */
function pack(value, type, base=10) {
    let values = [];
    type.base = base;
    if (value.constructor == String) {
        values = value.slice(0, type.offset);
    } else if (!Array.isArray(value)) {
        values = [value];
    }
    return toBytes_(values, type);
}

/**
 * Turn a byte buffer into a number or a fixed-length string.
 * @param {!Array<number|string>|Uint8Array} buffer An array of bytes.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the input. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {number|string}
 */
function unpack(buffer, type, base=10) {
    type.base = base;
    let values = fromBytes_(buffer.slice(0, type.offset), type);
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
 * @return {!Array<number|string>}
 */
function packArray(values, type, base=10) {
    type.base = base;
    return toBytes_(values, type);
}

/**
 * Turn a byte buffer into a array of numbers or a string.
 * @param {!Array<number|string>|Uint8Array} buffer The byte array.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the input. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {!Array<number>|string|number}
 */
function unpackArray(buffer, type, base=10) {
    type.base = base;
    return fromBytes_(buffer, type);
}

/**
 * Turn a struct into a byte buffer.
 * A struct is an array of values of not necessarily the same type.
 * @param {Array<number|string>} struct The struct values.
 * @param {!Array<Object>} def The struct type definition.
 * @param {number} base The base of the output. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {!Array<number|string>}
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
 * @param {!Array<number|string>|Uint8Array} buffer The byte buffer.
 * @param {!Array<Object>} def The struct type definition.
 * @param {number} base The base of the input. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {Array<number|string>}
 */
function unpackStruct(buffer, def, base=10) {
    if (buffer.length < getStructDefSize_(def)) {
        return [];
    }
    let struct = [];
    let j = 0;
    for (let i=0; i < def.length; i++) {
        struct = struct.concat(
                unpack(buffer.slice(j, j + def[i].offset), def[i], base)
            );
        j += def[i].offset;
    }
    return struct;
}

/**
 * Get the length in bytes of a struct definition.
 * @param {!Array<Object>} def The struct type definition.
 * @return {number} The length of the structure in bytes.
 * @private
 */
function getStructDefSize_(def) {
    let bits = 0;
    for (let i = 0; i < def.length; i++) {
        bits += def[i].offset;
    }
    return bits;
}


/**
 * Turn a byte buffer into what the bytes represent.
 * @param {!Array<number|string>|Uint8Array} buffer An array of bytes.
 * @param {Object} type One of the available types.
 * @return {!Array<number>|number|string}
 * @private
 */
function fromBytes_(buffer, type) {
    if (type.be) {
        endianness(buffer, type.offset);
    }
    if (type.base != 10) {
        bytesFromBase_(buffer, type.base);
    }
    return readBytes_(buffer, type);
}

/**
 * Turn numbers and strings to bytes.
 * @param {!Array<number>|number|string} values The data.
 * @param {Object} type One of the available types.
 * @return {!Array<number|string>} the data as a byte buffer.
 * @private
 */
function toBytes_(values, type) {
    let bytes = writeBytes_(values, type);
    if (type.be) {
        endianness(bytes, type.offset);
    }
    if (type.base != 10) {
        bytesToBase_(bytes, type.base);
        formatOutput_(bytes, type);
    }
    return bytes;
}

/**
 * Turn a array of bytes into an array of what the bytes should represent.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {Object} type The type.
 * @return {!Array<number>|string}
 * @private
 */
function readBytes_(bytes, type) {
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
 * @private
 */
function writeBytes_(values, type) {
    let j = 0;
    let len = values.length;
    let bytes = [];
    for(let i=0; i < len; i++) {
        j = type.writer(bytes, values[i], j);
    }
    return bytes;
}

/**
 * Turn the output to the correct base.
 * @param {Array} bytes The bytes.
 * @param {Object} type The type.
 * @private
 */
function formatOutput_(bytes, type) {
    let len = bytes.length;
    let offset = (type.base == 2 ? 8 : 2) + 1;
    for(let i =0; i < len; i++) {
        bytes[i] = Array(offset - bytes[i].length).join("0") + bytes[i];
    }
}

/**
 * Turn bytes to base 10 from base 2 or 16.
 * @param {!Array<number>|Uint8Array} bytes The bytes as binary or hex strings.
 * @param {number} base The base.
 * @private
 */
function bytesFromBase_(bytes, base) {
    let len = bytes.length;
    for(let i=0; i < len; i++) {
        bytes[i] = parseInt(bytes[i], base);
    }
}

/**
 * Turn bytes from base 10 to base 2 or 16.
 * @param {!Array<string|number>} bytes The bytes.
 * @param {number} base The base.
 * @private
 */
function bytesToBase_(bytes, base) {
    let len = bytes.length;
    for(let i=0; i < len; i++) {
        bytes[i] = bytes[i].toString(base);
    }
}

// interface
module.exports.pack = pack;
module.exports.unpack = unpack;
module.exports.packArray = packArray;
module.exports.unpackArray = unpackArray;
module.exports.unpackStruct = unpackStruct;
module.exports.packStruct = packStruct;
module.exports.Type = Type;
/** 
 * A char.
 * @type {Object}
 */
module.exports.chr = new Type({"bits": 8, "char": true});
/**
 * A 4-char string
 * @type {Object}
 */
module.exports.fourCC = new Type({"bits": 32, "char": true});
/**
 * Booleans
 * @type {Object}
 */
module.exports.bool = new Type({"bits": 1});
/**
 * Signed 2-bit integers
 * @type {Object}
 */
module.exports.int2 = new Type({"bits": 2, "signed": true});
/**
 * Unsigned 2-bit integers
 * @type {Object}
 */
module.exports.uInt2 = new Type({"bits": 2});
/**
 * Signed 4-bit integers
 * @type {Object}
 */
module.exports.int4 = new Type({"bits": 4, "signed": true});
/**
 * Unsigned 4-bit integers
 * @type {Object}
 */
module.exports.uInt4 = new Type({"bits": 4});
/**
 * Signed 8-bit integers
 * @type {Object}
 */
module.exports.int8 = new Type({"bits": 8, "signed": true});
/**
 * Unsigned 4-bit integers
 * @type {Object}
 */
module.exports.uInt8 = new Type({"bits": 8});
// LE
/**
 * Signed 16-bit integers little-endian
 * @type {Object}
 */
module.exports.int16  = new Type({"bits": 16, "signed": true});
/**
 * Unsigned 16-bit integers little-endian
 * @type {Object}
 */
module.exports.uInt16 = new Type({"bits": 16});
/**
 * Half-precision floating-point numbers little-endian
 * @type {Object}
 */
module.exports.float16 = new Type({"bits": 16, "float": true});
/**
 * Signed 24-bit integers little-endian
 * @type {Object}
 */
module.exports.int24 = new Type({"bits": 24, "signed": true});
/**
 * Unsigned 24-bit integers little-endian
 * @type {Object}
 */
module.exports.uInt24 = new Type({"bits": 24});
/**
 * Signed 32-bit integers little-endian
 * @type {Object}
 */
module.exports.int32 = new Type({"bits": 32, "signed": true});
/**
 * Unsigned 32-bit integers little-endian
 * @type {Object}
 */
module.exports.uInt32 = new Type({"bits": 32});
/**
 * Single-precision floating-point numbers little-endian
 * @type {Object}
 */
module.exports.float32 = new Type({"bits": 32, "float": true});
/**
 * Signed 40-bit integers little-endian
 * @type {Object}
 */
module.exports.int40 = new Type({"bits": 40, "signed": true});
/**
 * Unsigned 40-bit integers little-endian
 * @type {Object}
 */
module.exports.uInt40 = new Type({"bits": 40});
/**
 * Signed 48-bit integers little-endian
 * @type {Object}
 */
module.exports.int48 = new Type({"bits": 48, "signed": true});
/**
 * Unsigned 48-bit integers little-endian
 * @type {Object}
 */
module.exports.uInt48 = new Type({"bits": 48});
/**
 * Double-precision floating-point numbers little-endian
 * @type {Object}
 */
module.exports.float64 = new Type({"bits": 64, "float": true});
// BE
/**
 * Signed 16-bit integers big-endian
 * @type {Object}
 */
module.exports.int16BE  = new Type({"bits": 16, "signed": true, "be": true});
/**
 * Unsigned 16-bit integers big-endian
 * @type {Object}
 */
module.exports.uInt16BE = new Type({"bits": 16, "be": true});
/**
 * Half-precision floating-point numbers big-endian
 * @type {Object}
 */
module.exports.float16BE = new Type({"bits": 16, "float": true, "be": true});
/**
 * Signed 24-bit integers big-endian
 * @type {Object}
 */
module.exports.int24BE = new Type({"bits": 24, "signed": true, "be": true});
/**
 * Unsigned 24-bit integers big-endian
 * @type {Object}
 */
module.exports.uInt24BE = new Type({"bits": 24, "be": true});
/**
 * Signed 32-bit integers big-endian
 * @type {Object}
 */
module.exports.int32BE = new Type({"bits": 32, "signed": true, "be": true});
/**
 * Unsigned 32-bit integers big-endian
 * @type {Object}
 */
module.exports.uInt32BE = new Type({"bits": 32, "be": true});
/**
 * Single-precision floating-point numbers big-endian
 * @type {Object}
 */
module.exports.float32BE = new Type({"bits": 32, "float": true, "be": true});
/**
 * Signed 40-bit integers big-endian
 * @type {Object}
 */
module.exports.int40BE = new Type({"bits": 40, "signed": true, "be": true});
/**
 * Unsigned 40-bit integers big-endian
 * @type {Object}
 */
module.exports.uInt40BE = new Type({"bits": 40, "be": true});
/**
 * Signed 48-bit integers big-endian
 * @type {Object}
 */
module.exports.int48BE = new Type({"bits": 48, "signed": true, "be": true});
/**
 * Unsigned 48-bit integers big-endian
 * @type {Object}
 */
module.exports.uInt48BE = new Type({"bits": 48, "be": true});
/**
 * Double-precision floating-point numbers big-endian
 * @type {Object}
 */
module.exports.float64BE = new Type({"bits": 64, "float": true, "be": true});
