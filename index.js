/*!
 * byte-data
 * Bytes to and from numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

let toBytes = require('./src/to-bytes');
let fromBytes = require('./src/from-bytes');

/**
 * Find and return the start offset of some string.
 * @param {!Array<number>|Uint8Array} bytes Array of bytes.
 * @param {string} chunk Some string to look for.
 * @return {number} The start offset of the first occurrence found.
 */
function findString(bytes, chunk) {
    let found = "";
    for (let i = 0; i < bytes.length; i++) {
        found = fromBytes.stringFromBytes(bytes.slice(i, i + chunk.length));
        if (found == chunk) {
            return i;
        }
    }
    return -1;
}

/**
 * Pack 2 nibbles in 1 byte.
 * @param {!Array<number>} nibbles Array of nibbles.
 * @return {!Array<number>} Pairs of neebles packed as one byte.
 */
function packNibbles(nibbles) {
    let packed = [];
    let i = 0;
    let j = 0;
    let len = nibbles.length;
    while (i < len) {
        packed[j++] = parseInt(
            nibbles[i].toString(16) + nibbles[i+1].toString(16), 16);
        i+=2;
    }
    return packed;
}

/**
 * Unpack a byte into 2 nibbles.
 * @param {!Array<number>|Uint8Array} bytes Array of bytes.
 * @return {!Array<number>} The nibbles.
 */
function unpackNibbles(bytes) {
    let unpacked = [];
    let i = 0;
    let j = 0;
    let len = bytes.length;
    while (i < len) {
        unpacked[j++] = parseInt(bytes[i].toString(16)[0], 16);
        unpacked[j++] = parseInt(bytes[i].toString(16)[1], 16);
        i++;
    }
    return unpacked;
}

module.exports.packNibbles = packNibbles;
module.exports.unpackNibbles = unpackNibbles;

module.exports.findString = findString;
module.exports.stringToBytes = toBytes.stringToBytes;
module.exports.stringFromBytes = fromBytes.stringFromBytes;

module.exports.doubleTo8Bytes = toBytes.floatTo8Bytes;
module.exports.floatTo8Bytes = toBytes.floatTo8Bytes;
module.exports.floatTo4Bytes = toBytes.floatTo4Bytes;
module.exports.intTo6Bytes = toBytes.intTo6Bytes;
module.exports.intTo5Bytes = toBytes.intTo5Bytes;
module.exports.intTo4Bytes = toBytes.intTo4Bytes;
module.exports.intTo3Bytes = toBytes.intTo3Bytes;
module.exports.intTo2Bytes = toBytes.intTo2Bytes;
module.exports.intTo1Byte = toBytes.intTo1Byte;
module.exports.intToNibble = toBytes.intToNibble;
module.exports.toBoolean = toBytes.toBoolean;

module.exports.floatFrom8Bytes = fromBytes.floatFrom8Bytes;
module.exports.doubleFrom8Bytes = fromBytes.floatFrom8Bytes;
module.exports.intFrom4Bytes = fromBytes.intFrom4Bytes;
module.exports.uIntFrom4Bytes = fromBytes.uIntFrom4Bytes;
module.exports.floatFrom4Bytes = fromBytes.floatFrom4Bytes;
module.exports.intFrom3Bytes = fromBytes.intFrom3Bytes;
module.exports.uIntFrom3Bytes = fromBytes.uIntFrom3Bytes;
module.exports.intFrom2Bytes = fromBytes.intFrom2Bytes;
module.exports.uIntFrom2Bytes = fromBytes.uIntFrom2Bytes;
module.exports.intFrom1Byte = fromBytes.intFrom1Byte;
module.exports.uIntFrom1Byte = fromBytes.uIntFrom1Byte;
module.exports.intFromNibble = fromBytes.intFromNibble;
module.exports.uIntFromNibble = fromBytes.uIntFromNibble;
module.exports.fromBoolean = fromBytes.fromBoolean;
