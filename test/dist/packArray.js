/*
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview Tests for the packArray function.
 * @see https://github.com/rochars/byte-data
 */

var byteData = byteData || require('../../test/loader.js');
var assert = assert || require('assert');

var uInt2 = byteData.types.uInt2;
var int2 = byteData.types.int2;
var uInt16BE = byteData.types.uInt16BE;
var uInt16 = byteData.types.uInt16;
var uInt24BE = byteData.types.uInt24BE;
var int24BE = byteData.types.int24BE;
var uInt24 = byteData.types.uInt24;
var int24 = byteData.types.int24;
var uInt32BE = byteData.types.uInt32BE;
var uInt32 = byteData.types.uInt32;
var uInt40BE = byteData.types.uInt40BE;
var uInt40 = byteData.types.uInt40;
var uInt48BE = byteData.types.uInt48BE;
var uInt48 = byteData.types.uInt48;
var float64BE = byteData.types.float64BE;
var uInt53 = {"bits": 53};
var int53 = {bits: 53, signed: true};

describe('pack LE and BE', function() {
    
    // 16-bit
    it('should turn 2 16-bit unsigned ints to 2 bytes BE (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], uInt16BE),
            [0, 0, 0, 0]);
    });
    it('should turn 2 16-bit unsigned ints to 2 bytes LE (1s)', function() {
        assert.deepEqual(
            byteData.packArray([1, 1], uInt16),
            [1, 0, 1, 0]);
    });
    it('should turn 2 16-bit unsigned ints to 2 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.packArray([1, 1], uInt16BE),
            [0, 1, 0, 1]);
    });

    // 24-bit
    it('should turn 2 24-bit unsigned ints to 6 bytes BE (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], int24BE),
            [0, 0, 0, 0, 0, 0]);
    });
    it('should turn 2 24-bit unsigned ints to 6 bytes LE (1s)', function() {
        assert.deepEqual(
            byteData.packArray([1, 1], int24),
            [1, 0, 0, 1, 0, 0]);
    });
    it('should turn 2 24-bit unsigned ints to 6 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.packArray([1, 1], int24BE),
            [0, 0, 1, 0, 0, 1]);
    });
    it('should turn 2 24-bit unsigned ints to 6 bytes BE (max range)', function() {
        assert.deepEqual(
            byteData.packArray([-8388608, 8388607], int24BE),
            [128,0,0, 127, 255, 255]);
    });
    it('should turn 2 24-bit unsigned ints to 6 bytes BE', function() {
        assert.deepEqual(
            byteData.packArray([-8388608, 1, 8388607], int24BE),
            [128,0,0 , 0,0,1, 127, 255, 255]);
    });

    // 32-bit
    it('should turn 2 32-bit unsigned ints to 8 bytes BE (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], uInt32BE),
            [0, 0, 0, 0, 0, 0, 0, 0]);
    });
    it('should turn 2 32-bit unsigned ints to 8 bytes LE (1s)', function() {
        assert.deepEqual(
            byteData.packArray([1, 1], uInt32),
            [1, 0, 0, 0, 1, 0, 0, 0]);
    });
    it('should turn 2 32-bit unsigned ints to 8 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.packArray([1, 1], uInt32BE),
            [0, 0, 0, 1, 0,0, 0, 1]);
    });

    // 40-bit
    it('should turn 2 40-bit unsigned ints to 10 bytes BE (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], uInt40BE),
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
    it('should turn 2 40-bit unsigned ints to 10 bytes LE (1s)', function() {
        assert.deepEqual(
            byteData.packArray([1, 1], uInt40),
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0]);
    });
    it('should turn 2 40-bit unsigned ints to 10 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.packArray([1, 1], uInt40BE),
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    });

    // 48-bit
    it('should turn 2 48-bit unsigned ints to 12 bytes BE (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], uInt48BE),
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
    it('should turn 2 48-bit unsigned ints to 12 bytes LE (1s)', function() {
        assert.deepEqual(
            byteData.packArray([1, 1], uInt48),
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]);
    });
    it('should turn 2 48-bit unsigned ints to 12 bytes BE (1s)', function() {
        assert.deepEqual(
            byteData.packArray([1, 1], uInt48BE),
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
    });
    it('should turn 1 48-bit unsigned ints to 6 bytes hex BE (120637438355317)', function() {
        assert.deepEqual(
            byteData.packArray([120637438355317], uInt48BE),
            [109, 184, 23, 168, 231, 117]);
    });
    it('should turn 1 48-bit unsigned ints to 6 bytes hex BE (120637438355317)', function() {
        assert.deepEqual(
            byteData.packArray([120637438355317, 1, 1], uInt48BE),
            [109, 184, 23, 168, 231, 117, 
            0, 0, 0, 0, 0, 1, 
            0, 0, 0, 0, 0, 1]);
    });

    // 64-bit
    it('should turn 1 64-bit float to 8 bytes BE (pi)', function() {
        assert.deepEqual(
            byteData.packArray([3.141592653589793], float64BE),
            [64, 9, 33, 251, 84, 68, 45, 24]);
    });

});


