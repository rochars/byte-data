/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');
let uInt2 = byteData.uInt2;
let int2 = byteData.int2;

describe('crumbs to bytes', function() {   
    
    // 2-bit
    it('should turn 2 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.toBytes([0], 2),
            [0]);
    });
    it('should turn 2 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.pack(1, uInt2),
            [1]);
    });
    it('should turn 2 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.packSequence([2], uInt2),
            [2]);
    });
    it('should turn 2 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.pack(3, uInt2),
            [3]);
    });

    it('should turn 2 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.pack(0, uInt2, 2),
            ['00']);
    });
    it('should turn 2 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.pack(1, uInt2, 2),
            ['01']);
    });
    it('should turn 2 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.pack(2, uInt2, 2),
            ['10']);
    });
    it('should turn 2 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.pack(3, uInt2, 2),
            ['11']);
    });

    it('should turn 2 2-bit signed int to 2 crumb (-2)', function() {
        assert.deepEqual(byteData.pack(-2, int2, 2),
            ['10']);
    });
    it('should turn 2 2-bit signed int to 2 crumb (-1)', function() {
        assert.deepEqual(byteData.pack(-1, int2, 2),
            ['11']);
    });
    it('should turn 2 2-bit signed int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.pack(0, int2, 2),
            ['00']);
    });
    it('should turn 2 2-bit signed int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.toBytes([1], 2, {"base": 2}),
            ['01']);
    });

    it('should turn 2 2-bit signed int to 2 bytes (-2)', function() {
        assert.deepEqual(byteData.toBytes([-2], 2, {"base": 10, "signed": true}),
            [2]);
    });
    it('should turn 1 2-bit signed int to 1 crumb (-1)', function() {
        assert.deepEqual(byteData.packSequence([-1], int2),
            [3]);
    });
    it('should turn 1 2-bit signed int to 1 crumb hex (-1)', function() {
        assert.deepEqual(byteData.pack(-1, {"base": 16, "signed": true, "bitDepth": 2}),
            ['03']);
    });
    it('should turn 1 2-bit unsigned int to 1 crumb hex (2)', function() {
        assert.deepEqual(byteData.pack(2, uInt2, 16),
            ['02']);
    });
    it('should turn 1 2-bit unsigned int to 1 crumb bin (1)', function() {
        assert.deepEqual(byteData.pack(1, uInt2, 2),
            ['01']);
    });
});
