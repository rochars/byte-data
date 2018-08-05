/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview Test 16-bit integers, signed and unsigned.
 * @see https://github.com/rochars/byte-data
 */

var byteData = byteData || require('../../test/loader.js');
var assert = assert || require('assert');
var int16BE = {"bits": 16, "signed": true, "be": true};
var int16 = {"bits": 16, "signed": true};
var uInt16BE = {"bits": 16, "be": true};
var uInt16 = {"bits": 16};

describe('16-bit integers, signed', function() { 
    // 0
    it('pack 0', function() {
        assert.deepEqual(
            byteData.pack(0, int16),
            [0, 0]);
    });
    it('unpack 0', function() {
        assert.deepEqual(
            byteData.unpack([0, 0], int16),
            0);
    });
    // min, max
    it('pack -32768', function() {
        assert.deepEqual(
            byteData.pack(-32768, int16),
            [0, 128]);
    });
    it('unpack -32768', function() {
        assert.deepEqual(
            byteData.unpack([0, 128], int16),
            -32768);
    });
    it('pack 32767', function() {
        assert.deepEqual(
            byteData.pack(32767, int16),
            [255, 127]);
    });
    it('unpack 32767', function() {
        assert.deepEqual(
            byteData.unpack([255, 127], int16),
            32767);
    });

    // Random numbers
    it('pack 2 0s', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], int16),
            [0, 0, 0, 0]);
    });
    it('pack [-32768, 32767]', function() {
        assert.deepEqual(
            byteData.packArray([-32768, 32767], int16),
            [0, 128, 255, 127]);
    });
    it('pack [-32768, 32767]', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 128, 255, 127], int16),
            [-32768, 32767]);
    });
    it('pack min + 1', function() {
        assert.deepEqual(
            byteData.pack(-32767, int16),
            [1, 128]);
    });
    it('pack min + 2', function() {
        assert.deepEqual(
            byteData.pack(-32766, int16),
            [2, 128]);
    });
    it('pack min + 3', function() {
        assert.deepEqual(
            byteData.pack(-32765, int16),
            [3, 128]);
    });
    it('pack -1', function() {
        assert.deepEqual(
            byteData.pack(-1, int16),
            [255, 255]);
    });
    it('pack -2', function() {
        assert.deepEqual(
            byteData.pack(-2, int16),
            [254, 255]);
    });
    it('pack -3', function() {
        assert.deepEqual(
            byteData.pack(-3, int16),
            [253, 255]);
    });
});

describe('16-bit integers, unsigned', function() { 
    it('pack 0', function() {
        assert.deepEqual(
            byteData.pack(0, uInt16),
            [0, 0]);
    });
    it('pack 65535', function() {
        assert.deepEqual(
            byteData.pack(65535, uInt16),
            [255, 255]
        );
    });
    it('pack 765', function() {
        assert.deepEqual(
            byteData.pack(765, uInt16),
            [253, 2]);
    });
    
    // packarray
    it('should turn 2 signed 16-bit ints to 4 bytes (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], uInt16),
            [0, 0, 0, 0]);
    });

    // big endian
    it('should turn 2 16-bit unsigned ints to 2 bytes BE (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], uInt16BE),
            [0, 0, 0, 0]);
    });
    it('should turn 2 16-bit unsigned ints to 2 bytes LE (1s)', function() {
        assert.deepEqual(
            byteData.packArray([1, 1], uInt16),
            [1, 0, 1, 0]);
    });
    it('should turn 2 16-bit unsigned ints to 2 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.packArray([1, 1], uInt16BE),
            [0, 1, 0, 1]);
    });

    // should not be here
    it('pack 11-bits in a 16-bit container', function() {
        assert.deepEqual(
            byteData.pack(0, {"bits": 11}),
            [0, 0]);
    });
    it('pack 2000', function() {
        assert.deepEqual(
            byteData.pack(2000, {"bits": 11}),
            [208, 7]);
    });
    it('should handle 11-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.pack(2047, {"bits": 11}),
            [255, 7]);
    });
    it('should handle 12-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.pack(2047, {"bits": 12}),
            [255, 7]);
    });
    it('should handle 13-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.pack(2047, {"bits": 13}),
            [255, 7]);
    });
    it('should handle 14-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.pack(2047, {"bits": 14}),
            [255, 7]);
    });
    it('should handle 15-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.pack(2047, {"bits": 15}),
            [255, 7]);
    });
});