describe('pack float16', function() { 
    
    it('should turn 2 bytes to 1 16-bit float (0)', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.types.float16, 16),
            [0, 0]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (0)', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.types.float16, 16),
            [0, 0]);
    });
    it('should turn 2 bytes bin to 1 16-bit float (0)', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.types.float16, 2),
            [0, 0]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (1)', function() {
        assert.deepEqual(
            byteData.packArray([1], byteData.types.float16, 16),
            [0, 60]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (1/3)', function() {
        assert.deepEqual(
            byteData.packArray([0.33325], byteData.types.float16, 16),
            [85,53]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (-2)', function() {
        assert.deepEqual(
            byteData.packArray([-2], byteData.types.float16, 16),
            [0, 192]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.packArray([100], byteData.types.float16, 16),
            [64, 86]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.packArray([500], byteData.types.float16, 16),
            [208, 95]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.packArray([1000], byteData.types.float16, 16),
            [208, 99]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.packArray([10000], byteData.types.float16, 16),
            [226, 112]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.packArray([30000], byteData.types.float16, 16),
            [83, 119]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.packArray([40000], byteData.types.float16, 16),
            [226, 120]);
    });
    it('should turn 2 bytes hex to 1 16-bit float (65504)', function() {
        assert.deepEqual(
            byteData.packArray([65504], byteData.types.float16, 16),
            [255, 123]);
    });
    it('should turn 4 bytes hex to 2 16-bit float (65504, 0.33325, extra byte)', function() {
        assert.deepEqual(
            byteData.packArray(
                [65504, 0.33325], byteData.types.float16, 16),
            [255, 123, 85, 53]);
    });
});



describe('pack float32', function() {     

    it('should turn 2 signed 32-bit floats to 8 bytes (0s)', function() {
        assert.deepEqual(byteData.packArray([0, 0], byteData.types.float32), 
            [0,0,0,0,0,0,0,0]);
    });
    it('should turn 1 signed 32-bit float to 4 bytes (pi)', function() {
        assert.deepEqual(byteData.packArray([2.147483647], byteData.types.float32), 
            [95,112,9,64]);
    });
    it('should turn 1 signed 32-bit float to 4 bytes', function() {
        assert.deepEqual(byteData.packArray([2.147483647], byteData.types.float32, 16), 
            [95,112,9,64]);
    });
    it('should turn 1 signed 32-bit float to 4 bytes (1)', function() {
        assert.deepEqual(byteData.packArray([214748364.7], byteData.types.float32), 
            [205,204,76,77]);
    });
});




