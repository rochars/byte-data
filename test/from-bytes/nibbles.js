/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('Nibbles from bytes', function() { 
    
    it('should turn 1 nibble to a 4-bit uInt', function() {
        assert.deepEqual(byteData.fromBytes(
            [0], 4, {"base": 10, "signed": false}),
            [0]);
    });
    it('should turn 1 nibble to a 4-bit uInt', function() {
        assert.deepEqual(byteData.fromBytes(
            [15], 4, {"base": 10, "signed": false}),
            [15]);
    });
    it('should turn 1 nibble to a 4-bit int', function() {
        assert.deepEqual(byteData.fromBytes(
            [15], 4, {"base": 10, "signed": true}),
            [-1]);
    });
    it('should turn 2 nibbles to a 4-bit uInts', function() {
        assert.deepEqual(byteData.fromBytes(
            [0,1], 4, {"base": 10, "signed": false}),
            [0,1]);
    });
    it('should turn 1 nibble to a 4-bit uInt', function() {
        assert.deepEqual(byteData.fromBytes(
            ["1111"], 4, {"base": 2, "signed": false}),
            [15]);
    });
    it('should turn 1 nibble to a 4-bit int', function() {
        assert.deepEqual(byteData.fromBytes(
            ["1111"], 4, {"base": 2, "signed": true}),
            [-1]);
    });
    it('should turn 1 nibble to a 4-bit uInt', function() {
        assert.deepEqual(byteData.fromBytes(
            ["f"], 4, {"base": 16, "signed": false}),
            [15]);
    });
    it('should turn 1 nibble to a 4-bit int', function() {
        assert.deepEqual(byteData.fromBytes(
            ["f"], 4, {"base": 16, "signed": true}),
            [-1]);
    });
    it('should turn 1 nibble (with padding zeros) to a 4-bit int', function() {
        assert.deepEqual(byteData.fromBytes(
            ["0f"], 4, {"base": 16, "signed": true}),
            [-1]);
    });
});
