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
                [0,0,128,255,255,127],
                byteData.types.int24, 2),
            [-8388608, 8388607]);
    });
    it('should turn 6 bytes hex to 2 24-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,128, 255,255,127], byteData.types.int24, 16),
            [-8388608, 8388607]);
    });
});
