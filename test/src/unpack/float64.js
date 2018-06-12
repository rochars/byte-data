/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');
let float64 = byteData.types.float64;

describe('unpack float64', function() {
    
    it('should turn 8 bytes to 1 64-bit float', function() {
        assert.equal(
            byteData.unpackArray([75,40,253,58,221,154,191,63], float64)[0],
            0.123456789876543);
    });
    it('should turn 7 bytes to 0 64-bit float (not enough bytes)', function() {
        assert.deepEqual(
            byteData.unpackArray([75,40,253,58,221,154,191], float64),
            []);
    });
    it('should turn 8 bytes to 1 64-bit float (Uint8Array)', function() {
        assert.equal(
            byteData.unpackArray(
                new Uint8Array([75,40,253,58,221,154,191,63]), float64)[0],
            0.123456789876543);
    });
    it('should turn 8 bytes to 1 64-bit float (Buffer)', function() {
        assert.equal(
            byteData.unpackArray(
                new Buffer.from([75,40,253,58,221,154,191,63]), float64)[0],
            0.123456789876543);
    });
    it('should turn 9 bytes to 1 64-bit float (ignore the extra byte) (Buffer)', function() {
        assert.equal(
            byteData.unpackArray(
                new Buffer.from([75,40,253,58,221,154,191,63,0]), float64)[0],
            0.123456789876543);
    });
    it('should turn 8 bytes to 1 64-bit float', function() {
        assert.equal(
            byteData.unpackArray(
                [0,0,0,0,0,0,0,0], float64)[0].toFixed(15),
            0);
    });
    it('should turn 16 bytes to 2 64-bit floats', function() {
        assert.equal(
            byteData.unpackArray(
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], float64)[0].toFixed(15),
            0);
        assert.equal(
            byteData.unpackArray(
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], float64)[1].toFixed(15),
            0);
    });
    it('should turn 8 bytes bin to 1 64-bit float', function() {
        assert.equal(
            byteData.unpackArray(
                [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ], float64, 2)[0].toFixed(15),
            0);
    });
    it('should turn 8 bytes bin to 1 64-bit float', function() {
        assert.equal(
            byteData.unpackArray(
                [
                    75,
                    40,
                    253,
                    58,
                    221,
                    154,
                    191,
                    63
                ], float64, 2)[0].toFixed(15),
            0.123456789876543);
    });
    it('should turn 8 bytes to 1 64-bit float (31.41592653589793)', function() {
        assert.deepEqual(
            byteData.unpackArray([94,56,85,41,122,106,63,64], float64),
            [31.41592653589793]);
    });
    it('should turn 8 bytes to 1 64-bit float (314159265358979.3)', function() {
        assert.deepEqual(
            byteData.unpackArray([53,72,162,118,158,219,241,66], float64),
            [314159265358979.3]);
    });
    it('should turn 8 bytes hex to 1 64-bit float (2)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,0,0,0,0,0,64], float64, 16),
            [2]);
    });
});
