/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../index.js');

describe('pack int16', function() { 
    
    // 0
    it('should turn 2 signed 16-bit ints to 4 bytes (0)', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.int16),
            [0, 0]
        );
    });

    // 0s
    it('should turn 2 signed 16-bit ints to 4 bytes (2 0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.int16),
            [0, 0, 0, 0]
        );
    });

    // min, max
    it('should turn 2 signed 16-bit ints to 4 bytes (min, max)', function() {
        assert.deepEqual(
            byteData.packArray([-32768, 32767], byteData.int16),
            [0, 128, 255, 127]
        );
    });

    // min
    it('should turn 1 signed 16-bit ints to 2 bytes (min range)', function() {
        assert.deepEqual(
            byteData.packArray([-32768], byteData.int16, 16),
            ["00", "80"]
        );
    });

    // min - 1
    it('should turn 1 signed 16-bit ints to 2 bytes (min + 1)', function() {
        assert.deepEqual(
            byteData.packArray([-32767], byteData.int16, 16),
            ["01", "80"]
        );
    });
    // min - 2
    it('should turn 1 signed 16-bit ints to 2 bytes (min + 2)', function() {
        assert.deepEqual(
            byteData.packArray([-32766], byteData.int16, 16),
            ["02", "80"]
        );
    });
    // min - 3
    it('should turn 1 signed 16-bit ints to 2 bytes (min + 3)', function() {
        assert.deepEqual(
            byteData.packArray([-32765], byteData.int16, 16),
            ["03", "80"]
        );
    });
    // -1
    it('should turn 1 signed 16-bit ints to 2 bytes (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.int16, 16),
            ["ff", "ff"]
        );
    });
    // -2
    it('should turn 1 signed 16-bit ints to 2 bytes (-2)', function() {
        assert.deepEqual(
            byteData.packArray([-2], byteData.int16, 16),
            ["fe", "ff"]
        );
    });
    // -3
    it('should turn 1 signed 16-bit ints to 2 bytes (-3)', function() {
        assert.deepEqual(
            byteData.packArray([-3], byteData.int16, 16),
            ["fd", "ff"]
        );
    });
});
