/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('unpack int24', function() {
    
    it('should turn 6 bytes bin to 2 24-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["00000000","00000000","10000000","11111111","11111111","01111111"],
                byteData.int24, 2),
            [-8388608, 8388607]);
    });
    it('should turn 6 bytes hex to 2 24-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["0","0","80", "ff","ff","7f"], byteData.int24, 16),
            [-8388608, 8388607]);
    });
});
