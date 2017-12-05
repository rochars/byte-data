/*!
 * byte-data
 * Readable data to and from byte buffers.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let toBytes = require("./src/to-bytes");
let fromBytes = require("./src/from-bytes");
let bitPacker = require("./src/bit-packer");
let api = require("./src/api");
let Type = require("./src/type");

// interface
module.exports.pack = api.pack;
module.exports.findString = api.findString;
module.exports.unpack = api.unpack;
module.exports.packArray = api.packArray;
module.exports.unpackArray = api.unpackArray;
module.exports.unpackStruct = api.unpackStruct;
module.exports.packStruct = api.packStruct;

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

// old API
module.exports.toBytes = toBytes.toBytes;
module.exports.fromBytes = fromBytes.fromBytes;
module.exports.packBooleans = bitPacker.packBooleans;
module.exports.unpackBooleans = bitPacker.unpackBooleans;
module.exports.packCrumbs = bitPacker.packCrumbs;
module.exports.unpackCrumbs = bitPacker.unpackCrumbs;
module.exports.packNibbles = bitPacker.packNibbles;
module.exports.unpackNibbles = bitPacker.unpackNibbles;
