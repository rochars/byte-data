/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview Test 24-bit integers, signed and unsigned.
 * @see https://github.com/rochars/byte-data
 */

var byteData = byteData || require('../../test/loader.js');
var assert = assert || require('assert');
var int24BE = {"bits": 24, "signed": true, "be": true};
var int24 = {"bits": 24, "signed": true};
var uInt24BE = {"bits": 24, "be": true};
var uInt24 = {"bits": 24};

describe('24-bit integers, signed', function() {
    it('pack 8388607 (max)', function() {
        assert.deepEqual(
            byteData.pack(8388607, int24),
            [255,255,127]);
    });
    it('unpack 8388607 (max)', function() {
        assert.deepEqual(
            byteData.unpack([255,255,127], int24),
            8388607);
    });
    it('pack -8388608 (min)', function() {
        assert.deepEqual(
            byteData.pack(-8388608, int24),
            [0,0,128]);
    });
    it('unpack -8388608 (min)', function() {
        assert.deepEqual(
            byteData.unpack([0,0,128], int24),
            -8388608);
    });
    it('pack min + 1', function() {
        assert.deepEqual(
            byteData.pack(-8388607, int24),
            [1,0,128]);
    });
    it('unpack min + 1', function() {
        assert.deepEqual(
            byteData.unpack([1,0,128], int24),
            -8388607);
    });
    it('pack min + 2', function() {
        assert.deepEqual(
            byteData.pack(-8388606, int24),
            [2,0,128]);
    });
    it('unpack min + 2', function() {
        assert.deepEqual(
            byteData.unpack([2,0,128], int24),
            -8388606);
    });
    it('pack min + 3', function() {
        assert.deepEqual(
            byteData.pack(-8388605, int24),
            [3,0,128]);
    });
    it('unpack min + 3', function() {
        assert.deepEqual(
            byteData.unpack([3,0,128], int24),
            -8388605);
    });
    it('pack -1', function() {
        assert.deepEqual(
            byteData.pack(-1, int24),
            [255, 255, 255]);
    });
    it('unpack -1', function() {
        assert.deepEqual(
            byteData.unpack([255, 255, 255], int24),
            -1);
    });
    it('pack -2', function() {
        assert.deepEqual(
            byteData.pack(-2, int24),
            [254, 255, 255]);
    });
    it('unpack -2', function() {
        assert.deepEqual(
            byteData.unpack([254, 255, 255], int24),
            -2);
    });
    it('pack -3', function() {
        assert.deepEqual(
            byteData.pack(-3, int24),
            [253, 255, 255]);
    });
    it('unpack -3', function() {
        assert.deepEqual(
            byteData.unpack([253, 255, 255], int24),
            -3);
    });

    // packArray with random values
    it('pack [-8388608, 8388607] (min, max)', function() {
        assert.deepEqual(
            byteData.packArray([-8388608, 8388607], int24),
            [0,0,128,255,255,127]);
    });
    it('unpack [-8388608, 8388607] (min, max)', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,128,255,255,127], int24),
            [-8388608, 8388607]);
    });

    // big endian, arrays
    it('pack [0, 0] BE', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], int24BE),
            [0, 0, 0, 0, 0, 0]);
    });
    it('pack [1, 1]', function() {
        assert.deepEqual(
            byteData.packArray([1, 1], int24),
            [1, 0, 0, 1, 0, 0]);
    });
    it('unpack [1, 1]', function() {
        assert.deepEqual(
            byteData.unpackArray([1, 0, 0, 1, 0, 0], int24),
            [1, 1]);
    });
    it('pack [1, 1] BE', function() {
        assert.deepEqual(
            byteData.packArray([1, 1], int24BE),
            [0, 0, 1, 0, 0, 1]);
    });
    it('unpack [1, 1] BE', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 1, 0, 0, 1], int24BE),
            [1, 1]);
    });
    it('pack [-8388608, 8388607] BE', function() {
        assert.deepEqual(
            byteData.packArray([-8388608, 8388607], int24BE),
            [128,0,0, 127, 255, 255]);
    });
    it('unpack [-8388608, 8388607] BE', function() {
        assert.deepEqual(
            byteData.unpackArray([128,0,0, 127, 255, 255], int24BE),
            [-8388608, 8388607]);
    });
    it('pack [-8388608, 1, 8388607] BE', function() {
        assert.deepEqual(
            byteData.packArray([-8388608, 1, 8388607], int24BE),
            [128,0,0 , 0,0,1, 127, 255, 255]);
    });
    it('unpack [-8388608, 1, 8388607] BE', function() {
        assert.deepEqual(
            byteData.unpackArray([128,0,0 , 0,0,1, 127, 255, 255], int24BE),
            [-8388608, 1, 8388607]);
    });
});

describe('24-bit integers, unsiged', function() {    
    it('pack 16777215 (max)', function() {
        assert.deepEqual(
            byteData.pack(16777215, uInt24),
            [255,255,255]);
    });
    it('unpack 16777215 (max)', function() {
        assert.deepEqual(
            byteData.unpack([255,255,255], uInt24),
            16777215);
    });
    it('pack 0', function() {
        assert.deepEqual(
            byteData.pack(0, uInt24),
            [0, 0, 0]);
    });
    it('unpack 0', function() {
        assert.deepEqual(
            byteData.unpack([0, 0, 0], uInt24),
            0);
    });
    
    // packArray with random values
    it('packArray [0, 0]', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], uInt24),
            [0, 0, 0, 0, 0, 0]);
    });
    it('packArray [0, 0]', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 0, 0, 0, 0], uInt24),
            [0, 0]);
    });
    it('packArray [0, 16777215]', function() {
        assert.deepEqual(
            byteData.packArray([0, 16777215], uInt24),
            [0,0,0,255,255,255]);
    });
    it('packArray [0, 16777215]', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,255,255,255], uInt24),
            [0, 16777215]);
    });
});
