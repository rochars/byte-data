/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../index.js');

describe('unpack chr', function() { 
    
    it('should turn bytes to a string', function() {
        assert.deepEqual(
            byteData.unpack([97, 98], byteData.chr),
            "a");
    });
    it('should turn hex bytes to a string', function() {
        assert.deepEqual(
            byteData.unpack(["61", "62"], byteData.chr, 16),
            "a");
    });
    it('should turn bin bytes to a string', function() {
        assert.deepEqual(
            byteData.unpack(["01100001", "01100010"], byteData.chr, 2),
            "a");
    });

    it('should turn bytes to a string', function() {
        assert.deepEqual(
            byteData.unpackArray([97, 98], byteData.chr),
            "ab");
    });
    it('should turn hex bytes to a string', function() {
        assert.deepEqual(
            byteData.unpackArray(["61", "62"], byteData.chr, 16),
            "ab");
    });
    it('should turn bin bytes to a string', function() {
        assert.deepEqual(
            byteData.unpackArray(
            ["01100001", "01100010"], byteData.chr, 2),
            "ab");
    });
});