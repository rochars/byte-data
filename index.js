/*!
 * byte-data
 * Bytes to and from numbers and strings.
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
        found = fromBytes.stringFromBytes(bytes.slice(i, i + chunk.length));
        if (found == chunk) {
            return i;
        }
    }
    return -1;
}

const writers = {
    '8': writer.write8Bit,
    '16': writer.write16Bit,
    '24': writer.write24Bit,
    '32': writer.write32Bit,
    '32f': writer.write32BitFloat,
    '40': writer.write40Bit,
    '48': writer.write48Bit,
    '64': writer.write64BitFloat
};

const readers = {
    '8': reader.read8Bit,
    '16': reader.read16Bit,
    '24': reader.read24Bit,
    '32': reader.read32Bit,
    '32f': reader.read32BitFloat,
    '40': reader.read40Bit,
    '48': reader.read48Bit,
    '64': reader.read64BitFloat
};

module.exports.packBooleans = bitPacker.packBooleans;
module.exports.unpackBooleans = bitPacker.unpackBooleans;
module.exports.packCrumbs = bitPacker.packCrumbs;
module.exports.unpackCrumbs = bitPacker.unpackCrumbs;
module.exports.packNibbles = bitPacker.packNibbles;
module.exports.unpackNibbles = bitPacker.unpackNibbles;

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
module.exports.floatTo2Bytes = toBytes.floatTo2Bytes;
module.exports.intTo1Byte = toBytes.intTo1Byte;
module.exports.intToNibble = toBytes.intToNibble;
module.exports.toCrumb = toBytes.toCrumb;
module.exports.toBoolean = toBytes.toBoolean;

module.exports.floatFrom8Bytes = fromBytes.floatFrom8Bytes;
module.exports.doubleFrom8Bytes = fromBytes.floatFrom8Bytes;
module.exports.intFrom6Bytes = fromBytes.intFrom6Bytes;
module.exports.uIntFrom6Bytes = fromBytes.uIntFrom6Bytes;
module.exports.intFrom5Bytes = fromBytes.intFrom5Bytes;
module.exports.uIntFrom5Bytes = fromBytes.uIntFrom5Bytes;
module.exports.intFrom4Bytes = fromBytes.intFrom4Bytes;
module.exports.uIntFrom4Bytes = fromBytes.uIntFrom4Bytes;
module.exports.floatFrom4Bytes = fromBytes.floatFrom4Bytes;
module.exports.intFrom3Bytes = fromBytes.intFrom3Bytes;
module.exports.uIntFrom3Bytes = fromBytes.uIntFrom3Bytes;
module.exports.floatFrom2Bytes = fromBytes.floatFrom2Bytes;
module.exports.intFrom2Bytes = fromBytes.intFrom2Bytes;
module.exports.uIntFrom2Bytes = fromBytes.uIntFrom2Bytes;
module.exports.intFrom1Byte = fromBytes.intFrom1Byte;
module.exports.uIntFrom1Byte = fromBytes.uIntFrom1Byte;
module.exports.intFromNibble = fromBytes.intFromNibble;
module.exports.uIntFromNibble = fromBytes.uIntFromNibble;
module.exports.intFromCrumb = fromBytes.intFromCrumb;
module.exports.uIntFromCrumb = fromBytes.uIntFromCrumb;
module.exports.fromBoolean = fromBytes.fromBoolean;
