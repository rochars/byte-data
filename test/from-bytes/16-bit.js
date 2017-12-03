/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('16-bit from bytes: New API', function() {
    
    it('should turn 2 bytes to a 16-bit int', function() {
        assert.deepEqual(byteData.unpackArray(
            [0,0,0,0], byteData.uInt16),
            [0,0]);
    });
    it('should turn 4 bytes bin to 2 16-bit ints (max range)', function() {
        assert.deepEqual(byteData.unpackArray(
            ["00000000", "10000000", "11111111", "01111111"],
            byteData.int16, 2),
            [-32768, 32767]);
    });
    it('should turn 4 bytes bin to 2 16-bit uInts (max range)', function() {
        assert.deepEqual(byteData.unpackArray(
            ["00000000","00000000","11111111","11111111"],
            byteData.uInt16, 2),
            [0, 65535]);
    });
    it('should turn 5 bytes bin to 2 16-bit uInts (ignore the extra byte) (max range)', function() {
        assert.deepEqual(byteData.unpackArray(
            ["00000000","00000000","11111111","11111111","11111111"],
            byteData.uInt16, 2),
            [0, 65535]);
    });
    it('should turn 1 byte bin to 0 16-bit uInts (not enough bytes)', function() {
        assert.deepEqual(byteData.unpackArray(
            ["11111111"],
            byteData.uInt16, 2),
            []);
    });
    it('should turn 4 bytes hex to 2 16-bit ints (max range)', function() {
        assert.deepEqual(byteData.unpackArray(
            ["0","80","ff","7f"], byteData.int16, 16),
            [-32768, 32767]);
    });
    it('should turn 4 bytes hex to 2 16-bit uInts (max range)', function() {
        assert.deepEqual(byteData.unpackArray(
            ["0","0","ff","ff"], byteData.uInt16, 16),
            [0, 65535]);
    });

    // 16-bit floats: 0s
    it('should turn 2 bytes to 1 16-bit float (0)', function() {
        assert.deepEqual(byteData.fromBytes(
            [0, 0], 16, {"base": 10, "float": true}),
            [0]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (0)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["0", "0"], 16, {"base": 16, "float": true}),
            [0]);
    });
    it('should turn 2 bytes bin to 1 16-bit float (0)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["00000000", "00000000"], 16, {"base": 2, "float": true}),
            [0]);
    });
    
    it('should turn 2 bytes bin to 1 16-bit float (0)', function() {
        assert.deepEqual(
            byteData.unpackArray(["00","c0"], byteData.float16, 16),
            [-2]);
    });
    
    it('should turn 2 bytes hex to 1 16-bit float (1)', function() {
        assert.deepEqual(byteData.unpackArray(
            ["00", "3c"], byteData.float16, 16),
            [1]);
    });

    it('should turn 2 bytes hex to 1 16-bit float (1/3)', function() {
        assert.deepEqual(byteData.unpackArray(
            ["55", "35"], byteData.float16, 16)[0].toFixed(5),
            0.33325);
    });
    it('should turn 2 bytes hex to 1 16-bit float (0.00006)', function() {
        assert.deepEqual(byteData.unpackArray(
            ["0", "4"], byteData.float16, 16)[0].toFixed(5),
            0.00006);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(byteData.unpackArray(
            ["40", "56"], byteData.float16, 16)[0],
            100);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(byteData.unpackArray(
            ["d0", "5f"], byteData.float16, 16)[0],
            500);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(byteData.unpackArray(
            ["d0", "63"], byteData.float16, 16)[0],
            1000);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(byteData.unpackArray(
            ["e2", "70"], byteData.float16, 16)[0],
            10000);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(byteData.unpackArray(
            ["53", "77"], byteData.float16, 16)[0],
            30000);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(byteData.unpackArray(
            ["e2", "78"], byteData.float16, 16)[0],
            40000);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(byteData.unpackArray(
            ["ff", "7b"], byteData.float16, 16)[0],
            65504);
    });
    it('should turn 4 bytes hex to 2 16-bit float (65504, 0.33325)', function() {
        let halfs = byteData.unpackArray(
            ["d0", "5f", "55", "35"], byteData.float16, 16);
        assert.equal(halfs[0], 500);
        assert.equal(halfs[1].toFixed(5), 0.33325);
    });
    it('should turn 5 bytes hex to 2 16-bit float (65504)', function() {
        let halfs = byteData.unpackArray(
            ["ff", "7b"], byteData.float16, 16);
        assert.equal(halfs[0], 65504);
    });
    it('should turn 5 bytes hex to 2 16-bit float (65504, 0.33325, extra byte)', function() {
        let halfs = byteData.unpackArray(
            ["ff", "7b", "55", "35","80"], byteData.float16, 16);
        assert.equal(halfs[0], 65504);
        assert.equal(halfs[1].toFixed(5), 0.33325);
    });
});


