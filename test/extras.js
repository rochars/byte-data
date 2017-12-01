/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../index.js');

describe('extras', function() {
    
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
    it('should pad when packing a uneven number of nibbles', function() {
        let original = [15,15,1,4,1,15,1];
        packed = byteData.packNibbles(original)
        assert.deepEqual(packed, [255,20,31,16]); // 1 => 0001 => 00010000 = 16
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
    it('should read a padding zero when unpacking a uneven number of nibbles', function() {
        unpacked = byteData.unpackNibbles([255,20,31,16])
        assert.deepEqual(unpacked, [15,15,1,4,1,15,1,0]);
    });

    // packCrumbs
    it('should pack 4 crumbs as 1 byte', function() {
        packed = byteData.packCrumbs([1,2,0,3])
        assert.deepEqual(packed, [99]);
    });
    it('should pack 4 crumbs as 1 byte', function() {
        packed = byteData.packCrumbs([1,2,3,0])
        assert.deepEqual(packed, [108]);
    });
    it('should pack 4 crumbs as 1 byte (0s)', function() {
        packed = byteData.packCrumbs([0,0,0,0])
        assert.deepEqual(packed, [0]);
    });
    it('should pack 4 crumbs as 1 byte (3s)', function() {
        packed = byteData.packCrumbs([3,3,3,3])
        assert.deepEqual(packed, [255]);
    });
    it('should pad when packing a uneven number of crumbs 3', function() {
        let original = [1,1,1];
        packed = byteData.packCrumbs(original)
        assert.deepEqual(packed, [84]);
    });
    it('should pad when packing a uneven number of crumbs 2', function() {
        let original = [1,1];
        packed = byteData.packCrumbs(original)
        assert.deepEqual(packed, [80]);
    });
    it('should pad when packing a uneven number of crumbs', function() {
        let original = [1];
        packed = byteData.packCrumbs(original)
        assert.deepEqual(packed, [64]);
    });
    it('should pad when packing a uneven number of crumbs', function() {
        let original = [0,0,0,0,1];
        packed = byteData.packCrumbs(original)
        assert.deepEqual(packed, [0,64]);
    });
    it('should pad when packing a uneven number of crumbs', function() {
        let original = [0,0,0,1,1];
        packed = byteData.packCrumbs(original)
        assert.deepEqual(packed, [1,64]);
    });
    it('should pad when packing a uneven number of crumbs', function() {
        let original = [1,1,1,0];
        packed = byteData.packCrumbs(original)
        assert.deepEqual(packed, [84]);
    });
    it('should pad when packing a uneven number of crumbs', function() {
        let original = [1,1,0,0];
        packed = byteData.packCrumbs(original)
        assert.deepEqual(packed, [80]);
    });
    it('should pad when packing a uneven number of crumbs', function() {
        let original = [1,0,0,0];
        packed = byteData.packCrumbs(original)
        assert.deepEqual(packed, [64]);
    });

    // unpackCrumbs 
    it('should unpack one byte as 4 crumbs (3,3,3,3)', function() {
        unpacked = byteData.unpackCrumbs([255])
        assert.deepEqual(unpacked, [3,3,3,3]);
    });    
    it('should unpack one byte as 4 crumbs (1,1,0,0)', function() {
        unpacked = byteData.unpackCrumbs([80])
        assert.deepEqual(unpacked, [1,1,0,0]);
    });
    it('should unpack one byte as 4 crumbs (1,2,0,3)', function() {
        unpacked = byteData.unpackCrumbs([99])
        assert.deepEqual(unpacked, [1,2,0,3]);
    });
    it('should unpack 4 crumbs as 1 byte (1,2,3,0)', function() {
        unpacked = byteData.unpackCrumbs([108])
        assert.deepEqual(unpacked, [1,2,3,0]);
    });
    it('should pack a stream of bytes into a stream of crumbs', function() {
        unpacked = byteData.unpackCrumbs([255,108,80])
        assert.deepEqual(unpacked, [3,3,3,3,1,2,3,0,1,1,0,0]);
    });

    // packBooleans
    it('should pack 8 booleans as 1 byte', function() {
        packed = byteData.packBooleans([0,0,0,0,0,0,0,0])
        assert.deepEqual(packed, [0]);
    });
    it('should pack 8 booleans as 1 byte', function() {
        packed = byteData.packBooleans([1,1,1,1,1,1,1,1])
        assert.deepEqual(packed, [255]);
    });
    it('should pack 8 booleans as 1 byte (0s)', function() {
        packed = byteData.packBooleans([0,1,0,0,1,1,0,1])
        assert.deepEqual(packed, [77]);
    });
    it('should pack 8 booleans as 1 byte (0s)', function() {
        packed = byteData.packBooleans([0,1,0,0,1,1,0,0])
        assert.deepEqual(packed, [76]);
    });
    it('should pad when packing less than 8 booleans', function() {
        packed = byteData.packBooleans([0,1,0,0,1,1,0])
        assert.deepEqual(packed, [76]);
    });
    it('should pad when packing less than 8 booleans', function() {
        packed = byteData.packBooleans([0,0,0,0,0,0,0,0,0,1,0,0,1,1,0])
        assert.deepEqual(packed, [0,76]);
    });

    // unpack booleans
    it('should pack 8 booleans as 1 byte', function() {
        unpacked = byteData.unpackBooleans([0])
        assert.deepEqual(unpacked, [0,0,0,0,0,0,0,0]);
    });
    it('should pack 8 booleans as 1 byte', function() {
        unpacked = byteData.unpackBooleans([255])
        assert.deepEqual(unpacked, [1,1,1,1,1,1,1,1]);
    });
    it('should pack 8 booleans as 1 byte (0s)', function() {
        unpacked = byteData.unpackBooleans([77])
        assert.deepEqual(unpacked, [0,1,0,0,1,1,0,1]);
    });
    it('should pack 8 booleans as 1 byte (0s)', function() {
        unpacked = byteData.unpackBooleans([76])
        assert.deepEqual(unpacked, [0,1,0,0,1,1,0,0]);
    });
    it('should pad when packing less than 8 booleans', function() {
        unpacked = byteData.unpackBooleans([76])
        assert.deepEqual(unpacked, [0,1,0,0,1,1,0,0]);
    });
    it('should pad when packing less than 8 booleans', function() {
        unpacked = byteData.unpackBooleans([0,76])
        assert.deepEqual(unpacked, [0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0]);
    });
});
