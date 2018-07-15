/*
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview Tests for the unpackArray function.
 * @see https://github.com/rochars/byte-data
 */


var byteData = byteData || require('../../test/loader.js');
var assert = assert || require('assert');

var int4 = byteData.types.int4;
var uInt4 = byteData.types.uInt4;
var uInt8 = byteData.types.uInt8;
var int2 = byteData.types.int2;
var uInt16BE = byteData.types.uInt16BE;
var float16BE = byteData.types.float16BE;
var uInt16 = byteData.types.uInt16;
var int16BE = byteData.types.int16BE;
var int16 = byteData.types.int16;
var float16 = byteData.types.float16;
var uInt24BE = byteData.types.uInt24BE;
var int24BE = byteData.types.int24BE;
var uInt24 = byteData.types.uInt24;
var int24 = byteData.types.int24;
var uInt32BE = byteData.types.uInt32BE;
var int32BE = byteData.types.int32BE;
var int32 = byteData.types.int32;
var float32 = byteData.types.float32;
var float64 = byteData.types.float64;
var float32BE = byteData.types.float32BE;
var uInt32 = byteData.types.uInt32;
var uInt40BE = byteData.types.uInt40BE;
var int40BE = byteData.types.int40BE;
var int40 = byteData.types.int40;
var uInt40 = byteData.types.uInt40;
var uInt48BE = byteData.types.uInt48BE;
var uInt48 = byteData.types.uInt48;
var int48BE = byteData.types.int48BE;
var int48 = byteData.types.int48;
var float64BE = byteData.types.float64BE;
var uInt53 = {bits: 53};
var int53 = {bits: 53, signed: true};

var Buffer = Buffer || false;

describe('unpack LE and BE', function() { 
    
    // 16-bit
    it('should turn 2 16-bit signed ints to 2 bytes BE (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 0, 0], int16BE),
            [0, 0]);
    });
    it('should turn 2 16-bit signed ints to 2 bytes LE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([1, 0, 1, 0], int16),
            [1, 1]);
    });
    it('should turn 2 16-bit signed ints to 2 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 1, 0, 1], int16BE),
            [1, 1]);
    });
    it('should turn 1 16-bit unsigned ints to 2 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 1], uInt16BE),
            [1]);
    });
    it('should turn 2 bytes hex to 1 16-bit float BE (1/3)', function() {
        assert.deepEqual(
            byteData.unpackArray([53, 85], float16BE)[0].toFixed(5),
            '0.33325');
    });

    // 24-bit
    it('should turn 2 24-bit signed ints to 6 bytes BE (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 0, 0, 0, 0], int24BE),
            [0, 0]);
    });
    it('should turn 2 24-bit signed ints to 6 bytes LE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([1, 0, 0, 1, 0, 0], int24),
            [1, 1]);
    });
    it('should turn 2 24-bit signed ints to 6 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 1, 0, 0, 1], int24BE),
            [1, 1]);
    });
    it('should turn 1 24-bit unsigned int to 3 bytes BE (8388607)', function() {
        assert.deepEqual(
            byteData.unpackArray([127, 255, 255], uInt24BE),
            [8388607]);
    });
    it('should turn 2 24-bit signed ints to 6 bytes BE (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray([128,0,0, 127, 255, 255],
                int24BE),
            [-8388608, 8388607]);
    });
    it('should turn 2 24-bit signed ints to 6 bytes BE', function() {
        assert.deepEqual(
            byteData.unpackArray([128,0,0 , 0,0,1, 127, 255, 255],
                int24BE),
            [-8388608, 1, 8388607]);
    });

    // 32-bit
    it('should turn 2 32-bit signed ints to 8 bytes BE (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 0, 0, 0, 0, 0, 0],
                int32BE),
            [0, 0]);
    });
    it('should turn 2 32-bit signed ints to 8 bytes LE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([1, 0, 0, 0, 1, 0, 0, 0],
                int32),
            [1, 1]);
    });
    it('should turn 2 32-bit signed ints to 8 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 0, 1, 0,0, 0, 1],
                int32BE),
            [1, 1]);
    });
    it('should turn 1 32-bit signed ints to 4 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 0, 1],
                int32BE),
            [1]);
    });
    it('should turn 8 bytes hex to 2 32-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [128,0,0,0, 127,255,255,255],
                int32BE),
            [-2147483648,2147483647]);
    });
    it('should turn 1 32-bit float from 4 bytes BE hex (2.1474836)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [64,9,112,95],
                float32BE)[0].toFixed(7),
            '2.1474836');
    });

    // 40-bit
    it('should turn 2 40-bit signed ints to 10 bytes BE (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                int40BE),
            [0, 0]);
    });
    it('should turn 2 40-bit signed ints to 10 bytes LE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                int40),
            [1, 1]);
    });
    it('should turn 2 40-bit signed ints to 10 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                int40BE),
            [1, 1]);
    });
    it('should turn 1 40-bit signed ints to 10 bytes LE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [1, 0, 0, 0, 0], int40),
            [1]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int BE (149515627075)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [34,207,211,106,67], uInt40BE),
            [149515627075]);
    });

    // 48-bit
    it('should turn 2 48-bit ints to 12 bytes BE (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                int48BE),
            [0, 0]);
    });
    it('should turn 2 48-bit ints to 12 bytes LE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                int48),
            [1, 1]);
    });
    it('should turn 2 48-bit ints to 12 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                int48BE),
            [1, 1]);
    });
    it('should turn 2 48-bit unsigned ints to 12 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                uInt48BE),
            [1, 1]);
    });
    it('should turn 1 48-bit ints to 6 bytes hex BE (120637438355317)', function() {
        assert.deepEqual(
            byteData.unpackArray([109, 184, 23, 168, 231, 117],
                uInt48BE),
            [120637438355317]);
    });
    it('should turn 1 48-bit unsigned ints to 6 bytes hex BE (120637438355317)', function() {
        var bytes = [109, 184, 23, 168, 231, 117, 
            0, 0, 0, 0, 0, 1, 
            0, 0, 0, 0, 0, 1];
        assert.deepEqual(
            byteData.unpackArray(bytes, uInt48BE),
            [120637438355317, 1, 1]);
    });

    // 64-bit
    it('should turn 1 64-bit float to 8 bytes BE (pi)', function() {
        assert.deepEqual(
            byteData.unpackArray([64, 9, 33, 251, 84, 68, 45, 24], float64BE),
            [3.141592653589793]);
    });
});



