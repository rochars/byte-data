/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('pack int24', function() {
    
    it('should turn 2 signed 24-bit ints to 6 bytes (min, max)', function() {
        assert.deepEqual(
            byteData.packArray([-8388608, 8388607], byteData.types.int24),
            [0,0,128,255,255,127]
        );
    });
    // min
    it('should turn 1 signed 24-bit ints to 3 bytes (min)', function() {
        assert.deepEqual(
            byteData.packArray([-8388608], byteData.types.int24, 16),
            [0,0,128]
        );
    });
    // min + 1
    it('should turn 1 signed 24-bit ints to 3 bytes (min + 1)', function() {
        assert.deepEqual(
            byteData.packArray([-8388607], byteData.types.int24, 16),
            [1,0,128]
        );
    });
    // min + 2
    it('should turn 1 signed 24-bit ints to 3 bytes (min + 2)', function() {
        assert.deepEqual(
            byteData.packArray([-8388606], byteData.types.int24, 16),
            [2,0,128]
        );
    });
    // min + 3
    it('should turn 1 signed 24-bit ints to 3 bytes (min + 3)', function() {
        assert.deepEqual(
            byteData.packArray([-8388605], byteData.types.int24, 16),
            [3,0,128]
        );
    });

    // -1
    it('should turn 1 signed 16-bit ints to 2 bytes (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.types.int24, 16),
            [255, 255, 255]
        );
    });
    // -2
    it('should turn 1 signed 16-bit ints to 2 bytes (-2)', function() {
        assert.deepEqual(
            byteData.packArray([-2], byteData.types.int24, 16),
            [254, 255, 255]
        );
    });
    // -3
    it('should turn 1 signed 16-bit ints to 2 bytes (-3)', function() {
        assert.deepEqual(
            byteData.packArray([-3], byteData.types.int24, 16),
            [253, 255, 255]
        );
    });

    // overflow
    it('should turn 2 signed 24-bit ints to 6 bytes (overflow)', function() {
        assert.deepEqual(
            byteData.packArray([-18388608, 18388607], byteData.types.int24, true),
            [0,0,128,255,255,127]
        );
    });
});
