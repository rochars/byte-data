
var assert = require('assert');

describe('from-bytes', function() {
    
    let byteData = require('../index.js');

    describe('#indexOf()', function() {
        it('should turn 8 bytes to 1 64-bit float', function() {
            assert.equal(byteData.floatFrom8Bytes(
                [75,40,253,58,221,154,191,63])[0],
                0.123456789876543);
        });
        it('should turn 8 bytes to 1 64-bit float', function() {
            assert.equal(byteData.floatFrom8Bytes(
                [0,0,0,0,0,0,0,0])[0].toFixed(20),
                0);
        });
        it('should turn 16 bytes to 2 64-bit floats', function() {
            assert.equal(byteData.floatFrom8Bytes(
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])[0].toFixed(20),
                0);
            assert.equal(byteData.floatFrom8Bytes(
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])[1].toFixed(20),
                0);
        });

        /*
        // 48 bit unsigned
        it('should turn 6 bytes to a 48-bit int (0)', function() {
            assert.deepEqual(byteData.uIntFrom6Bytes(
                [0,0,0,0,0,0]),
                [0]);
        });
        it('should turn 6 bytes to a 48-bit int (max)', function() {
            //assert.deepEqual(byteData.uIntFrom6Bytes(
            //    [255,255,255,255,255,255]),
            //    [281474976710655]);
        });
        */

        it('should turn 8 bytes to 2 32-bit floats', function() {
            assert.deepEqual(byteData.floatFrom4Bytes(
                [0,0,0,0,0,0,0,0]),
                [0,0]);
        });
        it('should turn 8 bytes to 2 32-bit ints', function() {
            assert.deepEqual(byteData.intFrom4Bytes(
                [0,0,0,0,0,0,0,0]),
                [0,0]);
        });

        it('should turn 3 bytes to a 24-bit int', function() {
            assert.deepEqual(byteData.intFrom3Bytes(
                [0,0,0,0,0,0]),
                [0,0]);
        });

        it('should turn 2 bytes to a 16-bit int', function() {
            assert.deepEqual(byteData.intFrom2Bytes(
                [0,0,0,0]),
                [0,0]);
        });

        it('should turn 1 byte to a 8-bit uInt', function() {
            assert.deepEqual(byteData.uIntFrom1Byte(
                [0,0]),
                [0,0]);
        });

        it('should turn bytes to a string', function() {
            assert.deepEqual(byteData.stringFromBytes(
                [97, 98]),
                "ab");
        });
    });
});
