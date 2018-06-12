/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('pack uInt16', function() { 

    it('should turn 2 signed 16-bit ints to 4 bytes (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.types.uInt16),
            [0, 0, 0, 0]);
    });
    it('should turn 1 signed 16-bit int to 2 bytes (0)', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.types.uInt16),
            [0, 0]);
    });
    it('should turn 2 unsigned 16-bit ints to 4 bytes (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.types.uInt16),
            [0, 0, 0, 0]);
    });
    it('should turn 1 unsigned 16-bit int to 2 bytes (0)', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.types.uInt16),
            [0, 0]);
    });
    it('should turn 2 unsigned 16-bit ints to 4 bytes (max range)', function() {
        assert.deepEqual(
            byteData.packArray([0, 65535], byteData.types.uInt16),
            [0, 0, 255, 255]
        );
    });
    it('should turn 2 unsigned 16-bit ints to 4 bytes (overflow)', function() {
        assert.deepEqual(
            byteData.packArray([0, 75535], byteData.types.uInt16, true),
            [0, 0, 255, 255]
        );
    });
    it('should turn 1 unsigned 16-bit int to 2 bytes (0)', function() {
        assert.deepEqual(
            byteData.packArray([765], byteData.types.uInt16, 16),
            [253, 2]);
    });


    // Should pack anything between 9 and 16 bits to 2 bytes
    it('should handle 11-bit as 16-bit (0)', function() {
        assert.deepEqual(
            byteData.packArray([0], {"bits": 11}),
            [0, 0]);
    });
    it('should handle 11-bit as 16-bit (2000)', function() {
        assert.deepEqual(
            byteData.packArray([2000], {"bits": 11}, 16),
            [208, 7]);
    });
    it('should handle 11-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.packArray([2047], {"bits": 11}),
            [255, 7]);
    });
    it('should handle 11-bit as 16-bit (2048, overflow)', function() {
        assert.deepEqual(
            byteData.packArray([2048], {"bits": 11}, true),
            [255, 7]);
    });
    it('should handle 12-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.packArray([2047], {"bits": 12}),
            [255, 7]);
    });
    it('should handle 13-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.packArray([2047], {"bits": 13}),
            [255, 7]);
    });
    it('should handle 14-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.packArray([2047], {"bits": 14}),
            [255, 7]);
    });
    it('should handle 15-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.packArray([2047], {"bits": 15}),
            [255, 7]);
    });    
});
