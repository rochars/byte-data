/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');
let fourCC = byteData.fourCC;

describe('unpack fourCC', function() {
    it('should read a fourCC from 4 bytes', function() {
        assert.deepEqual(
            byteData.unpack([97,98,99,100], fourCC),
            "abcd");
    });
    it('should read a fourCC from more than 4 bytes', function() {
        assert.deepEqual(
            byteData.unpack([97,98,99,100,101,102], fourCC),
            "abcd");
    });
    it('should read a fourCC from 4 bytes', function() {
        assert.deepEqual(
            byteData.unpackArray([97,98,99,100], fourCC),
            "abcd");
    });
    it('should read a fourCC from more than 4 bytes', function() {
        assert.deepEqual(
            byteData.unpackArray([97,98,99,100,101,102], fourCC),
            "abcd");
    });
    it('should read a fourCC from 4 bytes', function() {
        assert.deepEqual(
            byteData.unpackArray([97,98,99,100,97,98,99,100], fourCC),
            "abcdabcd");
    });
    it('should read a fourCC from more than 4 bytes', function() {
        assert.deepEqual(
            byteData.unpackArray([97,98,99,100,97,98,99,100,101,102], fourCC),
            "abcdabcd");
    });
});