describe('unpack float16', function() {

    it('should turn 2 bytes to 1 16-bit float (0)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0], float16),
            [0]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (0)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0], float16),
            [0]);
    });
    it('should turn 2 bytes bin to 1 16-bit float (0)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0], float16),
            [0]);
    });    
    it('should turn 2 bytes bin to 1 16-bit float (0)', function() {
        assert.deepEqual(
            byteData.unpackArray([0,192], float16),
            [-2]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (1)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 60], float16),
            [1]);
    });

    it('should turn 2 bytes hex to 1 16-bit float (1/3)', function() {
        assert.deepEqual(
            byteData.unpackArray([85, 53], float16)[0].toFixed(5),
            '0.33325');
    });
    it('should turn 2 bytes hex to 1 16-bit float (0.00006)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 4], float16)[0].toFixed(5),
            '0.00006');
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.unpackArray([64, 86], float16)[0],
            100);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.unpackArray([208, 95], float16)[0],
            500);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.unpackArray([208, 99], float16)[0],
            1000);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.unpackArray([226, 112], float16)[0],
            10000);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.unpackArray([83, 119], float16)[0],
            30000);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.unpackArray([226, 120], float16)[0],
            40000);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.unpackArray([255, 123], float16)[0],
            65504);
    });
    it('should turn 4 bytes hex to 2 16-bit float (65504, 0.33325)', function() {
        var halfs = byteData.unpackArray(
            [208, 95, 85, 53], float16);
        assert.equal(halfs[0], 500);
        assert.equal(halfs[1].toFixed(5), '0.33325');
    });
    it('should turn 5 bytes hex to 2 16-bit float (65504)', function() {
        var halfs = byteData.unpackArray([255, 123], float16);
        assert.equal(halfs[0], 65504);
    });
    it('should turn 5 bytes hex to 2 16-bit float (65504, 0.33325, extra byte)', function() {
        var halfs = byteData.unpackArray(
            [255, 123, 85, 53,128], float16);
        assert.equal(halfs[0], 65504);
        assert.equal(halfs[1].toFixed(5), '0.33325');
    });
});



