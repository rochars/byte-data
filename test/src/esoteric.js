/*
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview Tests for integers with bit depths
 *   other than 8, 16, 24, and 32.
 * @see https://github.com/rochars/byte-data
 */

var byteData = byteData || require('../../test/loader.js');
var assert = assert || require('assert');

var uInt32BE = {"bits": 32, "be": true};
var uInt32 = {"bits": 32};
var uInt40BE = {"bits": 40, "be": true};
var uInt40 = {"bits": 40};
var uInt48BE = {"bits": 48, "be": true};
var uInt48 = {"bits": 48};
var int48BE = {"bits": 48, "signed": true, "be": true};
var int48 = {"bits": 48, "signed": true};
var int40BE = {"bits": 40, "signed": true, "be": true};
var int40 = {"bits": 40, "signed": true};

describe('esoteric bit depths', function() {
    
    it('int16 to bytes to int16', function() {
        var ntype = {"bits": 16, "signed": true};
        var buffer = byteData.packArray([-1024, 1023], ntype);
        assert.deepEqual(
            [-1024, 1023],
            byteData.unpackArray(buffer, ntype));
    });
});

describe('pack int40', function() { 

    // 0
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([0], int40, 16),
            [0,0,0,0,0]);
    });
    // min
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-549755813888], int40, 16),
            [0,0,0,0,128]);
    });
    // -125
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-125], int40, 16),
            [131,255,255,255,255]);
    });
    // min + 1
    it('min + 1', function() {
        assert.deepEqual(
            byteData.packArray([-549755813887], int40, 16),
            [1,0,0,0,128]
        );
    });
    // min + 2
    it('min + 2', function() {
        assert.deepEqual(
            byteData.packArray([-549755813886], int40, 16),
            [2,0,0,0,128]
        );
    });
    // min + 3
    it('min + 3', function() {
        assert.deepEqual(
            byteData.packArray([-549755813885], int40, 16),
            [3,0,0,0,128]
        );
    });

    // -1
    it('-1', function() {
        assert.deepEqual(
            byteData.packArray([-1], int40, 16),
            [255, 255, 255, 255, 255]
        );
    });
    // -2
    it('-2', function() {
        assert.deepEqual(
            byteData.packArray([-2], int40, 16),
            [254, 255, 255, 255, 255]
        );
    });
    // -3
    it('-3', function() {
        assert.deepEqual(
            byteData.packArray([-3], int40, 16),
            [253, 255, 255, 255, 255]
        );
    });

    // max
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([549755813887], int40, 16),
            [255,255,255,255,127]);
    });
});

describe('48-bit to bytes', function() { 

    it('should turn 1 signed 48-bit int to 6 bytes (hex) (max range)', function() {
        assert.deepEqual(
            byteData.packArray([-140737488355328], int48, 16),
            [0,0,0,0,0,128]);
    });
    
    // 0
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([0], int48, 16),
            [0,0,0,0,0,0]);
    });
    // min
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-140737488355328], int48, 16),
            [0,0,0,0,0,128]);
    });
    // -125
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-125], int48, 16),
            [131,255,255,255,255,255]);
    });
    // min + 1
    it('min + 1', function() {
        assert.deepEqual(
            byteData.packArray([-140737488355327], int48, 16),
            [1,0,0,0,0,128]
        );
    });
    // min + 2
    it('min + 2', function() {
        assert.deepEqual(
            byteData.packArray([-140737488355326], int48, 16),
            [2,0,0,0,0,128]
        );
    });
    // min + 3
    it('min + 3', function() {
        assert.deepEqual(
            byteData.packArray([-140737488355325], int48, 16),
            [3,0,0,0,0,128]
        );
    });

    // -1
    it('-1', function() {
        assert.deepEqual(
            byteData.packArray([-1], int48, 16),
            [255, 255, 255, 255, 255, 255]
        );
    });
    // -2
    it('-2', function() {
        assert.deepEqual(
            byteData.packArray([-2], int48, 16),
            [254, 255, 255, 255, 255, 255]
        );
    });
    // -3
    it('-3', function() {
        assert.deepEqual(
            byteData.packArray([-3], int48, 16),
            [253, 255, 255, 255, 255, 255]
        );
    });
});