describe('pack float64', function() {
    
    it('should turn 2 64-bit floats to 16 bytes (-1, 1)', function() {
        assert.deepEqual(
            byteData.packArray([1,-1], byteData.types.float64),
            [0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,191]);
    });
    it('should turn 1 64-bit floats to 16 bytes hex (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.types.float64, 16),
            [0,0,0,0,0,0,240,191]);
    });
    it('should turn 1 64-bit floats to 16 bytes hex (-0.5)', function() {
        assert.deepEqual(
            byteData.packArray([-0.5], byteData.types.float64, 16),
            [0,0,0,0,0,0,224,191]);
    });
    it('should turn 2 64-bit floats to 16 bytes (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.types.float64),
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    });
    it('should turn 3 64-bit floats to 16 bytes (0 0 1)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0, 1], byteData.types.float64),
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63]);
    });
    it('should turn 3 64-bit floats to 16 bytes (0 1 0)', function() {
        assert.deepEqual(
            byteData.packArray([0, 1, 0], byteData.types.float64),
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0]);
    });
    it('should turn 1 64-bit floats to 8 bytes (0.5)', function() {
        assert.deepEqual(
            byteData.packArray([0.5], byteData.types.float64),
            [0,0,0,0,0,0,224,63]);
    });
    it('should turn 1 64-bit float to 8 bytes (-0.5)', function() {
        assert.deepEqual(
            byteData.packArray([-0.5], byteData.types.float64),
            [0,0,0,0,0,0,224,191]);
    });
    it('should turn 1 64-bit float to 8 bytes (pi)', function() {
        assert.deepEqual(
            byteData.packArray([3.141592653589793], byteData.types.float64),
            [24,45,68,84,251,33,9,64]);
    });
    it('should turn 1 64-bit float to 8 bytes (pi)', function() {
        assert.deepEqual(
            byteData.packArray([9], byteData.types.float64),
            [0,0,0,0,0,0,34,64]);
    });
    it('should turn 1 64-bit float to 8 bytes (14)', function() {
        assert.deepEqual(
            byteData.packArray([31.41592653589793], byteData.types.float64),
            [94,56,85,41,122,106,63,64]);
    });
    it('should turn 1 64-bit float to 8 bytes (1)', function() {
        assert.deepEqual(
            byteData.packArray([314159265358979.3], byteData.types.float64),
            [53,72,162,118,158,219,241,66]);
    });
    it('should turn 1 64-bit float to 8 bytes (hex) (0)', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.types.float64, 16),
            [0,0,0,0,0,0,0,0]);
    });
    it('should turn 1 64-bit float to 8 bytes hex (2)', function() {
        assert.deepEqual(
            byteData.packArray([2], byteData.types.float64, 16),
            [0,0,0,0,0,0,0,64]);
    });
    it('should turn 1 64-bit float to 8 bytes (1)', function() {
        assert.deepEqual(
            byteData.packArray([314159265358979.3], byteData.types.float64),
            [53,72,162,118,158,219,241,66]);
    });
});



describe('pack int16', function() { 
    
    // 0
    it('pack 0', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.types.int16),
            [0, 0]
        );
    });

    // 0s
    it('pack 2 0s', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.types.int16),
            [0, 0, 0, 0]
        );
    });

    // min, max
    it('pack min, max', function() {
        assert.deepEqual(
            byteData.packArray([-32768, 32767], byteData.types.int16),
            [0, 128, 255, 127]
        );
    });

    // min
    it('pack min range', function() {
        assert.deepEqual(
            byteData.packArray([-32768], byteData.types.int16, 16),
            [0, 128]
        );
    });

    // min - 1
    it('pack min + 1', function() {
        assert.deepEqual(
            byteData.packArray([-32767], byteData.types.int16, 16),
            [1, 128]
        );
    });
    // min - 2
    it('pack min + 2', function() {
        assert.deepEqual(
            byteData.packArray([-32766], byteData.types.int16, 16),
            [2, 128]
        );
    });
    // min - 3
    it('pack min + 3', function() {
        assert.deepEqual(
            byteData.packArray([-32765], byteData.types.int16, 16),
            [3, 128]
        );
    });
    // -1
    it('pack -1', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.types.int16, 16),
            [255, 255]
        );
    });
    // -2
    it('pack -2', function() {
        assert.deepEqual(
            byteData.packArray([-2], byteData.types.int16, 16),
            [254, 255]
        );
    });
    // -3
    it('pack -3', function() {
        assert.deepEqual(
            byteData.packArray([-3], byteData.types.int16, 16),
            [253, 255]
        );
    });
});