describe('unpack float32', function() {
    
    it('should turn 4 bytes bin to 1 32-bit float', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [95,112,9,64],
                float32)[0].toFixed(7),
            '2.1474836');
    });
    it('should turn 4 bytes hex to 1 32-bit float', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [95,112,9,64], float32)[0].toFixed(7),
            '2.1474836');
    });
    it('should turn 3 bytes hex to 0 32-bit float (not enough bytes)', function() {
        assert.deepEqual(
            byteData.unpackArray([95,112,9], float32),
            []);
    });
    it('should turn 1 32-bit float to 4 bytes', function() {
        assert.deepEqual(
            byteData.unpackArray([95,112,9,64], float32)[0].toFixed(7),
            '2.1474836');
    });
    it('should turn 8 bytes to 2 32-bit floats', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,0,0,0,0,0], float32),
            [0,0]);
    });
});



describe('unpack float64', function() {
    
    it('should turn 8 bytes to 1 64-bit float', function() {
        assert.equal(
            byteData.unpackArray([75,40,253,58,221,154,191,63], float64)[0],
            0.123456789876543);
    });
    it('should turn 7 bytes to 0 64-bit float (not enough bytes)', function() {
        assert.deepEqual(
            byteData.unpackArray([75,40,253,58,221,154,191], float64),
            []);
    });
    it('should turn 8 bytes to 1 64-bit float (Uint8Array)', function() {
        assert.equal(
            byteData.unpackArray(
                new Uint8Array([75,40,253,58,221,154,191,63]), float64)[0],
            0.123456789876543);
    });
    it('should turn 8 bytes to 1 64-bit float (Buffer)', function() {
        if (Buffer) {
            assert.equal(
                byteData.unpackArray(
                    new Buffer.from([75,40,253,58,221,154,191,63]), float64)[0],
                0.123456789876543);
        } else {
            assert.equal(
                byteData.unpackArray(
                    new Uint8Array([75,40,253,58,221,154,191,63]), float64)[0],
                0.123456789876543);
        }
    });
    it('should turn 9 bytes to 1 64-bit float (ignore the extra byte) (Buffer)', function() {
        if (Buffer) {
            assert.equal(
                byteData.unpackArray(
                    new Buffer.from([75,40,253,58,221,154,191,63,0]), float64)[0],
                0.123456789876543);
        } else {
            assert.equal(
                byteData.unpackArray(
                    new Uint8Array([75,40,253,58,221,154,191,63,0]), float64)[0],
                0.123456789876543);
        }
        
    });
    it('should turn 8 bytes to 1 64-bit float', function() {
        assert.equal(
            byteData.unpackArray(
                [0,0,0,0,0,0,0,0], float64)[0].toFixed(15),
            0);
    });
    it('should turn 16 bytes to 2 64-bit floats', function() {
        assert.equal(
            byteData.unpackArray(
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], float64)[0].toFixed(15),
            0);
        assert.equal(
            byteData.unpackArray(
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], float64)[1].toFixed(15),
            0);
    });
    it('should turn 8 bytes bin to 1 64-bit float', function() {
        assert.equal(
            byteData.unpackArray(
                [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0
                ], float64)[0].toFixed(15),
            0);
    });
    it('should turn 8 bytes bin to 1 64-bit float', function() {
        assert.equal(
            byteData.unpackArray(
                [
                    75,
                    40,
                    253,
                    58,
                    221,
                    154,
                    191,
                    63
                ], float64)[0].toFixed(15),
            '0.123456789876543');
    });
    it('should turn 8 bytes to 1 64-bit float (31.41592653589793)', function() {
        assert.deepEqual(
            byteData.unpackArray([94,56,85,41,122,106,63,64], float64),
            [31.41592653589793]);
    });
    it('should turn 8 bytes to 1 64-bit float (314159265358979.3)', function() {
        assert.deepEqual(
            byteData.unpackArray([53,72,162,118,158,219,241,66], float64),
            [314159265358979.3]);
    });
    it('should turn 8 bytes hex to 1 64-bit float (2)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,0,0,0,0,0,64], float64),
            [2]);
    });
});


