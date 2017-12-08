/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../index.js');
let int2 = byteData.int2;

describe('unpack int2', function() {   

    it('should turn 1 2-bit signed int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray(['10'], int2, 2),
            [-2]);
    });
    it('should turn 1 2-bit signed int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray(['11'], int2, 2),
            [-1]);
    });
    it('should turn 1 2-bit signed int to 2 bytes (-2)', function() {
        assert.deepEqual(
            byteData.unpackArray([2], int2),
            [-2]);
    });
    it('should turn 1 2-bit signed int to 1 crumb (-1)', function() {
        assert.deepEqual(
            byteData.unpackArray([3], int2),
            [-1]);
    });
    it('should turn 1 2-bit signed int to 1 crumb hex (-1)', function() {
        assert.deepEqual(
            byteData.unpackArray(['03'], int2, 16),
            [-1]);
    });
});
