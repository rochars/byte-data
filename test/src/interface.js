/**
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('interface', function() {
    
    // pack
    it('pack uInt16 (65535, 16)', function() {
        assert.deepEqual(
            byteData.pack(65535, byteData.uInt16, 16),
            ["ff","ff"]);
    });
    it('pack chr ("abcd")', function() {
        assert.deepEqual(
            byteData.pack("abcd", byteData.chr),
            [97]);
    });
    it('pack float32 (2.1474836, 16)', function() {
        assert.deepEqual(
            byteData.pack(2.1474836, byteData.float32, 16),
            ["5f","70","09","40"]);
    });
    it('pack int4 (-1)', function() {
        assert.deepEqual(byteData.pack(-1, byteData.int4),
            [15]);
    });
    it('pack uInt4 (15)', function() {
        assert.deepEqual(byteData.pack(15, byteData.uInt4),
            [15]);
    });
    it('pack bool (6, 16) should return "1"', function() {
        assert.deepEqual(byteData.pack(6, byteData.bool, 16),
            ['01']);
    });
    it('pack chr ("a")', function() {
        assert.deepEqual(byteData.pack("a", byteData.chr),
            [97]);
    });
    it('pack uInt8 (254)', function() {
        assert.deepEqual(byteData.pack(254, byteData.uInt8),
            [254]);
    });
    it('pack uInt8 (255)', function() {
        assert.deepEqual(byteData.pack(255, byteData.uInt8),
            [255]);
    });
    it('pack uInt8 (300) should return [255]', function() {
        assert.deepEqual(byteData.pack(300, byteData.uInt8),
            [255]);
    });
    it('pack uInt8 (-1) should return [0]', function() {
        assert.deepEqual(byteData.pack(-1, byteData.uInt8),
            [0]);
    });
    it('pack int8 (-1)', function() {
        assert.deepEqual(byteData.pack(-1, byteData.int8),
            [255]);
    });
    it('pack int8 (-2)', function() {
        assert.deepEqual(byteData.pack(-2, byteData.int8),
            [254]);
    });

    // unpack
    it('unpack chr', function() {
        assert.deepEqual(
            byteData.unpack([97, 98, 99, 199], byteData.chr),
            "a");
    });
    it('unpack uInt16', function() {
        assert.deepEqual(
            byteData.unpack(["ff", "ff"], byteData.uInt16, 16),
            65535);
    });
    it('unpack float16', function() {
        assert.equal(
            byteData.unpack(["01010101", "00110101"], byteData.float16).toFixed(5),
            0.33325);
    });
    it('unpack int2', function() {
        assert.equal(byteData.unpack(['11'], byteData.int2, 2), -1);
    });
    it('unpack uInt2', function() {
        assert.equal(byteData.unpack([3], byteData.uInt2), 3);
    });
    it('unpack chr', function() {
        assert.deepEqual(byteData.unpack([97, 98], byteData.chr), "a");
    });
    it('unpack uInt16', function() {
        assert.equal(byteData.unpack(
            ["ff","ff"], byteData.uInt16, 16),
            65535);
    });

    // packArray
    it('packArray uInt16', function() {
        assert.deepEqual(byteData.packArray([65535, 0], byteData.uInt16, 16),
            ["ff", "ff", "00", "00"]);
    });
    it('packArray int32', function() {
        assert.deepEqual(byteData.packArray([-2147483648, 2147483647], byteData.int32),
            [0,0,0,128,255,255,255,127]);
    });
    it('packArray float32', function() {
        assert.deepEqual(byteData.packArray([-1, 1], byteData.float32),
            [0,0,128,191,0,0,128,63]);
    });
    it('packArray chr', function() {
        assert.deepEqual(byteData.packArray("ab", byteData.chr),
            [97, 98]);
    });

    // unpackArray
    it('unpackArray uInt16', function() {
        assert.deepEqual(byteData.unpackArray(
            ["ff", "ff", "00", "00"], byteData.uInt16, 16),
            [65535, 0]);
    });
    it('unpackArray uInt2', function() {
        assert.deepEqual(
                byteData.unpackArray(['11'], byteData.uInt2, 2),
                 [3]
             );
    });
    it('unpackArray float64', function() {
        assert.deepEqual(
                byteData.unpackArray(
                        ['00','00','00','00','00','00','f0','3f'],
                        byteData.float64,
                        16
                    ),
                    [1]
             );
    });
});