describe('unpack int16', function() {
    
    it('should turn 4 bytes bin to 2 16-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0, 128, 255, 127], int16),
            [-32768, 32767]);
    });
    it('should turn 4 bytes hex to 2 16-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray([0,128,255,127], int16),
            [-32768, 32767]);
    });
    it('should turn 4 bytes bin to 2 16-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0, 128, 255, 127], int16),
            [-32768, 32767]);
    });
    it('should turn 4 bytes hex to 2 16-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray([0,128,255,127], int16),
            [-32768, 32767]);
    });
});



describe('unpack int2', function() {   

    it('should turn 1 2-bit signed int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([2], int2),
            [-2]);
    });
    it('should turn 1 2-bit signed int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([3], int2),
            [-1]);
    });
    it('should turn 1 2-bit signed int to 2 bytes (-2)', function() {
        assert.deepEqual(
            byteData.unpackArray([2], int2),
            [-2]);
    });
    it('should turn 1 2-bit signed int to 1 crumb (-1)', function() {
        assert.deepEqual(
            byteData.unpackArray([3], int2),
            [-1]);
    });
    it('should turn 1 2-bit signed int to 1 crumb hex (-1)', function() {
        assert.deepEqual(
            byteData.unpackArray([3], int2),
            [-1]);
    });
});


describe('unpack int24', function() {
    
    it('should turn 6 bytes bin to 2 24-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,128,255,255,127],
                byteData.types.int24),
            [-8388608, 8388607]);
    });
    it('should turn 6 bytes hex to 2 24-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,128, 255,255,127], byteData.types.int24),
            [-8388608, 8388607]);
    });
});



describe('unpack int32', function() {

    it('should turn 8 bytes bin to 2 32-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,0,128,
                255,255,255,127], int32),
            [-2147483648,2147483647]);
    });
    it('should turn 8 bytes hex to 2 32-bit ints (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,0,128, 255,255,255,127], int32),
            [-2147483648,2147483647]);
    });
    it('should turn 10 bytes hex to 2 32-bit ints (ignore extra bytes) (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,0,128, 255,255,255,127,255,128], int32),
            [-2147483648,2147483647]);
    });
    it('should turn 4 bytes hex to 1 32-bit ints (random negative)', function() {
        assert.deepEqual(
            byteData.unpackArray([232,3,0,128], int32),
            [-2147482648]);
    });

    it('should turn 4 bytes hex to 1 32-bit ints (random negative)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,128,255,255], int32),
            [-32768]);
    });

    // min
    it('min', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,128], byteData.types.int32),
            [-2147483648]);
    });
    // min + 1
    it('min + 1', function() {
        assert.deepEqual(
            byteData.unpackArray([1,0,0,128], byteData.types.int32),
            [-2147483647]
        );
    });
    // min + 2
    it('min + 2', function() {
        assert.deepEqual(
            byteData.unpackArray([2,0,0,128], byteData.types.int32),
            [-2147483646]
        );
    });
    // min + 3
    it('min + 3', function() {
        assert.deepEqual(
            byteData.unpackArray([3,0,0,128], byteData.types.int32),
            [-2147483645]
        );
    });

    // -1
    it('-1', function() {
        assert.deepEqual(
            byteData.unpackArray([255,255,255,255], byteData.types.int32),
            [-1]
        );
    });
    // -2
    it('-2', function() {
        assert.deepEqual(
            byteData.unpackArray([254,255,255,255], byteData.types.int32),
            [-2]
        );
    });
    // -3
    it('-3', function() {
        assert.deepEqual(
            byteData.unpackArray([253,255,255,255], byteData.types.int32),
            [-3]
        );
    });
});


