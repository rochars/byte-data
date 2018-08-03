/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview Test IEEE-754 binary64 numbers.
 * @see https://github.com/rochars/byte-data
 * @see https://en.wikipedia.org/wiki/Double-precision_floating-point_format
 */

var byteData = byteData || require('../../test/loader.js');
var assert = assert || require('assert');
var float64 = {"bits": 64, "fp": true};
var float64BE = {"bits": 64, "fp": true, "be": true};

var Buffer = Buffer || false;

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
            byteData.unpack([0x18,0x2d,0x44,0x54,0xfb,0x21,0x09,0x40], float64).toFixed(15), 
            '3.141592653589793');
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
    
    // struct.unpack('d', b'\xd9\x7d\xda\xf5\xd0\xf2\xbe\x3a')
    it('pack 1e-25', function() {
        assert.deepEqual(
            byteData.pack(1e-25, float64),
            [0xd9,0x7d,0xda,0xf5,0xd0,0xf2,0xbe,0x3a]);
    });
    it('unpack 1e-25', function() {
        assert.equal(
            byteData.unpack([0xd9,0x7d,0xda,0xf5,0xd0,0xf2,0xbe,0x3a], float64),
            1e-25);
    });

    // Random values
    it('pack -1', function() {
        assert.deepEqual(
            byteData.pack(-1, float64),
            [0,0,0,0,0,0,240,191]);
    });
    it('pack -0.5', function() {
        assert.deepEqual(
            byteData.pack(-0.5, float64, 16),
            [0,0,0,0,0,0,224,191]);
    });
    it('pack 0.5', function() {
        assert.deepEqual(
            byteData.pack(0.5, float64),
            [0,0,0,0,0,0,224,63]);
    });
    it('pack 3.141592653589793', function() {
        assert.deepEqual(
            byteData.pack(3.141592653589793, float64),
            [24,45,68,84,251,33,9,64]);
    });
    it('pack 9', function() {
        assert.deepEqual(
            byteData.pack(9, float64),
            [0,0,0,0,0,0,34,64]);
    });
    it('pack 31.41592653589793', function() {
        assert.deepEqual(
            byteData.pack(31.41592653589793, float64),
            [94,56,85,41,122,106,63,64]);
    });
    it('pack 314159265358979.3', function() {
        // struct.pack() == b'\x35\x48\xa2\x76\x9e\xdb\xf1\x42'
        assert.deepEqual(
            byteData.pack(314159265358979.3, float64),
            //[53,72,162,118,158,219,241,66]);
            [0x35,0x48,0xa2,0x76,0x9e,0xdb,0xf1,0x42]);
    });
    it('unpack 314159265358979.3', function() {
        assert.deepEqual(
            byteData.unpack([0x35,0x48,0xa2,0x76,0x9e,0xdb,0xf1,0x42], float64),
            314159265358979.3);
    });
    it('pack 0', function() {
        assert.deepEqual(
            byteData.pack(0, float64, 16),
            [0,0,0,0,0,0,0,0]);
    });
    it('pack 2', function() {
        assert.deepEqual(
            byteData.pack(2, float64, 16),
            [0,0,0,0,0,0,0,64]);
    });

    // Old tests, need refactoring
    it('packArray [0, 0, 1]', function() {
        assert.deepEqual(
            byteData.packArray([0, 0, 1], float64),
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63]);
    });
    it('packArray [0, 1, 0]', function() {
        assert.deepEqual(
            byteData.packArray([0, 1, 0], float64),
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0]);
    });
    it('should turn 8 bytes to 1 64-bit float', function() {
        assert.equal(
            byteData.unpackArray([75,40,253,58,221,154,191,63], float64)[0],
            0.123456789876543);
    });
    it('should turn 7 bytes to 0 64-bit float (not enough bytes)', function() {
        assert.deepEqual(
            byteData.unpackArray([75,40,253,58,221,154,191], float64),
            []);
    });
    it('should turn 8 bytes to 1 64-bit float', function() {
        assert.equal(
            byteData.unpackArray(
                [0,0,0,0,0,0,0,0], float64)[0],
            0);
    });
    it('should turn 16 bytes to 2 64-bit floats', function() {
        assert.equal(
            byteData.unpackArray(
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], float64)[0],
            0);
        assert.equal(
            byteData.unpackArray(
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], float64)[1],
            0);
    });
    it('should turn 8 bytes bin to 1 64-bit float', function() {
        assert.equal(
            byteData.unpackArray(
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], float64)[0],
            0);
    });
    it('should turn 8 bytes bin to 1 64-bit float', function() {
        assert.equal(
            byteData.unpackArray(
                [
                    75,
                    40,
                    253,
                    58,
                    221,
                    154,
                    191,
                    63
                ], float64)[0].toFixed(15),
            '0.123456789876543');
    });
    it('should turn 8 bytes to 1 64-bit float (31.41592653589793)', function() {
        assert.deepEqual(
            byteData.unpackArray([94,56,85,41,122,106,63,64], float64),
            [31.41592653589793]);
    });
    it('should turn 8 bytes to 1 64-bit float (314159265358979.3)', function() {
        assert.deepEqual(
            byteData.unpackArray([53,72,162,118,158,219,241,66], float64),
            [314159265358979.3]);
    });
    it('should turn 8 bytes hex to 1 64-bit float (2)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,0,0,0,0,0,64], float64),
            [2]);
    });


    it('should turn 1 signed 32-bit float to 4 bytes (1)', function() {
        assert.deepEqual(byteData.unpackArray([0,0,0,0,0x00,0x00,0xf0,0x7f], float64), 
            [Infinity]); // 240 127 0xf0 0x7f
    });
    it('should turn 1 signed 32-bit float to 4 bytes (1)', function() {
        assert.deepEqual(byteData.unpackArray([0,0,0,0,0x00,0x00,0xf0,0xff], float64), 
            [-Infinity]); // 240 127 0xf0 0x7f
    });
    it('should turn 1 signed 32-bit float to 4 bytes (1)', function() {
        assert.ok(isNaN(
            byteData.unpackArray(
                [0,0,0,0,0,0,248,127],
                float64))); // 248 127 0xf8 0x7f
    });

    // big endian
    it('should turn 1 64-bit float to 8 bytes BE (pi)', function() {
        assert.deepEqual(
            byteData.unpackArray([64, 9, 33, 251, 84, 68, 45, 24], float64BE),
            [3.141592653589793]);
    });
});
