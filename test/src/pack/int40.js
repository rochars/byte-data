/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('pack int40', function() { 

    // 0
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.int40, 16),
            [0,0,0,0,0]);
    });
    // min
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-549755813888], byteData.int40, 16),
            [0,0,0,0,128]);
    });
    // -125
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-125], byteData.int40, 16),
            [131,255,255,255,255]);
    });
    // min + 1
    it('min + 1', function() {
        assert.deepEqual(
            byteData.packArray([-549755813887], byteData.int40, 16),
            [1,0,0,0,128]
        );
    });
    // min + 2
    it('min + 2', function() {
        assert.deepEqual(
            byteData.packArray([-549755813886], byteData.int40, 16),
            [2,0,0,0,128]
        );
    });
    // min + 3
    it('min + 3', function() {
        assert.deepEqual(
            byteData.packArray([-549755813885], byteData.int40, 16),
            [3,0,0,0,128]
        );
    });

    // -1
    it('-1', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.int40, 16),
            [255, 255, 255, 255, 255]
        );
    });
    // -2
    it('-2', function() {
        assert.deepEqual(
            byteData.packArray([-2], byteData.int40, 16),
            [254, 255, 255, 255, 255]
        );
    });
    // -3
    it('-3', function() {
        assert.deepEqual(
            byteData.packArray([-3], byteData.int40, 16),
            [253, 255, 255, 255, 255]
        );
    });

    // max
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([549755813887], byteData.int40, 16),
            [255,255,255,255,127]);
    });


    // overflow
    it('overflow', function() {
        assert.deepEqual(
            byteData.packArray([-549755813889, 549755813888], byteData.int40, 16),
            [0,0,0,0,128, 255,255,255,255,127]
        );
    });
    it('larger overflow', function() {
        assert.deepEqual(
            byteData.packArray([-1549755813888, 1549755813887], byteData.int40, 16),
            [0,0,0,0,128, 255,255,255,255,127]
        );
    });
});