describe('unpack int4', function() { 

    it('should turn 1 nibble to a 4-bit int', function() {
        assert.deepEqual(
            byteData.unpackArray([15], int4),
            [-1]);
    });
    it('should turn 1 nibble to a 4-bit int', function() {
        assert.deepEqual(
            byteData.unpackArray([15], int4),
            [-1]);
    });
    it('should turn 1 nibble to a 4-bit int', function() {
        assert.deepEqual(
            byteData.unpackArray([15], int4),
            [-1]);
    });
});


describe('40-bit from bytes', function() {
    
    
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-32768)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,128,255,255,255], int40),
            [-32768]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-65535)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [1,0,255,255,255], int40),
            [-65535]);
    });
    it('should turn 6 bytes (hex) to 1 signed 40-bit int (ignore the extra byte) (-65535)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [1,0,255,255,255,254], int40),
            [-65535]);
    });
    it('should turn 9 bytes (hex) to 1 signed 40-bit int  (ignore the extra bytes) (-65535)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [1,0,255,255,255,255,255,255,255], int40),
            [-65535]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-1)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,255,255,255,255], int40),
            [-1]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-2)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [254,255,255,255,255], int40),
            [-2]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-3)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [253,255,255,255,255], int40),
            [-3]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-10)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [246,255,255,255,255], int40),
            [-10]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-100)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [156,255,255,255,255], int40),
            [-100]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-1000)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [24,252,255,255,255], int40),
            [-1000]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-10000)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [240,216,255,255,255], int40),
            [-10000]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-100000)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [96, 121,254,255,255], int40),
            [-100000]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-1000000)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [192, 189,240,255,255], int40),
            [-1000000]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-32768)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,128,255,255,255], int40),
            [-32768]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-32768)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [8,128,255,255,255], int40),
            [-32760]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-12345)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [199,207,255,255,255], int40),
            [-12345]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-12345)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,0,0,128], int40),
            [-549755813888]);
    });
    it('should turn 5 bytes (bin) to 1 signed 40-bit int (65535)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,255,0,0,0], int40),
            [65535]);
    });
});


describe('48-bit from bytes', function() {
    
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (max range)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,255,255,255,255,127], byteData.types.int48),
            [140737488355327]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (min range)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,0,0,0,128], byteData.types.int48),
            [-140737488355328]);
    });

    // 40 bit tests should work the same with 48-bit
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-32768)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,128,255,255,255,255], byteData.types.int48),
            [-32768]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-65535)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [1,0,255,255,255,255], byteData.types.int48),
            [-65535]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-1)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,255,255,255,255,255], byteData.types.int48),
            [-1]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-2)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [254,255,255,255,255,255], byteData.types.int48),
            [-2]);
    });
    it('should turn 5 bytes (hex) to 1 signed 48-bit int  (-3)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [253,255,255,255,255,255], byteData.types.int48),
            [-3]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-10)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [246,255,255,255,255,255], byteData.types.int48),
            [-10]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-100)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [156,255,255,255,255,255], byteData.types.int48),
            [-100]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-1000)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [24,252,255,255,255,255], byteData.types.int48),
            [-1000]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-10000)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [240,216,255,255,255,255], byteData.types.int48),
            [-10000]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-100000)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [96, 121,254,255,255,255], byteData.types.int48),
            [-100000]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-1000000)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [192, 189,240,255,255,255], byteData.types.int48),
            [-1000000]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-32768)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,128,255,255,255,255], byteData.types.int48),
            [-32768]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-32768)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [8,128,255,255,255,255], byteData.types.int48),
            [-32760]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-12345)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [199,207,255,255,255,255], byteData.types.int48),
            [-12345]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-12345)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,0,0,128,255], byteData.types.int48),
            [-549755813888]);
    });


    // 0
    it('min', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,0,0,0], byteData.types.int48),
            [0]);
    });
    // min
    it('min', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,0,0,128], byteData.types.int48),
            [-140737488355328]);
    });
    // -125
    it('min', function() {
        assert.deepEqual(
            byteData.unpackArray([131,255,255,255,255,255], byteData.types.int48),
            [-125]);
    });
    // min + 1
    it('min + 1', function() {
        assert.deepEqual(
            byteData.unpackArray([1,0,0,0,0,128], byteData.types.int48),
            [-140737488355327]);
    });
    // min + 2
    it('min + 2', function() {
        assert.deepEqual(
            byteData.unpackArray([2,0,0,0,0,128], byteData.types.int48),
            [-140737488355326]);
    });
    // min + 3
    it('min + 3', function() {
        assert.deepEqual(
            byteData.unpackArray([3,0,0,0,0,128], byteData.types.int48),
            [-140737488355325]);
    });

    // -1
    it('-1', function() {
        assert.deepEqual(
            byteData.unpackArray([255, 255, 255, 255, 255, 255], byteData.types.int48),
            [-1]);
    });
    // -2
    it('-2', function() {
        assert.deepEqual(
            byteData.unpackArray([254, 255, 255, 255, 255, 255], byteData.types.int48),
            [-2]);
    });
    // -3
    it('-3', function() {
        assert.deepEqual(
            byteData.unpackArray([253, 255, 255, 255, 255, 255], byteData.types.int48),
            [-3]);
    });

});



