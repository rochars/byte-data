/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('pack uInt24', function() {
    
    it('should turn 1 signed 24-bit int to 3 bytes hex (16777215)', function() {
        assert.deepEqual(
            byteData.packArray([16777215], byteData.types.uInt24, 16),
            [255,255,255]
        );
    });
    it('should turn 2 signed 24-bit ints to 6 bytes (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.types.uInt24),
            [0, 0, 0, 0, 0, 0]
        );
    });
    it('should turn 2 unsigned 24-bit ints to 6 bytes (max range)', function() {
        assert.deepEqual(
            byteData.packArray([0, 16777215], byteData.types.uInt24),
            [0,0,0,255,255,255]
        );
    });
    it('should turn 2 unsigned 24-bit ints to 6 bytes (overflow)', function() {
        assert.deepEqual(
            byteData.packArray([-1, 216777215], byteData.types.uInt24),
            [0,0,0,255,255,255]
        );
    });
    it('should turn 2 unsigned 24-bit ints to 6 bytes (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.types.uInt24),
            [0, 0, 0, 0, 0, 0]
        );
    });
    it('should turn 2 unsigned 24-bit ints to 6 bytes in a Uint8Array (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.types.uInt24),
            [0, 0, 0, 0, 0, 0]
        );
    });
});
