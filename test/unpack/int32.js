/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');
let int32 = byteData.int32;

describe('unpack int32', function() {

    it('should turn 8 bytes bin to 2 32-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["00000000","00000000","00000000","10000000",
                "11111111","11111111","11111111","01111111"], int32, 2),
            [-2147483648,2147483647]);
    });
    it('should turn 8 bytes hex to 2 32-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["0","0","0","80", "ff","ff","ff","7f"], int32, 16),
            [-2147483648,2147483647]);
    });
    it('should turn 10 bytes hex to 2 32-bit ints (ignore extra bytes) (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["0","0","0","80", "ff","ff","ff","7f","ff","80"], int32, 16),
            [-2147483648,2147483647]);
    });
    it('should turn 4 bytes hex to 1 32-bit ints (random negative)', function() {
        assert.deepEqual(
            byteData.unpackArray(["e8","3","0","80"], int32, 16),
            [-2147482648]);
    });

    it('should turn 4 bytes hex to 1 32-bit ints (random negative)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["0","80","ff","ff"], int32, 16),
            [-32768]);
    });
});
