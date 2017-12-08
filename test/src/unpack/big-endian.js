/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../index.js');

let uInt16BE = byteData.uInt16BE;
let float16BE = byteData.float16BE;
let uInt16 = byteData.uInt16;
let int16BE = byteData.int16BE;
let int16 = byteData.int16;
let uInt24BE = byteData.uInt24BE;
let int24BE = byteData.int24BE;
let uInt24 = byteData.uInt24;
let int24 = byteData.int24;
let uInt32BE = byteData.uInt32BE;
let int32BE = byteData.int32BE;
let int32 = byteData.int32;
let float32BE = byteData.float32BE;
let uInt32 = byteData.uInt32;
let uInt40BE = byteData.uInt40BE;
let int40BE = byteData.int40BE;
let int40 = byteData.int40;
let uInt40 = byteData.uInt40;
let uInt48BE = byteData.uInt48BE;
let uInt48 = byteData.uInt48;
let int48BE = byteData.int48BE;
let int48 = byteData.int48;
let float64BE = byteData.float64BE;

describe('unpack LE and BE', function() { 
    
    // 16-bit
    it('should turn 2 16-bit signed ints to 2 bytes BE (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 0, 0], int16BE),
            [0, 0]);
    });
    it('should turn 2 16-bit signed ints to 2 bytes LE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([1, 0, 1, 0], int16),
            [1, 1]);
    });
    it('should turn 2 16-bit signed ints to 2 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 1, 0, 1], int16BE),
            [1, 1]);
    });
    it('should turn 1 16-bit unsigned ints to 2 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 1], uInt16BE),
            [1]);
    });
    it('should turn 2 bytes hex to 1 16-bit float BE (1/3)', function() {
        assert.deepEqual(
            byteData.unpackArray(["35", "55"], float16BE, 16)[0].toFixed(5),
            0.33325);
    });

    // 24-bit
    it('should turn 2 24-bit signed ints to 6 bytes BE (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 0, 0, 0, 0], int24BE),
            [0, 0]);
    });
    it('should turn 2 24-bit signed ints to 6 bytes LE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([1, 0, 0, 1, 0, 0], int24),
            [1, 1]);
    });
    it('should turn 2 24-bit signed ints to 6 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 1, 0, 0, 1], int24BE),
            [1, 1]);
    });
    it('should turn 1 24-bit unsigned int to 3 bytes BE (8388607)', function() {
        assert.deepEqual(
            byteData.unpackArray(["7f", "ff", "ff"], uInt24BE, 16),
            [8388607]);
    });
    it('should turn 2 24-bit signed ints to 6 bytes BE (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(["80","00","00", "7f", "ff", "ff"],
                int24BE, 16),
            [-8388608, 8388607]);
    });
    it('should turn 2 24-bit signed ints to 6 bytes BE', function() {
        assert.deepEqual(
            byteData.unpackArray(["80","00","00" , "00","00","01", "7f", "ff", "ff"],
                int24BE, 16),
            [-8388608, 1, 8388607]);
    });

    // 32-bit
    it('should turn 2 32-bit signed ints to 8 bytes BE (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 0, 0, 0, 0, 0, 0],
                int32BE),
            [0, 0]);
    });
    it('should turn 2 32-bit signed ints to 8 bytes LE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([1, 0, 0, 0, 1, 0, 0, 0],
                int32),
            [1, 1]);
    });
    it('should turn 2 32-bit signed ints to 8 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 0, 1, 0,0, 0, 1],
                int32BE),
            [1, 1]);
    });
    it('should turn 1 32-bit signed ints to 4 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 0, 1],
                int32BE),
            [1]);
    });
    it('should turn 8 bytes hex to 2 32-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["80","0","0","0", "7f","ff","ff","ff"],
                int32BE, 16),
            [-2147483648,2147483647]);
    });
    it('should turn 1 32-bit float from 4 bytes BE hex (2.1474836)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["40","9","70","5f"],
                float32BE, 16)[0].toFixed(7),
            2.1474836);
    });

    // 40-bit
    it('should turn 2 40-bit signed ints to 10 bytes BE (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                int40BE),
            [0, 0]);
    });
    it('should turn 2 40-bit signed ints to 10 bytes LE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                int40),
            [1, 1]);
    });
    it('should turn 2 40-bit signed ints to 10 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                int40BE),
            [1, 1]);
    });
    it('should turn 1 40-bit signed ints to 10 bytes LE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [1, 0, 0, 0, 0], int40),
            [1]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int BE (149515627075)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["22","cf","d3","6a","43"], uInt40BE, 16),
            [149515627075]);
    });

    // 48-bit
    it('should turn 2 48-bit ints to 12 bytes BE (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                int48BE),
            [0, 0]);
    });
    it('should turn 2 48-bit ints to 12 bytes LE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                int48),
            [1, 1]);
    });
    it('should turn 2 48-bit ints to 12 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                int48BE),
            [1, 1]);
    });
    it('should turn 2 48-bit unsigned ints to 12 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                uInt48BE),
            [1, 1]);
    });
    it('should turn 1 48-bit ints to 6 bytes hex BE (120637438355317)', function() {
        assert.deepEqual(
            byteData.unpackArray(["6d", "b8", "17", "a8", "e7", "75"],
                uInt48BE, 16),
            [120637438355317]);
    });
    it('should turn 1 48-bit unsigned ints to 6 bytes hex BE (120637438355317)', function() {
        let bytes = ["6d", "b8", "17", "a8", "e7", "75", 
            "00", "00", "00", "00", "00", "01", 
            "00", "00", "00", "00", "00", "01"];
        assert.deepEqual(
            byteData.unpackArray(bytes, uInt48BE, 16),
            [120637438355317, 1, 1]);
    });

    // 64-bit
    it('should turn 1 64-bit float to 8 bytes BE (pi)', function() {
        assert.deepEqual(
            byteData.unpackArray([64, 9, 33, 251, 84, 68, 45, 24], float64BE),
            [3.141592653589793]);
    });
});
