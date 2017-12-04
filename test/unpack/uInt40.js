/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');
let uInt40 = byteData.uInt40;

describe('unpack uInt40', function() {

    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (65535)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(["ff","ff","0","0","0"], uInt40, 16),
            [65535]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (32767)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(["ff","7f","0","0","0"], uInt40, 16),
            [32767]);
    });
    it('should turn 4 bytes (hex) to 0 unsigned 40-bit int (not enought bytes) (32767)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(["ff","7f","0","0"], uInt40, 16),
            []);
    });
    it('should turn 7 bytes (hex) to 1 unsigned 40-bit int (ignoring the extra bytes) (32767)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["ff","7f","0","0","0","ff","ff"], uInt40, 16),
            [32767]);
    });

    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (549755813887)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(["ff","ff","ff","ff","7f"], uInt40, 16),
            [549755813887]);
    });
    it('should turn 5 bytes (bin) to 1 unsigned 40-bit int  (500000000080)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["01010000", "10001000", "01010010",  "01101010",  "01110100" ],
                uInt40, 2),
            [500000000080]);
    });
    it('should turn 5 bytes (dec) to 1 unsigned 40-bit int (max range)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["ff","ff","ff","ff","ff"], uInt40, 16),
            [1099511627775]);
    });
    it('should turn 5 bytes (bin) to 1 unsigned 40-bit int (max range)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,255,255,255,255], uInt40),
            [1099511627775]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int (149515627075)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["43","6a", "d3","cf","22"], uInt40, 16),
            [149515627075]);
    });
    it('should turn 5 bytes (bin) to 1 unsigned 40-bit int (149515627075)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["01000011","01101010", "11010011","11001111","00100010"],
                uInt40, 2),
            [149515627075]);
    });
    it('should turn 5 bytes (bin) to 1 unsigned 40-bit int (149515627075) (padding)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["1000011","1101010", "11010011","11001111","100010"],
                uInt40, 2),
            [149515627075]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (32767)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["ff","7f","0","0","0"], uInt40, 16),
            [32767]);
    });
});
