
var assert = require('assert');

describe('16-bit to bytes', function() {
    
    let byteData = require('../../index.js');

    // 16-bit / 2 bytes
    // signed
    it('should turn 2 signed 16-bit ints to 4 bytes (0s)', function() {
        assert.deepEqual(byteData.intTo2Bytes([0, 0]),
            [0, 0, 0, 0]);
    });
    it('should turn 1 signed 16-bit int to 2 bytes (0)', function() {
        assert.deepEqual(byteData.intTo2Bytes([0]),
            [0, 0]);
    });
    it('should turn 2 signed 16-bit ints to 4 bytes (max range)', function() {
        assert.deepEqual(byteData.intTo2Bytes([-32768, 32767]),
            [0, 128, 255, 127]
        );
    });
    it('should turn 1 16-bit signed int to 1 byte hex (-1)', function() {
        assert.deepEqual(byteData.intTo2Bytes([-1], 16),
            ['ff', 'ff']);
    });

    // unsigned
    it('should turn 2 unsigned 16-bit ints to 4 bytes (0s)', function() {
        assert.deepEqual(byteData.intTo2Bytes([0, 0]),
            [0, 0, 0, 0]);
    });
    it('should turn 1 unsigned 16-bit int to 2 bytes (0)', function() {
        assert.deepEqual(byteData.intTo2Bytes([0]),
            [0, 0]);
    });
    it('should turn 2 unsigned 16-bit ints to 4 bytes (max range)', function() {
        assert.deepEqual(byteData.intTo2Bytes([0, 65535]),
            [0, 0, 255, 255]
        );
    });
    it('should turn 1 unsigned 16-bit int to 2 bytes (0)', function() {
        assert.deepEqual(byteData.intTo2Bytes([765], 16),
            ["fd", "02"]);
    });
});
