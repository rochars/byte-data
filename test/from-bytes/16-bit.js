
var assert = require('assert');

describe('16-bit from bytes', function() {
    
    let byteData = require('../../index.js');

    it('should turn 2 bytes to a 16-bit int', function() {
        assert.deepEqual(byteData.intFrom2Bytes(
            [0,0,0,0]),
            [0,0]);
    });
    it('should turn 4 bytes bin to 2 16-bit ints (max range)', function() {
        assert.deepEqual(byteData.intFrom2Bytes(
            ["00000000", "10000000", "11111111", "01111111"], 2),
            [-32768, 32767]);
    });
    it('should turn 4 bytes bin to 2 16-bit uInts (max range)', function() {
        assert.deepEqual(byteData.uIntFrom2Bytes(
            ["00000000","00000000","11111111","11111111"], 2),
            [0, 65535]);
    });
    it('should turn 5 bytes bin to 2 16-bit uInts (ignore the extra byte) (max range)', function() {
        assert.deepEqual(byteData.uIntFrom2Bytes(
            ["00000000","00000000","11111111","11111111","11111111"], 2),
            [0, 65535]);
    });
    it('should turn 1 byte bin to 0 16-bit uInts (not enough bytes)', function() {
        assert.deepEqual(byteData.uIntFrom2Bytes(
            ["11111111"], 2),
            []);
    });
    it('should turn 4 bytes hex to 2 16-bit ints (max range)', function() {
        assert.deepEqual(byteData.intFrom2Bytes(
            ["0","80","ff","7f"], 16),
            [-32768, 32767]);
    });
    it('should turn 4 bytes hex to 2 16-bit uInts (max range)', function() {
        assert.deepEqual(byteData.uIntFrom2Bytes(
            ["0","0","ff","ff"], 16),
            [0, 65535]);
    });

    // 16-bit floats: 0s
    it('should turn 2 bytes to 1 16-bit float (0)', function() {
        assert.deepEqual(byteData.floatFrom2Bytes(
            [0, 0]),
            [0]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (0)', function() {
        assert.deepEqual(byteData.floatFrom2Bytes(
            ["0", "0"], 16),
            [0]);
    });
    it('should turn 2 bytes bin to 1 16-bit float (0)', function() {
        assert.deepEqual(byteData.floatFrom2Bytes(
            ["00000000", "00000000"], 2),
            [0]);
    });
    it('should turn 2 bytes bin to 1 16-bit float (0)', function() {
        assert.deepEqual(byteData.floatFrom2Bytes(
            ["c0", "00"], 16),
            [-2]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (1)', function() {
        assert.deepEqual(byteData.floatFrom2Bytes(
            ["3c", "00"], 16),
            [1]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (1/3)', function() {
        assert.deepEqual(byteData.floatFrom2Bytes(
            ["35", "55"], 16)[0].toFixed(5),
            0.33325);
    });
    it('should turn 2 bytes hex to 1 16-bit float (0.00006)', function() {
        assert.deepEqual(byteData.floatFrom2Bytes(
            ["4", "0"], 16)[0].toFixed(5),
            0.00006);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(byteData.floatFrom2Bytes(
            ["7b", "ff"], 16)[0],
            65504);
    });
    it('should turn 4 bytes hex to 2 16-bit float (65504, 0.33325)', function() {
        let halfs = byteData.floatFrom2Bytes(["7b", "ff", "35", "55"], 16);
        assert.equal(halfs[0], 65504);
        assert.equal(halfs[1].toFixed(5), 0.33325);
    });
    it('should turn 5 bytes hex to 2 16-bit float (65504, 0.33325, extra byte)', function() {
        let halfs = byteData.floatFrom2Bytes(["7b", "ff", "35", "55","80"], 16);
        assert.equal(halfs[0], 65504);
        assert.equal(halfs[1].toFixed(5), 0.33325);
    });
});
