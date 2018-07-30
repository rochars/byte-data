/*
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview Old tests. Those are the first tests for byte-data.
 * @see https://github.com/rochars/byte-data
 */

var byteData = byteData || require('../../test/loader.js');
var assert = assert || require('assert');
var uInt24 = byteData.types.uInt24;
var float32 = byteData.types.float32;
var int32 = byteData.types.int32;

describe('Emulate old browser with binary32 and binary64', function() {
    var global = global || {};
    var tmp = global.Uint8Array;
    it('pack pi as 3.1415926535897931', function() {
        global.Uint8Array = undefined;
        assert.deepEqual(
            byteData.pack(3.1415926535897931, byteData.types.float64), 
            [0x18,0x2d,0x44,0x54,0xfb,0x21,0x09,0x40]);
        global.Uint8Array = tmp;
    });
    it('unpack pi as 3.1415926535897931', function() {
        global.Uint8Array = undefined;
        assert.equal(
            byteData.unpack(
                [0x18,0x2d,0x44,0x54,0xfb,0x21,0x09,0x40],
                byteData.types.float64).toFixed(15), 
            '3.141592653589793');
        global.Uint8Array = tmp;
    });
    it('pack pi as 3.1415927410', function() {
        global.Uint8Array = undefined;
        assert.deepEqual(
            byteData.pack(3.1415927410, float32), 
            [0xdb,0x0F,0x49,0x40]);
        global.Uint8Array = tmp;
    });
    it('unpack pi as 3.1415927410', function() {
        global.Uint8Array = undefined;
        assert.equal(
            byteData.unpack([0xdb,0x0F,0x49,0x40], float32).toFixed(10), 
            '3.1415927410');
        global.Uint8Array = tmp;
    });
});


describe('interface', function() {

    // pack
    it('pack true uInt16 (1, 0)', function() {
        assert.deepEqual(
            byteData.pack(true, byteData.types.uInt16),
            [1, 0]);
    });
    it('pack false uInt16 (0, 0)', function() {
        assert.deepEqual(
            byteData.pack(false, byteData.types.uInt16),
            [0, 0]);
    });
    it('pack null uInt16 (0, 0)', function() {
        assert.deepEqual(
            byteData.pack(null, byteData.types.uInt16),
            [0, 0]);
    });
    it('pack uInt16 (65535, 16)', function() {
        assert.deepEqual(
            byteData.pack(65535, byteData.types.uInt16),
            [255,255]);
    });
    it('pack float32 (2.1474836, 16)', function() {
        assert.deepEqual(
            byteData.pack(2.1474836, byteData.types.float32),
            [95,112,9,64]);
    });
    it('pack int4 (-1)', function() {
        assert.deepEqual(byteData.pack(-1, byteData.types.int4),
            [15]);
    });
    it('pack uInt4 (15)', function() {
        assert.deepEqual(byteData.pack(15, byteData.types.uInt4),
            [15]);
    });
    it('pack uInt8 (254)', function() {
        assert.deepEqual(byteData.pack(254, byteData.types.uInt8),
            [254]);
    });
    it('pack uInt8 (255)', function() {
        assert.deepEqual(byteData.pack(255, byteData.types.uInt8),
            [255]);
    });
    it('pack int8 (-1)', function() {
        assert.deepEqual(byteData.pack(-1, byteData.types.int8),
            [255]);
    });
    it('pack int8 (-2)', function() {
        assert.deepEqual(byteData.pack(-2, byteData.types.int8),
            [254]);
    });

    // unpack
    it('unpack uInt16', function() {
        assert.deepEqual(
            byteData.unpack([255, 255], byteData.types.uInt16),
            65535);
    });
    it('unpack float16', function() {
        assert.equal(
            byteData.unpack([85, 53], byteData.types.float16).toFixed(5),
            0.33325);
    });
    it('unpack int2', function() {
        assert.equal(byteData.unpack([3], byteData.types.int2), -1);
    });
    it('unpack uInt2', function() {
        assert.equal(byteData.unpack([3], byteData.types.uInt2), 3);
    });
    it('unpack uInt16', function() {
        assert.equal(byteData.unpack(
            [255,255], byteData.types.uInt16),
            65535);
    });

    // packArray
    it('packArray uInt16', function() {
        assert.deepEqual(byteData.packArray([65535, 0], byteData.types.uInt16),
            [255, 255, 0, 0]);
    });
    it('packArray int32', function() {
        assert.deepEqual(byteData.packArray([-2147483648, 2147483647], byteData.types.int32),
            [0,0,0,128,255,255,255,127]);
    });
    it('packArray float32', function() {
        assert.deepEqual(byteData.packArray([-1, 1], byteData.types.float32),
            [0,0,128,191,0,0,128,63]);
    });

    // unpackArray
    it('unpackArray uInt16', function() {
        assert.deepEqual(byteData.unpackArray(
            [255, 255, 0, 0], byteData.types.uInt16),
            [65535, 0]);
    });
    it('unpackArray uInt2', function() {
        assert.deepEqual(
                byteData.unpackArray([3], byteData.types.uInt2),
                 [3]
             );
    });
    it('unpackArray float64', function() {
        assert.deepEqual(
                byteData.unpackArray(
                        [0,0,0,0,0,0,240,63],
                        byteData.types.float64
                    ),
                    [1]
             );
    });
});

