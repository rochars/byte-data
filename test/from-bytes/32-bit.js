
var assert = require('assert');

describe('32-bit from bytes', function() {
    
    let byteData = require('../../index.js');
        
    // 32
    it('should turn 4 bytes bin to 1 32-bit float', function() {
        assert.deepEqual(byteData.floatFrom4Bytes(
            ["01011111","01110000","00001001","01000000"], 2)[0].toFixed(7),
            2.1474836);
    });
    
    it('should turn 4 bytes hex to 1 32-bit float', function() {
        assert.deepEqual(byteData.floatFrom4Bytes(
            ["5f","70","9","40"], 16)[0].toFixed(7),
            2.1474836);
    });
    it('should turn 1 32-bit float to 4 bytes', function() {
        assert.deepEqual(
            byteData.floatFrom4Bytes([95,112,9,64])[0].toFixed(7),
            2.1474836);
    });
    it('should turn 8 bytes to 2 32-bit floats', function() {
        assert.deepEqual(byteData.floatFrom4Bytes(
            [0,0,0,0,0,0,0,0]),
            [0,0]);
    });

    // 32 bit ints
    it('should turn 8 bytes to 2 32-bit ints (0s)', function() {
        assert.deepEqual(byteData.intFrom4Bytes(
            [0,0,0,0,0,0,0,0]),
            [0,0]);
    });

    it('should turn 8 bytes bin to 2 32-bit ints (max range)', function() {
        assert.deepEqual(byteData.intFrom4Bytes(
            ["00000000","00000000","00000000","10000000",
            "11111111","11111111","11111111","01111111"], 2),
            [-2147483648,2147483647]);
    });
    it('should turn 8 bytes hex to 2 32-bit ints (max range)', function() {
        assert.deepEqual(byteData.intFrom4Bytes(
            ["0","0","0","80", "ff","ff","ff","7f"], 16),
            [-2147483648,2147483647]);
    });
    it('should turn 4 bytes hex to 1 32-bit ints (random negative)', function() {
        assert.deepEqual(byteData.intFrom4Bytes(
            ["e8","3","0","80"], 16),
            [-2147482648]);
    });

    it('should turn 4 bytes hex to 1 32-bit ints (random negative)', function() {
        assert.deepEqual(byteData.intFrom4Bytes(
            ["0","80","ff","ff"], 16),
            [-32768]);
    });
    it('should turn 8 bytes bin to 2 32-bit uInts (max range)', function() {
        assert.deepEqual(byteData.uIntFrom4Bytes(
            ["00000000","00000000","00000000","00000000",
            "11111111","11111111","11111111","11111111"], 2),
            [0,4294967295]);
    });
    it('should turn 8 bytes hex to 2 32-bit uInts (max range)', function() {
        assert.deepEqual(byteData.uIntFrom4Bytes(
            ["0","0","0","00", "ff","ff","ff","ff"], 16),
            [0,4294967295]);
    });
});
