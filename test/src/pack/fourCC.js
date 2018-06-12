/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('pack fourCC', function() {
    it('should not turn a 3 char fourCC to bytes', function() {
        assert.deepEqual(
            byteData.pack("abc", byteData.types.fourCC),
            []);
    });
    it('should turn a 4 char string to bytes', function() {
        assert.deepEqual(
            byteData.pack("abcd", byteData.types.fourCC),
            [97,98,99,100]);
    });
    it('should turn a 4 char string to bytes (overflow)', function() {
        assert.deepEqual(
            byteData.pack("abcdef", byteData.types.fourCC),
            [97,98,99,100]);
    });
    it('should turn a 4 char string to bytes', function() {
        assert.deepEqual(
            byteData.packArray("abcd", byteData.types.fourCC),
            [97,98,99,100]);
    });
    it('should turn a 3 char string to bytes (overflow)', function() {
        assert.deepEqual(
            byteData.packArray("abcdabcd", byteData.types.fourCC),
            [97,98,99,100,97,98,99,100]);
    });

    it('should turn a 2 fourCCs to bytes', function() {
        assert.deepEqual(
            byteData.packArray(["abcd","abcd"], byteData.types.fourCC),
            [97,98,99,100,97,98,99,100]);
    });

    it('should turn a 2 fourCCs to bytes (last one has a extra char)', function() {
        assert.deepEqual(
            byteData.packArray(["abcd","abcdx"], byteData.types.fourCC),
            [97,98,99,100,97,98,99,100]);
    });

    it('should turn a 2 fourCCs to bytes (last one is missing a char)', function() {
        assert.deepEqual(
            byteData.packArray(["abcd","abc"], byteData.types.fourCC),
            [97,98,99,100]);
    });
});
