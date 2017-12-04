/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('pack uInt8', function() {
    
    it('should turn 2 8-bit unsigned int to 2 bytes (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.uInt8),
            [0, 0]);
    });
    it('should turn 2 8-bit unsigned int to 2 bytes (min, max)', function() {
        assert.deepEqual(
            byteData.packArray([0, 255], byteData.uInt8),
            [0, 255]);
    });
    it('should turn 1 8-bit unsigned int to 1 byte', function() {
        assert.deepEqual(
            byteData.packArray([1], byteData.uInt8),
            [1]);
    });
    it('should turn 2 8-bit signed int to 2 bytes (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.uInt8),
            [0, 0]);
    });
});
