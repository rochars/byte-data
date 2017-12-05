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

// interface
module.exports.pack = api.pack;
module.exports.findString = api.findString;
module.exports.unpack = api.unpack;
module.exports.packArray = api.packArray;
module.exports.unpackArray = api.unpackArray;
module.exports.unpackStruct = api.unpackStruct;
module.exports.packStruct = api.packStruct;

// types: LE
module.exports.chr = {"bits": 8, "char": true, "single": true};
module.exports.fourCC = {"bits": 32, "char": true, "single": true};
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

// types: BE
module.exports.int16BE  = {
    "bits": 16, "signed": true, "single": true, "be": true};
module.exports.uInt16BE = {
    "bits": 16, "single": true, "be": true};
module.exports.float16BE = {
    "bits": 16, "float": true, "single": true, "be": true};
module.exports.int24BE = {
    "bits": 24, "signed": true, "single": true, "be": true};
module.exports.uInt24BE = {
    "bits": 24, "single": true, "be": true};
module.exports.int32BE = {
    "bits": 32, "signed": true, "single": true, "be": true};
module.exports.uInt32BE = {
    "bits": 32, "single": true, "be": true};
module.exports.float32BE = {
    "bits": 32, "float": true, "single": true, "be": true};
module.exports.int40BE = {
    "bits": 40, "signed": true, "single": true, "be": true};
module.exports.uInt40BE = {
    "bits": 40, "single": true, "be": true};
module.exports.int48BE = {
    "bits": 48, "signed": true, "single": true, "be": true};
module.exports.uInt48BE = {
    "bits": 48, "single": true, "be": true};
module.exports.float64BE = {
    "bits": 64, "float": true, "single": true, "be": true};

module.exports.toBytes = toBytes.toBytes;
module.exports.fromBytes = fromBytes.fromBytes;
module.exports.packBooleans = bitPacker.packBooleans;
module.exports.unpackBooleans = bitPacker.unpackBooleans;
module.exports.packCrumbs = bitPacker.packCrumbs;
module.exports.unpackCrumbs = bitPacker.unpackCrumbs;
module.exports.packNibbles = bitPacker.packNibbles;
module.exports.unpackNibbles = bitPacker.unpackNibbles;
