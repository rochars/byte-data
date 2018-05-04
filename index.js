/*
 * byte-data
 * Pack and unpack binary data.
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

/** @private */
const io = require("./lib/io");

/**
 * Write a number or fixed-length string to a byte buffer.
 * @param {!number|!string} value The value.
 * @param {!Object} type One of the available types.
 * @param {!number} base The base of the output. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {!Array<number|string>}
 */
function pack(value, type, base=10) {
    let packed = [];
    if (value === undefined) {
        return packed;
    }
    io.assureType_(type, base);
    if (value.constructor == String) {
        if (value.length >= type["offset"]) {
            packed = io.toBytes_(value.slice(0, type["offset"]), type);
        }
    } else {
        packed = io.toBytes_([value], type);
    }
    return packed;
}

/**
 * Read a number or a fixed-length string from a byte buffer.
 * @param {!Array<number|string>|!Uint8Array} buffer An array of bytes.
 * @param {!Object} type One of the available types.
 * @param {!number} base The base of the input. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {number|string}
 */
function unpack(buffer, type, base=10) {
    io.assureType_(type, base);
    let values = io.fromBytes_(buffer.slice(0, type["offset"]), type);
    if (type["char"]) {
        values = values.slice(0, type["offset"]);
    } else {
        values = values ? values[0] : null;
    }
    return values;
}

/**
 * Write an array of numbers or a string to a byte buffer.
 * @param {!Array<number>|string} values The values.
 * @param {!Object} type One of the available types.
 * @param {!number} base The base of the output. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {!Array<number|string>}
 */
function packArray(values, type, base=10) {
    io.assureType_(type, base);
    return io.toBytes_(values, type);
}

/**
 * Read an array of numbers or a string from a byte buffer.
 * @param {!Array<number|string>|!Uint8Array} buffer The byte array.
 * @param {!Object} type One of the available types.
 * @param {!number} base The base of the input. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {!Array<number>|string|number}
 */
function unpackArray(buffer, type, base=10) {
    io.assureType_(type, base);
    return io.fromBytes_(buffer, type);
}

/**
 * Write a struct to a byte buffer.
 * A struct is an array of values of not necessarily the same type.
 * @param {!Array<number|string>} struct The struct values.
 * @param {!Array<!Object>} def The struct type definition.
 * @param {!number} base The base of the output. Optional. Default is 10.
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
 * Read a struct from a byte buffer.
 * A struct is an array of values of not necessarily the same type.
 * @param {!Array<number|string>|!Uint8Array} buffer The byte buffer.
 * @param {!Array<!Object>} def The struct type definition.
 * @param {!number} base The base of the input. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {Array<number|string>}
 */
function unpackStruct(buffer, def, base=10) {
    if (buffer.length < io.getStructDefSize_(def)) {
        return [];
    }
    let struct = [];
    let j = 0;
    for (let i=0; i < def.length; i++) {
        struct = struct.concat(
                unpack(buffer.slice(j, j + def[i]["offset"]), def[i], base)
            );
        j += def[i]["offset"];
    }
    return struct;
}

// interface
module.exports.pack = pack;
module.exports.unpack = unpack;
module.exports.packArray = packArray;
module.exports.unpackArray = unpackArray;
module.exports.unpackStruct = unpackStruct;
module.exports.packStruct = packStruct;

/** 
 * A char.
 * @type {Object}
 */
module.exports.chr = {"bits": 8, "char": true};
/**
 * A 4-char string
 * @type {Object}
 */
module.exports.fourCC = {"bits": 32, "char": true};
/**
 * Booleans
 * @type {Object}
 */
module.exports.bool = {"bits": 1};
/**
 * Signed 2-bit integers
 * @type {Object}
 */
module.exports.int2 = {"bits": 2, "signed": true};
/**
 * Unsigned 2-bit integers
 * @type {Object}
 */
module.exports.uInt2 = {"bits": 2};
/**
 * Signed 4-bit integers
 * @type {Object}
 */
module.exports.int4 = {"bits": 4, "signed": true};
/**
 * Unsigned 4-bit integers
 * @type {Object}
 */
