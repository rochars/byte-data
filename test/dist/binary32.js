/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview Test IEEE-754 binary32 numbers.
 * @see https://github.com/rochars/byte-data
 * @see https://en.wikipedia.org/wiki/Single-precision_floating-point_format
 */

var byteData = byteData || require('../../test/loader.js');
var assert = assert || require('assert');
var float32 = byteData.types.float32;

describe('Binary32 numbers', function() {     
    // Zeros
    it('pack 0', function() {
        assert.deepEqual(
        	byteData.pack(0, float32), 
            [0,0,0,0]);
    });
    it('unpack 0', function() {
        assert.equal(
        	byteData.unpack([0,0,0,0], float32), 
            0);
    });
    it('pack -0', function() {
        assert.deepEqual(
        	byteData.pack(-0, float32), 
            [0,0,0,128]);
    });
    it('unpack -0', function() {
        assert.equal(
        	byteData.unpack([0,0,0,128], float32), 
            -0);
    });

    // NaN
    it('pack NaN', function() {
        assert.deepEqual(
        	byteData.pack(NaN, float32), 
            [0,0,192,127]); // 0 0 0xc0 0x7f
    });
    it('unpack NaN', function() {
        assert.ok(isNaN(byteData.unpack([0,0,192,127], float32)));
    });

    // Infinity
    it('pack Infinity', function() {
        assert.deepEqual(
        	byteData.pack(Infinity, float32), 
            [0x00,0x00,0x80,0x7f]); // 0x80 0xff 128 127
    });
    it('unpack Infinity', function() {
        assert.equal(
        	byteData.unpack([0x00,0x00,0x80,0x7f], float32), 
            Infinity); // 0x80 0xff 128 127
    });
    it('pack -Infinity', function() {
        assert.deepEqual(
        	byteData.pack(-Infinity, float32), 
            [0x00,0x00,0x80,0xff]); // 0x80 0xff 128 255
    });
    it('unpack -Infinity', function() {
        assert.equal(
        	byteData.unpack([0x00,0x00,0x80,0xff], float32), 
            -Infinity); // 0x80 0xff 128 255
    });

    // Pi
    it('pack pi as 3.1415927410', function() {
        assert.deepEqual(byteData.pack(3.1415927410, float32), 
            [0xdb,0x0F,0x49,0x40]);
    });
    it('unpack pi as 3.1415927410', function() {
        assert.equal(byteData.unpack([0xdb,0x0F,0x49,0x40], float32).toFixed(10), 
            '3.1415927410');
    });

    // Exact representations
    // Integers in [-16777216, 16777216] can be exactly represented
    // Test 1, MIN, MAX
    it('pack 1', function() {
        assert.deepEqual(
        	byteData.pack(1, float32), 
            [0x00,0x00,0x80,0x3f]);
    });
    it('unpack 1', function() {
        assert.equal(
        	byteData.unpack([0x00,0x00,0x80,0x3f], float32), 
            1);
    });
    it('pack -16777216 (min exact)', function() {
        assert.deepEqual(
        	byteData.pack(-16777216, float32), 
            [0x00,0x00,0x80,0xcb]);
    });
    it('unpack -16777216 (min exact)', function() {
        assert.equal(
        	byteData.unpack([0x00,0x00,0x80,0xcb], float32), 
            -16777216);
    });
    it('pack 16777216 (max exact)', function() {
        assert.deepEqual(
        	byteData.pack(16777216, float32), 
            [0x00,0x00,0x80,0x4b]);
    });
    it('unpack 16777216 (max exact)', function() {
        assert.equal(
        	byteData.unpack([0x00,0x00,0x80,0x4b], float32), 
            16777216);
    });

    // Rounding
    // Integers in [-33554432, -16777217 ]  [16777217, 33554432]
    // round to a multiple of 2

    // Random values
    it('unpacks 0.000000001', function() {
        assert.deepEqual(
        	byteData.unpack([0x5f,0x70,0x89,0x30], float32).toFixed(9), 
            '0.000000001');
    });
    it('unpacks -0.000000001', function() {
        assert.equal(
        	byteData.unpack([0x5f,0x70,0x89,0xb0], float32).toFixed(9), 
            '-0.000000001');
    });
});
