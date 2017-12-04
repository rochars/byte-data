/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');
let int4 = byteData.int4;

describe('unpack int4', function() { 

    it('should turn 1 nibble to a 4-bit int', function() {
        assert.deepEqual(
            byteData.unpackArray([15], int4),
            [-1]);
    });
    it('should turn 1 nibble to a 4-bit int', function() {
        assert.deepEqual(
            byteData.unpackArray(["1111"], int4, 2),
            [-1]);
    });
    it('should turn 1 nibble to a 4-bit int', function() {
        assert.deepEqual(
            byteData.unpackArray(["f"], int4, 16),
            [-1]);
    });
    it('should turn 1 nibble (with padding zeros) to a 4-bit int', function() {
        assert.deepEqual(
            byteData.unpackArray(["0f"], int4, 16),
            [-1]);
    });
});
