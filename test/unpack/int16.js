/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');
let int16 = byteData.int16;

describe('unpack int16', function() {
    
    it('should turn 4 bytes bin to 2 16-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["00000000", "10000000", "11111111", "01111111"], int16, 2),
            [-32768, 32767]);
    });
    it('should turn 4 bytes hex to 2 16-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(["0","80","ff","7f"], int16, 16),
            [-32768, 32767]);
    });
    it('should turn 4 bytes bin to 2 16-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["00000000", "10000000", "11111111", "01111111"], int16, 2),
            [-32768, 32767]);
    });
    it('should turn 4 bytes hex to 2 16-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(["0","80","ff","7f"], int16, 16),
            [-32768, 32767]);
    });
});
