
var assert = require('assert');

describe('32-bit to bytes', function() {
    
    let byteData = require('../../index.js');

    // 32-bit / 4 bytes
    it('should turn 2 signed 32-bit floats to 8 bytes (0s)', function() {
        assert.deepEqual(byteData.floatTo4Bytes([0, 0]), 
            [0,0,0,0,0,0,0,0]);
    });
    it('should turn 1 signed 32-bit float to 4 bytes (pi)', function() {
        assert.deepEqual(byteData.floatTo4Bytes([2.147483647]), 
            [95,112,9,64]);
    });
    it('should turn 1 signed 32-bit float to 4 bytes', function() {
        assert.deepEqual(byteData.floatTo4Bytes([2.147483647], 16), 
            ["5f","70","09","40"]);
    });
    it('should turn 1 signed 32-bit float to 4 bytes (1)', function() {
        assert.deepEqual(byteData.floatTo4Bytes([214748364.7]), 
            [205,204,76,77]);
    });

    it('should turn 2 signed 32-bit int to 8 bytes (max range)', function() {
        assert.deepEqual(byteData.intTo4Bytes([-2147483648, 2147483647]),
            [0,0,0,128,255,255,255,127]);
    });
    it('should turn 2 unsigned 32-bit ints to 8 bytes (0s)', function() {
        assert.deepEqual(byteData.intTo4Bytes([0, 0]), 
            [0,0,0,0,0,0,0,0]);
    });
    it('should turn 2 unsigned 32-bit int to 8 bytes (max range)', function() {
        assert.deepEqual(byteData.intTo4Bytes([0, 4294967295]),
            [0,0,0,0,255,255,255,255]);
    });

    it('should turn 1 signed 32-bit int to 4 bytes bin (min range)', function() {
        assert.deepEqual(byteData.intTo4Bytes([-2147483648], 2),
            ["00000000", "00000000","00000000","10000000",]);
    });
    it('should turn 1 signed 32-bit int to 4 bytes bin (max range)', function() {
        assert.deepEqual(byteData.intTo4Bytes([2147483647], 2),
            ["11111111","11111111","11111111","01111111"]);
    });

    it('should turn 1 signed 32-bit int to 4 bytes bin (max range)', function() {
        assert.deepEqual(byteData.intTo4Bytes([-2147483648], 16),
            ["00","00","00","80"]);
    });
    it('should turn 1 unsigned 32-bit int to 4 bytes hex (max range)', function() {
        assert.deepEqual(byteData.intTo4Bytes([4294967295], 16),
            ["ff","ff","ff","ff"]);
    });

});
