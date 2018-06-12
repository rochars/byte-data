/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');
let uInt32 = byteData.uInt32;

describe('unpack uInt32', function() {

    it('should turn 8 bytes to 2 32-bit ints (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,0,0,0,0,0], uInt32),
            [0,0]);
    });
    it('should turn 8 bytes bin to 2 32-bit uInts (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,0,0,
                255,255,255,255], uInt32, 2),
            [0,4294967295]);
    });
    it('should turn 8 bytes hex to 2 32-bit uInts (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,0,0, 255,255,255,255], uInt32, 16),
            [0,4294967295]);
    });
});