describe('unpack int8', function() {    

    it('should turn 1 hex byte to a 8-bit int (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray([255,127], byteData.types.int8),
            [-1, 127]);
    });
    it('should turn 1 hex byte to a 8-bit int (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray([128,127], byteData.types.int8),
            [-128, 127]);
    });
    it('should turn 1 bin byte to a 8-bit int (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray([128,127], byteData.types.int8),
            [-128, 127]);
    });



    // min
    it('min', function() {
        assert.deepEqual(
            byteData.unpackArray([128], byteData.types.int8),
            [-128]);
    });
    // min + 1
    it('min + 1', function() {
        assert.deepEqual(
            byteData.unpackArray([129], byteData.types.int8),
            [-127]
        );
    });
    // min + 2
    it('min + 2', function() {
        assert.deepEqual(
            byteData.unpackArray([130], byteData.types.int8),
            [-126]
        );
    });
    // min + 3
    it('min + 3', function() {
        assert.deepEqual(
            byteData.unpackArray([131], byteData.types.int8),
            [-125]
        );
    });

    // -1
    it('-1', function() {
        assert.deepEqual(
            byteData.unpackArray([255], byteData.types.int8),
            [-1]
        );
    });
    // -2
    it('-2', function() {
        assert.deepEqual(
            byteData.unpackArray([254], byteData.types.int8),
            [-2]
        );
    });
    // -3
    it('-3', function() {
        assert.deepEqual(
            byteData.unpackArray([253], byteData.types.int8),
            [-3]
        );
    });
});



describe('unpack uInt16', function() {
    
    it('should turn 2 bytes to a 16-bit int', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,0], byteData.types.uInt16),
            [0,0]);
    });
    it('should turn 4 bytes bin to 2 16-bit uInts (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,255,255],
                byteData.types.uInt16),
            [0, 65535]);
    });
    it('should turn 5 bytes bin to 2 16-bit uInts (ignore the extra byte) (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,255,255,255],
                byteData.types.uInt16),
            [0, 65535]);
    });
    it('should turn 1 byte bin to 0 16-bit uInts (not enough bytes)', function() {
        assert.deepEqual(
            byteData.unpackArray([255],byteData.types.uInt16),
            []);
    });
    it('should turn 4 bytes hex to 2 16-bit uInts (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,255,255], byteData.types.uInt16),
            [0, 65535]);
    });
    it('should turn 2 bytes to a 16-bit int', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,0], byteData.types.uInt16),
            [0,0]);
    });
    it('should turn 4 bytes bin to 2 16-bit uInts (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,255,255],
                byteData.types.uInt16),
            [0, 65535]);
    });
    it('should turn 5 bytes bin to 2 16-bit uInts (ignore the extra byte) (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,255,255,255],
                byteData.types.uInt16),
            [0, 65535]);
    });
    it('should turn 1 byte bin to 0 16-bit uInts (not enough bytes)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255], byteData.types.uInt16),
            []);
    });
    it('should turn 4 bytes hex to 2 16-bit uInts (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,255,255], byteData.types.uInt16),
            [0, 65535]);
    });


    // Should pack anything between 9 and 16 bits to 2 bytes
    it('should handle 11-bit as 16-bit (0)', function() {
        assert.deepEqual(
            byteData.unpackArray([0, 0], {"bits": 11}),
            [0]);
    });
    it('should handle 11-bit as 16-bit (2000)', function() {
        assert.deepEqual(
            byteData.unpackArray([208, 7], {"bits": 11}),
            [2000]);
    });
    it('should handle 11-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.unpackArray([255, 7], {"bits": 11}),
            [2047]);
    });
    it('should handle 12-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.unpackArray([255, 7], {"bits": 12}),
            [2047]);
    });
    it('should handle 13-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.unpackArray([255, 7], {"bits": 13}),
            [2047]);
    });
    it('should handle 14-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.unpackArray([255, 7], {"bits": 14}),
            [2047]);
    });
    it('should handle 15-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.unpackArray([255, 7], {"bits": 15}),
            [2047]);
    });
});



