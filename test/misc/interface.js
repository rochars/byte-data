/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

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
        assert.equal(byteData.unpack(
            ["ff","ff"], byteData.uInt16, 16),
            65535);
    });
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        assert.deepEqual(
            byteData.pack(65535, byteData.uInt16, 16),
            ["ff","ff"]);
    });

    // pack
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        assert.deepEqual(
            byteData.pack("abcd", byteData.chr),
            [97]);
    });
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
            byteData.unpack([97, 98, 99, 199], byteData.chr),
            "a");
    });
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        assert.deepEqual(
            byteData.unpack(["ff", "ff"], byteData.uInt16, 16),
            65535);
    });
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        assert.equal(
            byteData.unpack(["01010101", "00110101"], byteData.float16).toFixed(5),
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
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        assert.deepEqual(byteData.packArray([-1, 1], byteData.float32),
            [0,0,128,191,0,0,128,63]);
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
    it('should turn 1 8-bit value to 8 bytes (-1)', function() {
        assert.deepEqual(
                byteData.unpackArray(
                        ['00','00','00','00','00','00','f0','3f'],
                        byteData.float64,
                        16
                    ),
                    [1]
             );
    });

    // packStruct
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        let struct = [
            "a",
            0,
            -1,
            3,
            -8,
            7,
            -128,
            255,
            -32768,
            65535,
            0.33325,
            -8388608,
            16777215,
            -2147483648,
            4294967295,
            2.147483647,
            -549755813888,
            1099511627775,
            -140737488355328,
            281474976710655,
            3.141592653589793
        ];
        let def = [
            byteData.chr,
            byteData.bool,
            byteData.int2,
            byteData.uInt2,
            byteData.int4,
            byteData.uInt4,
            byteData.int8,
            byteData.uInt8,
            byteData.int16,
            byteData.uInt16,
            byteData.float16,
            byteData.int24,
            byteData.uInt24,
            byteData.int32,
            byteData.uInt32,
            byteData.float32,
            byteData.int40,
            byteData.uInt40,
            byteData.int48,
            byteData.uInt48,
            byteData.float64
        ];
        let expected = [
            97,
            0,
            3,
            3,
            8,
            7,
            128,
            255,
            0, 128,
            255, 255,
            85,53,
            0,0,128,
            255,255,255,
            0,0,0,128,
            255,255,255,255,
            95,112,9,64,
            0,0,0,0,128,
            255,255,255,255,255,
            0,0,0,0,0,128,
            255,255,255,255,255,255,
            24,45,68,84,251,33,9,64
        ];
        assert.deepEqual(
                byteData.packStruct(struct, def),
                expected
            );
    });

    // unpackStruct
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        let struct = [
            "a",
            0,
            -1,
            3,
            -8,
            7,
            -128,
            255,
            -32768,
            65535,
            -8388608,
            16777215,
            -2147483648,
            4294967295,
            -549755813888,
            1099511627775,
            -140737488355328,
            281474976710655,
            3.141592653589793
        ];
        let def = [
            byteData.chr,
            byteData.bool,
            byteData.int2,
            byteData.uInt2,
            byteData.int4,
            byteData.uInt4,
            byteData.int8,
            byteData.uInt8,
            byteData.int16,
            byteData.uInt16,
            byteData.int24,
            byteData.uInt24,
            byteData.int32,
            byteData.uInt32,
            byteData.int40,
            byteData.uInt40,
            byteData.int48,
            byteData.uInt48,
            byteData.float64
        ];
        let expected = [
            97,
            0,
            3,
            3,
            8,
            7,
            128,
            255,
            0, 128,
            255, 255,
            0,0,128,
            255,255,255,
            0,0,0,128,
            255,255,255,255,
            0,0,0,0,128,
            255,255,255,255,255,
            0,0,0,0,0,128,
            255,255,255,255,255,255,
            24,45,68,84,251,33,9,64
        ];
        assert.deepEqual(
                byteData.unpackStruct(expected, def),
                struct
            );
    });
});
