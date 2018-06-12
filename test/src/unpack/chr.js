/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('unpack chr', function() { 
    
    it('should turn bytes to a string', function() {
        assert.deepEqual(
            byteData.unpack([97, 98], byteData.types.chr),
            "a");
    });
    it('should turn hex bytes to a string', function() {
        assert.deepEqual(
            byteData.unpack([97, 98], byteData.types.chr, 16),
            "a");
    });
    it('should turn bin bytes to a string', function() {
        assert.deepEqual(
            byteData.unpack([97, 98], byteData.types.chr, 2),
            "a");
    });
    it('should turn bytes to a string', function() {
        assert.deepEqual(
            byteData.unpackArray([97, 98], byteData.types.chr),
            ["a","b"]);
    });
});
