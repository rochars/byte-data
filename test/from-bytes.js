
var assert = require('assert');

describe('from-bytes', function() {
    
    let byteData = require('../index.js');

    describe('#indexOf()', function() {
        it('should turn 8 bytes to 1 64-bit float', function() {
            assert.equal(byteData.floatFrom8Bytes(
                [75,40,253,58,221,154,191,63])[0],
                0.123456789876543);
        });
        it('should turn 8 bytes to 1 64-bit float (Uint8Array)', function() {
            assert.equal(byteData.floatFrom8Bytes(
                new Uint8Array([75,40,253,58,221,154,191,63]))[0],
                0.123456789876543);
        });
        it('should turn 8 bytes to 1 64-bit float (Buffer)', function() {
            assert.equal(byteData.floatFrom8Bytes(
                new Buffer.from([75,40,253,58,221,154,191,63]))[0],
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

        // 32
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
