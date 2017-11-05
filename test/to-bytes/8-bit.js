
var assert = require('assert');

describe('8-bit to bytes', function() {
    
    let byteData = require('../../index.js');

    // 8-bit / 1 byte unsigned
    it('should turn 2 8-bit unsigned int to 2 bytes (0s)', function() {
        assert.deepEqual(byteData.intTo1Byte([0, 0]),
            [0, 0]);
    });
    it('should turn 2 8-bit unsigned int to 2 bytes (min, max)', function() {
        assert.deepEqual(byteData.intTo1Byte([0, 255]),
            [0, 255]);
    });
    it('should turn 1 8-bit unsigned int to 1 byte', function() {
        assert.deepEqual(byteData.intTo1Byte([1]),
            [1]);
    });

    // 8-bit / 1 byte signed
    it('should turn 2 8-bit signed int to 2 bytes (0s)', function() {
        assert.deepEqual(byteData.intTo1Byte([0, 0]),
            [0, 0]);
    });
    it('should turn 2 8-bit signed int to 2 bytes (-128, 127)', function() {
        assert.deepEqual(byteData.intTo1Byte([-128, 127]),
            [128, 127]);
    });
    it('should turn 1 8-bit signed int to 1 byte (-1)', function() {
        assert.deepEqual(byteData.intTo1Byte([-1]),
            [255]);
    });
    it('should turn 1 8-bit signed int to 1 byte (-1, 5)', function() {
        assert.deepEqual(byteData.intTo1Byte([-1, 5]),
            [255, 5]);
    });
    it('should turn 1 8-bit signed int to 1 byte hex (-1)', function() {
        assert.deepEqual(byteData.intTo1Byte([-1], 16),
            ['ff']);
    });
    it('should turn 1 8-bit signed int to 1 byte hex (-1)', function() {
        assert.deepEqual(byteData.intTo1Byte([127], 16),
            ['7f']);
    });
    it('should turn 1 8-bit signed int to 1 byte hex (-1)', function() {
        assert.deepEqual(byteData.intTo1Byte([-128], 16),
            ['80']);
    });

});
