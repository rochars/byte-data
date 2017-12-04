/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');
let float16 = byteData.float16;

describe('unpack float16', function() {

    it('should turn 2 bytes to 1 16-bit float (0)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0], float16),
            [0]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (0)', function() {
        assert.deepEqual(
            byteData.unpackArray(["0", "0"], float16, 16),
            [0]);
    });
    it('should turn 2 bytes bin to 1 16-bit float (0)', function() {
        assert.deepEqual(
            byteData.unpackArray(["00000000", "00000000"], float16, 2),
            [0]);
    });    
    it('should turn 2 bytes bin to 1 16-bit float (0)', function() {
        assert.deepEqual(
            byteData.unpackArray(["00","c0"], float16, 16),
            [-2]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (1)', function() {
        assert.deepEqual(
            byteData.unpackArray(["00", "3c"], float16, 16),
            [1]);
    });

    it('should turn 2 bytes hex to 1 16-bit float (1/3)', function() {
        assert.deepEqual(
            byteData.unpackArray(["55", "35"], float16, 16)[0].toFixed(5),
            0.33325);
    });
    it('should turn 2 bytes hex to 1 16-bit float (0.00006)', function() {
        assert.deepEqual(
            byteData.unpackArray(["0", "4"], float16, 16)[0].toFixed(5),
            0.00006);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.unpackArray(["40", "56"], float16, 16)[0],
            100);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.unpackArray(["d0", "5f"], float16, 16)[0],
            500);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.unpackArray(["d0", "63"], float16, 16)[0],
            1000);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.unpackArray(["e2", "70"], float16, 16)[0],
            10000);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.unpackArray(["53", "77"], float16, 16)[0],
            30000);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.unpackArray(["e2", "78"], float16, 16)[0],
            40000);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.unpackArray(["ff", "7b"], float16, 16)[0],
            65504);
    });
    it('should turn 4 bytes hex to 2 16-bit float (65504, 0.33325)', function() {
        let halfs = byteData.unpackArray(
            ["d0", "5f", "55", "35"], float16, 16);
        assert.equal(halfs[0], 500);
        assert.equal(halfs[1].toFixed(5), 0.33325);
    });
    it('should turn 5 bytes hex to 2 16-bit float (65504)', function() {
        let halfs = byteData.unpackArray(["ff", "7b"], float16, 16);
        assert.equal(halfs[0], 65504);
    });
    it('should turn 5 bytes hex to 2 16-bit float (65504, 0.33325, extra byte)', function() {
        let halfs = byteData.unpackArray(
            ["ff", "7b", "55", "35","80"], float16, 16);
        assert.equal(halfs[0], 65504);
        assert.equal(halfs[1].toFixed(5), 0.33325);
    });
});
