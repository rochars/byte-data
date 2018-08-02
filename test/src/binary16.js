/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview Test IEEE-754 binary16 numbers.
 * @see https://github.com/rochars/byte-data
 * @see https://en.wikipedia.org/wiki/Half-precision_floating-point_format
 */

var byteData = byteData || require('../../test/loader.js');
var assert = assert || require('assert');
var float16 = {"bits": 16, "fp": true};
var float16BE = {"bits": 16, "fp": true, "be": true};

describe('Binary16 numbers', function() {     
    // Zeros
    it('pack 0', function() {
        assert.deepEqual(
        	byteData.pack(0, float16), 
            [0,0]);
    });
    it('unpack 0', function() {
        assert.equal(
        	byteData.unpack([0,0], float16), 
            0);
    });
    it('pack -0', function() {
        assert.deepEqual(
        	byteData.pack(-0, float16), 
            [0,128]);
    });
    it('unpack -0', function() {
        assert.equal(
        	byteData.unpack([0,128], float16), 
            -0);
    });

    it('pack 1e-25', function() {
        assert.deepEqual(
            byteData.pack(1e-25, float16), 
            [0,0]);
    });
    it('unpack 0', function() {
        assert.equal(
            byteData.unpack([0,0], float16), 
            0);
    });

    // NaN
    it('pack NaN', function() {
        assert.deepEqual(
            byteData.pack(NaN, float16), 
            [0, 126]); // Python struct.pack('e', math.nan)
    });
    it('unpack NaN', function() {
        assert.ok(isNaN(byteData.unpack([0, 126], float16)));
    });

    // Infinity
    it('pack Infinity', function() {
        assert.deepEqual(
        	byteData.pack(Infinity, float16), 
            [0, 124]); // Python struct.pack('e', math.inf)
    });
    it('unpack Infinity', function() {
        assert.equal(
        	byteData.unpack([0, 124], float16), 
            Infinity);
    });
    it('pack -Infinity', function() {
        assert.deepEqual(
        	byteData.pack(-Infinity, float16), 
            [0x00, 0xfc]); // Python struct.pack('e', -math.inf)
    });
    it('unpack -Infinity', function() {
        assert.equal(
        	byteData.unpack([0x00, 0xfc], float16), 
            -Infinity);
    });
    // Python throws a error on overlow
    // the spec says to round to Infinity
    it('round 65520 to Infinity when packing', function() {
        assert.deepEqual(
            byteData.pack(65520, float16), 
            [0, 124]);
    });
    it('round 65520+ to Infinity when packing', function() {
        assert.deepEqual(
            byteData.pack(65521, float16), 
            [0, 124]);
    });

    // Pi
    it('pack pi as 3.14159', function() {
        assert.deepEqual(byteData.pack(3.14159, float16), 
            [0x48,0x42]); // Python struct.pack('e', 3.14159)
    });
    it('unpack pi as 3.140625', function() {
        // Use toFixed(6) here to avoid JS rounding differences with Python.
        // Python struct.pack is used to check the data in most of the tests
        assert.equal(byteData.unpack([0x48,0x42], float16).toFixed(6), 
            '3.140625');
    });
    
    // Exact representations
    // Integers in [-16777216, 16777216] can be exactly represented
    // Test 1, MIN, MAX
    it('pack 1', function() {
        assert.deepEqual(
        	byteData.pack(1, float16), 
            [0x00,0x3c]);
    });
    it('unpack 1', function() {
        assert.equal(
        	byteData.unpack([0x00,0x3c], float16), 
            1);
    });
    it('pack -2048 (min exact)', function() {
        assert.deepEqual(
        	byteData.pack(-2048, float16), 
            [0x00,0xe8]);
    });
    it('unpack -2048 (min exact)', function() {
        assert.equal(
        	byteData.unpack([0x00,0xe8], float16), 
            -2048);
    });
    it('pack 2048 (max exact)', function() {
        assert.deepEqual(
        	byteData.pack(2048, float16), 
            [0x00,0x68]);
    });
    it('unpack 2048 (max exact)', function() {
        assert.equal(
        	byteData.unpack([0x00,0x68], float16), 
            2048);
    });
    
    // Rounding
    // Integers between 2048 and 4096 round to a multiple of 2 (even number)
    it('pack 2049 like it pack 2048', function() {
        assert.deepEqual(
            byteData.pack(2049, float16), 
            [0x00,0x68]);
    });
    it('pack 2050', function() {
        assert.deepEqual(
            byteData.pack(2050, float16), 
            [0x01,0x68]);
    });
    it('unpack 2050', function() {
        assert.deepEqual(
            byteData.unpack([0x01,0x68], float16), 
            2050);
    });
    it('pack 2051 like it pack 2050', function() {
        assert.deepEqual(
            byteData.pack(2051, float16), 
            [0x01,0x68]);
    });

    // Random values
    it('pack 1/3', function() {
        assert.deepEqual(
            byteData.pack(0.33325, float16),
            [85,53]);
    });
    it('pack -2', function() {
        assert.deepEqual(
            byteData.pack(-2, float16),
            [0, 192]);
    });
    it('pack 65504', function() {
        assert.deepEqual(
            byteData.pack(100, byteData.types.float16),
            [64, 86]);
    });
    it('pack 65504', function() {
        assert.deepEqual(
            byteData.pack(500, byteData.types.float16),
            [208, 95]);
    });
    it('pack 65504', function() {
        assert.deepEqual(
            byteData.pack(1000, byteData.types.float16),
            [208, 99]);
    });
    it('pack 65504', function() {
        assert.deepEqual(
            byteData.pack(10000, byteData.types.float16),
            [226, 112]);
    });
    it('pack 65504', function() {
        assert.deepEqual(
            byteData.pack(30000, byteData.types.float16),
            [83, 119]);
    });
    it('pack 65504', function() {
        assert.deepEqual(
            byteData.pack(40000, byteData.types.float16),
            [226, 120]);
    });
    it('pack 65504', function() {
        assert.deepEqual(
            byteData.pack(65504, byteData.types.float16),
            [255, 123]);
    });

    // unpackArray, random values
    it('unpackArray 0', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0], float16),
            [0]);
    });
    it('unpackArray 0', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0], float16),
            [0]);
    });
    it('unpackArray 0', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0], float16),
            [0]);
    });    
    it('unpackArray 0', function() {
        assert.deepEqual(
            byteData.unpackArray([0,192], float16),
            [-2]);
    });
    it('unpackArray 1', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 60], float16),
            [1]);
    });
    it('unpackArray 1/3', function() {
        assert.deepEqual(
            byteData.unpackArray([85, 53], float16)[0].toFixed(5),
            '0.33325');
    });
    it('unpackArray 0.00006', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 4], float16)[0].toFixed(5),
            '0.00006');
    });
    it('unpackArray 65504', function() {
        assert.deepEqual(
            byteData.unpackArray([64, 86], float16)[0],
            100);
    });
    it('unpackArray 65504', function() {
        assert.deepEqual(
            byteData.unpackArray([208, 95], float16)[0],
            500);
    });
    it('unpackArray 65504', function() {
        assert.deepEqual(
            byteData.unpackArray([208, 99], float16)[0],
            1000);
    });
    it('unpackArray 65504', function() {
        assert.deepEqual(
            byteData.unpackArray([226, 112], float16)[0],
            10000);
    });
    it('unpackArray 65504', function() {
        assert.deepEqual(
            byteData.unpackArray([83, 119], float16)[0],
            30000);
    });
    it('unpackArray 65504', function() {
        assert.deepEqual(
            byteData.unpackArray([226, 120], float16)[0],
            40000);
    });
    it('unpackArray 65504', function() {
        assert.deepEqual(
            byteData.unpackArray([255, 123], float16)[0],
            65504);
    });
    it('unpackArray [65504, 0.33325]', function() {
        var halfs = byteData.unpackArray(
            [208, 95, 85, 53], float16);
        assert.equal(halfs[0], 500);
    });
    it('unpackArray [65504, 0.33325]', function() {
        var halfs = byteData.unpackArray(
            [208, 95, 85, 53], float16);
        assert.equal(halfs[1].toFixed(5), '0.33325');
    });
    it('unpackArray 65504', function() {
        var halfs = byteData.unpackArray([255, 123], float16);
        assert.equal(halfs[0], 65504);
    });
    it('unpackArray [65504, 0.33325, extra byte]', function() {
        var halfs = byteData.unpackArray(
            [255, 123, 85, 53,128], float16);
        assert.equal(halfs[1].toFixed(5), '0.33325');
    });
    it('unpackArray [65504, 0.33325, extra byte]', function() {
        var halfs = byteData.unpackArray(
            [255, 123, 85, 53,128], float16);
        assert.equal(halfs[0], 65504);
    });

    // big endian
    it('unpackArray 1/3 BE', function() {
        assert.deepEqual(
            byteData.unpackArray([53, 85], float16BE)[0].toFixed(5),
            '0.33325');
    });
});
