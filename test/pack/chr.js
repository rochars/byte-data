/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('pack chr', function() {
    
    // pack
    it('should turn a 3 char string to bytes', function() {
        assert.deepEqual(
            byteData.pack("abc", byteData.chr),
            [97]);
    });
    it('should turn a 2 char string to bytes (hex)', function() {
        assert.deepEqual(
            byteData.pack("ab", byteData.chr, 16),
            ["61"]);
    });
    it('should turn a 3 char string to bytes (hex)', function() {
        assert.deepEqual(
            byteData.pack("abc", byteData.chr, 16),
            ["61"]);
    });
    it('should turn a 3 char string to bytes (hex)', function() {
        assert.deepEqual(
            byteData.packArray("abc", byteData.chr, 16),
            ["61", "62", "63"]);
    });

    it('should turn a 1 char string to bytes', function() {
        assert.deepEqual(
            byteData.pack("a", byteData.chr),
            [97]);
    });
    it('should turn a 1 char string to bytes (hex)', function() {
        assert.deepEqual(
            byteData.pack("a",  byteData.chr, 16),
            ["61"]);
    });

    // packSequence
    it('should turn a 2 char string to bytes', function() {
        assert.deepEqual(
            byteData.packArray("ab", byteData.chr),
            [97, 98]);
    });
    it('should turn a 2 char string to bytes (hex)', function() {
        assert.deepEqual(
            byteData.packArray("ab", byteData.chr, 16),
            ["61", "62"]);
    });

    it('should turn a 1 char string to bytes', function() {
        assert.deepEqual(
            byteData.packArray("a", byteData.chr),
            [97]);
    });
    it('should turn a 1 char string to bytes (hex)', function() {
        assert.deepEqual(
            byteData.packArray("a",  byteData.chr, 16),
            ["61"]);
    });

});
