/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');
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

    // min
    it('min', function() {
        assert.deepEqual(
            byteData.unpackArray(["00","00","00","80"], byteData.int32, 16),
            [-2147483648]);
    });
    // min + 1
    it('min + 1', function() {
        assert.deepEqual(
            byteData.unpackArray(["01","00","00","80"], byteData.int32, 16),
            [-2147483647]
        );
    });
    // min + 2
    it('min + 2', function() {
        assert.deepEqual(
            byteData.unpackArray(["02","00","00","80"], byteData.int32, 16),
            [-2147483646]
        );
    });
    // min + 3
    it('min + 3', function() {
        assert.deepEqual(
            byteData.unpackArray(["03","00","00","80"], byteData.int32, 16),
            [-2147483645]
        );
    });

    // -1
    it('-1', function() {
        assert.deepEqual(
            byteData.unpackArray(["ff","ff","ff","ff"], byteData.int32, 16),
            [-1]
        );
    });
    // -2
    it('-2', function() {
        assert.deepEqual(
            byteData.unpackArray(["fe","ff","ff","ff"], byteData.int32, 16),
            [-2]
        );
    });
    // -3
    it('-3', function() {
        assert.deepEqual(
            byteData.unpackArray(["fd","ff","ff","ff"], byteData.int32, 16),
            [-3]
        );
    });
});
