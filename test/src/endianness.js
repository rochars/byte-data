/*
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/endianness
 *
 */

var assert = require('assert');
const expect = require("chai").expect;

describe('little endiand and big endian swap', function() {
    
    const endianness = require("../../lib/endianness.js").default;
    
    // Errors
    it("should throw an error if input do not have enought bytes", function () {
        expect(function() {
            values = [1, 2, 3, 4,  5, 6, 7, 8,   9, 10];
            endianness(values, 4);
        }).to.throw("Bad buffer length.");
    });

    // 16-bit
    it('should swap 2 16-bit unsigned ints (0s)', function() {
        values = [0, 0, 0, 0];
        endianness(values, 2);
        assert.deepEqual(values,
            [0, 0, 0, 0]);
    });
    it('should swap 1 16-bit unsigned ints BE to LE (1s)', function() {
        values = [0, 1];
        endianness(values, 2);
        assert.deepEqual(values,
            [1, 0]);
    });
    it('should swap 2 16-bit unsigned ints LE to BE (1s)', function() {
        values = [1, 0, 1, 0];
        endianness(values, 2);
        assert.deepEqual(values,
            [0, 1, 0, 1]);
    });
    it('should swap 2 16-bit unsigned ints BE to LE (1s)', function() {
        values = [0, 1, 0, 1];
        endianness(values, 2);
        assert.deepEqual(values,
            [1, 0, 1, 0]);
    });

    // 24-bit
    it('should swap 1 24-bit unsigned ints LE to BE (1s)', function() {
        values = [1, 0, 0];
        endianness(values, 3);
        assert.deepEqual(values,
            [0, 0, 1]);
    });
    it('should swap 2 24-bit unsigned ints (0s)', function() {
        values = [0, 0, 0, 0, 0, 0];
        endianness(values, 3);
        assert.deepEqual(values,
            [0, 0, 0, 0, 0, 0]);
    });
    it('should swap 2 24-bit unsigned ints LE to BE (1s)', function() {
        values = [1, 0, 0, 1, 0, 0];
        endianness(values, 3);
        assert.deepEqual(values,
            [0, 0, 1, 0, 0, 1]);
    });
    it('should swap 2 24-bit unsigned ints BE to LE (1s)', function() {
        values = [0, 0, 1, 0, 0, 1];
        endianness(values, 3);
        assert.deepEqual(values,
            [1, 0, 0, 1, 0, 0]);
    });
    it('should swap 3 24-bit unsigned ints', function() {
        values = ["00","00","80", "01","00","00", "ff","ff", "7f"];
        endianness(values, 3);
        assert.deepEqual(values,
            ["80","00","00", "00","00","01", "7f","ff", "ff"]);
    });

    // 32-bit
    it('should swap 1 32-bit unsigned int LE to BE (1s)', function() {
        values = [1, 0, 0, 0];
        endianness(values, 4);
        assert.deepEqual(values,
            [0, 0, 0, 1]);
    });
    it('should swap 2 32-bit unsigned ints (0s))', function() {
        values = [0, 0, 0, 0, 0, 0, 0, 0];
        endianness(values, 4);
        assert.deepEqual(values,
            [0, 0, 0, 0, 0, 0, 0, 0]);
    });
    it('should swap 2 32-bit unsigned ints LE to BE (1s)', function() {
        values = [1, 0, 0, 0, 1, 0, 0, 0];
        endianness(values, 4);
        assert.deepEqual(values,
            [0, 0, 0, 1, 0, 0, 0, 1]);
    });
    it('should swap 2 32-bit unsigned ints BE to LE (1s)', function() {
        values = [0, 0, 0, 1, 0, 0, 0, 1];
        endianness(values, 4);
        assert.deepEqual(values,
            [1, 0, 0, 0, 1, 0, 0, 0]);
    });

    // 40-bit
    it('should swap 1 40-bit unsigned int LE to BE (1s)', function() {
        values = [1, 0, 0, 0, 0];
        endianness(values, 5);
        assert.deepEqual(values,
            [0, 0, 0, 0, 1]);
    });
    it('should swap 2 40-bit unsigned ints (0s)', function() {
        values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        endianness(values, 5);
        assert.deepEqual(values,
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
    it('should swap 2 40-bit unsigned ints LE to BE (1s)', function() {
        values = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0];
        endianness(values, 5);
        assert.deepEqual(values,
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    });
    it('should swap 2 40-bit unsigned ints BE to LE (1s)', function() {
        values = [0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        endianness(values, 5);
        assert.deepEqual(values,
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0]);
    });    
    
    // 48-bit
    it('should swap 1 48-bit unsigned int LE to BE (1s)', function() {
        values = [1, 0, 0, 0, 0, 0];
        endianness(values, 6);
        assert.deepEqual(values,
            [0, 0, 0, 0, 0, 1]);
    });
    it('should swap 2 48-bit unsigned ints (0s)', function() {
        values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        endianness(values, 6);
        assert.deepEqual(values,
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
    it('should swap 2 48-bit unsigned ints LE to BE (1s)', function() {
        values = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0];
        endianness(values, 6);
        assert.deepEqual(values,
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
    });
    it('should swap 2 48-bit unsigned ints BE to LE (1s)', function() {
        values = [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
        endianness(values, 6);
        assert.deepEqual(values,
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
    });
    it('should swap a 48-bit unsigned int LE to BE (120637438355317)', function() {
        values = ["75", "e7", "a8", "17", "b8", "6d"];
        endianness(values, 6);
        assert.deepEqual(values,
            ["6d", "b8", "17", "a8", "e7", "75"]);
    });
    
    // 56-bit
    it('should swap 1 56-bit value', function() {
        values = new Uint8Array([24, 45, 68, 84, 251, 33, 9]);
        endianness(values, 7);
        assert.deepEqual(values,
            [9, 33, 251, 84, 68, 45, 24]);
    });
    it('should swap 2 56-bit values', function() {
        values = new Uint8Array(
            [24, 45, 68, 84, 251, 33, 9, 24, 45, 68, 84, 251, 33, 23]);
        endianness(values, 7);
        assert.deepEqual(values,
            [9, 33, 251, 84, 68, 45, 24, 23, 33, 251, 84, 68, 45, 24]);
    });

    // 64-bit
    it('should swap 1 64-bit float', function() {
        values = [24, 45, 68, 84, 251, 33, 9, 64];
        endianness(values, 8);
        assert.deepEqual(values,
            [64, 9, 33, 251, 84, 68, 45, 24]);
    });
    it('should swap 3 64-bit values', function() {
        values = [24, 45, 68, 84, 251, 33, 9, 64,
             68, 24, 45, 84, 251, 33, 9, 64,
             24, 45, 68, 84, 33, 9, 251, 64];
        endianness(values, 8);
        assert.deepEqual(values,
            [64, 9, 33, 251, 84, 68, 45, 24,
             64, 9, 33, 251, 84, 45, 24, 68,
             64, 251, 9, 33, 84, 68, 45, 24]);
    });
});
