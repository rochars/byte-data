/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview Test IEEE-754 binary16 numbers.
 * @see https://github.com/rochars/byte-data
 * @see https://en.wikipedia.org/wiki/Double-precision_floating-point_format
 */

var byteData = byteData || require('../../test/loader.js');
var assert = assert || require('assert');
var float64 = byteData.types.float64;

describe('Binary64 numbers', function() {     
    // Zeros
    it('pack 0', function() {
        assert.deepEqual(
        	byteData.pack(0, float64), 
            [0,0,0,0,0,0,0,0]);
    });
    it('unpack 0', function() {
        assert.equal(
        	byteData.unpack([0,0,0,0,0,0,0,0], float64), 
            0);
    });
    it('pack -0', function() {
        assert.deepEqual(
        	byteData.pack(-0, float64), 
            [0,0,0,0,0,0,0,128]);
    });
    it('unpack -0', function() {
        assert.equal(
        	byteData.unpack([0,0,0,0,0,0,0,128], float64), 
            -0);
    });
    
    // NaN
    it('pack NaN', function() {
        assert.deepEqual(
            byteData.pack(NaN, float64), 
            [0x00,0x00,0x00,0x00,0x00,0x00,0xf8,0x7f]);
    });
    it('unpack NaN (quiet)', function() {
        assert.ok(isNaN(byteData.unpack(
            [0x00,0x00,0x00,0x00,0x00,0x00,0xf8,0x7f], float64)));
    });
    it('unpack NaN (signaling)', function() {
        assert.ok(isNaN(byteData.unpack(
            [0xff,0xff,0xff,0xff,0xff,0xff,0xff,0x7f], float64)));
    });

    // Infinity
    it('pack Infinity', function() {
        // Python struct.pack('d', math.inf)
        assert.deepEqual(
        	byteData.pack(Infinity, float64), 
            [0x00,0x00,0x00,0x00,0x00,0x00,0xf0,0x7f]);
    });
    it('unpack Infinity', function() {
        assert.equal(
        	byteData.unpack([0x00,0x00,0x00,0x00,0x00,0x00,0xf0,0x7f], float64), 
            Infinity);
    });
    it('pack -Infinity', function() {
        // Python struct.pack('d', -math.inf)
        assert.deepEqual(
        	byteData.pack(-Infinity, float64), 
            [0x00,0x00,0x00,0x00,0x00,0x00,0xf0,0xff]);
    });
    it('unpack -Infinity', function() {
        assert.equal(
        	byteData.unpack([0x00,0x00,0x00,0x00,0x00,0x00,0xf0,0xff], float64), 
            -Infinity);
    });
    
    // Pi
    it('pack pi as 3.1415926535897931', function() {
        assert.deepEqual(
            byteData.pack(3.1415926535897931, float64), 
            [0x18,0x2d,0x44,0x54,0xfb,0x21,0x09,0x40]);
    });
    it('unpack pi as 3.1415926535897931', function() {
        assert.equal(
            byteData.unpack([0x18,0x2d,0x44,0x54,0xfb,0x21,0x09,0x40], float64).toFixed(16), 
            '3.1415926535897931');
    });
    
    /*
    // Exact representations
    // Integers in [-16777216, 16777216] can be exactly represented
    // Test 1, MIN, MAX
    it('pack 1', function() {
        assert.deepEqual(
        	byteData.pack(1, float64), 
            [0x00,0x3c]);
    });
    it('unpack 1', function() {
        assert.equal(
        	byteData.unpack([0x00,0x3c], float64), 
            1);
    });
    it('pack -2048 (min exact)', function() {
        assert.deepEqual(
        	byteData.pack(-2048, float64), 
            [0x00,0xe8]);
    });
    it('unpack -2048 (min exact)', function() {
        assert.equal(
        	byteData.unpack([0x00,0xe8], float64), 
            -2048);
    });
    it('pack 2048 (max exact)', function() {
        assert.deepEqual(
        	byteData.pack(2048, float64), 
            [0x00,0x68]);
    });
    it('unpack 2048 (max exact)', function() {
        assert.equal(
        	byteData.unpack([0x00,0x68], float64), 
            2048);
    });
    
    // Rounding
    // Integers between 2048 and 4096 round to a multiple of 2 (even number)
    // Python rounds down; byte-data rounds up
    it('pack 2049 like it pack 2048', function() {
        assert.deepEqual(
            byteData.pack(2049, float64), 
            [0x00,0x68]);
    });
    it('pack 2050', function() {
        assert.deepEqual(
            byteData.pack(2050, float64), 
            [0x01,0x68]);
    });
    it('unpack 2050', function() {
        assert.deepEqual(
            byteData.unpack([0x01,0x68], float64), 
            2050);
    });
    it('pack 2051 like it pack 2050', function() {
        assert.deepEqual(
            byteData.pack(2051, float64), 
            [0x01,0x68]);
    });
    */
    /*
    // Random values
    it('unpacks 0.000000001', function() {
        assert.deepEqual(
        	byteData.unpack([0x5f,0x70,0x89,0x30], float64).toFixed(9), 
            '0.000000001');
    });
    it('unpacks -0.000000001', function() {
        assert.equal(
        	byteData.unpack([0x5f,0x70,0x89,0xb0], float64).toFixed(9), 
            '-0.000000001');
    });
    */
});
