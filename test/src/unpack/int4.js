/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');
let int4 = byteData.int4;

describe('unpack int4', function() { 

    it('should turn 1 nibble to a 4-bit int', function() {
        assert.deepEqual(
            byteData.unpackArray([15], int4),
            [-1]);
    });
    it('should turn 1 nibble to a 4-bit int', function() {
        assert.deepEqual(
            byteData.unpackArray([15], int4, 2),
            [-1]);
    });
    it('should turn 1 nibble to a 4-bit int', function() {
        assert.deepEqual(
            byteData.unpackArray([15], int4, 16),
            [-1]);
    });
});
