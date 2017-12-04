/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('unpack int8', function() {    

    it('should turn 1 hex byte to a 8-bit int (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(["ff","7f"], byteData.int8, 16),
            [-1, 127]);
    });
    it('should turn 1 hex byte to a 8-bit int (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(["80","7f"], byteData.int8, 16),
            [-128, 127]);
    });
    it('should turn 1 bin byte to a 8-bit int (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(["10000000","01111111"], byteData.int8, 2),
            [-128, 127]);
    });
});
