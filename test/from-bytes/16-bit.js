
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
});
