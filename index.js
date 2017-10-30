/*!
 * byte-data
 * Bytes to and from numbers and strings.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 * 
 */

// TODO: 48-bit

let toBytes = require('./src/to-bytes');
let fromBytes = require('./src/from-bytes');

module.exports.floatTo8Bytes = toBytes.floatTo8Bytes;
module.exports.floatTo4Bytes = toBytes.floatTo4Bytes;
module.exports.intTo4Bytes = toBytes.intTo4Bytes;
module.exports.intTo3Bytes = toBytes.intTo3Bytes;
module.exports.intTo2Bytes = toBytes.intTo2Bytes;
module.exports.intTo1Byte = toBytes.intTo1Byte;
module.exports.stringToBytes = toBytes.stringToBytes;

module.exports.intFrom1Byte = fromBytes.intFrom1Byte;
module.exports.uIntFrom1Byte = fromBytes.uIntFrom1Byte;
module.exports.intFrom2Bytes = fromBytes.intFrom2Bytes;
module.exports.uIntFrom2Bytes = fromBytes.uIntFrom2Bytes;
module.exports.intFrom3Bytes = fromBytes.intFrom3Bytes;
module.exports.uIntFrom3Bytes = fromBytes.uIntFrom3Bytes;
module.exports.intFrom4Bytes = fromBytes.intFrom4Bytes;
module.exports.uIntFrom4Bytes = fromBytes.uIntFrom4Bytes;
module.exports.floatFrom4Bytes = fromBytes.floatFrom4Bytes;
module.exports.floatFrom8Bytes = fromBytes.floatFrom8Bytes;
module.exports.stringFromBytes = fromBytes.stringFromBytes;