describe('16-bit from bytes', function() {

    it('should turn 2 bytes to a 16-bit int', function() {
        assert.deepEqual(byteData.fromBytes(
            [0,0,0,0], 16, {"signed": false}),
            [0,0]);
    });
    it('should turn 4 bytes bin to 2 16-bit ints (max range)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["00000000", "10000000", "11111111", "01111111"],
            16, {"base": 2, "signed": true}),
            [-32768, 32767]);
    });
    it('should turn 4 bytes bin to 2 16-bit uInts (max range)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["00000000","00000000","11111111","11111111"],
            16, {"base": 2, "signed": false}),
            [0, 65535]);
    });
    it('should turn 5 bytes bin to 2 16-bit uInts (ignore the extra byte) (max range)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["00000000","00000000","11111111","11111111","11111111"],
            16, {"base": 2, "signed": false}),
            [0, 65535]);
    });
    it('should turn 1 byte bin to 0 16-bit uInts (not enough bytes)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["11111111"],
            16, {"base": 2, "signed": false}),
            []);
    });
    it('should turn 4 bytes hex to 2 16-bit ints (max range)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["0","80","ff","7f"], 16, {"base": 16, "signed": true}),
            [-32768, 32767]);
    });
    it('should turn 4 bytes hex to 2 16-bit uInts (max range)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["0","0","ff","ff"], 16, {"base": 16, "signed": false}),
            [0, 65535]);
    });

    // 16-bit floats: 0s
    /*
    it('should turn 2 bytes to 1 16-bit float (0)', function() {
        assert.deepEqual(byteData.fromBytes(
            [0, 0], 16, {"base": 10, "float": true}),
            [0]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (0)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["0", "0"], 16, {"base": 16, "float": true}),
            [0]);
    });
    it('should turn 2 bytes bin to 1 16-bit float (0)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["00000000", "00000000"], 16, {"base": 2, "float": true}),
            [0]);
    });
    it('should turn 2 bytes bin to 1 16-bit float (0)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["c0", "00"], 16, {"base": 16, "float": true}),
            [-2]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (1)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["3c", "00"], 16, {"base": 16, "float": true}),
            [1]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (1/3)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["35", "55"], 16, {"base": 16, "float": true})[0].toFixed(5),
            0.33325);
    });
    it('should turn 2 bytes hex to 1 16-bit float (0.00006)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["4", "0"], 16, {"base": 16, "float": true})[0].toFixed(5),
            0.00006);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["7b", "ff"], 16, {"base": 16, "float": true})[0],
            65504);
    });
    it('should turn 4 bytes hex to 2 16-bit float (65504, 0.33325)', function() {
        let halfs = byteData.fromBytes(["7b", "ff", "35", "55"],
            16, {"base": 16, "float": true});
        assert.equal(halfs[0], 65504);
        assert.equal(halfs[1].toFixed(5), 0.33325);
    });
    it('should turn 5 bytes hex to 2 16-bit float (65504, 0.33325, extra byte)', function() {
        let halfs = byteData.fromBytes(["7b", "ff", "35", "55","80"],
            16, {"base": 16, "float": true});
        assert.equal(halfs[0], 65504);
        assert.equal(halfs[1].toFixed(5), 0.33325);
    });
    */
});