module.exports.uInt4 = {"bits": 4};
/**
 * Signed 8-bit integers
 * @type {Object}
 */
module.exports.int8 = {"bits": 8, "signed": true};
/**
 * Unsigned 4-bit integers
 * @type {Object}
 */
module.exports.uInt8 = {"bits": 8};
// LE
/**
 * Signed 16-bit integers little-endian
 * @type {Object}
 */
module.exports.int16  = {"bits": 16, "signed": true};
/**
 * Unsigned 16-bit integers little-endian
 * @type {Object}
 */
module.exports.uInt16 = {"bits": 16};
/**
 * Half-precision floating-point numbers little-endian
 * @type {Object}
 */
module.exports.float16 = {"bits": 16, "float": true};
/**
 * Signed 24-bit integers little-endian
 * @type {Object}
 */
module.exports.int24 = {"bits": 24, "signed": true};
/**
 * Unsigned 24-bit integers little-endian
 * @type {Object}
 */
module.exports.uInt24 = {"bits": 24};
/**
 * Signed 32-bit integers little-endian
 * @type {Object}
 */
module.exports.int32 = {"bits": 32, "signed": true};
/**
 * Unsigned 32-bit integers little-endian
 * @type {Object}
 */
module.exports.uInt32 = {"bits": 32};
/**
 * Single-precision floating-point numbers little-endian
 * @type {Object}
 */
module.exports.float32 = {"bits": 32, "float": true};
/**
 * Signed 40-bit integers little-endian
 * @type {Object}
 */
module.exports.int40 = {"bits": 40, "signed": true};
/**
 * Unsigned 40-bit integers little-endian
 * @type {Object}
 */
module.exports.uInt40 = {"bits": 40};
/**
 * Signed 48-bit integers little-endian
 * @type {Object}
 */
module.exports.int48 = {"bits": 48, "signed": true};
/**
 * Unsigned 48-bit integers little-endian
 * @type {Object}
 */
module.exports.uInt48 = {"bits": 48};
/**
 * Double-precision floating-point numbers little-endian
 * @type {Object}
 */
module.exports.float64 = {"bits": 64, "float": true};
// BE
/**
 * Signed 16-bit integers big-endian
 * @type {Object}
 */
module.exports.int16BE  = {"bits": 16, "signed": true, "be": true};
/**
 * Unsigned 16-bit integers big-endian
 * @type {Object}
 */
module.exports.uInt16BE = {"bits": 16, "be": true};
/**
 * Half-precision floating-point numbers big-endian
 * @type {Object}
 */
module.exports.float16BE = {"bits": 16, "float": true, "be": true};
/**
 * Signed 24-bit integers big-endian
 * @type {Object}
 */
module.exports.int24BE = {"bits": 24, "signed": true, "be": true};
/**
 * Unsigned 24-bit integers big-endian
 * @type {Object}
 */
module.exports.uInt24BE = {"bits": 24, "be": true};
/**
 * Signed 32-bit integers big-endian
 * @type {Object}
 */
module.exports.int32BE = {"bits": 32, "signed": true, "be": true};
/**
 * Unsigned 32-bit integers big-endian
 * @type {Object}
 */
module.exports.uInt32BE = {"bits": 32, "be": true};
/**
 * Single-precision floating-point numbers big-endian
 * @type {Object}
 */
module.exports.float32BE = {"bits": 32, "float": true, "be": true};
/**
 * Signed 40-bit integers big-endian
 * @type {Object}
 */
module.exports.int40BE = {"bits": 40, "signed": true, "be": true};
/**
 * Unsigned 40-bit integers big-endian
 * @type {Object}
 */
module.exports.uInt40BE = {"bits": 40, "be": true};
/**
 * Signed 48-bit integers big-endian
 * @type {Object}
 */
module.exports.int48BE = {"bits": 48, "signed": true, "be": true};
/**
 * Unsigned 48-bit integers big-endian
 * @type {Object}
 */
module.exports.uInt48BE = {"bits": 48, "be": true};
/**
 * Double-precision floating-point numbers big-endian
 * @type {Object}
 */
module.exports.float64BE = {"bits": 64, "float": true, "be": true};
