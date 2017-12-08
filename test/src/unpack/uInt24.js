/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../index.js');
let uInt24 = byteData.uInt24;

describe('unpack uInt24', function() {
    
    it('should turn 6 bytes to 2 24-bit ints', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,0,0,0], uInt24),
            [0,0]);
    });
    it('should turn 6 bytes bin to 2 24-bit uInts (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["00000000","00000000","00000000","11111111","11111111","11111111"],
                uInt24, 2),
            [0,16777215]);
    });
    it('should turn 7 bytes bin to 2 24-bit uInts (ignore the extra byte) (max range)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["00000000","00000000","00000000",
                "11111111","11111111","11111111","11111111"],
                uInt24, 2),
            [0,16777215]);
    });
    it('should turn 2 bytes bin to 0 24-bit uInts (not enough bytes)', function() {
        assert.deepEqual(
            byteData.unpackArray(["11111111","11111111"], uInt24, 2),
            []);
    });
    it('should turn 6 bytes hex to 2 24-bit uInts (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(["0","0","0","ff","ff","ff"], uInt24, 16),
            [0,16777215]);
    });
});