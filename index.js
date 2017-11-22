/*!
 * byte-data
 * Readable data to and from bytes.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

let toBytes = require('./src/to-bytes');
let fromBytes = require('./src/from-bytes');
let bitPacker = require('./src/bit-packer');
let writer = require('./src/write-bytes');
let reader = require('./src/read-bytes');

/**
 * Find and return the start offset of some string.
 * @param {!Array<number>|Uint8Array} bytes Array of bytes.
 * @param {string} chunk Some string to look for.
 * @return {number} The start offset of the first occurrence found.
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

module.exports.packBooleans = bitPacker.packBooleans;
module.exports.unpackBooleans = bitPacker.unpackBooleans;
module.exports.packCrumbs = bitPacker.packCrumbs;
module.exports.unpackCrumbs = bitPacker.unpackCrumbs;
module.exports.packNibbles = bitPacker.packNibbles;
module.exports.unpackNibbles = bitPacker.unpackNibbles;

module.exports.findString = findString;

module.exports.toBytes = toBytes.toBytes;
module.exports.fromBytes = fromBytes.fromBytes;
