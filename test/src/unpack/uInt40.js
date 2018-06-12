/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');
let uInt40 = byteData.uInt40;

describe('unpack uInt40', function() {

    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (65535)',
            function() {
        assert.deepEqual(
            byteData.unpackArray([255,255,0,0,0], uInt40, 16),
            [65535]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (32767)',
            function() {
        assert.deepEqual(
            byteData.unpackArray([255,127,0,0,0], uInt40, 16),
            [32767]);
    });
    it('should turn 4 bytes (hex) to 0 unsigned 40-bit int (not enought bytes) (32767)',
            function() {
        assert.deepEqual(
            byteData.unpackArray([255,127,0,0], uInt40, 16),
            []);
    });
    it('should turn 7 bytes (hex) to 1 unsigned 40-bit int (ignoring the extra bytes) (32767)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,127,0,0,0,255,255], uInt40, 16),
            [32767]);
    });

    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (549755813887)',
            function() {
        assert.deepEqual(
            byteData.unpackArray([255,255,255,255,127], uInt40, 16),
            [549755813887]);
    });
    it('should turn 5 bytes (bin) to 1 unsigned 40-bit int  (500000000080)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [80, 136, 82,  106,  116 ],
                uInt40, 2),
            [500000000080]);
    });
    it('should turn 5 bytes (dec) to 1 unsigned 40-bit int (max range)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,255,255,255,255], uInt40, 16),
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
                [67,106, 211,207,34], uInt40, 16),
            [149515627075]);
    });
    it('should turn 5 bytes (bin) to 1 unsigned 40-bit int (149515627075)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [67,106, 211,207,34],
                uInt40, 2),
            [149515627075]);
    });
    it('should turn 5 bytes (bin) to 1 unsigned 40-bit int (149515627075) (padding)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [67,106, 211,207,34],
                uInt40, 2),
            [149515627075]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (32767)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,127,0,0,0], uInt40, 16),
            [32767]);
    });
});