describe('pack int2', function() {   
    
    it('should turn 2 2-bit signed int to 2 crumb (-2)', function() {
        assert.deepEqual(
            byteData.packArray([-2], int2, 2),
            [2]);
    });
    it('should turn 2 2-bit signed int to 2 crumb (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1], int2, 2),
            [3]);
    });
    it('should turn 2 2-bit signed int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0], int2, 2),
            [0]);
    });
    it('should turn 2 2-bit signed int to 2 bytes (-2)', function() {
        assert.deepEqual(
            byteData.packArray([-2], int2),
            [2]);
    });
    it('should turn 1 2-bit signed int to 1 crumb (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1], int2),
            [3]);
    });
    it('should turn 1 2-bit signed int to 1 crumb hex (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1], int2, 16),
            [3]);
    });
});



describe('pack int24', function() {
    
    it('should turn 2 signed 24-bit ints to 6 bytes (min, max)', function() {
        assert.deepEqual(
            byteData.packArray([-8388608, 8388607], byteData.types.int24),
            [0,0,128,255,255,127]
        );
    });
    // min
    it('should turn 1 signed 24-bit ints to 3 bytes (min)', function() {
        assert.deepEqual(
            byteData.packArray([-8388608], byteData.types.int24, 16),
            [0,0,128]
        );
    });
    // min + 1
    it('should turn 1 signed 24-bit ints to 3 bytes (min + 1)', function() {
        assert.deepEqual(
            byteData.packArray([-8388607], byteData.types.int24, 16),
            [1,0,128]
        );
    });
    // min + 2
    it('should turn 1 signed 24-bit ints to 3 bytes (min + 2)', function() {
        assert.deepEqual(
            byteData.packArray([-8388606], byteData.types.int24, 16),
            [2,0,128]
        );
    });
    // min + 3
    it('should turn 1 signed 24-bit ints to 3 bytes (min + 3)', function() {
        assert.deepEqual(
            byteData.packArray([-8388605], byteData.types.int24, 16),
            [3,0,128]
        );
    });

    // -1
    it('should turn 1 signed 16-bit ints to 2 bytes (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.types.int24, 16),
            [255, 255, 255]
        );
    });
    // -2
    it('should turn 1 signed 16-bit ints to 2 bytes (-2)', function() {
        assert.deepEqual(
            byteData.packArray([-2], byteData.types.int24, 16),
            [254, 255, 255]
        );
    });
    // -3
    it('should turn 1 signed 16-bit ints to 2 bytes (-3)', function() {
        assert.deepEqual(
            byteData.packArray([-3], byteData.types.int24, 16),
            [253, 255, 255]
        );
    });
});



describe('pack int32', function() {     

    it('should turn 2 signed 32-bit int to 8 bytes (max range)', function() {
        assert.deepEqual(
            byteData.packArray([-2147483648, 2147483647], byteData.types.int32),
            [0,0,0,128,255,255,255,127]);
    });
    it('should turn 1 signed 32-bit int to 4 bytes bin (min range)', function() {
        assert.deepEqual(
            byteData.packArray([-2147483648], byteData.types.int32, 2),
            [0, 0,0,128]);
    });
    
    // 0
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.types.int32, 16),
            [0,0,0,0]);
    });
    // min
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-2147483648], byteData.types.int32, 16),
            [0,0,0,128]);
    });
    // -125
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-125], byteData.types.int32, 16),
            [131,255,255,255]);
    });
    // min + 1
    it('min + 1', function() {
        assert.deepEqual(
            byteData.packArray([-2147483647], byteData.types.int32, 16),
            [1,0,0,128]
        );
    });
    // min + 2
    it('min + 2', function() {
        assert.deepEqual(
            byteData.packArray([-2147483646], byteData.types.int32, 16),
            [2,0,0,128]
        );
    });
    // min + 3
    it('min + 3', function() {
        assert.deepEqual(
            byteData.packArray([-2147483645], byteData.types.int32, 16),
            [3,0,0,128]
        );
    });

    // -1
    it('-1', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.types.int32, 16),
            [255, 255, 255, 255]
        );
    });
    // -2
    it('-2', function() {
        assert.deepEqual(
            byteData.packArray([-2], byteData.types.int32, 16),
            [254, 255, 255, 255]
        );
    });
    // -3
    it('-3', function() {
        assert.deepEqual(
            byteData.packArray([-3], byteData.types.int32, 16),
            [253, 255, 255, 255]
        );
    });
});



