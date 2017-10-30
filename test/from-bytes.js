
var assert = require('assert');

describe('from-bytes', function() {
    
    let byteData = require('../index.js');

    describe('#indexOf()', function() {
        /*
        it('should turn 8 bytes to 64-bit float', function() {
            assert.deepEqual(byteData.floatFrom8Bytes(
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
                [0,0]);
        });
        */
        it('should turn 8 bytes to a 32-bit float', function() {
            assert.deepEqual(byteData.floatFrom4Bytes(
                [0,0,0,0,0,0,0,0]),
                [0,0]);
        });

        it('should turn 8 bytes to a 32-bit int', function() {
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
