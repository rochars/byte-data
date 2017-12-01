/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('32-bit from bytes', function() {
            
    // 32
    it('should turn 4 bytes bin to 1 32-bit float', function() {
        assert.deepEqual(byteData.fromBytes(
            ["01011111","01110000","00001001","01000000"], 32, {"base": 2, "float": true})[0].toFixed(7),
            2.1474836);
    });
    
    it('should turn 4 bytes hex to 1 32-bit float', function() {
        assert.deepEqual(byteData.fromBytes(
            ["5f","70","9","40"], 32, {"base": 16, "float": true})[0].toFixed(7),
            2.1474836);
    });
    it('should turn 3 bytes hex to 0 32-bit float (not enough bytes)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["5f","70","9"], 32, {"base": 16, "float": true}),
            []);
    });
    it('should turn 1 32-bit float to 4 bytes', function() {
        assert.deepEqual(
            byteData.fromBytes([95,112,9,64], 32, {"float": true})[0].toFixed(7),
            2.1474836);
    });
    it('should turn 8 bytes to 2 32-bit floats', function() {
        assert.deepEqual(byteData.fromBytes(
            [0,0,0,0,0,0,0,0], 32, {"float": true}),
            [0,0]);
    });

    // 32 bit ints
    it('should turn 8 bytes to 2 32-bit ints (0s)', function() {
        assert.deepEqual(byteData.fromBytes(
            [0,0,0,0,0,0,0,0], 32, {"base": 10, "signed": false}),
            [0,0]);
    });

    it('should turn 8 bytes bin to 2 32-bit ints (max range)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["00000000","00000000","00000000","10000000",
            "11111111","11111111","11111111","01111111"],
            32, {"base": 2, "signed": true}),
            [-2147483648,2147483647]);
    });
    it('should turn 8 bytes hex to 2 32-bit ints (max range)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["0","0","0","80", "ff","ff","ff","7f"],
            32, {"base": 16, "signed": true}),
            [-2147483648,2147483647]);
    });
    it('should turn 10 bytes hex to 2 32-bit ints (ignore extra bytes) (max range)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["0","0","0","80", "ff","ff","ff","7f","ff","80"],
            32, {"base": 16, "signed": true}),
            [-2147483648,2147483647]);
    });
    it('should turn 4 bytes hex to 1 32-bit ints (random negative)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["e8","3","0","80"],
            32, {"base": 16, "signed": true}),
            [-2147482648]);
    });

    it('should turn 4 bytes hex to 1 32-bit ints (random negative)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["0","80","ff","ff"], 32, {"base": 16, "signed": true}),
            [-32768]);
    });
    it('should turn 8 bytes bin to 2 32-bit uInts (max range)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["00000000","00000000","00000000","00000000",
            "11111111","11111111","11111111","11111111"], 32, {"base": 2, "signed": false}),
            [0,4294967295]);
    });
    it('should turn 8 bytes hex to 2 32-bit uInts (max range)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["0","0","0","00", "ff","ff","ff","ff"], 32, {"base": 16, "signed": false}),
            [0,4294967295]);
    });
});
