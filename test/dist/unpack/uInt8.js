/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');
let uInt8 = byteData.types.uInt8;

describe('unpack uInt8', function() {    

    it('should turn 1 byte to a 8-bit uInt', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0], uInt8),
            [0,0]);
    });
    it('should turn 1 hex byte to a 8-bit uInt (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray([0,255], uInt8, 16),
            [0, 255]);
    });
    it('should turn 1 bin byte to a 8-bit uInt (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray([0,255], uInt8, 2),
            [0, 255]);
    });
});
