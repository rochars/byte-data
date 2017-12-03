/*!
 * byte-data
 * Readable data to and from byte buffers.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let toBytes = require('./src/to-bytes');
let fromBytes = require('./src/from-bytes');
let bitPacker = require('./src/bit-packer');
let bitDepth = require('./src/bit-depth');

/**
 * Find and return the start index of some string.
 * Return -1 if the string is not found.
 * @param {!Array<number>|Uint8Array} bytes Array of bytes.
 * @param {string} chunk Some string to look for.
 * @return {number} The start index of the first occurrence, -1 if not found
 */
function findString(bytes, chunk) {
    let found = "";
    for (let i = 0; i < bytes.length; i++) {
        found = fromBytes.fromBytes(bytes.slice(i, i + chunk.length),
            8, {"char": true});
        if (found == chunk) {
            return i;
        }
    }
    return -1;
}

/**
 * Turn a number or string into a byte buffer.
 * @param {number|string} value The value.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the input. Optional. Default is 10.
 * @return {!Array<number>|!Array<string>}
 */
function pack(value, type, base=10) {
    let theType = Object.assign({}, type);
    theType.base = base;
    theType.single = true;
    value = theType.char ? value[0] : value;
    return toBytes.toBytes(value, theType.bits, theType);
}

/**
 * Turn a byte buffer into a readable value.
 * @param {!Array<number>|!Array<string>|Uint8Array} buffer An array of bytes.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the input. Optional. Default is 10.
 * @return {number|string}
 */
function unpack(buffer, type, base=10) {
    let theType = Object.assign({}, type);
    theType.base = base;
    theType.single = true;
    return fromBytes.fromBytes(buffer, theType.bits, theType);
}

/**
 * Turn a array of numbers into a byte buffer.
 * @param {!Array<number>} values The values.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the input. Optional. Default is 10.
 * @return {!Array<number>|!Array<string>}
 */
function packArray(values, type, base=10) {
    let theType = Object.assign({}, type);
    theType.base = base;
    theType.single = false;
    return toBytes.toBytes(values, theType.bits, theType);
}

/**
 * Turn a byte array into a sequence of readable values.
 * @param {!Array<number>|!Array<string>|Uint8Array} buffer The byte array.
 * @param {Object} type One of the available types.
 * @param {number} base The base of the input. Optional. Default is 10.
 * @return {!Array<number>|string}
 */
function unpackArray(buffer, type, base=10) {
    let theType = Object.assign({}, type);
    theType.base = base;
    theType.single = false;
    return fromBytes.fromBytes(buffer, theType.bits, theType);
}

// interface
module.exports.pack = pack;
module.exports.unpack = unpack;
module.exports.packArray = packArray;
module.exports.unpackArray = unpackArray;

// types
module.exports.chr = {"bits": 8, "char": true, "single": true};
module.exports.bool = {"bits": 1, "single": true};
module.exports.int2 = {"bits": 2, "signed": true, "single": true};
module.exports.uInt2 = {"bits": 2, "single": true};
module.exports.int4 = {"bits": 4, "signed": true, "single": true};
module.exports.uInt4 = {"bits": 4, "single": true};
module.exports.int8 = {"bits": 8, "signed": true, "single": true};
module.exports.uInt8 = {"bits": 8, "single": true};
module.exports.int16  = {"bits": 16, "signed": true, "single": true};
module.exports.uInt16 = {"bits": 16, "single": true};
module.exports.float16 = {"bits": 16, "float": true, "single": true};
module.exports.int24 = {"bits": 24, "signed": true, "single": true};
module.exports.uInt24 = {"bits": 24, "single": true};
module.exports.int32 = {"bits": 32, "signed": true, "single": true};
module.exports.uInt32 = {"bits": 32, "single": true};
module.exports.float32 = {"bits": 32, "float": true, "single": true};
module.exports.int40 = {"bits": 40, "signed": true, "single": true};
module.exports.uInt40 = {"bits": 40, "single": true};
module.exports.int48 = {"bits": 48, "signed": true, "single": true};
module.exports.uInt48 = {"bits": 48, "single": true};
module.exports.float64 = {"bits": 64, "float": true, "single": true};

module.exports.findString = findString;
module.exports.toBytes = toBytes.toBytes;
module.exports.fromBytes = fromBytes.fromBytes;
module.exports.packBooleans = bitPacker.packBooleans;
module.exports.unpackBooleans = bitPacker.unpackBooleans;
module.exports.packCrumbs = bitPacker.packCrumbs;
module.exports.unpackCrumbs = bitPacker.unpackCrumbs;
module.exports.packNibbles = bitPacker.packNibbles;
module.exports.unpackNibbles = bitPacker.unpackNibbles;
module.exports.BitDepthOffsets = bitDepth.BitDepthOffsets;
module.exports.BitDepthMaxValues = bitDepth.BitDepthMaxValues;
