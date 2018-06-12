/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('unpack uInt2', function() {   

    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0], byteData.uInt2),
            [0]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([1], byteData.uInt2),
            [1]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([2], byteData.uInt2),
            [2]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([3], byteData.uInt2),
            [3]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0], byteData.uInt2, 2),
            [0]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([1], byteData.uInt2, 2),
            [1]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([2], byteData.uInt2, 2),
            [2]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([3], byteData.uInt2, 2),
            [3]);
    });
    it('should turn 1 2-bit signed int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0], byteData.uInt2, 2),
            [0]);
    });
    it('should turn 1 2-bit signed int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([1], byteData.uInt2, 2),
            [1]);
    });
    it('should turn 1 2-bit unsigned int to 1 crumb hex (2)', function() {
        assert.deepEqual(
            byteData.unpackArray([2], byteData.uInt2, 16),
            [2]);
    });
    it('should turn 1 2-bit unsigned int to 1 crumb bin (1)', function() {
        assert.deepEqual(
            byteData.unpackArray([1], byteData.uInt2, 16),
            [1]);
    });
});
