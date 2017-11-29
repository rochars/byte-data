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

// types
module.exports.floatLE = {"float": true, "single": true};
module.exports.intLE = {"signed": true, "single": true};
module.exports.uIntLE = {"single": true};
module.exports.floatBE = {"float": true, "single": true, "be": true};
module.exports.intBE = {"signed": true, "single": true, "be": true};
module.exports.uIntBE = {"single": true, "be": true};
module.exports.char = {"char": true, "single": true};

module.exports.floatArrayLE = {"float": true};
module.exports.intArrayLE = {"signed": true};
module.exports.uIntArrayLE = {};
module.exports.floatArrayBE = {"float": true, "be": true};
module.exports.intArrayBE = {"signed": true, "be": true};
module.exports.uIntArrayBE = {"be": true};
module.exports.str = {"char": true};
