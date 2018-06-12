/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('pack int32', function() {     

    it('should turn 2 signed 32-bit int to 8 bytes (max range)', function() {
        assert.deepEqual(
            byteData.packArray([-2147483648, 2147483647], byteData.int32),
            [0,0,0,128,255,255,255,127]);
    });
    it('should turn 1 signed 32-bit int to 4 bytes bin (min range)', function() {
        assert.deepEqual(
            byteData.packArray([-2147483648], byteData.int32, 2),
            [0, 0,0,128]);
    });
    
    // 0
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.int32, 16),
            [0,0,0,0]);
    });
    // min
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-2147483648], byteData.int32, 16),
            [0,0,0,128]);
    });
    // -125
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-125], byteData.int32, 16),
            [131,255,255,255]);
    });
    // min + 1
    it('min + 1', function() {
        assert.deepEqual(
            byteData.packArray([-2147483647], byteData.int32, 16),
            [1,0,0,128]
        );
    });
    // min + 2
    it('min + 2', function() {
        assert.deepEqual(
            byteData.packArray([-2147483646], byteData.int32, 16),
            [2,0,0,128]
        );
    });
    // min + 3
    it('min + 3', function() {
        assert.deepEqual(
            byteData.packArray([-2147483645], byteData.int32, 16),
            [3,0,0,128]
        );
    });

    // -1
    it('-1', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.int32, 16),
            [255, 255, 255, 255]
        );
    });
    // -2
    it('-2', function() {
        assert.deepEqual(
            byteData.packArray([-2], byteData.int32, 16),
            [254, 255, 255, 255]
        );
    });
    // -3
    it('-3', function() {
        assert.deepEqual(
            byteData.packArray([-3], byteData.int32, 16),
            [253, 255, 255, 255]
        );
    });


    // overflow
    it('overflow', function() {
        assert.deepEqual(
            byteData.packArray([-2147483649, 2147483648], byteData.int32),
            [0,0,0,128,255,255,255,127]
        );
    });
    it('larger overflow', function() {
        assert.deepEqual(
            byteData.packArray([-12147483649, 12147483648], byteData.int32),
            [0,0,0,128,255,255,255,127]
        );
    });
});
