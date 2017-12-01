
var assert = require('assert');

describe('pack char', function() {
    
    let byteData = require('../../index.js');

    // pack
    it('should turn a 3 char string to bytes', function() {
        assert.deepEqual(byteData.pack("abc", byteData.char),
            [97]);
    });
    it('should turn a 2 char string to bytes (hex)', function() {
        assert.deepEqual(byteData.pack("ab", byteData.char, 16),
            ["61"]);
    });
    it('should turn a 3 char string to bytes (hex)', function() {
        assert.deepEqual(byteData.pack("abc", byteData.char, 16),
            ["61"]);
    });
    it('should turn a 3 char string to bytes (hex)', function() {
        assert.deepEqual(byteData.packSequence("abc", byteData.char, 16),
            ["61", "62", "63"]);
    });

    it('should turn a 1 char string to bytes', function() {
        assert.deepEqual(byteData.pack("a", byteData.char),
            [97]);
    });
    it('should turn a 1 char string to bytes (hex)', function() {
        assert.deepEqual(byteData.pack("a",  byteData.char, 16),
            ["61"]);
    });

    // packSequence
    it('should turn a 2 char string to bytes', function() {
        assert.deepEqual(byteData.packSequence("ab", byteData.char),
            [97, 98]);
    });
    it('should turn a 2 char string to bytes (hex)', function() {
        assert.deepEqual(byteData.packSequence("ab", byteData.char, 16),
            ["61", "62"]);
    });

    it('should turn a 1 char string to bytes', function() {
        assert.deepEqual(byteData.packSequence("a", byteData.char),
            [97]);
    });
    it('should turn a 1 char string to bytes (hex)', function() {
        assert.deepEqual(byteData.packSequence("a",  byteData.char, 16),
            ["61"]);
    });

});

describe('to-bytes', function() {
    
    let byteData = require('../../index.js');

    // string
    it('should turn a 2 char string to bytes', function() {
        assert.deepEqual(byteData.toBytes("ab", 8, {"base":10, "char": true}),
            [97, 98]);
    });
    it('should turn a 2 char string to bytes (hex)', function() {
        assert.deepEqual(byteData.toBytes("ab", 8, {"base":16, "char": true}),
            ["61", "62"]);
    });

    it('should turn a 1 char string to bytes', function() {
        assert.deepEqual(byteData.toBytes("a", 8, {"base":10, "char": true}),
            [97]);
    });
    it('should turn a 1 char string to bytes (hex)', function() {
        assert.deepEqual(byteData.toBytes("a",  8, {"base":16, "char": true}),
            ["61"]);
    });
});