describe('pack uInt40', function() { 
    
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (max range)', function() {
        assert.deepEqual(
            byteData.packArray([549755813887], uInt40, 16),
            [255,255,255,255,127]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (949752813887)', function() {
        assert.deepEqual(
            byteData.packArray([949752813887], uInt40, 16),
            [63, 217, 173, 33, 221]);
    });  
    it('should turn 1 unsigned 40-bit int to 5 bytes (hex) (max range)', function() {
        assert.deepEqual(
            byteData.packArray([1099511627775], uInt40, 16),
            [255,255,255,255,255]);
    });
    it('should turn 1 unsigned 40-bit int to 5 bytes (max range)', function() {
        assert.deepEqual(
            byteData.packArray([1099511627775], uInt40),
            [255,255,255,255,255]);
    });
    it('should turn 1 unsigned 40-bit int to 5 bytes in a Uint8Array (max range)', function() {
        assert.deepEqual(
            byteData.packArray([1099511627775], uInt40),
            [255,255,255,255,255]);
    });
});

describe('48-bit to bytes', function() { 
    
    it('should turn 1 signed 48-bit int to 6 bytes (hex) (max range)', function() {
        assert.deepEqual(
            byteData.packArray([120637438355317], uInt48, 16),
            [117, 231, 168, 23, 184, 109]); 
    });
    it('should turn 1 signed 48-bit int to 6 bytes (hex) (max range)', function() {
        assert.deepEqual(
            byteData.packArray([140737488355327], uInt48),
            [255,255,255,255,255,127]); 
    });
    it('should turn 1 unsigned 48-bit int to 6 bytes (max range)', function() {
        assert.deepEqual(
            byteData.packArray([281474976710655], uInt48),
            [255,255,255,255,255,255]);
    });
    it('should turn 1 unsigned 48-bit int to 6 bytes (max range)', function() {
        assert.deepEqual(
            byteData.packArray([281474976710655], uInt48),
            [255,255,255,255,255,255]);
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
});

describe('unpack LE and BE', function() { 

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
                [255,255,255,255,255,127], int48),
            [140737488355327]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (min range)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,0,0,0,128], int48),
            [-140737488355328]);
    });

    // 40 bit tests should work the same with 48-bit
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-32768)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,128,255,255,255,255], int48),
            [-32768]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-65535)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [1,0,255,255,255,255], int48),
            [-65535]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-1)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [255,255,255,255,255,255], int48),
            [-1]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-2)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [254,255,255,255,255,255], int48),
            [-2]);
    });
    it('should turn 5 bytes (hex) to 1 signed 48-bit int  (-3)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [253,255,255,255,255,255], int48),
            [-3]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-10)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [246,255,255,255,255,255], int48),
            [-10]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-100)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [156,255,255,255,255,255], int48),
            [-100]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-1000)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [24,252,255,255,255,255], int48),
            [-1000]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-10000)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [240,216,255,255,255,255], int48),
            [-10000]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-100000)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [96, 121,254,255,255,255], int48),
            [-100000]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-1000000)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [192, 189,240,255,255,255], int48),
            [-1000000]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-32768)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,128,255,255,255,255], int48),
            [-32768]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-32768)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [8,128,255,255,255,255], int48),
            [-32760]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-12345)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [199,207,255,255,255,255], int48),
            [-12345]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-12345)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                [0,0,0,0,128,255], int48),
            [-549755813888]);
    });


    // 0
    it('min', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,0,0,0], int48),
            [0]);
    });
    // min
    it('min', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,0,0,128], int48),
            [-140737488355328]);
    });
    // -125
    it('min', function() {
        assert.deepEqual(
            byteData.unpackArray([131,255,255,255,255,255], int48),
            [-125]);
    });
    // min + 1
    it('min + 1', function() {
        assert.deepEqual(
            byteData.unpackArray([1,0,0,0,0,128], int48),
            [-140737488355327]);
    });
    // min + 2
    it('min + 2', function() {
        assert.deepEqual(
            byteData.unpackArray([2,0,0,0,0,128], int48),
            [-140737488355326]);
    });
    // min + 3
    it('min + 3', function() {
        assert.deepEqual(
            byteData.unpackArray([3,0,0,0,0,128], int48),
            [-140737488355325]);
    });

    // -1
    it('-1', function() {
        assert.deepEqual(
            byteData.unpackArray([255, 255, 255, 255, 255, 255], int48),
            [-1]);
    });
    // -2
    it('-2', function() {
        assert.deepEqual(
            byteData.unpackArray([254, 255, 255, 255, 255, 255], int48),
            [-2]);
    });
    // -3
    it('-3', function() {
        assert.deepEqual(
            byteData.unpackArray([253, 255, 255, 255, 255, 255], int48),
            [-3]);
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
