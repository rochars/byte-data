/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('little endiand and big endian', function() {
    
    // 16-bit
    it('should turn 2 16-bit unsigned ints to 2 bytes BE (0s)', function() {
        assert.deepEqual(byteData.toBytes([0, 0], 16, {"base": 10, "be": true}),
            [0, 0, 0, 0]);
    });
    it('should turn 2 16-bit unsigned ints to 2 bytes LE (1s)', function() {
        assert.deepEqual(byteData.toBytes([1, 1], 16, {"base": 10, "be": false}),
            [1, 0, 1, 0]);
    });
    it('should turn 2 16-bit unsigned ints to 2 bytes BE (1s)', function() {
        assert.deepEqual(byteData.toBytes([1, 1], 16, {"base": 10, "be": true}),
            [0, 1, 0, 1]);
    });

    // 24-bit
    it('should turn 2 24-bit unsigned ints to 6 bytes BE (0s)', function() {
        assert.deepEqual(byteData.toBytes([0, 0], 24, {"base": 10, "be": true}),
            [0, 0, 0, 0, 0, 0]);
    });
    it('should turn 2 24-bit unsigned ints to 6 bytes LE (1s)', function() {
        assert.deepEqual(byteData.toBytes([1, 1], 24, {"base": 10, "be": false}),
            [1, 0, 0, 1, 0, 0]);
    });
    it('should turn 2 24-bit unsigned ints to 6 bytes BE (1s)', function() {
        assert.deepEqual(byteData.toBytes([1, 1], 24, {"base": 10, "be": true}),
            [0, 0, 1, 0, 0, 1]);
    });
    it('should turn 2 24-bit unsigned ints to 6 bytes BE (max range)', function() {
        assert.deepEqual(byteData.toBytes([-8388608, 8388607], 24, {"base": 16, "be": true, "signed": true}),
            ["80","00","00", "7f", "ff", "ff"]);
    });
    it('should turn 2 24-bit unsigned ints to 6 bytes BE', function() {
        assert.deepEqual(byteData.toBytes([-8388608, 1, 8388607], 24, {"base": 16, "be": true, "signed": true}),
            ["80","00","00" , "00","00","01", "7f", "ff", "ff"]);
    });

    // 32-bit
    it('should turn 2 32-bit unsigned ints to 8 bytes BE (0s)', function() {
        assert.deepEqual(byteData.toBytes([0, 0], 32, {"base": 10, "be": true}),
            [0, 0, 0, 0, 0, 0, 0, 0]);
    });
    it('should turn 2 32-bit unsigned ints to 8 bytes LE (1s)', function() {
        assert.deepEqual(byteData.toBytes([1, 1], 32, {"base": 10, "be": false}),
            [1, 0, 0, 0, 1, 0, 0, 0]);
    });
    it('should turn 2 32-bit unsigned ints to 8 bytes BE (1s)', function() {
        assert.deepEqual(byteData.toBytes([1, 1], 32, {"base": 10, "be": true}),
            [0, 0, 0, 1, 0,0, 0, 1]);
    });

    // 40-bit
    it('should turn 2 40-bit unsigned ints to 10 bytes BE (0s)', function() {
        assert.deepEqual(byteData.toBytes([0, 0], 40, {"base": 10, "be": true}),
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
    it('should turn 2 40-bit unsigned ints to 10 bytes LE (1s)', function() {
        assert.deepEqual(byteData.toBytes([1, 1], 40, {"base": 10, "be": false}),
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0]);
    });
    it('should turn 2 40-bit unsigned ints to 10 bytes BE (1s)', function() {
        assert.deepEqual(byteData.toBytes([1, 1], 40, {"base": 10, "be": true}),
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    });

    // 48-bit
    it('should turn 2 48-bit unsigned ints to 12 bytes BE (0s)', function() {
        assert.deepEqual(byteData.toBytes([0, 0], 48, {"base": 10, "be": true}),
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
    it('should turn 2 48-bit unsigned ints to 12 bytes LE (1s)', function() {
        assert.deepEqual(byteData.toBytes([1, 1], 48, {"base": 10, "be": false}),
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
    });
    it('should turn 2 48-bit unsigned ints to 12 bytes BE (1s)', function() {
        assert.deepEqual(byteData.toBytes([1, 1], 48, {"base": 10, "be": true}),
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
    });
    it('should turn 1 48-bit unsigned ints to 6 bytes hex BE (120637438355317)', function() {
        assert.deepEqual(byteData.toBytes([120637438355317], 48, {"base": 16, "be": true}),
            ["6d", "b8", "17", "a8", "e7", "75"]);
            //["75", "e7", "a8", "17", "b8", "6d"]);  LE
    });
    it('should turn 1 48-bit unsigned ints to 6 bytes hex BE (120637438355317)', function() {
        assert.deepEqual(byteData.toBytes([120637438355317, 1, 1], 48, {"base": 16, "be": true}),
            ["6d", "b8", "17", "a8", "e7", "75", 
            "00", "00", "00", "00", "00", "01", 
            "00", "00", "00", "00", "00", "01"]);
    });

    // 64-bit
    it('should turn 1 64-bit float to 8 bytes BE (pi)', function() {
        assert.deepEqual(byteData.toBytes([3.141592653589793], 64, {"base": 10, "be": true}),
            [64, 9, 33, 251, 84, 68, 45, 24]);
            //[24,45,68,84,251,33,9,64]); LE
    });

});
