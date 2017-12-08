/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../index.js');

describe('pack int16', function() { 
    
    // 0
    it('pack 0', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.int16),
            [0, 0]
        );
    });

    // 0s
    it('pack 2 0s', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.int16),
            [0, 0, 0, 0]
        );
    });

    // min, max
    it('pack min, max', function() {
        assert.deepEqual(
            byteData.packArray([-32768, 32767], byteData.int16),
            [0, 128, 255, 127]
        );
    });

    // min
    it('pack min range', function() {
        assert.deepEqual(
            byteData.packArray([-32768], byteData.int16, 16),
            ["00", "80"]
        );
    });

    // min - 1
    it('pack min + 1', function() {
        assert.deepEqual(
            byteData.packArray([-32767], byteData.int16, 16),
            ["01", "80"]
        );
    });
    // min - 2
    it('pack min + 2', function() {
        assert.deepEqual(
            byteData.packArray([-32766], byteData.int16, 16),
            ["02", "80"]
        );
    });
    // min - 3
    it('pack min + 3', function() {
        assert.deepEqual(
            byteData.packArray([-32765], byteData.int16, 16),
            ["03", "80"]
        );
    });
    // -1
    it('pack -1', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.int16, 16),
            ["ff", "ff"]
        );
    });
    // -2
    it('pack -2', function() {
        assert.deepEqual(
            byteData.packArray([-2], byteData.int16, 16),
            ["fe", "ff"]
        );
    });
    // -3
    it('pack -3', function() {
        assert.deepEqual(
            byteData.packArray([-3], byteData.int16, 16),
            ["fd", "ff"]
        );
    });

    // overflow
    it('overflow', function() {
        assert.deepEqual(
            byteData.packArray([-32769, 32768], byteData.int16),
            [0, 128, 255, 127]
        );
    });
    it('larger overflow', function() {
        assert.deepEqual(
            byteData.packArray([-1132769, 1132768], byteData.int16),
            [0, 128, 255, 127]
        );
    });
});
