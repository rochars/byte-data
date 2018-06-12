/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');
let float16 = byteData.types.float16;

describe('unpack float16', function() {

    it('should turn 2 bytes to 1 16-bit float (0)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0], float16),
            [0]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (0)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0], float16, 16),
            [0]);
    });
    it('should turn 2 bytes bin to 1 16-bit float (0)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0], float16, 2),
            [0]);
    });    
    it('should turn 2 bytes bin to 1 16-bit float (0)', function() {
        assert.deepEqual(
            byteData.unpackArray([0,192], float16, 16),
            [-2]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (1)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 60], float16, 16),
            [1]);
    });

    it('should turn 2 bytes hex to 1 16-bit float (1/3)', function() {
        assert.deepEqual(
            byteData.unpackArray([85, 53], float16, 16)[0].toFixed(5),
            0.33325);
    });
    it('should turn 2 bytes hex to 1 16-bit float (0.00006)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 4], float16, 16)[0].toFixed(5),
            0.00006);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.unpackArray([64, 86], float16, 16)[0],
            100);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.unpackArray([208, 95], float16, 16)[0],
            500);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.unpackArray([208, 99], float16, 16)[0],
            1000);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.unpackArray([226, 112], float16, 16)[0],
            10000);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.unpackArray([83, 119], float16, 16)[0],
            30000);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.unpackArray([226, 120], float16, 16)[0],
            40000);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.unpackArray([255, 123], float16, 16)[0],
            65504);
    });
    it('should turn 4 bytes hex to 2 16-bit float (65504, 0.33325)', function() {
        let halfs = byteData.unpackArray(
            [208, 95, 85, 53], float16, 16);
        assert.equal(halfs[0], 500);
        assert.equal(halfs[1].toFixed(5), 0.33325);
    });
    it('should turn 5 bytes hex to 2 16-bit float (65504)', function() {
        let halfs = byteData.unpackArray([255, 123], float16, 16);
        assert.equal(halfs[0], 65504);
    });
    it('should turn 5 bytes hex to 2 16-bit float (65504, 0.33325, extra byte)', function() {
        let halfs = byteData.unpackArray(
            [255, 123, 85, 53,128], float16, 16);
        assert.equal(halfs[0], 65504);
        assert.equal(halfs[1].toFixed(5), 0.33325);
    });
});
