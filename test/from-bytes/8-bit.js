
var assert = require('assert');

describe('8-bit from bytes', function() {
    
    let byteData = require('../../index.js');

    it('should turn 1 byte to a 8-bit uInt', function() {
        assert.deepEqual(byteData.uIntFrom1Byte(
            [0,0]),
            [0,0]);
    });

    it('should turn 1 hex byte to a 8-bit uInt (max range)', function() {
        assert.deepEqual(byteData.uIntFrom1Byte(
            ["0","ff"], 16),
            [0, 255]);
    });
    it('should turn 1 hex byte to a 8-bit int (max range)', function() {
        assert.deepEqual(byteData.intFrom1Byte(
            ["ff","7f"], 16),
            [-1, 127]);
    });
    it('should turn 1 hex byte to a 8-bit int (max range)', function() {
        assert.deepEqual(byteData.intFrom1Byte(
            ["80","7f"], 16),
            [-128, 127]);
    });
    it('should turn 1 bin byte to a 8-bit uInt (max range)', function() {
        assert.deepEqual(byteData.uIntFrom1Byte(
            ["00000000","11111111"], 2),
            [0, 255]);
    });
    it('should turn 1 bin byte to a 8-bit int (max range)', function() {
        assert.deepEqual(byteData.intFrom1Byte(
            ["10000000","01111111"], 2),
            [-128, 127]);
    });
});
