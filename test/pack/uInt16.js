/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('pack uInt16', function() { 

    it('should turn 2 signed 16-bit ints to 4 bytes (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.uInt16),
            [0, 0, 0, 0]);
    });
    it('should turn 1 signed 16-bit int to 2 bytes (0)', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.uInt16),
            [0, 0]);
    });
    it('should turn 2 unsigned 16-bit ints to 4 bytes (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.uInt16),
            [0, 0, 0, 0]);
    });
    it('should turn 1 unsigned 16-bit int to 2 bytes (0)', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.uInt16),
            [0, 0]);
    });
    it('should turn 2 unsigned 16-bit ints to 4 bytes (max range)', function() {
        assert.deepEqual(
            byteData.packArray([0, 65535], byteData.uInt16),
            [0, 0, 255, 255]
        );
    });
    it('should turn 2 unsigned 16-bit ints to 4 bytes (greater than max range)', function() {
        assert.deepEqual(
            byteData.packArray([0, 75535], byteData.uInt16),
            [0, 0, 255, 255]
        );
    });
    it('should turn 1 unsigned 16-bit int to 2 bytes (0)', function() {
        assert.deepEqual(
            byteData.packArray([765], byteData.uInt16, 16),
            ["fd", "02"]);
    });

});
