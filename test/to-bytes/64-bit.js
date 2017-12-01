/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('64-bit to bytes', function() {
    
    // 64-bit / 8 bytes
    it('should turn 2 64-bit floats to 16 bytes (-1, 1)', function() {
        assert.deepEqual(byteData.toBytes([1,-1], 64, {"base": 10}),
            [0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,191]);
    });
    it('should turn 1 64-bit floats to 16 bytes hex (-1)', function() {
        assert.deepEqual(byteData.toBytes([-1], 64, {"base": 16}),
            ['00','00','00','00','00','00','f0','bf']);
    });
    it('should turn 1 64-bit floats to 16 bytes hex (-0.5)', function() {
        assert.deepEqual(byteData.toBytes([-0.5], 64, {"base": 16}),
            ['00','00','00','00','00','00','e0','bf']);
    });
    it('should turn 2 64-bit floats to 16 bytes (0s)', function() {
        assert.deepEqual(byteData.toBytes([0, 0], 64, {"base": 10}),
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    });
    it('should turn 3 64-bit floats to 16 bytes (0 0 1)', function() {
        assert.deepEqual(byteData.toBytes([0, 0, 1], 64, {"base": 10}),
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63]);
    });
    it('should turn 3 64-bit floats to 16 bytes (0 1 0)', function() {
        assert.deepEqual(byteData.toBytes([0, 1, 0], 64, {"base": 10}),
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0]);
    });
    it('should turn 1 64-bit floats to 8 bytes (0.5)', function() {
        assert.deepEqual(byteData.toBytes([0.5], 64, {"base": 10}),
            [0,0,0,0,0,0,224,63]);
    });
    it('should turn 1 64-bit float to 8 bytes (-0.5)', function() {
        assert.deepEqual(byteData.toBytes([-0.5], 64, {"base": 10}),
            [0,0,0,0,0,0,224,191]);
    });
    it('should turn 1 64-bit float to 8 bytes (pi)', function() {
        assert.deepEqual(byteData.toBytes([3.141592653589793], 64, {"base": 10}),
            [24,45,68,84,251,33,9,64]);
    });
    it('should turn 1 64-bit float to 8 bytes (pi)', function() {
        assert.deepEqual(byteData.toBytes([9], 64, {"base": 10}),
            [0,0,0,0,0,0,34,64]);
    });
    it('should turn 1 64-bit float to 8 bytes (14)', function() {
        assert.deepEqual(byteData.toBytes([31.41592653589793], 64, {"base": 10}),
            [94,56,85,41,122,106,63,64]);
    });
    it('should turn 1 64-bit float to 8 bytes (1)', function() {
        assert.deepEqual(byteData.toBytes([314159265358979.3], 64, {"base": 10}),
            [53,72,162,118,158,219,241,66]);
    });
    it('should turn 1 64-bit float to 8 bytes (hex) (0)', function() {
        assert.deepEqual(byteData.toBytes([0], 64, {"base": 16}),
            ["00","00","00","00","00","00","00","00"]);
    })
    it('should turn 1 64-bit float to 8 bytes hex (2)', function() {
        assert.deepEqual(byteData.toBytes([2], 64, {"base": 16}),
            ["00","00","00","00","00","00","00","40"]);
    });
    it('should turn 1 64-bit float to 8 bytes (1)', function() {
        assert.deepEqual(byteData.toBytes([314159265358979.3], 64, {"buffer": true}),
            [53,72,162,118,158,219,241,66]);
    });
});
