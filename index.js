/*!
 * byte-data
 * Readable data to and from byte buffers.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

const rw = require("./src/read-write");
const helpers = require("./src/helpers");
let Type = require("./src/type");

/**
 * Turn a number or string into a byte buffer.
 * @param {number|string} value The value.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the output. Optional. Default is 10.
 * @return {!Array<number>|!Array<string>}
 */
function packValue(value, type, base=10) {
    let theType = helpers.getType(type, base, true);
    value = theType.char ? value.slice(0, type.bits / 8) : value;
    return rw.toBytes(helpers.turnToArray(value), theType);
}

/**
 * Turn a byte buffer into a readable value.
 * @param {!Array<number>|!Array<string>|Uint8Array} buffer An array of bytes.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the input. Optional. Default is 10.
 * @return {number|string}
 */
function unpackValue(buffer, type, base=10) {
    return rw.fromBytes(buffer, helpers.getType(type, base, true));
}

/**
 * Turn a array of numbers into a byte buffer.
 * @param {!Array<number>|string} values The values.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the output. Optional. Default is 10.
 * @return {!Array<number>|!Array<string>}
 */
function packArray(values, type, base=10) {
    return rw.toBytes(values, helpers.getType(type, base, false));
}

/**
 * Turn a byte array into a sequence of readable values.
 * @param {!Array<number>|!Array<string>|Uint8Array} buffer The byte array.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the input. Optional. Default is 10.
 * @return {!Array<number>|string}
 */
function unpackArray(buffer, type, base=10) {
    return rw.fromBytes(buffer, helpers.getType(type, base, false));
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
        found = unpackValue(
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
        bytes = bytes.concat(packValue(struct[i], def[i], base));
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
                unpackValue(buffer.slice(j, j + bits), def[i], base)
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

// interface
module.exports.pack = packValue;
module.exports.unpack = unpackValue;
module.exports.packArray = packArray;
module.exports.unpackArray = unpackArray;
module.exports.unpackStruct = unpackStruct;
module.exports.packStruct = packStruct;
module.exports.findString = findString;
module.exports.Type = Type;

// types
module.exports.chr = new Type({"bits": 8, "char": true});
module.exports.fourCC = new Type({"bits": 32, "char": true});
module.exports.bool = new Type({"bits": 1});
module.exports.int2 = new Type({"bits": 2, "signed": true});
module.exports.uInt2 = new Type({"bits": 2});
module.exports.int4 = new Type({"bits": 4, "signed": true});
module.exports.uInt4 = new Type({"bits": 4});
module.exports.int8 = new Type({"bits": 8, "signed": true});
module.exports.uInt8 = new Type({"bits": 8});
// LE
module.exports.int16  = new Type({"bits": 16, "signed": true});
module.exports.uInt16 = new Type({"bits": 16});
module.exports.float16 = new Type({"bits": 16, "float": true});
module.exports.int24 = new Type({"bits": 24, "signed": true});
module.exports.uInt24 = new Type({"bits": 24});
module.exports.int32 = new Type({"bits": 32, "signed": true});
module.exports.uInt32 = new Type({"bits": 32});
module.exports.float32 = new Type({"bits": 32, "float": true});
module.exports.int40 = new Type({"bits": 40, "signed": true});
module.exports.uInt40 = new Type({"bits": 40});
module.exports.int48 = new Type({"bits": 48, "signed": true});
module.exports.uInt48 = new Type({"bits": 48});
module.exports.float64 = new Type({"bits": 64, "float": true});
// BE
module.exports.int16BE  = new Type({"bits": 16, "signed": true, "be": true});
module.exports.uInt16BE = new Type({"bits": 16, "be": true});
module.exports.float16BE = new Type({"bits": 16, "float": true, "be": true});
module.exports.int24BE = new Type({"bits": 24, "signed": true, "be": true});
module.exports.uInt24BE = new Type({"bits": 24, "be": true});
module.exports.int32BE = new Type({"bits": 32, "signed": true, "be": true});
module.exports.uInt32BE = new Type({"bits": 32, "be": true});
module.exports.float32BE = new Type({"bits": 32, "float": true, "be": true});
module.exports.int40BE = new Type({"bits": 40, "signed": true, "be": true});
module.exports.uInt40BE = new Type({"bits": 40, "be": true});
module.exports.int48BE = new Type({"bits": 48, "signed": true, "be": true});
module.exports.uInt48BE = new Type({"bits": 48, "be": true});
module.exports.float64BE = new Type({"bits": 64, "float": true, "be": true});
