/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');
let int16 = byteData.int16;

describe('unpack int16', function() {
    
    it('should turn 4 bytes bin to 2 16-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0, 128, 255, 127], int16, 2),
            [-32768, 32767]);
    });
    it('should turn 4 bytes hex to 2 16-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray([0,128,255,127], int16, 16),
            [-32768, 32767]);
    });
    it('should turn 4 bytes bin to 2 16-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0, 128, 255, 127], int16, 2),
            [-32768, 32767]);
    });
    it('should turn 4 bytes hex to 2 16-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray([0,128,255,127], int16, 16),
            [-32768, 32767]);
    });
});
