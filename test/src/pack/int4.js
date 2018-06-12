/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('pack int4', function() {
    
    it('should turn 2 4-bit signed int to 2 bytes (-8, 7)', function() {
        assert.deepEqual(
            byteData.packArray([-8, 7], byteData.types.int4),
            [8, 7]);
    });
    it('should turn 1 4-bit signed int to 1 nibble (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.types.int4),
            [15]);
    });
    it('should turn 1 4-bit signed int to 1 nibble (-1, 5)', function() {
        assert.deepEqual(
            byteData.packArray([-1, 5], byteData.types.int4),
            [15, 5]);
    });
    it('should turn 1 4-bit signed int to 1 nibble hex (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.types.int4, 16),
            [15]);
    });
    it('should turn 1 4-bit signed int to 1 nibble hex (-8)', function() {
        assert.deepEqual(
            byteData.packArray([-8], byteData.types.int4, 16),
            [8]);
    });

    // overflow
    it('overflow', function() {
        assert.deepEqual(
            byteData.packArray([-9, 8], byteData.types.int4, true),
            [8, 7]
        );
    });
    it('larger overflow', function() {
        assert.deepEqual(
            byteData.packArray([-12147483649, 12147483648], byteData.types.int4, true),
            [8, 7]
        );
    });
});

