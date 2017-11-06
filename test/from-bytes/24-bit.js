
var assert = require('assert');

describe('24-bit from bytes', function() {
    
    let byteData = require('../../index.js');

    it('should turn 6 bytes to 2 24-bit ints', function() {
        assert.deepEqual(byteData.intFrom3Bytes(
            [0,0,0,0,0,0]),
            [0,0]);
    });
    it('should turn 6 bytes bin to 2 24-bit ints (max range)', function() {
        assert.deepEqual(byteData.intFrom3Bytes(
            ["00000000","00000000","10000000","11111111","11111111","01111111"], 2),
            [-8388608, 8388607]);
    });
    it('should turn 6 bytes bin to 2 24-bit uInts (max range)', function() {
        assert.deepEqual(byteData.uIntFrom3Bytes(
            ["00000000","00000000","00000000","11111111","11111111","11111111"], 2),
            [0,16777215]);
    });
    it('should turn 7 bytes bin to 2 24-bit uInts (ignore the extra byte) (max range)', function() {
        assert.deepEqual(byteData.uIntFrom3Bytes(
            ["00000000","00000000","00000000","11111111","11111111","11111111","11111111"], 2),
            [0,16777215]);
    });
    it('should turn 6 bytes hex to 2 24-bit ints (max range)', function() {
        assert.deepEqual(byteData.intFrom3Bytes(
            ["0","0","80", "ff","ff","7f"], 16),
            [-8388608, 8388607]);
    });
    it('should turn 6 bytes hex to 2 24-bit uInts (max range)', function() {
        assert.deepEqual(byteData.uIntFrom3Bytes(
            ["0","0","0","ff","ff","ff"], 16),
            [0,16777215]);
    });
});
