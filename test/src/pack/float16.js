/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../index.js');

describe('pack float16', function() { 
    
    it('should turn 2 bytes to 1 16-bit float (0)', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.float16, 16),
            [0, 0]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (0)', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.float16, 16),
            ["00", "00"]);
    });
    it('should turn 2 bytes bin to 1 16-bit float (0)', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.float16, 2),
            ["00000000", "00000000"]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (1)', function() {
        assert.deepEqual(
            byteData.packArray([1], byteData.float16, 16),
            ["00", "3c"]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (1/3)', function() {
        assert.deepEqual(
            byteData.packArray([0.33325], byteData.float16, 16),
            ["55","35"]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (-2)', function() {
        assert.deepEqual(
            byteData.packArray([-2], byteData.float16, 16),
            ["00", "c0"]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.packArray([100], byteData.float16, 16),
            ["40", "56"]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.packArray([500], byteData.float16, 16),
            ["d0", "5f"]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.packArray([1000], byteData.float16, 16),
            ["d0", "63"]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.packArray([10000], byteData.float16, 16),
            ["e2", "70"]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.packArray([30000], byteData.float16, 16),
            ["53", "77"]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.packArray([40000], byteData.float16, 16),
            ["e2", "78"]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.packArray([65504], byteData.float16, 16),
            ["ff", "7b"]);
    });
    it('should turn 4 bytes hex to 2 16-bit float (65504, 0.33325, extra byte)', function() {
        assert.deepEqual(
            byteData.packArray(
                [65504, 0.33325], byteData.float16, 16),
            ["ff", "7b", "55", "35"]);
    });
});
