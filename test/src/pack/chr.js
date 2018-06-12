/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('pack chr', function() {
    
    // pack
    it('should turn a 128 char string to bytes', function() {
        let str = "";
        let bytes = [];
        for (i=0; i<128; i++) {
            str += "a";
            bytes.push(97);
        }
        assert.deepEqual(
            byteData.pack(str, {"char": true, "bits": 1024}),
            bytes);
    });
    it('should turn a 3 char string to bytes (hex)', function() {
        assert.deepEqual(
            byteData.packArray("abc", byteData.types.chr),
            [97, 98, 99]);
    });

    it('should turn a 1 char string to bytes', function() {
        assert.deepEqual(
            byteData.pack("a", byteData.types.chr),
            [97]);
    });

    // packSequence
    it('should turn a 2 char string to bytes', function() {
        assert.deepEqual(
            byteData.packArray("ab", byteData.types.chr),
            [97, 98]);
    });
    it('should turn a 1 char string to bytes', function() {
        assert.deepEqual(
            byteData.packArray("a", byteData.types.chr),
            [97]);
    });

});
