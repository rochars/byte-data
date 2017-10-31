
var assert = require('assert');

describe('to-bytes', function() {
    
    let byteData = require('../index.js');

    describe('#indexOf()', function() {

        // 64-bit / 8 bytes
        it('should turn 2 64-bit floats to 16 bytes (-1, 1)', function() {
            assert.deepEqual(byteData.floatTo8Bytes([1,-1]),
                [0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,191]);
        });

        it('should turn 2 64-bit floats to 16 bytes (0s)', function() {
            assert.deepEqual(byteData.floatTo8Bytes([0, 0]),
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
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

        // 32-bit / 4 bytes
        it('should turn 2 signed 32-bit floats to 8 bytes (0s)', function() {
            assert.deepEqual(byteData.floatTo4Bytes([0, 0]), 
                [0,0,0,0,0,0,0,0]);
        });
        it('should turn 1 signed 32-bit float to 4 bytes (pi)', function() {
            assert.deepEqual(byteData.floatTo4Bytes([2.147483647]), 
                [95,112,9,64]);
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

        // 24-bit / 3 bytes 
        // signed
        it('should turn 2 signed 24-bit ints to 6 bytes (max range)', function() {
            assert.deepEqual(byteData.intTo3Bytes(
                [-8388608, 8388607]),
                [0,0,128,255,255,127]
            );
        });
        it('should turn 2 signed 24-bit ints to 6 bytes (0s)', function() {
            assert.deepEqual(byteData.intTo3Bytes(
                [0, 0]),
                [0, 0, 0, 0, 0, 0]
            );
        });
        it('should turn 2 unsigned 24-bit ints to 6 bytes (max range)', function() {
            assert.deepEqual(byteData.intTo3Bytes(
                [0, 16777215]),
                [0,0,0,255,255,255]
            );
        });
        it('should turn 2 unsigned 24-bit ints to 6 bytes (0s)', function() {
            assert.deepEqual(byteData.intTo3Bytes(
                [0, 0]),
                [0, 0, 0, 0, 0, 0]
            );
        });

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

        // string
        it('should turn a 2 char string to bytes', function() {
            assert.deepEqual(byteData.stringToBytes("ab"),
                [97, 98]);
        });

        it('should turn a 1 char string to bytes', function() {
            assert.deepEqual(byteData.stringToBytes("a"),
                [97]);
        });
    });
});
