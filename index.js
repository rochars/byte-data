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