describe('pack int4', function() {
    
    it('should turn 2 4-bit signed int to 2 bytes (-8, 7)', function() {
        assert.deepEqual(
            byteData.packArray([-8, 7], byteData.types.int4),
            [8, 7]);
    });
    it('should turn 1 4-bit signed int to 1 nibble (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.types.int4),
            [15]);
    });
    it('should turn 1 4-bit signed int to 1 nibble (-1, 5)', function() {
        assert.deepEqual(
            byteData.packArray([-1, 5], byteData.types.int4),
            [15, 5]);
    });
    it('should turn 1 4-bit signed int to 1 nibble hex (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.types.int4, 16),
            [15]);
    });
    it('should turn 1 4-bit signed int to 1 nibble hex (-8)', function() {
        assert.deepEqual(
            byteData.packArray([-8], byteData.types.int4, 16),
            [8]);
    });
});




describe('pack int40', function() { 

    // 0
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.types.int40, 16),
            [0,0,0,0,0]);
    });
    // min
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-549755813888], byteData.types.int40, 16),
            [0,0,0,0,128]);
    });
    // -125
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-125], byteData.types.int40, 16),
            [131,255,255,255,255]);
    });
    // min + 1
    it('min + 1', function() {
        assert.deepEqual(
            byteData.packArray([-549755813887], byteData.types.int40, 16),
            [1,0,0,0,128]
        );
    });
    // min + 2
    it('min + 2', function() {
        assert.deepEqual(
            byteData.packArray([-549755813886], byteData.types.int40, 16),
            [2,0,0,0,128]
        );
    });
    // min + 3
    it('min + 3', function() {
        assert.deepEqual(
            byteData.packArray([-549755813885], byteData.types.int40, 16),
            [3,0,0,0,128]
        );
    });

    // -1
    it('-1', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.types.int40, 16),
            [255, 255, 255, 255, 255]
        );
    });
    // -2
    it('-2', function() {
        assert.deepEqual(
            byteData.packArray([-2], byteData.types.int40, 16),
            [254, 255, 255, 255, 255]
        );
    });
    // -3
    it('-3', function() {
        assert.deepEqual(
            byteData.packArray([-3], byteData.types.int40, 16),
            [253, 255, 255, 255, 255]
        );
    });

    // max
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([549755813887], byteData.types.int40, 16),
            [255,255,255,255,127]);
    });
});




describe('48-bit to bytes', function() { 

    it('should turn 1 signed 48-bit int to 6 bytes (hex) (max range)', function() {
        assert.deepEqual(
            byteData.packArray([-140737488355328], byteData.types.int48, 16),
            [0,0,0,0,0,128]);
    });
    
    // 0
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.types.int48, 16),
            [0,0,0,0,0,0]);
    });
    // min
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-140737488355328], byteData.types.int48, 16),
            [0,0,0,0,0,128]);
    });
    // -125
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-125], byteData.types.int48, 16),
            [131,255,255,255,255,255]);
    });
    // min + 1
    it('min + 1', function() {
        assert.deepEqual(
            byteData.packArray([-140737488355327], byteData.types.int48, 16),
            [1,0,0,0,0,128]
        );
    });
    // min + 2
    it('min + 2', function() {
        assert.deepEqual(
            byteData.packArray([-140737488355326], byteData.types.int48, 16),
            [2,0,0,0,0,128]
        );
    });
    // min + 3
    it('min + 3', function() {
        assert.deepEqual(
            byteData.packArray([-140737488355325], byteData.types.int48, 16),
            [3,0,0,0,0,128]
        );
    });

    // -1
    it('-1', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.types.int48, 16),
            [255, 255, 255, 255, 255, 255]
        );
    });
    // -2
    it('-2', function() {
        assert.deepEqual(
            byteData.packArray([-2], byteData.types.int48, 16),
            [254, 255, 255, 255, 255, 255]
        );
    });
    // -3
    it('-3', function() {
        assert.deepEqual(
            byteData.packArray([-3], byteData.types.int48, 16),
            [253, 255, 255, 255, 255, 255]
        );
    });
});



