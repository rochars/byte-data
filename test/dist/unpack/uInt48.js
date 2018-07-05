/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');
let uInt48 = byteData.types.uInt48;

describe('unpack uInt48', function() {
    
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (max range)',
            function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,0,0,0], uInt48),
            [0]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (max range)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,255,255,255,255,255], uInt48, 16),
            [281474976710655]);
    });
    it('should turn 5 bytes (hex) to 0 unsigned 48-bit int (not enough bytes)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,255,255,255,255], uInt48, 16),
            []);
    });

    // 40 bit tests should work the same with 48-bit
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (65535)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,255,0,0,0,0], uInt48, 16),
            [65535]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (32767)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,127,0,0,0, 0], uInt48, 16),
            [32767]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (549755813887)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,255,255,255,127, 0], uInt48, 16),
            [549755813887]);
    });
    it('should turn 6 bytes (bin) to 1 unsigned 48-bit int  (500000000080)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [80, 136, 82,  106,  116, 0 ],
                uInt48, 2),
            [500000000080]);
    });
    it('should turn 6 bytes (dec) to 1 unsigned 48-bit int (max 40-bit  range)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,255,255,255,255,0], uInt48, 16),
            [1099511627775]);
    });
    it('should turn 6 bytes (bin) to 1 unsigned 48-bit int (max 40-bit range)',
            function() {
        assert.deepEqual(
            byteData.unpackArray([255,255,255,255,255, 0], uInt48),
            [1099511627775]);
    });
    it('should turn 6 bytes (bin) to 1 unsigned 48-bit int (max 48-bit range)',
            function() {
        assert.deepEqual(
            byteData.unpackArray([255,255,255,255,255, 255], uInt48),
            [281474976710655]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int (149515627075)',
            function() {
        assert.deepEqual(
            byteData.unpackArray([67,106, 211,207,34,0], uInt48, 16),
            [149515627075]);
    });
    it('should turn 6 bytes (bin) to 1 unsigned 48-bit int (149515627075)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [67,106, 211,207,34,0],
                uInt48, 2),
            [149515627075]);
    });
    it('should turn 6 bytes (bin) to 1 unsigned 48-bit int (149515627075) (padding)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [67,106, 211,207,34,0], 
                uInt48, 2),
            [149515627075]);
    });
    it('should turn 6 bytes (bin) to 1 signed 48-bit int (65535)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,255,0,0,0,0], uInt48, 16),
            [65535]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (32767)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,127,0,0,0,0], uInt48, 16),
            [32767]);
    });
});
