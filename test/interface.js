/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../index.js');

describe('interface', function() {
    
    it('should find the "ab" among the junk', function() {
        let index = byteData.findString([1, 0, 1, 100, 97, 98, 2, 2, 0], "ab");
        assert.equal(index, 4);
    });
    it('should return -1 if the string is not found', function() {
        let index = byteData.findString([1, 0, 1, 100, 95, 98, 2, 2, 0], "ab");
        assert.equal(index, -1);
    });
    it('BitDepthOffsets should be available', function() {
        assert.ok(byteData.BitDepthOffsets[32]);
    });

    it('BitDepthMaxValues should be available', function() {
        assert.ok(byteData.BitDepthMaxValues[32]);
    });
    it('should turn 1 bytes hex to 1 16-bit uInt single value (not array)', function() {
        assert.equal(byteData.fromBytes(
            ["ff","ff"], 16, {"base": 16, "single": true}),
            65535);
    });
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        assert.deepEqual(byteData.toBytes(
            65535, 16, {"base": 16}),
            ["ff","ff"]);
    });

    // pack
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        assert.deepEqual(
            byteData.pack(65535, byteData.uInt16, 16),
            ["ff", "ff"]);
    });
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        assert.deepEqual(
            byteData.pack(2.1474836, byteData.float32, 16),
            ["5f","70","09","40"]);
    });
    it('should turn 2 4-bit signed int to 2 nibble (-1, 5)', function() {
        assert.deepEqual(byteData.pack([-1, 5], byteData.int4),
            [15, 5]);
    });
    it('should turn 2 4-bit unsigned int to 2 nibble (15, 5)', function() {
        assert.deepEqual(byteData.pack([15, 5], byteData.uInt4),
            [15, 5]);
    });
    it('should turn 1 value to 1 booolean hex (6)', function() {
        assert.deepEqual(byteData.pack(6, byteData.bool, 16),
            ['1']);
    });
    it('should turn a 1 char string to bytes', function() {
        assert.deepEqual(byteData.pack("a", byteData.chr),
            [97]);
    });
    it('should turn a trucate a 16-bit value when writing as 8-bit', function() {
        assert.deepEqual(byteData.pack(254, byteData.uInt8),
            [254]);
    });
    it('should turn a trucate a 16-bit value when writing as 8-bit', function() {
        assert.deepEqual(byteData.pack(255, byteData.uInt8),
            [255]);
    });
    it('should turn a trucate a 16-bit value when writing as 8-bit', function() {
        assert.deepEqual(byteData.pack(300, byteData.uInt8),
            [255]);
    });
    it('should turn a < 0 value to 0 writing as unsigned 8-bit', function() {
        assert.deepEqual(byteData.pack(-1, byteData.uInt8),
            [0]);
    });
    it('should turn a signed value to 1 byte (-1)', function() {
        assert.deepEqual(byteData.pack(-1, byteData.int8),
            [255]);
    });
    it('should turn a signed value to 1 byte (-2)', function() {
        assert.deepEqual(byteData.pack(-2, byteData.int8),
            [254]);
    });

    // unpack
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        assert.deepEqual(
            byteData.unpack(["ff", "ff"], byteData.uInt16, 16),
            65535);
    });
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        assert.equal(
            byteData.unpack(["00110101", "01010101"], byteData.float16).toFixed(5),
            0.33325);
    });
    it('should turn 1 2-bit signed int bin to 1 crumb (-1)', function() {
        assert.equal(byteData.unpack(['11'], byteData.int2, 2), -1);
    });
    it('should turn 1 2-bit unsigned int decimal to 1 crumb (3)', function() {
        assert.equal(byteData.unpack([3], byteData.uInt2), 3);
    });
    it('should turn bytes to a char', function() {
        assert.deepEqual(byteData.unpack([97, 98], byteData.chr), "a");
    });


    // packSequence
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        assert.deepEqual(byteData.packArray([65535, 0], byteData.uInt16, 16),
            ["ff", "ff", "00", "00"]);
    });
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        assert.deepEqual(byteData.packArray([-2147483648, 2147483647], byteData.int32),
            [0,0,0,128,255,255,255,127]);
    });
    it('should turn a 2 char string to bytes', function() {
        assert.deepEqual(byteData.packArray("ab", byteData.chr),
            [97, 98]);
    });

    // unpackSequence
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        assert.deepEqual(byteData.unpackArray(
            ["ff", "ff", "00", "00"], byteData.uInt16, 16),
            [65535, 0]);
    });
    it('should turn 1 2-bit signed int bin to 1 crumb (-1)', function() {
        assert.deepEqual(
                byteData.unpackArray(['11'], byteData.uInt2, 2),
                 [3]
             );
    });
});
