
var assert = require('assert');

describe('64-bit to bytes', function() {
    
    let byteData = require('../../index.js');

    // 64-bit / 8 bytes
    it('should turn 2 64-bit floats to 16 bytes (-1, 1)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([1,-1]),
            [0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,191]);
    });
    it('should turn 1 64-bit floats to 16 bytes hex (-1)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([-1], 16),
            ['00','00','00','00','00','00','f0','bf']);
    });
    it('should turn 1 64-bit floats to 16 bytes hex (-0.5)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([-0.5], 16),
            ['00','00','00','00','00','00','e0','bf']);
    });
    it('should turn 2 64-bit floats to 16 bytes (0s)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([0, 0]),
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    });
    it('should turn 3 64-bit floats to 16 bytes (0 0 1)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([0, 0, 1]),
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63]);
    });
    it('should turn 3 64-bit floats to 16 bytes (0 1 0)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([0, 1, 0]),
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0]);
    });
    it('should turn 1 64-bit floats to 8 bytes (0.5)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([0.5]),
            [0,0,0,0,0,0,224,63]);
    });
    it('should turn 1 64-bit float to 8 bytes (-0.5)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([-0.5]),
            [0,0,0,0,0,0,224,191]);
    });
    //
    it('should turn 1 64-bit float to 8 bytes (pi)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([3.141592653589793]),
            [24,45,68,84,251,33,9,64]);
    });
    it('should turn 1 64-bit float to 8 bytes (pi)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([9]),
            [0,0,0,0,0,0,34,64]);
    });
    it('should turn 1 64-bit float to 8 bytes (14)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([31.41592653589793]),
            [94,56,85,41,122,106,63,64]);
    });
    it('should turn 1 64-bit float to 8 bytes (1)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([314159265358979.3]),
            [53,72,162,118,158,219,241,66]);
    });
    it('should turn 1 64-bit float to 8 bytes (hex) (0)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([0], 16),
            ["00","00","00","00","00","00","00","00"]);
    })
});