describe('53-bit signed integers to bytes', function() { 
    
    it('pack int53 0', function() {
        assert.deepEqual(
            byteData.packArray([0], int53),
            [0,0,0,0,0,0,0]);
    });
    it('pack int53 min', function() {
        assert.deepEqual(
            byteData.packArray([-4503599627370496], int53, 16),
            [0, 0, 0, 0, 0, 0, 16]); 
    });
    it('pack int53 min', function() {
        assert.deepEqual(
            byteData.packArray([-1], int53, 2),
            [255, 255, 255, 255,
            255, 255, 31]); 
    });
    it('pack int53 min', function() {
        assert.deepEqual(
            byteData.packArray([-1], int53, 16),
            [255, 255, 255, 255,
            255, 255, 31]); 
    });

    it('pack int53 min', function() {
        assert.deepEqual(
            byteData.packArray([-1], int24, 16),
            [255, 255, 255]); 
    });
});



describe('pack int8', function() {

    it('should turn 2 8-bit signed int to 2 bytes (-128, 127)', function() {
        assert.deepEqual(
            byteData.packArray([-128, 127], byteData.types.int8),
            [128, 127]);
    });
    it('should turn 1 8-bit signed int to 1 byte (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.types.int8),
            [255]);
    });
    it('should turn 1 8-bit signed int to 1 byte (-1, 5)', function() {
        assert.deepEqual(
            byteData.packArray([-1, 5], byteData.types.int8),
            [255, 5]);
    });
    it('should turn 1 8-bit signed int to 1 byte hex (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.types.int8, 16),
            [255]);
    });
    it('should turn 1 8-bit signed int to 1 byte hex (-1)', function() {
        assert.deepEqual(
            byteData.packArray([127], byteData.types.int8, 16),
            [127]);
    });
    it('should turn 1 8-bit signed int to 1 byte hex (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-128], byteData.types.int8, 16),
            [128]);
    });
    it('should turn 1 8-bit signed int to 1 byte hex in a Uint8Array (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1, 5], byteData.types.int8),
            [255, 5]);
    });


    // min
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-128], byteData.types.int8, 16),
            [128]);
    });
    // min + 1
    it('min + 1', function() {
        assert.deepEqual(
            byteData.packArray([-127], byteData.types.int8, 16),
            [129]
        );
    });
    // min + 2
    it('min + 2', function() {
        assert.deepEqual(
            byteData.packArray([-126], byteData.types.int8, 16),
            [130]
        );
    });
    // min + 3
    it('min + 3', function() {
        assert.deepEqual(
            byteData.packArray([-125], byteData.types.int8, 16),
            [131]
        );
    });

    // -1
    it('-1', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.types.int8, 16),
            [255]
        );
    });
    // -2
    it('-2', function() {
        assert.deepEqual(
            byteData.packArray([-2], byteData.types.int8, 16),
            [254]
        );
    });
    // -3
    it('-3', function() {
        assert.deepEqual(
            byteData.packArray([-3], byteData.types.int8, 16),
            [253]
        );
    });
});




