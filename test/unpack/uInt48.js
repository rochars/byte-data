/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');
let uInt48 = byteData.uInt48;

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
                ["ff","ff","ff","ff","ff","ff"], uInt48, 16),
            [281474976710655]);
    });
    it('should turn 5 bytes (hex) to 0 unsigned 48-bit int (not enough bytes)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["ff","ff","ff","ff","ff"], uInt48, 16),
            []);
    });

    // 40 bit tests should work the same with 48-bit
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (65535)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["ff","ff","0","0","0","0"], uInt48, 16),
            [65535]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (32767)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["ff","7f","0","0","0", "00"], uInt48, 16),
            [32767]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (549755813887)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["ff","ff","ff","ff","7f", "00"], uInt48, 16),
            [549755813887]);
    });
    it('should turn 6 bytes (bin) to 1 unsigned 48-bit int  (500000000080)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["01010000", "10001000", "01010010",  "01101010",  "01110100", "00000000" ],
                uInt48, 2),
            [500000000080]);
    });
    it('should turn 6 bytes (dec) to 1 unsigned 48-bit int (max 40-bit  range)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["ff","ff","ff","ff","ff","00"], uInt48, 16),
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
            byteData.unpackArray(["43","6a", "d3","cf","22","00"], uInt48, 16),
            [149515627075]);
    });
    it('should turn 6 bytes (bin) to 1 unsigned 48-bit int (149515627075)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["01000011","01101010", "11010011","11001111","00100010","00000000"],
                uInt48, 2),
            [149515627075]);
    });
    it('should turn 6 bytes (bin) to 1 unsigned 48-bit int (149515627075) (padding)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["1000011","1101010", "11010011","11001111","100010","00000000"], 
                uInt48, 2),
            [149515627075]);
    });
    it('should turn 6 bytes (bin) to 1 signed 48-bit int (65535)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["ff","ff","0","0","0","0"], uInt48, 16),
            [65535]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (32767)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["ff","7f","0","0","0","0"], uInt48, 16),
            [32767]);
    });
});
