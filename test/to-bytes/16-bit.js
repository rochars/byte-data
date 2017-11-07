
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

    // 16-bit floats: 0s
    it('should turn 2 bytes to 1 16-bit float (0)', function() {
        assert.deepEqual(byteData.floatTo2Bytes(
            [0]),
            [0, 0]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (0)', function() {
        assert.deepEqual(byteData.floatTo2Bytes(
            [0], 16),
            ["00", "00"]);
    });
    it('should turn 2 bytes bin to 1 16-bit float (0)', function() {
        assert.deepEqual(byteData.floatTo2Bytes(
            [0], 2),
            ["00000000", "00000000"]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (1)', function() {
        assert.deepEqual(byteData.floatTo2Bytes(
            [1], 16),
            ["3c", "00"]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (1/3)', function() {
        assert.deepEqual(byteData.floatTo2Bytes(
            [0.33325], 16),
            ["35", "55"]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (-2)', function() {
        assert.deepEqual(byteData.floatTo2Bytes(
            [-2], 16),
            ["c0", "00"]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(byteData.floatTo2Bytes(
            [65504], 16),
            ["7b", "ff"]);
    });
    it('should turn 4 bytes hex to 2 16-bit float (65504, 0.33325, extra byte)', function() {
        assert.deepEqual(byteData.floatTo2Bytes(
            [65504, 0.33325], 16),
            ["7b", "ff", "35", "55"]);
    });
});
