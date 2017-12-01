/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('unpack char', function() { 
    
    it('should turn bytes to a string', function() {
        assert.deepEqual(byteData.unpack(
            [97, 98], byteData.chr),
            "a");
    });
    it('should turn hex bytes to a string', function() {
        assert.deepEqual(byteData.unpack(
            ["61", "62"], byteData.chr, 16),
            "a");
    });
    it('should turn bin bytes to a string', function() {
        assert.deepEqual(byteData.unpack(
            ["01100001", "01100010"], byteData.chr, 2),
            "a");
    });

    it('should turn bytes to a string', function() {
        assert.deepEqual(byteData.unpackSequence(
            [97, 98], byteData.chr),
            "ab");
    });
    it('should turn hex bytes to a string', function() {
        assert.deepEqual(byteData.unpackSequence(
            ["61", "62"], byteData.chr, 16),
            "ab");
    });
    it('should turn bin bytes to a string', function() {
        assert.deepEqual(byteData.unpackSequence(
            ["01100001", "01100010"], byteData.chr, 2),
            "ab");
    });
});

describe('from-bytes', function() {

    it('should turn bytes to a string', function() {
        assert.deepEqual(byteData.fromBytes(
            [97, 98], 8, {"base": 10, "char": true}),
            "ab");
    });
    it('should turn hex bytes to a string', function() {
        assert.deepEqual(byteData.fromBytes(
            ["61", "62"], 8, {"base": 16, "char": true}),
            "ab");
    });
    it('should turn bin bytes to a string', function() {
        assert.deepEqual(byteData.fromBytes(
            ["01100001", "01100010"], 8, {"base": 2, "char": true}),
            "ab");
    });
});
