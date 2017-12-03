/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('16-bit to bytes', function() { 
    
    // 16-bit / 2 bytes
    // signed
    it('should turn 2 signed 16-bit ints to 4 bytes (0s)', function() {
        assert.deepEqual(byteData.toBytes([0, 0], 16, {"signed": false, "base": 10}),
            [0, 0, 0, 0]);
    });
    it('should turn 1 signed 16-bit int to 2 bytes (0)', function() {
        assert.deepEqual(byteData.toBytes([0], 16, {"signed": false, "base": 10}),
            [0, 0]);
    });
    it('should turn 2 signed 16-bit ints to 4 bytes (max range)', function() {
        assert.deepEqual(byteData.toBytes([-32768, 32767], 16, {"signed": true, "base": 10}),
            [0, 128, 255, 127]
        );
    });
    it('should turn 1 16-bit signed int to 1 byte hex (-1)', function() {
        assert.deepEqual(byteData.toBytes([-1], 16, {"signed": true, "base": 16}),
            ['ff', 'ff']);
    });

    // unsigned
    it('should turn 2 unsigned 16-bit ints to 4 bytes (0s)', function() {
        assert.deepEqual(byteData.toBytes([0, 0], 16, {"signed": false, "base": 10}),
            [0, 0, 0, 0]);
    });
    it('should turn 1 unsigned 16-bit int to 2 bytes (0)', function() {
        assert.deepEqual(byteData.toBytes([0], 16, {"signed": false, "base": 10}),
            [0, 0]);
    });
    it('should turn 2 unsigned 16-bit ints to 4 bytes (max range)', function() {
        assert.deepEqual(byteData.toBytes([0, 65535], 16, {"signed": false, "base": 10}),
            [0, 0, 255, 255]
        );
    });
    it('should turn 2 unsigned 16-bit ints to 4 bytes (greater than max range)', function() {
        assert.deepEqual(byteData.toBytes([0, 75535], 16, {"signed": false, "base": 10}),
            [0, 0, 255, 255]
        );
    });

    it('should turn 1 unsigned 16-bit int to 2 bytes (0)', function() {
        assert.deepEqual(byteData.toBytes([765], 16, {"signed": false, "base": 16}),
            ["fd", "02"]);
    });

    // 16-bit floats: 0s
    it('should turn 2 bytes to 1 16-bit float (0)', function() {
        assert.deepEqual(byteData.toBytes(
            [0], 16, {"signed": false, "base": 10, "float": true}),
            [0, 0]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (0)', function() {
        assert.deepEqual(byteData.toBytes(
            [0], 16, {"signed": false, "base": 10, "float": true}),
            ["00", "00"]);
    });
    it('should turn 2 bytes bin to 1 16-bit float (0)', function() {
        assert.deepEqual(byteData.toBytes(
            [0], 16, {"signed": false, "base": 2, "float": true}),
            ["00000000", "00000000"]);
    });
    /*
    it('should turn 2 bytes hex to 1 16-bit float (1)', function() {
        assert.deepEqual(byteData.toBytes(
            [1], 16, {"signed": false, "base": 16, "float": true}),
            ["00", "3c"]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (1/3)', function() {
        assert.deepEqual(byteData.toBytes(
            [0.33325], 16, {"signed": false, "base": 16, "float": true}),
            ["55","35"]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (-2)', function() {
        assert.deepEqual(byteData.toBytes(
            [-2], 16, {"signed": true, "base": 16, "float": true}),
            ["00", "c0"]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(byteData.toBytes(
            [65504], 16, {"signed": true, "base": 16, "float": true}),
            ["ff", "7b"]);
    });
    it('should turn 4 bytes hex to 2 16-bit float (65504, 0.33325, extra byte)', function() {
        assert.deepEqual(byteData.toBytes(
            [65504, 0.33325], 16, {"signed": true, "base": 16, "float": true}),
            ["ff", "7b", "55", "35"]);
    });
    */
    it('should turn 2 signed 16-bit ints to 4 bytes in a Uint8Array (max range)', function() {
        assert.deepEqual(byteData.toBytes([-32768, 32767], 16, {"buffer": true, "signed": true}),
            [0, 128, 255, 127]
        );
    });
});
