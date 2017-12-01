/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('little endiand and big endian reading', function() { 
    
    // 16-bit
    it('should turn 2 16-bit signed ints to 2 bytes BE (0s)', function() {
        assert.deepEqual(byteData.fromBytes([0, 0, 0, 0],
                16, {"signed": true, "be": true}),
            [0, 0]);
    });
    it('should turn 2 16-bit signed ints to 2 bytes LE (1s)', function() {
        assert.deepEqual(byteData.fromBytes([1, 0, 1, 0],
                16, {"signed": true, "be": false}),
            [1, 1]);
    });
    it('should turn 2 16-bit signed ints to 2 bytes BE (1s)', function() {
        assert.deepEqual(byteData.fromBytes([0, 1, 0, 1],
                16, {"signed": true, "be": true}),
            [1, 1]);
    });
    it('should turn 1 16-bit unsigned ints to 2 bytes BE (1s)', function() {
        assert.deepEqual(byteData.fromBytes([0, 1],
                16, {"be": true}),
            [1]);
    });
    it('should turn 2 bytes hex to 1 16-bit float BE (1/3)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["55", "35"], 16, {"base": 16, "float": true, "be": true})[0].toFixed(5),
            0.33325);
    });

    // 24-bit
    it('should turn 2 24-bit signed ints to 6 bytes BE (0s)', function() {
        assert.deepEqual(byteData.fromBytes([0, 0, 0, 0, 0, 0],
                24, {"signed": true, "be": true}),
            [0, 0]);
    });
    it('should turn 2 24-bit signed ints to 6 bytes LE (1s)', function() {
        assert.deepEqual(byteData.fromBytes([1, 0, 0, 1, 0, 0],
                24, {"signed": true, "be": false}),
            [1, 1]);
    });
    it('should turn 2 24-bit signed ints to 6 bytes BE (1s)', function() {
        assert.deepEqual(byteData.fromBytes([0, 0, 1, 0, 0, 1],
                24, {"signed": true, "be": true}),
            [1, 1]);
    });
    it('should turn 1 24-bit unsigned int to 3 bytes BE (8388607)', function() {
        assert.deepEqual(byteData.fromBytes(["7f", "ff", "ff"],
                24, {"base": 16, "signed": false, "be": true}),
            [8388607]);
    });
    it('should turn 2 24-bit signed ints to 6 bytes BE (max range)', function() {
        assert.deepEqual(byteData.fromBytes(["80","00","00", "7f", "ff", "ff"],
                24, {"base": 16, "signed": true, "be": true}),
            [-8388608, 8388607]);
    });
    it('should turn 2 24-bit signed ints to 6 bytes BE', function() {
        assert.deepEqual(byteData.fromBytes(["80","00","00" , "00","00","01", "7f", "ff", "ff"],
                24, {"base": 16, "signed": true, "be": true}),
            [-8388608, 1, 8388607]);
    });

    // 32-bit
    it('should turn 2 32-bit signed ints to 8 bytes BE (0s)', function() {
        assert.deepEqual(byteData.fromBytes([0, 0, 0, 0, 0, 0, 0, 0],
                32, {"signed": true, "be": true}),
            [0, 0]);
    });
    it('should turn 2 32-bit signed ints to 8 bytes LE (1s)', function() {
        assert.deepEqual(byteData.fromBytes([1, 0, 0, 0, 1, 0, 0, 0],
                32, {"signed": true, "be": false}),
            [1, 1]);
    });
    it('should turn 2 32-bit signed ints to 8 bytes BE (1s)', function() {
        assert.deepEqual(byteData.fromBytes([0, 0, 0, 1, 0,0, 0, 1],
                32, {"signed": true, "be": true}),
            [1, 1]);
    });
    it('should turn 1 32-bit signed ints to 4 bytes BE (1s)', function() {
        assert.deepEqual(byteData.fromBytes([0, 0, 0, 1],
                32, {"signed": true, "be": true}),
            [1]);
    });
    it('should turn 8 bytes hex to 2 32-bit ints (max range)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["80","0","0","0", "7f","ff","ff","ff"],
                32, {"base": 16, "signed": true, "be": true}),
            [-2147483648,2147483647]);
    });
    it('should turn 1 32-bit float from 4 bytes BE hex (2.1474836)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["40","9","70","5f"],
                32, {"base": 16, "float": true, "be": true})[0].toFixed(7),
            2.1474836);
    });

    // 40-bit
    it('should turn 2 40-bit signed ints to 10 bytes BE (0s)', function() {
        assert.deepEqual(byteData.fromBytes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                40, {"signed": true, "be": true}),
            [0, 0]);
    });
    it('should turn 2 40-bit signed ints to 10 bytes LE (1s)', function() {
        assert.deepEqual(byteData.fromBytes([1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                40, {"signed": true, "be": false}),
            [1, 1]);
    });
    it('should turn 2 40-bit signed ints to 10 bytes BE (1s)', function() {
        assert.deepEqual(byteData.fromBytes([0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                40, {"signed": true, "be": true}),
            [1, 1]);
    });
    it('should turn 1 40-bit signed ints to 10 bytes LE (1s)', function() {
        assert.deepEqual(byteData.fromBytes(
            [1, 0, 0, 0, 0], 40, {"base": 10, "signed": true, "be": false}),
            [1]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int (149515627075)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["22","cf","d3","6a","43"], 40, {"base": 16, "signed": false, "be": true}),
            [149515627075]);
    });

    // 48-bit
    it('should turn 2 48-bit ints to 12 bytes BE (0s)', function() {
        assert.deepEqual(byteData.fromBytes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                48, {"signed": true, "be": true}),
            [0, 0]);
    });
    it('should turn 2 48-bit ints to 12 bytes LE (1s)', function() {
        assert.deepEqual(byteData.fromBytes([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                48, {"signed": true, "be": false}),
            [1, 1]);
    });
    it('should turn 2 48-bit ints to 12 bytes BE (1s)', function() {
        assert.deepEqual(byteData.fromBytes([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                48, {"signed": true, "be": true}),
            [1, 1]);
    });
    it('should turn 2 48-bit unsigned ints to 12 bytes BE (1s)', function() {
        assert.deepEqual(byteData.fromBytes([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                48, {"be": true}),
            [1, 1]);
    });
    it('should turn 1 48-bit ints to 6 bytes hex BE (120637438355317)', function() {
        assert.deepEqual(byteData.fromBytes(["6d", "b8", "17", "a8", "e7", "75"],
                48, {"base": 16, "be": true}),
            [120637438355317]);
    });
    it('should turn 1 48-bit unsigned ints to 6 bytes hex BE (120637438355317)', function() {
        let bytes = ["6d", "b8", "17", "a8", "e7", "75", 
            "00", "00", "00", "00", "00", "01", 
            "00", "00", "00", "00", "00", "01"];
        assert.deepEqual(byteData.fromBytes(bytes, 48, {"base": 16, "be": true}),
            [120637438355317, 1, 1]);
    });

    // 64-bit
    it('should turn 1 64-bit float to 8 bytes BE (pi)', function() {
        assert.deepEqual(byteData.fromBytes([64, 9, 33, 251, 84, 68, 45, 24],
                64, {"be": true}),
            [3.141592653589793]);
    });
});
