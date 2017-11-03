
var assert = require('assert');

describe('extras', function() {
    
    let byteData = require('../index.js');

    // packNibbles
    it('should pack two nibbles as one byte', function() {
        packed = byteData.packNibbles([1,4])
        assert.deepEqual(packed, [20]);
    });
    it('should pack two nibbles as one byte', function() {
        packed = byteData.packNibbles([1,15])
        assert.deepEqual(packed, [31]);
    });
    it('should pack two nibbles as one byte', function() {
        packed = byteData.packNibbles([15,15])
        assert.deepEqual(packed, [255]);
    });
    it('should pack a stream of nibbles into a stream of bytes', function() {
        packed = byteData.packNibbles([15,15,1,4,1,15])
        assert.deepEqual(packed, [255,20,31]);
    });
    it('packed should be half the size of the original', function() {
        let original = [15,15,1,4,1,15];
        packed = byteData.packNibbles(original)
        assert.deepEqual(packed.length, original.length / 2);
    });

    // unpackNibbles
    it('should unpack one nibbles as two byte', function() {
        unpacked = byteData.unpackNibbles([20])
        assert.deepEqual(unpacked, [1,4]);
    });
    it('should unpack one nibbles as two byte', function() {
        unpacked = byteData.unpackNibbles([31])
        assert.deepEqual(unpacked, [1,15]);
    });
    it('should unpack one nibbles as two byte', function() {
        unpacked = byteData.unpackNibbles([255])
        assert.deepEqual(unpacked, [15,15]);
    });
    it('should pack a stream of bytes into a stream of nibbles', function() {
        unpacked = byteData.unpackNibbles([255,20,31])
        assert.deepEqual(unpacked, [15,15,1,4,1,15]);
    });
});
