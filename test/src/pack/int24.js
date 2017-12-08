/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../index.js');

describe('pack int24', function() {
    
    it('should turn 2 signed 24-bit ints to 6 bytes (min, max)', function() {
        assert.deepEqual(
            byteData.packArray([-8388608, 8388607], byteData.int24),
            [0,0,128,255,255,127]
        );
    });
    // min
    it('should turn 1 signed 24-bit ints to 3 bytes (min)', function() {
        assert.deepEqual(
            byteData.packArray([-8388608], byteData.int24, 16),
            ["00","00","80"]
        );
    });
    // min + 1
    it('should turn 1 signed 24-bit ints to 3 bytes (min + 1)', function() {
        assert.deepEqual(
            byteData.packArray([-8388607], byteData.int24, 16),
            ["01","00","80"]
        );
    });
    // min + 2
    it('should turn 1 signed 24-bit ints to 3 bytes (min + 2)', function() {
        assert.deepEqual(
            byteData.packArray([-8388606], byteData.int24, 16),
            ["02","00","80"]
        );
    });
    // min + 3
    it('should turn 1 signed 24-bit ints to 3 bytes (min + 3)', function() {
        assert.deepEqual(
            byteData.packArray([-8388605], byteData.int24, 16),
            ["03","00","80"]
        );
    });

    // -1
    it('should turn 1 signed 16-bit ints to 2 bytes (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.int24, 16),
            ["ff", "ff", "ff"]
        );
    });
    // -2
    it('should turn 1 signed 16-bit ints to 2 bytes (-2)', function() {
        assert.deepEqual(
            byteData.packArray([-2], byteData.int24, 16),
            ["fe", "ff", "ff"]
        );
    });
    // -3
    it('should turn 1 signed 16-bit ints to 2 bytes (-3)', function() {
        assert.deepEqual(
            byteData.packArray([-3], byteData.int24, 16),
            ["fd", "ff", "ff"]
        );
    });

    // overflow
    it('should turn 2 signed 24-bit ints to 6 bytes (overflow)', function() {
        assert.deepEqual(
            byteData.packArray([-18388608, 18388607], byteData.int24),
            [0,0,128,255,255,127]
        );
    });
});
