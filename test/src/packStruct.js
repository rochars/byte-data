/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

/**
 * Unsigned 48-bit integers little-endian
 * @type {!Type}
 */
let uInt53 = new byteData.Type({"bits": 53});

describe('pack struct', function() {
    
    it('should not pack a LE struct when input have less items', function() {
        let struct = ["abcd", 4294967295];
        let def = [
            byteData.fourCC,
            byteData.uInt32,
            byteData.uInt16
        ];
        let expected = [];
        assert.deepEqual(
                byteData.packStruct(struct, def),
                expected
            );
    });

    it('should pack a LE struct when input have more items', function() {
        let struct = ["abcd", 4294967295, 65535, 65535, 65535, 65535];
        let def = [
            byteData.fourCC,
            byteData.uInt32,
            byteData.uInt16
        ];
        let expected = [97,98,99,100,255,255,255,255,255,255];
        assert.deepEqual(
                byteData.packStruct(struct, def),
                expected
            );
    });

    it('should pack a LE struct', function() {
        let struct = ["abcd", 4294967295, 65535];
        let def = [
            byteData.fourCC,
            byteData.uInt32,
            byteData.uInt16
        ];
        let expected = [97,98,99,100,255,255,255,255,255,255];
        assert.deepEqual(
                byteData.packStruct(struct, def),
                expected
            );
    });

    it('should pack a LE struct with available types', function() {
        let struct = [
            "cccc",
            "a",
            0,
            -1,
            3,
            -8,
            7,
            -128,
            255,
            -32768,
            65535,
            0.33325,
            -8388608,
            16777215,
            -2147483648,
            4294967295,
            2.147483647,
            -549755813888,
            1099511627775,
            -140737488355328,
            281474976710655,
            3.141592653589793
        ];
        let def = [
            byteData.fourCC,
            byteData.chr,
            byteData.bool,
            byteData.int2,
            byteData.uInt2,
            byteData.int4,
            byteData.uInt4,
            byteData.int8,
            byteData.uInt8,
            byteData.int16,
            byteData.uInt16,
            byteData.float16,
            byteData.int24,
            byteData.uInt24,
            byteData.int32,
            byteData.uInt32,
            byteData.float32,
            byteData.int40,
            byteData.uInt40,
            byteData.int48,
            byteData.uInt48,
            byteData.float64
        ];
        let expected = [
            99,99,99,99,
            97,
            0,
            3,
            3,
            8,
            7,
            128,
            255,
            0, 128,
            255, 255,
            85,53,
            0,0,128,
            255,255,255,
            0,0,0,128,
            255,255,255,255,
            95,112,9,64,
            0,0,0,0,128,
            255,255,255,255,255,
            0,0,0,0,0,128,
            255,255,255,255,255,255,
            24,45,68,84,251,33,9,64
        ];
        assert.deepEqual(
                byteData.packStruct(struct, def),
                expected
            );
    });

});
