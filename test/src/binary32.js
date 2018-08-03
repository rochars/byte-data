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
var float32 = {"bits": 32, "fp": true};
var float32BE = {"bits": 32, "fp": true, "be": true};

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
    it('pack 0.000000001', function() {
        assert.deepEqual(
            byteData.pack(0.000000001, float32), 
            [0x5f,0x70,0x89,0x30]);
    });
    it('unpack 0.000000001', function() {
        assert.deepEqual(
        	byteData.unpack([0x5f,0x70,0x89,0x30], float32).toFixed(9),
            '0.000000001');
    });
    it('pack -0.000000001', function() {
        assert.deepEqual(
            byteData.pack(-0.000000001, float32), 
            [0x5f,0x70,0x89,0xb0]);
    });
    it('unpack -0.000000001', function() {
        assert.equal(
        	byteData.unpack([0x5f,0x70,0x89,0xb0], float32).toFixed(9),
            '-0.000000001');
    });
    it('pack 214748364.7', function() {
        // struct.pack('f', 214748364.7) == '\xcd\xcc\x4c\x4d'
        assert.deepEqual(
            byteData.pack(214748364.7, float32), 
            [205,204,76,77]);
    });
    it('unpack 214748364.7', function() {
        // struct.unpack('f', b'\xcd\xcc\x4c\x4d') == 214748368.0
        assert.deepEqual(
            byteData.unpack([205,204,76,77], float32).toFixed(1), 
            '214748368.0');
    });
    it('pack 21474.83647', function() {
        // struct.pack('f', 21474.83647) == '\xac\xc5\xa7\x46'
        assert.deepEqual(
            byteData.pack(21474.83647, float32), 
            [0xac,0xc5,0xa7,0x46]);
    });
    it('unpack 21474.83647', function() {
        // struct.unpack('f', b'\xac\xc5\xa7\x46') == 21474.8359375
        assert.deepEqual(
            byteData.unpack([0xac,0xc5,0xa7,0x46], float32).toFixed(7),
            '21474.8359375');
    });
    it('pack 214.7483647', function() {
        // struct.pack('f', 214.7483647) == b'\x95\xbf\x56\x43'
        assert.deepEqual(
            byteData.pack(214.7483647, float32), 
            [0x95,0xbf,0x56,0x43]);
    });
    it('unpack 214.7483647', function() {
        // struct.unpack('f', b'\x95\xbf\x56\x43') == 214.7483673095703
        assert.deepEqual(
            byteData.unpack([0x95,0xbf,0x56,0x43], float32).toFixed(13), 
            '214.7483673095703');
    });
    it('should turn 4 bytes hex to 1 32-bit float', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [95,112,9,64], float32)[0].toFixed(7),
            '2.1474836');
    });
    it('pack 0.9', function() {
        assert.deepEqual(
            byteData.pack(0.9, float32), 
            [0x66,0x66,0x66,0x3f]);
    });
    it('unpack 0.9', function() {
        assert.deepEqual(
            byteData.unpack([0x66,0x66,0x66,0x3f], float32).toFixed(1), 
            '0.9');
    });
    it('should turn 8 bytes to 2 32-bit floats', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,0,0,0,0,0], float32),
            [0,0]);
    });

    // big endian
    it('should turn 1 32-bit float from 4 bytes BE hex (2.1474836)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [64,9,112,95],
                float32BE)[0].toFixed(7),
            '2.1474836');
    });
});
