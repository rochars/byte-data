/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');
let uInt4 = byteData.types.uInt4;

describe('unpack uInt4', function() { 
    
    it('should turn 1 nibble to a 4-bit uInt', function() {
        assert.deepEqual(
            byteData.unpackArray([0], uInt4),
            [0]);
    });
    it('should turn 1 nibble to a 4-bit uInt', function() {
        assert.deepEqual(
            byteData.unpackArray([15], uInt4),
            [15]);
    });
    it('should turn 2 nibbles to a 4-bit uInts', function() {
        assert.deepEqual(
            byteData.unpackArray([0,1], uInt4),
            [0,1]);
    });
    it('should turn 1 nibble to a 4-bit uInt', function() {
        assert.deepEqual(
            byteData.unpackArray([15], uInt4, 2),
            [15]);
    });
    it('should turn 1 nibble to a 4-bit uInt', function() {
        assert.deepEqual(
            byteData.unpackArray([15], uInt4, 16),
            [15]);
    });
});
