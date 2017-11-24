
var assert = require('assert');

describe('24-bit to bytes', function() {
    
    let byteData = require('../../index.js');

    // 24-bit / 3 bytes 
    // signed
    it('should turn 2 signed 24-bit ints to 6 bytes (max range)', function() {
        assert.deepEqual(byteData.toBytes(
            [-8388608, 8388607], 24, {"base": 10}),
            [0,0,128,255,255,127]
        );
    });
    it('should turn 1 signed 24-bit int to 3 bytes hex (16777215)', function() {
        assert.deepEqual(byteData.toBytes(
            [16777215], 24, {"base": 16}),
            ["ff","ff","ff"]
        );
    });
    it('should turn 2 signed 24-bit ints to 6 bytes (0s)', function() {
        assert.deepEqual(byteData.toBytes(
            [0, 0], 24, {"base": 10}),
            [0, 0, 0, 0, 0, 0]
        );
    });
    it('should turn 2 unsigned 24-bit ints to 6 bytes (max range)', function() {
        assert.deepEqual(byteData.toBytes(
            [0, 16777215], 24, {"base": 10}),
            [0,0,0,255,255,255]
        );
    });
    it('should turn 2 unsigned 24-bit ints to 6 bytes (0s)', function() {
        assert.deepEqual(byteData.toBytes(
            [0, 0], 24, {"base": 10}),
            [0, 0, 0, 0, 0, 0]
        );
    });
    it('should turn 2 unsigned 24-bit ints to 6 bytes in a Uint8Array (0s)', function() {
        assert.deepEqual(byteData.toBytes(
            [0, 0], 24, {"buffer": true}),
            [0, 0, 0, 0, 0, 0]
        );
    });
});
