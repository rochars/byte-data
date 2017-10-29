
var assert = require('assert');

describe('to-bytes', function() {
    
    let byteData = require('../index.js');

    describe('#indexOf()', function() {

        // to bytes
        it('should turn 1 64-bit float to 16 bytes', function() {
            assert.deepEqual(byteData.floatTo8Bytes([1,-1]),
                [0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,191]);
        });

        it('should turn 2 64-bit floats to 16 bytes', function() {
            assert.deepEqual(byteData.floatTo8Bytes([0, 0]),
                [0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,64]);
        });

        it('should turn a 32-bit float to 8 bytes', function() {
            assert.deepEqual(byteData.floatTo4Bytes([0, 0]), 
                [0,0,0,0,0,0,0,0]);
        });

        it('should turn a 32-bit int to 8 bytes', function() {
            assert.deepEqual(byteData.intTo4Bytes([0, 0]),
                [0,0,0,0,0,0,0,0]);
        });

        it('should turn a 24-bit int to 3 bytes', function() {
            assert.deepEqual(byteData.intTo3Bytes(
                [-8388608, 8388607]),
                [0,0,128,255,255,127]
            );
        });

        it('should turn two 16-bit int to 4 bytes (0s)', function() {
            assert.deepEqual(byteData.intTo2Bytes([0, 0]),
                [0, 0, 0, 0]);
        });

        it('should turn a 16-bit int to 2 bytes', function() {
            assert.deepEqual(byteData.intTo2Bytes([0]),
                [0, 0]);
        });

        it('should turn a 16-bit int to 4 bytes (max)', function() {
            assert.deepEqual(
                byteData.intTo2Bytes([-32768, 32767]),
                [0, 128, 255, 127]
            );
        });

        it('should turn a 8-bit uInt to 1 byte', function() {
            assert.deepEqual(byteData.uIntTo1Byte([0, 0]),
                [0, 0]);
        });

        it('should turn a 8-bit uInt to 1 byte', function() {
            assert.deepEqual(byteData.uIntTo1Byte([255, 128]),
                [255, 128]);
        });

        it('should turn 2 8-bit uInts to 2 bytes', function() {
            assert.deepEqual(byteData.uIntTo1Byte([255, 1]),
                [255, 1]);
        });

        it('should turn a string to bytes', function() {
            assert.deepEqual(byteData.stringToBytes("ab"),
                [97, 98]);
        });
    });
});