describe('pack uInt16', function() { 

    it('should turn 2 signed 16-bit ints to 4 bytes (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.types.uInt16),
            [0, 0, 0, 0]);
    });
    it('should turn 1 signed 16-bit int to 2 bytes (0)', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.types.uInt16),
            [0, 0]);
    });
    it('should turn 2 unsigned 16-bit ints to 4 bytes (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.types.uInt16),
            [0, 0, 0, 0]);
    });
    it('should turn 1 unsigned 16-bit int to 2 bytes (0)', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.types.uInt16),
            [0, 0]);
    });
    it('should turn 2 unsigned 16-bit ints to 4 bytes (max range)', function() {
        assert.deepEqual(
            byteData.packArray([0, 65535], byteData.types.uInt16),
            [0, 0, 255, 255]
        );
    });
    it('should turn 1 unsigned 16-bit int to 2 bytes (0)', function() {
        assert.deepEqual(
            byteData.packArray([765], byteData.types.uInt16, 16),
            [253, 2]);
    });


    // Should pack anything between 9 and 16 bits to 2 bytes
    it('should handle 11-bit as 16-bit (0)', function() {
        assert.deepEqual(
            byteData.packArray([0], {"bits": 11}),
            [0, 0]);
    });
    it('should handle 11-bit as 16-bit (2000)', function() {
        assert.deepEqual(
            byteData.packArray([2000], {"bits": 11}, 16),
            [208, 7]);
    });
    it('should handle 11-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.packArray([2047], {"bits": 11}),
            [255, 7]);
    });
    it('should handle 12-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.packArray([2047], {"bits": 12}),
            [255, 7]);
    });
    it('should handle 13-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.packArray([2047], {"bits": 13}),
            [255, 7]);
    });
    it('should handle 14-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.packArray([2047], {"bits": 14}),
            [255, 7]);
    });
    it('should handle 15-bit as 16-bit (2047)', function() {
        assert.deepEqual(
            byteData.packArray([2047], {"bits": 15}),
            [255, 7]);
    });    
});


describe('pack uInt2', function() {   
    
    // 2-bit
    it('should turn 2 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0], uInt2),
            [0]);
    });
    it('should turn 2 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.packArray([1], uInt2),
            [1]);
    });
    it('should turn 2 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.packArray([2], uInt2),
            [2]);
    });
    it('should turn 2 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(
            byteData.packArray([3], uInt2),
            [3]);
    });
});



describe('pack uInt24', function() {
    
    it('should turn 1 signed 24-bit int to 3 bytes hex (16777215)', function() {
        assert.deepEqual(
            byteData.packArray([16777215], byteData.types.uInt24, 16),
            [255,255,255]
        );
    });
    it('should turn 2 signed 24-bit ints to 6 bytes (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.types.uInt24),
            [0, 0, 0, 0, 0, 0]
        );
    });
    it('should turn 2 unsigned 24-bit ints to 6 bytes (max range)', function() {
        assert.deepEqual(
            byteData.packArray([0, 16777215], byteData.types.uInt24),
            [0,0,0,255,255,255]
        );
    });
    it('should turn 2 unsigned 24-bit ints to 6 bytes (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.types.uInt24),
            [0, 0, 0, 0, 0, 0]
        );
    });
    it('should turn 2 unsigned 24-bit ints to 6 bytes in a Uint8Array (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.types.uInt24),
            [0, 0, 0, 0, 0, 0]
        );
    });
});


describe('pack uInt32', function() {     

    it('should turn 2 unsigned 32-bit ints to 8 bytes (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.types.uInt32), 
            [0,0,0,0,0,0,0,0]);
    });
    it('should turn 2 unsigned 32-bit int to 8 bytes (max range)', function() {
        assert.deepEqual(
            byteData.packArray([0, 4294967295], byteData.types.uInt32),
            [0,0,0,0,255,255,255,255]);
    });
    it('should turn 1 signed 32-bit int to 4 bytes bin (max range)', function() {
        assert.deepEqual(
            byteData.packArray([2147483647], byteData.types.uInt32, 2),
            [255,255,255,127]);
    });
    it('should turn 1 unsigned 32-bit int to 4 bytes hex (max range)', function() {
        assert.deepEqual(
            byteData.packArray([4294967295], byteData.types.uInt32, 16),
            [255,255,255,255]);
    });
    it('should turn 2 unsigned 32-bit int to 8 bytes in a Uint8Array (max range)', function() {
        assert.deepEqual(
            byteData.packArray([0, 4294967295], byteData.types.uInt32),
            [0,0,0,0,255,255,255,255]);
    });
});


