/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');
let uInt2 = byteData.uInt2;
let int2 = byteData.int2;

describe('pack uInt2', function() {   
    
    // 2-bit
    it('should turn 2 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0], uInt2),
            [0]);
    });
    it('should turn 2 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.packArray([1], uInt2),
            [1]);
    });
    it('should turn 2 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.packArray([2], uInt2),
            [2]);
    });
    it('should turn 2 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.packArray([3], uInt2),
            [3]);
    });
    it('should turn 2 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0], uInt2, 2),
            ['00000000']);
    });
    it('should turn 2 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.packArray([1], uInt2, 2),
            ['00000001']);
    });
    it('should turn 2 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.packArray([2], uInt2, 2),
            ['00000010']);
    });
    it('should turn 2 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.packArray([3], uInt2, 2),
            ['00000011']);
    });
    it('should turn 2 2-bit signed int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.packArray([1], uInt2, 2),
            ['00000001']);
    });
    it('should turn 1 2-bit unsigned int to 1 crumb hex (2)', function() {
        assert.deepEqual(
            byteData.packArray([2], uInt2, 16),
            ['02']);
    });
    it('should turn 1 2-bit unsigned int to 1 crumb bin (1)', function() {
        assert.deepEqual(
            byteData.packArray([1], uInt2, 2),
            ['00000001']);
    });
});
