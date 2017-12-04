/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('pack int8', function() {

    it('should turn 2 8-bit signed int to 2 bytes (-128, 127)', function() {
        assert.deepEqual(
            byteData.packArray([-128, 127], byteData.int8),
            [128, 127]);
    });
    it('should turn 1 8-bit signed int to 1 byte (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.int8),
            [255]);
    });
    it('should turn 1 8-bit signed int to 1 byte (-1, 5)', function() {
        assert.deepEqual(
            byteData.packArray([-1, 5], byteData.int8),
            [255, 5]);
    });
    it('should turn 1 8-bit signed int to 1 byte hex (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.int8, 16),
            ['ff']);
    });
    it('should turn 1 8-bit signed int to 1 byte hex (-1)', function() {
        assert.deepEqual(
            byteData.packArray([127], byteData.int8, 16),
            ['7f']);
    });
    it('should turn 1 8-bit signed int to 1 byte hex (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-128], byteData.int8, 16),
            ['80']);
    });
    it('should turn 1 8-bit signed int to 1 byte hex in a Uint8Array (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1, 5], byteData.int8),
            [255, 5]);
    });
});
