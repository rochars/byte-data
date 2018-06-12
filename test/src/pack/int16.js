/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
//let byteData = require('../../../test/loader.js');

//process.argv.forEach(function (val, index, array) {
//  console.log(index + ': ' + val);
//})
let byteData = require('../../../test/loader.js');

describe('pack int16', function() { 
    
    // 0
    it('pack 0', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.types.int16),
            [0, 0]
        );
    });

    // 0s
    it('pack 2 0s', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.types.int16),
            [0, 0, 0, 0]
        );
    });

    // min, max
    it('pack min, max', function() {
        assert.deepEqual(
            byteData.packArray([-32768, 32767], byteData.types.int16),
            [0, 128, 255, 127]
        );
    });

    // min
    it('pack min range', function() {
        assert.deepEqual(
            byteData.packArray([-32768], byteData.types.int16, 16),
            [0, 128]
        );
    });

    // min - 1
    it('pack min + 1', function() {
        assert.deepEqual(
            byteData.packArray([-32767], byteData.types.int16, 16),
            [1, 128]
        );
    });
    // min - 2
    it('pack min + 2', function() {
        assert.deepEqual(
            byteData.packArray([-32766], byteData.types.int16, 16),
            [2, 128]
        );
    });
    // min - 3
    it('pack min + 3', function() {
        assert.deepEqual(
            byteData.packArray([-32765], byteData.types.int16, 16),
            [3, 128]
        );
    });
    // -1
    it('pack -1', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.types.int16, 16),
            [255, 255]
        );
    });
    // -2
    it('pack -2', function() {
        assert.deepEqual(
            byteData.packArray([-2], byteData.types.int16, 16),
            [254, 255]
        );
    });
    // -3
    it('pack -3', function() {
        assert.deepEqual(
            byteData.packArray([-3], byteData.types.int16, 16),
            [253, 255]
        );
    });

    // overflow
    it('overflow', function() {
        assert.deepEqual(
            byteData.packArray([-32769, 32768], byteData.types.int16, true),
            [0, 128, 255, 127]
        );
    });
    it('larger overflow', function() {
        assert.deepEqual(
            byteData.packArray([-1132769, 1132768], byteData.types.int16, true),
            [0, 128, 255, 127]
        );
    });
});