describe('unpack uInt2', function() {   

    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0], byteData.types.uInt2),
            [0]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([1], byteData.types.uInt2),
            [1]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([2], byteData.types.uInt2),
            [2]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([3], byteData.types.uInt2),
            [3]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0], byteData.types.uInt2),
            [0]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([1], byteData.types.uInt2),
            [1]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([2], byteData.types.uInt2),
            [2]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([3], byteData.types.uInt2),
            [3]);
    });
    it('should turn 1 2-bit signed int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0], byteData.types.uInt2),
            [0]);
    });
    it('should turn 1 2-bit signed int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([1], byteData.types.uInt2),
            [1]);
    });
    it('should turn 1 2-bit unsigned int to 1 crumb hex (2)', function() {
        assert.deepEqual(
            byteData.unpackArray([2], byteData.types.uInt2),
            [2]);
    });
    it('should turn 1 2-bit unsigned int to 1 crumb bin (1)', function() {
        assert.deepEqual(
            byteData.unpackArray([1], byteData.types.uInt2),
            [1]);
    });
});



describe('unpack uInt24', function() {
    
    it('should turn 6 bytes to 2 24-bit ints', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,0,0,0], uInt24),
            [0,0]);
    });
    it('should turn 6 bytes bin to 2 24-bit uInts (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,0,255,255,255],
                uInt24),
            [0,16777215]);
    });
    it('should turn 7 bytes bin to 2 24-bit uInts (ignore the extra byte) (max range)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,0,
                255,255,255,255],
                uInt24),
            [0,16777215]);
    });
    it('should turn 2 bytes bin to 0 24-bit uInts (not enough bytes)', function() {
        assert.deepEqual(
            byteData.unpackArray([255,255], uInt24),
            []);
    });
    it('should turn 6 bytes hex to 2 24-bit uInts (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,255,255,255], uInt24),
            [0,16777215]);
    });
});



describe('unpack uInt32', function() {

    it('should turn 8 bytes to 2 32-bit ints (0s)', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,0,0,0,0,0], uInt32),
            [0,0]);
    });
    it('should turn 8 bytes bin to 2 32-bit uInts (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,0,0,
                255,255,255,255], uInt32),
            [0,4294967295]);
    });
    it('should turn 8 bytes hex to 2 32-bit uInts (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,0,0, 255,255,255,255], uInt32),
            [0,4294967295]);
    });
});


describe('unpack uInt4', function() { 
    
    it('should turn 1 nibble to a 4-bit uInt', function() {
        assert.deepEqual(
            byteData.unpackArray([0], uInt4),
            [0]);
    });
    it('should turn 1 nibble to a 4-bit uInt', function() {
        assert.deepEqual(
            byteData.unpackArray([15], uInt4),
            [15]);
    });
    it('should turn 2 nibbles to a 4-bit uInts', function() {
        assert.deepEqual(
            byteData.unpackArray([0,1], uInt4),
            [0,1]);
    });
    it('should turn 1 nibble to a 4-bit uInt', function() {
        assert.deepEqual(
            byteData.unpackArray([15], uInt4),
            [15]);
    });
    it('should turn 1 nibble to a 4-bit uInt', function() {
        assert.deepEqual(
            byteData.unpackArray([15], uInt4),
            [15]);
    });
});


