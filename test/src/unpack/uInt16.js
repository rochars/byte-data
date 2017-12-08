/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../index.js');

describe('unpack uInt16', function() {
    
    it('should turn 2 bytes to a 16-bit int', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,0], byteData.uInt16),
            [0,0]);
    });
    it('should turn 4 bytes bin to 2 16-bit uInts (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["00000000","00000000","11111111","11111111"],
                byteData.uInt16, 2),
            [0, 65535]);
    });
    it('should turn 5 bytes bin to 2 16-bit uInts (ignore the extra byte) (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["00000000","00000000","11111111","11111111","11111111"],
                byteData.uInt16, 2),
            [0, 65535]);
    });
    it('should turn 1 byte bin to 0 16-bit uInts (not enough bytes)', function() {
        assert.deepEqual(
            byteData.unpackArray(["11111111"],byteData.uInt16, 2),
            []);
    });
    it('should turn 4 bytes hex to 2 16-bit uInts (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(["0","0","ff","ff"], byteData.uInt16, 16),
            [0, 65535]);
    });
    it('should turn 2 bytes to a 16-bit int', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,0], byteData.uInt16),
            [0,0]);
    });
    it('should turn 4 bytes bin to 2 16-bit uInts (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["00000000","00000000","11111111","11111111"],
                byteData.uInt16, 2),
            [0, 65535]);
    });
    it('should turn 5 bytes bin to 2 16-bit uInts (ignore the extra byte) (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["00000000","00000000","11111111","11111111","11111111"],
                byteData.uInt16, 2),
            [0, 65535]);
    });
    it('should turn 1 byte bin to 0 16-bit uInts (not enough bytes)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["11111111"], byteData.uInt16, 2),
            []);
    });
    it('should turn 4 bytes hex to 2 16-bit uInts (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["0","0","ff","ff"], byteData.uInt16, 16),
            [0, 65535]);
    });


    // Should pack anything between 9 and 16 bits to 2 bytes
    it('should handle 11-bit as 16-bit (0)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0], new byteData.Type({"bits": 11})),
            [0]);
    });
    it('should handle 11-bit as 16-bit (2000)', function() {
        assert.deepEqual(
            byteData.unpackArray(['d0', '07'], new byteData.Type({"bits": 11}), 16),
            [2000]);
    });
    it('should handle 11-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.unpackArray([255, 7], new byteData.Type({"bits": 11})),
            [2047]);
    });
    it('should handle 11-bit as 16-bit (65535, overflow)', function() {
        assert.deepEqual(
            byteData.unpackArray(['ff', 'ff'], new byteData.Type({"bits": 11}), 16),
            [2047]);
    });
    it('should handle 12-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.unpackArray([255, 7], new byteData.Type({"bits": 12})),
            [2047]);
    });
    it('should handle 13-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.unpackArray([255, 7], new byteData.Type({"bits": 13})),
            [2047]);
    });
    it('should handle 14-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.unpackArray([255, 7], new byteData.Type({"bits": 14})),
            [2047]);
    });
    it('should handle 15-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.unpackArray([255, 7], new byteData.Type({"bits": 15})),
            [2047]);
    });
});
