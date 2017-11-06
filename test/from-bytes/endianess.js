
var assert = require('assert');

describe('little endiand and big endian reading', function() {
    
    let byteData = require('../../index.js');

    // 16-bit
    it('should turn 2 16-bit unsigned ints to 2 bytes BE (0s)', function() {
        assert.deepEqual(byteData.intFrom2Bytes([0, 0, 0, 0], 10, true),
            [0, 0]);
    });
    it('should turn 2 16-bit unsigned ints to 2 bytes LE (1s)', function() {
        assert.deepEqual(byteData.intFrom2Bytes([1, 0, 1, 0]),
            [1, 1]);
    });
    it('should turn 2 16-bit unsigned ints to 2 bytes BE (1s)', function() {
        assert.deepEqual(byteData.intFrom2Bytes([0, 1, 0, 1], 10, true),
            [1, 1]);
    });

    // 24-bit
    it('should turn 2 24-bit unsigned ints to 6 bytes BE (0s)', function() {
        assert.deepEqual(byteData.intFrom3Bytes([0, 0, 0, 0, 0, 0], 10, true),
            [0, 0]);
    });
    it('should turn 2 24-bit unsigned ints to 6 bytes LE (1s)', function() {
        assert.deepEqual(byteData.intFrom3Bytes([1, 0, 0, 1, 0, 0]),
            [1, 1]);
    });
    it('should turn 2 24-bit unsigned ints to 6 bytes BE (1s)', function() {
        assert.deepEqual(byteData.intFrom3Bytes([0, 0, 1, 0, 0, 1], 10, true),
            [1, 1]);
    });
    it('should turn 2 24-bit unsigned ints to 6 bytes BE (max range)', function() {
        assert.deepEqual(byteData.intFrom3Bytes(["80","00","00", "7f", "ff", "ff"], 16, true),
            [-8388608, 8388607]);
    });
    it('should turn 2 24-bit unsigned ints to 6 bytes BE', function() {
        assert.deepEqual(byteData.intFrom3Bytes(["80","00","00" , "00","00","01", "7f", "ff", "ff"], 16, true),
            [-8388608, 1, 8388607]);
    });

    // 32-bit
    it('should turn 2 32-bit unsigned ints to 8 bytes BE (0s)', function() {
        assert.deepEqual(byteData.intFrom4Bytes([0, 0, 0, 0, 0, 0, 0, 0], 10, true),
            [0, 0]);
    });
    it('should turn 2 32-bit unsigned ints to 8 bytes LE (1s)', function() {
        assert.deepEqual(byteData.intFrom4Bytes([1, 0, 0, 0, 1, 0, 0, 0]),
            [1, 1]);
    });
    it('should turn 2 32-bit unsigned ints to 8 bytes BE (1s)', function() {
        assert.deepEqual(byteData.intFrom4Bytes([0, 0, 0, 1, 0,0, 0, 1], 10, true),
            [1, 1]);
    });

    // 40-bit
    it('should turn 2 40-bit unsigned ints to 10 bytes BE (0s)', function() {
        assert.deepEqual(byteData.intFrom5Bytes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 10, true),
            [0, 0]);
    });
    it('should turn 2 40-bit unsigned ints to 10 bytes LE (1s)', function() {
        assert.deepEqual(byteData.intFrom5Bytes([1, 0, 0, 0, 0, 1, 0, 0, 0, 0]),
            [1, 1]);
    });
    it('should turn 2 40-bit unsigned ints to 10 bytes BE (1s)', function() {
        assert.deepEqual(byteData.intFrom5Bytes([0, 0, 0, 0, 1, 0, 0, 0, 0, 1], 10, true),
            [1, 1]);
    });

    // 48-bit
    it('should turn 2 48-bit unsigned ints to 12 bytes BE (0s)', function() {
        assert.deepEqual(byteData.intFrom6Bytes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 10, true),
            [0, 0]);
    });
    it('should turn 2 48-bit unsigned ints to 12 bytes LE (1s)', function() {
        assert.deepEqual(byteData.intFrom6Bytes([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]),
            [1, 1]);
    });
    it('should turn 2 48-bit unsigned ints to 12 bytes BE (1s)', function() {
        assert.deepEqual(byteData.intFrom6Bytes([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], 10, true),
            [1, 1]);
    });
    it('should turn 1 48-bit unsigned ints to 6 bytes hex BE (120637438355317)', function() {
        assert.deepEqual(byteData.intFrom6Bytes(["6d", "b8", "17", "a8", "e7", "75"], 16, 2),
            [120637438355317]);
    });
    it('should turn 1 48-bit unsigned ints to 6 bytes hex BE (120637438355317)', function() {
        let bytes = ["6d", "b8", "17", "a8", "e7", "75", 
            "00", "00", "00", "00", "00", "01", 
            "00", "00", "00", "00", "00", "01"];
        assert.deepEqual(byteData.intFrom6Bytes(bytes, 16, 2),
            [120637438355317, 1, 1]);
    });

    // 64-bit
    it('should turn 1 64-bit float to 8 bytes BE (pi)', function() {
        assert.deepEqual(byteData.floatFrom8Bytes([64, 9, 33, 251, 84, 68, 45, 24], 10, true),
            [3.141592653589793]);
    });

});