describe('unpack uInt40', function() {

    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (65535)',
            function() {
        assert.deepEqual(
            byteData.unpackArray([255,255,0,0,0], uInt40),
            [65535]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (32767)',
            function() {
        assert.deepEqual(
            byteData.unpackArray([255,127,0,0,0], uInt40),
            [32767]);
    });
    it('should turn 4 bytes (hex) to 0 unsigned 40-bit int (not enought bytes) (32767)',
            function() {
        assert.deepEqual(
            byteData.unpackArray([255,127,0,0], uInt40),
            []);
    });
    it('should turn 7 bytes (hex) to 1 unsigned 40-bit int (ignoring the extra bytes) (32767)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,127,0,0,0,255,255], uInt40),
            [32767]);
    });

    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (549755813887)',
            function() {
        assert.deepEqual(
            byteData.unpackArray([255,255,255,255,127], uInt40),
            [549755813887]);
    });
    it('should turn 5 bytes (bin) to 1 unsigned 40-bit int  (500000000080)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [80, 136, 82,  106,  116 ],
                uInt40),
            [500000000080]);
    });
    it('should turn 5 bytes (dec) to 1 unsigned 40-bit int (max range)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,255,255,255,255], uInt40),
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
                [67,106, 211,207,34], uInt40),
            [149515627075]);
    });
    it('should turn 5 bytes (bin) to 1 unsigned 40-bit int (149515627075)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [67,106, 211,207,34],
                uInt40),
            [149515627075]);
    });
    it('should turn 5 bytes (bin) to 1 unsigned 40-bit int (149515627075) (padding)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [67,106, 211,207,34],
                uInt40),
            [149515627075]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (32767)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,127,0,0,0], uInt40),
            [32767]);
    });
});



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
                [255,255,255,255,255,255], uInt48),
            [281474976710655]);
    });
    it('should turn 5 bytes (hex) to 0 unsigned 48-bit int (not enough bytes)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,255,255,255,255], uInt48),
            []);
    });

    // 40 bit tests should work the same with 48-bit
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (65535)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,255,0,0,0,0], uInt48),
            [65535]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (32767)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,127,0,0,0, 0], uInt48),
            [32767]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (549755813887)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,255,255,255,127, 0], uInt48),
            [549755813887]);
    });
    it('should turn 6 bytes (bin) to 1 unsigned 48-bit int  (500000000080)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [80, 136, 82,  106,  116, 0 ],
                uInt48),
            [500000000080]);
    });
    it('should turn 6 bytes (dec) to 1 unsigned 48-bit int (max 40-bit  range)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,255,255,255,255,0], uInt48),
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
            byteData.unpackArray([67,106, 211,207,34,0], uInt48),
            [149515627075]);
    });
    it('should turn 6 bytes (bin) to 1 unsigned 48-bit int (149515627075)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [67,106, 211,207,34,0],
                uInt48),
            [149515627075]);
    });
    it('should turn 6 bytes (bin) to 1 unsigned 48-bit int (149515627075) (padding)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [67,106, 211,207,34,0], 
                uInt48),
            [149515627075]);
    });
    it('should turn 6 bytes (bin) to 1 signed 48-bit int (65535)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,255,0,0,0,0], uInt48),
            [65535]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (32767)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,127,0,0,0,0], uInt48),
            [32767]);
    });
});



describe('53-bit from bytes', function() { 
    
    it('should turn 1 unsigned 53-bit int to 7 bytes (hex) (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray([255, 255, 255, 255, 255, 255, 31], uInt53),
            [9007199254740991]); 
    });
    it('should turn 1 unsigned 53-bit int to 7 bytes (0)', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,0,0,0,0], uInt53),
            [0]);
    });
});


describe('unpack uInt8', function() {    

    it('should turn 1 byte to a 8-bit uInt', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0], uInt8),
            [0,0]);
    });
    it('should turn 1 hex byte to a 8-bit uInt (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray([0,255], uInt8),
            [0, 255]);
    });
    it('should turn 1 bin byte to a 8-bit uInt (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray([0,255], uInt8),
            [0, 255]);
    });
});
