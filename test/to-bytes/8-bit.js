
var assert = require('assert');

describe('8-bit to bytes', function() {
    
    let byteData = require('../../index.js');

    // 8-bit / 1 byte unsigned
    it('should turn 2 8-bit unsigned int to 2 bytes (0s)', function() {
        assert.deepEqual(byteData.toBytes([0, 0], 8, {"base": 10}),
            [0, 0]);
    });
    it('should turn 2 8-bit unsigned int to 2 bytes (min, max)', function() {
        assert.deepEqual(byteData.toBytes([0, 255], 8, {"base": 10}),
            [0, 255]);
    });
    it('should turn 1 8-bit unsigned int to 1 byte', function() {
        assert.deepEqual(byteData.toBytes([1], 8, {"base": 10}),
            [1]);
    });

    // 8-bit / 1 byte signed
    it('should turn 2 8-bit signed int to 2 bytes (0s)', function() {
        assert.deepEqual(byteData.toBytes([0, 0], 8, {"base": 10}),
            [0, 0]);
    });
    it('should turn 2 8-bit signed int to 2 bytes (-128, 127)', function() {
        assert.deepEqual(byteData.toBytes([-128, 127], 8, {"base": 10}),
            [128, 127]);
    });
    it('should turn 1 8-bit signed int to 1 byte (-1)', function() {
        assert.deepEqual(byteData.toBytes([-1], 8, {"base": 10}),
            [255]);
    });
    it('should turn 1 8-bit signed int to 1 byte (-1, 5)', function() {
        assert.deepEqual(byteData.toBytes([-1, 5], 8, {"base": 10}),
            [255, 5]);
    });
    it('should turn 1 8-bit signed int to 1 byte hex (-1)', function() {
        assert.deepEqual(byteData.toBytes([-1], 8, {"base": 16}),
            ['ff']);
    });
    it('should turn 1 8-bit signed int to 1 byte hex (-1)', function() {
        assert.deepEqual(byteData.toBytes([127], 8, {"base": 16}),
            ['7f']);
    });
    it('should turn 1 8-bit signed int to 1 byte hex (-1)', function() {
        assert.deepEqual(byteData.toBytes([-128], 8, {"base": 16}),
            ['80']);
    });

});