describe('pack uInt4', function() {
    
    it('should turn 2 4-bit signed int to 2 nibbles (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.types.uInt4),
            [0, 0]);
    });
    it('should turn 1 4-bit signed int to 1 nibble hex (7)', function() {
        assert.deepEqual(
            byteData.packArray([7], byteData.types.uInt4, 16),
            [7]);
    });
    it('should turn 1 4-bit signed int to 1 nibble bin (6)', function() {
        assert.deepEqual(
            byteData.packArray([6], byteData.types.uInt4, 2),
            [6]);
    });
});



describe('pack uInt40', function() { 
    
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (max range)', function() {
        assert.deepEqual(
            byteData.packArray([549755813887], byteData.types.uInt40, 16),
            [255,255,255,255,127]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (949752813887)', function() {
        assert.deepEqual(
            byteData.packArray([949752813887], byteData.types.uInt40, 16),
            [63, 217, 173, 33, 221]);
    });  
    it('should turn 1 unsigned 40-bit int to 5 bytes (hex) (max range)', function() {
        assert.deepEqual(
            byteData.packArray([1099511627775], byteData.types.uInt40, 16),
            [255,255,255,255,255]);
    });
    it('should turn 1 unsigned 40-bit int to 5 bytes (max range)', function() {
        assert.deepEqual(
            byteData.packArray([1099511627775], byteData.types.uInt40),
            [255,255,255,255,255]);
    });
    it('should turn 1 unsigned 40-bit int to 5 bytes in a Uint8Array (max range)', function() {
        assert.deepEqual(
            byteData.packArray([1099511627775], byteData.types.uInt40),
            [255,255,255,255,255]);
    });
});


describe('48-bit to bytes', function() { 
    
    it('should turn 1 signed 48-bit int to 6 bytes (hex) (max range)', function() {
        assert.deepEqual(
            byteData.packArray([120637438355317], byteData.types.uInt48, 16),
            [117, 231, 168, 23, 184, 109]); 
    });
    it('should turn 1 signed 48-bit int to 6 bytes (hex) (max range)', function() {
        assert.deepEqual(
            byteData.packArray([140737488355327], byteData.types.uInt48),
            [255,255,255,255,255,127]); 
    });
    it('should turn 1 unsigned 48-bit int to 6 bytes (max range)', function() {
        assert.deepEqual(
            byteData.packArray([281474976710655], byteData.types.uInt48),
            [255,255,255,255,255,255]);
    });
    it('should turn 1 unsigned 48-bit int to 6 bytes (max range)', function() {
        assert.deepEqual(
            byteData.packArray([281474976710655], byteData.types.uInt48),
            [255,255,255,255,255,255]);
    });
});


describe('53-bit to bytes', function() { 
    
    it('should turn 1 unsigned 53-bit int to 7 bytes (hex) (max range)', function() {
        assert.deepEqual(
            byteData.packArray([9007199254740991], uInt53, 16),
            [255, 255, 255, 255, 255, 255, 31]); 
    });
    it('should turn 1 unsigned 53-bit int to 7 bytes (0)', function() {
        assert.deepEqual(
            byteData.packArray([0], uInt53),
            [0,0,0,0,0,0,0]);
    });
});



describe('pack uInt8', function() {
    
    it('should turn 2 8-bit unsigned int to 2 bytes (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.types.uInt8),
            [0, 0]);
    });
    it('should turn 2 8-bit unsigned int to 2 bytes (min, max)', function() {
        assert.deepEqual(
            byteData.packArray([0, 255], byteData.types.uInt8),
            [0, 255]);
    });
    it('should turn 1 8-bit unsigned int to 1 byte', function() {
        assert.deepEqual(
            byteData.packArray([1], byteData.types.uInt8),
            [1]);
    });
    it('should turn 2 8-bit signed int to 2 bytes (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.types.uInt8),
            [0, 0]);
    });
});
