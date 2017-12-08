/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../index.js');

describe('pack fourCC', function() {
    it('should turn a 3 char string to bytes', function() {
        assert.deepEqual(
            byteData.pack("abcd", byteData.fourCC),
            [97,98,99,100]);
    });
    it('should turn a 3 char string to bytes (overflow)', function() {
        assert.deepEqual(
            byteData.pack("abcdef", byteData.fourCC),
            [97,98,99,100]);
    });
    it('should turn a 3 char string to bytes', function() {
        assert.deepEqual(
            byteData.packArray("abcd", byteData.fourCC),
            [97,98,99,100]);
    });
    it('should turn a 3 char string to bytes (overflow)', function() {
        assert.deepEqual(
            byteData.packArray("abcdabcd", byteData.fourCC),
            [97,98,99,100,97,98,99,100]);
    });
});
