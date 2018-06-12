/**
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../test/loader.js');

describe('interface', function() {
    
    it('pack uInt16 (undefined)', function() {
        assert.deepEqual(
            byteData.pack(undefined, byteData.types.uInt16),
            []);
    });
    it('pack fourCC (not enought chars)', function() {
        assert.deepEqual(
            byteData.pack("abc", byteData.types.fourCC),
            []);
    });

    // pack
    it('pack uInt16 (65535, 16)', function() {
        assert.deepEqual(
            byteData.pack(65535, byteData.types.uInt16),
            [255,255]);
    });
    it('pack chr ("abcd")', function() {
        assert.deepEqual(
            byteData.pack("abcd", byteData.types.chr),
            [97]);
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
    it('pack bool (6, 16) should return 1', function() {
        assert.deepEqual(byteData.pack(6, byteData.types.bool),
            [1]);
    });
    it('pack chr ("a")', function() {
        assert.deepEqual(byteData.pack("a", byteData.types.chr),
            [97]);
    });
    it('pack uInt8 (254)', function() {
        assert.deepEqual(byteData.pack(254, byteData.types.uInt8),
            [254]);
    });
    it('pack uInt8 (255)', function() {
        assert.deepEqual(byteData.pack(255, byteData.types.uInt8),
            [255]);
    });
    it('pack uInt8 (300) should return [255]', function() {
        assert.deepEqual(byteData.pack(300, byteData.types.uInt8),
            [255]);
    });
    it('pack uInt8 (-1) should return [0]', function() {
        assert.deepEqual(byteData.pack(-1, byteData.types.uInt8),
            [0]);
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
    it('unpack chr', function() {
        assert.deepEqual(
            byteData.unpack([97, 98, 99, 199], byteData.types.chr),
            "a");
    });
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
        assert.equal(byteData.unpack(['11'], byteData.types.int2, 2), -1);
    });
    it('unpack uInt2', function() {
        assert.equal(byteData.unpack([3], byteData.types.uInt2), 3);
    });
    it('unpack chr', function() {
        assert.deepEqual(byteData.unpack([97, 98], byteData.types.chr), "a");
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
    it('packArray chr', function() {
        assert.deepEqual(byteData.packArray("ab", byteData.types.chr),
            [97, 98]);
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