describe('unpackArray behaviour tests', function() {
    it('Returns a empty array if not enough bytes (32-bit)', function() {
        assert.deepEqual(
            byteData.unpackArray([95,112,9], float32),
            []);
    });
    it('Ignores extra bytes for 32-bit values', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,0,128, 255,255,255,127,255,128], int32),
            [-2147483648,2147483647]);
    });
    it('Ignores extra bytes for 24-bit values',
            function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,255,255,255,255],uInt24),
            [0,16777215]);
    });
    it('Returns a empty array if not enough bytes (24-bit)', function() {
        assert.deepEqual(
            byteData.unpackArray([255,255], uInt24),
            []);
    });
});


var byteData = byteData || require('../../test/loader.js');
var testFunc;
var assert = assert || require('assert');

describe('Errors', function() {

    // pack Infinity, -Infinity as integer
    it('thows "Integer overflow" if packing Infinity as a integer', function() {
        testFunc = function() {
            byteData.pack(Infinity, byteData.types.uInt16);
        };
        assert.throws(testFunc, /Overflow/);
    });
    it('thows "Integer overflow" if packing -Infinity as a integer', function() {
        testFunc = function() {
            byteData.pack(-Infinity, byteData.types.int16);
        };
        assert.throws(testFunc, /Overflow/);
    });
    // pack NaN as integer
    it('thows error if packing NaN as a integer', function() {
        testFunc = function() {
            byteData.pack(NaN, byteData.types.uInt16);
        };
        assert.throws(testFunc, /NaN/);
    });

    // undefined
    it('thows error if packing something other than Number, Boolean or null', function() {
        testFunc = function() {
            byteData.pack({some: 'thing'}, byteData.types.uInt16);
        };
        assert.throws(testFunc, Error);
    });
    it("undefined value", function () {
        testFunc = function() {
            byteData.pack(undefined, {"bits": 8});
        };
        assert.throws(testFunc, /Undefined value./);
    });

    // Bad buffer length on unpack
    it("Bad buffer length on unpack", function () {
        testFunc = function() {
            byteData.unpack([1], {"bits": 16});
        };
        assert.throws(testFunc, /Bad buffer length./);
    });

    // integer overflow
    it("8-bit overflow, positive", function () {
        testFunc = function() {
            byteData.pack(256, {"bits": 8});
        };
        assert.throws(testFunc, /Overflow/);
    });
    it("8-bit overflow, negative", function () {
        testFunc = function() {
            byteData.pack(-1, {"bits": 8});
        };
        assert.throws(testFunc, /Overflow/);
    });
    
    // Invalid types
    it("More than 64 bits", function () {
        testFunc = function() {
            byteData.pack(2);
        };
        assert.throws(testFunc, /Undefined type./);
    });
    it("More than 64 bits", function () {
        testFunc = function() {
            byteData.pack(2, {"bits": 65});
        };
        assert.throws(testFunc, /Bad type definition./);
    });
    it("Less than 1 bit (0)", function () {
        testFunc = function() {
            byteData.pack(2, {"bits": 0});
        };
        assert.throws(testFunc, /Bad type definition./);
    });
    it("Less than 1 bit (-1)", function () {
        testFunc = function() {
            byteData.pack(2, {"bits": -1});
        };
        assert.throws(testFunc, /Bad type definition./);
    });
    it("17 float (-1)", function () {
        testFunc = function() {
            byteData.pack(2, {"bits": 17, "float": true});
        };
        assert.throws(testFunc, /Bad float type./);
    });
});
