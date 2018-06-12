/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('pack float64', function() {
    
    it('should turn 2 64-bit floats to 16 bytes (-1, 1)', function() {
        assert.deepEqual(
            byteData.packArray([1,-1], byteData.types.float64),
            [0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,191]);
    });
    it('should turn 1 64-bit floats to 16 bytes hex (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.types.float64, 16),
            [0,0,0,0,0,0,240,191]);
    });
    it('should turn 1 64-bit floats to 16 bytes hex (-0.5)', function() {
        assert.deepEqual(
            byteData.packArray([-0.5], byteData.types.float64, 16),
            [0,0,0,0,0,0,224,191]);
    });
    it('should turn 2 64-bit floats to 16 bytes (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.types.float64),
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    });
    it('should turn 3 64-bit floats to 16 bytes (0 0 1)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0, 1], byteData.types.float64),
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63]);
    });
    it('should turn 3 64-bit floats to 16 bytes (0 1 0)', function() {
        assert.deepEqual(
            byteData.packArray([0, 1, 0], byteData.types.float64),
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0]);
    });
    it('should turn 1 64-bit floats to 8 bytes (0.5)', function() {
        assert.deepEqual(
            byteData.packArray([0.5], byteData.types.float64),
            [0,0,0,0,0,0,224,63]);
    });
    it('should turn 1 64-bit float to 8 bytes (-0.5)', function() {
        assert.deepEqual(
            byteData.packArray([-0.5], byteData.types.float64),
            [0,0,0,0,0,0,224,191]);
    });
    it('should turn 1 64-bit float to 8 bytes (pi)', function() {
        assert.deepEqual(
            byteData.packArray([3.141592653589793], byteData.types.float64),
            [24,45,68,84,251,33,9,64]);
    });
    it('should turn 1 64-bit float to 8 bytes (pi)', function() {
        assert.deepEqual(
            byteData.packArray([9], byteData.types.float64),
            [0,0,0,0,0,0,34,64]);
    });
    it('should turn 1 64-bit float to 8 bytes (14)', function() {
        assert.deepEqual(
            byteData.packArray([31.41592653589793], byteData.types.float64),
            [94,56,85,41,122,106,63,64]);
    });
    it('should turn 1 64-bit float to 8 bytes (1)', function() {
        assert.deepEqual(
            byteData.packArray([314159265358979.3], byteData.types.float64),
            [53,72,162,118,158,219,241,66]);
    });
    it('should turn 1 64-bit float to 8 bytes (hex) (0)', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.types.float64, 16),
            [0,0,0,0,0,0,0,0]);
    })
    it('should turn 1 64-bit float to 8 bytes hex (2)', function() {
        assert.deepEqual(
            byteData.packArray([2], byteData.types.float64, 16),
            [0,0,0,0,0,0,0,64]);
    });
    it('should turn 1 64-bit float to 8 bytes (1)', function() {
        assert.deepEqual(
            byteData.packArray([314159265358979.3], byteData.types.float64),
            [53,72,162,118,158,219,241,66]);
    });
});
