
var assert = require('assert');

describe('interface', function() {
    
    let byteData = require('../index.js');

    // to bytes
    it('should turn a 64-bit float to 8 bytes', function() {
        assert.deepEqual(byteData.doubleTo8Bytes([0]), [0,0,0,0,0,0,0,0]);
    });

    it('should turn a 64-bit float to 8 bytes', function() {
        assert.deepEqual(byteData.floatTo8Bytes([0]), [0,0,0,0,0,0,0,0]);
    });

    it('should turn a 32-bit float to 8 bytes', function() {
        assert.deepEqual(byteData.floatTo4Bytes([0]), [0,0,0,0]);
    });

    it('should turn a 32-bit int to 8 bytes', function() {
        assert.deepEqual(byteData.intTo4Bytes([0]), [0,0,0,0]);
    });

    it('should turn a 24-bit int to 3 bytes', function() {
        assert.deepEqual(byteData.intTo3Bytes([0]), [0,0,0]);
    });

    it('should turn a 16-bit int to 2 bytes', function() {
        assert.deepEqual(byteData.intTo2Bytes([0]), [0,0]);
    });

    it('should turn a 8-bit uInt to 1 byte', function() {
        assert.deepEqual(byteData.intTo1Byte([0]), [0]);
    });

    it('should turn a string to bytes', function() {
        assert.deepEqual(byteData.stringToBytes("ab"), [97, 98]);
    });

    // from bytes
    it('should turn 8 bytes to 64-bit a float', function() {
        // [0,0,0,0,0,0,0,64] == -0
        assert.deepEqual(byteData.floatFrom8Bytes([0,0,0,0,0,0,0,0]), [0]);
        assert.deepEqual(byteData.floatFrom8Bytes([0,0,0,0,0,0,0,64]), [0]);
    });
    it('should turn 8 bytes to 64-bit a float', function() {
        assert.deepEqual(byteData.doubleFrom8Bytes([0,0,0,0,0,0,0,0]), [0]);
    });

    it('should turn 8 bytes to a 32-bit float', function() {
        assert.deepEqual(byteData.intFrom4Bytes([0,0,0,0]), [0]);
    });

    it('should turn 8 bytes to a 32-bit int', function() {
        assert.deepEqual(byteData.intFrom4Bytes([0,0,0,0]), [0]);
    });

    it('should turn 3 bytes to a 24-bit int', function() {
        assert.deepEqual(byteData.intFrom3Bytes([0,0,0]), [0]);
    });

    it('should turn 2 bytes to a 16-bit int', function() {
        assert.deepEqual(byteData.intFrom2Bytes([0,0]), [0]);
    });

    it('should turn 1 byte to a 8-bit uInt', function() {
        assert.deepEqual(byteData.uIntFrom1Byte([0]), [0]);
    });

    it('should turn 1 byte to a 8-bit int', function() {
        assert.deepEqual(byteData.intFrom1Byte([255]), [-1]);
    });

    it('should turn bytes to a string', function() {
        assert.deepEqual(byteData.stringFromBytes([97, 98]), "ab");
    });

    it('should find the "ab" among the junk', function() {
        let index = byteData.findString([1, 0, 1, 100, 97, 98, 2, 2, 0], "ab");
        assert.equal(index, 4);
        //assert.deepEqual(byteData.stringFromBytes([97, 98]), "ab");
    });

    it('should return -1 if the string is not found', function() {
        let index = byteData.findString([1, 0, 1, 100, 95, 98, 2, 2, 0], "ab");
        assert.equal(index, -1);
        //assert.deepEqual(byteData.stringFromBytes([97, 98]), "ab");
    });
});
