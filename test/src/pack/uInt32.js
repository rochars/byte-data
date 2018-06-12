/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('pack uInt32', function() {     

    it('should turn 2 unsigned 32-bit ints to 8 bytes (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.types.uInt32), 
            [0,0,0,0,0,0,0,0]);
    });
    it('should turn 2 unsigned 32-bit int to 8 bytes (max range)', function() {
        assert.deepEqual(
            byteData.packArray([0, 4294967295], byteData.types.uInt32),
            [0,0,0,0,255,255,255,255]);
    });
    it('should turn 1 signed 32-bit int to 4 bytes bin (max range)', function() {
        assert.deepEqual(
            byteData.packArray([2147483647], byteData.types.uInt32, 2),
            [255,255,255,127]);
    });
    it('should turn 1 unsigned 32-bit int to 4 bytes hex (max range)', function() {
        assert.deepEqual(
            byteData.packArray([4294967295], byteData.types.uInt32, 16),
            [255,255,255,255]);
    });
    it('should turn 2 unsigned 32-bit int to 8 bytes in a Uint8Array (max range)', function() {
        assert.deepEqual(
            byteData.packArray([0, 4294967295], byteData.types.uInt32),
            [0,0,0,0,255,255,255,255]);
    });
});
