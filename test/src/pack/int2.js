/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');
let uInt2 = byteData.uInt2;
let int2 = byteData.int2;

describe('pack int2', function() {   
    
    it('should turn 2 2-bit signed int to 2 crumb (-2)', function() {
        assert.deepEqual(
            byteData.packArray([-2], int2, 2),
            [2]);
    });
    it('should turn 2 2-bit signed int to 2 crumb (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1], int2, 2),
            [3]);
    });
    it('should turn 2 2-bit signed int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0], int2, 2),
            [0]);
    });
    it('should turn 2 2-bit signed int to 2 bytes (-2)', function() {
        assert.deepEqual(
            byteData.packArray([-2], int2),
            [2]);
    });
    it('should turn 1 2-bit signed int to 1 crumb (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1], int2),
            [3]);
    });
    it('should turn 1 2-bit signed int to 1 crumb hex (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1], int2, 16),
            [3]);
    });
});
