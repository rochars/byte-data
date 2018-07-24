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

var uInt2 = byteData.types.uInt2;
var int2 = byteData.types.int2;
var uInt32BE = byteData.types.uInt32BE;
var uInt32 = byteData.types.uInt32;
var uInt40BE = byteData.types.uInt40BE;
var uInt40 = byteData.types.uInt40;
var uInt48BE = byteData.types.uInt48BE;
var uInt48 = byteData.types.uInt48;
var float64BE = byteData.types.float64BE;
var uInt53 = {"bits": 53};
var int53 = {bits: 53, signed: true};
var uInt40 = byteData.types.uInt40;
var uInt48BE = byteData.types.uInt48BE;
var uInt48 = byteData.types.uInt48;
var int48BE = byteData.types.int48BE;
var int48 = byteData.types.int48;
var uInt40BE = byteData.types.uInt40BE;
var int40BE = byteData.types.int40BE;
var int40 = byteData.types.int40;
var uInt40 = byteData.types.uInt40;
var int4 = byteData.types.int4;
var uInt4 = byteData.types.uInt4;

describe('esoteric bit depths', function() {
    
    it('uInt5 to hex', function() {
        assert.deepEqual(byteData.pack(1, {bits: 5}),
            [1]);
    });
    it('uInt5 to bin', function() {
        assert.deepEqual(byteData.pack(1, {"bits": 5}),
            [1]);
    });

    it('uInt6 to hex', function() {
        assert.deepEqual(byteData.pack(1, {"bits": 6}),
            [1]);
    });
    it('uInt6 to bin', function() {
        assert.deepEqual(byteData.pack(1, {"bits": 6}),
            [1]);
    });

    it('uInt7 to hex', function() {
        assert.deepEqual(byteData.pack(1, {"bits": 7}),
            [1]);
    });
    it('uInt7 to bin', function() {
        assert.deepEqual(byteData.pack(1, {"bits": 7}),
            [1]);
    });

    it('uInt3 to hex', function() {
        assert.deepEqual(byteData.pack(1, {"bits": 3}),
            [1]);
    });
    it('uInt3 to bin', function() {
        assert.deepEqual(byteData.pack(1, {"bits": 3}),
            [1]);
    });

    it('int7 to bytes to int7', function() {
        var ntype = {"bits": 7, "signed": true};
        var buffer = byteData.packArray([-1, 5], ntype);
        assert.deepEqual(
            [-1, 5],
            byteData.unpackArray(buffer, ntype));
    });
    
    it('int11 to bytes to int11', function() {
        var ntype = {"bits": 11, "signed": true};
        var buffer = byteData.packArray([-1024, 1023], ntype);
        assert.deepEqual(
            [-1024, 1023],
            byteData.unpackArray(buffer, ntype));
    });
    
    it('int16 to bytes to int16', function() {
        var ntype = {"bits": 16, "signed": true};
        var buffer = byteData.packArray([-1024, 1023], ntype);
        assert.deepEqual(
            [-1024, 1023],
            byteData.unpackArray(buffer, ntype));
    });

    it('int11 to bytes to int11', function() {
        var ntype = {"bits": 11, "signed": true};
        var buffer = byteData.packArray([-1023, 1023], ntype);
        assert.deepEqual(
            [-1023, 1023],
            byteData.unpackArray(buffer, ntype));
    });
    it('int11 to bytes to int11', function() {
        var ntype = {"bits": 11, "signed": true};
        var buffer = byteData.packArray([-1022, 1023], ntype);
        assert.deepEqual(
            [-1022, 1023],
            byteData.unpackArray(buffer, ntype));
    });
    it('uInt12 to bytes to uInt12', function() {
        var ntype = {"bits": 12};
        var buffer = byteData.packArray([0, 4095], ntype);
        assert.deepEqual(
            [0, 4095],
            byteData.unpackArray(buffer, ntype));
    });
    it('int12 to bytes to int12', function() {
        var ntype = {"bits": 12, "signed": true};
        var buffer = byteData.packArray([-2048, 2047], ntype);
        assert.deepEqual(
            [-2048, 2047],
            byteData.unpackArray(buffer, ntype));
    });

    it('uInt13 to bytes to uInt13', function() {
        var ntype = {"bits": 13};
        var buffer = byteData.packArray([0, 8191], ntype);
        assert.deepEqual(
            [0, 8191],
            byteData.unpackArray(buffer, ntype));
    });
    it('int13 to bytes to int13', function() {
        var ntype = {"bits": 13, "signed": true};
        var buffer = byteData.packArray([-4096, 4095], ntype);
        assert.deepEqual(
            [-4096, 4095],
            byteData.unpackArray(buffer, ntype));
    });

    it('uInt14 to bytes to uInt14', function() {
        var ntype = {"bits": 14};
        var buffer = byteData.packArray([0, 16383], ntype);
        assert.deepEqual(
            [0, 16383],
            byteData.unpackArray(buffer, ntype));
    });
    it('int14 to bytes to int14', function() {
        var ntype = {"bits": 14, "signed": true};
        var buffer = byteData.packArray([-8192, 8191], ntype);
        assert.deepEqual(
            [-8192, 8191],
            byteData.unpackArray(buffer, ntype));
    });


    it('uInt15 to bytes to uInt15', function() {
        var ntype = {"bits": 15};
        var buffer = byteData.packArray([0, 32767], ntype);
        assert.deepEqual(
            [0, 32767],
            byteData.unpackArray(buffer, ntype));
    });
    it('int15 to bytes to int15', function() {
        var ntype = {"bits": 15, "signed": true};
        var buffer = byteData.packArray([-16384, 16383], ntype);
        assert.deepEqual(
            [-16384, 16383],
            byteData.unpackArray(buffer, ntype));
    });


    it('uInt17 to bytes to uInt17', function() {
        var ntype = {"bits": 17};
        var buffer = byteData.packArray([0, 131071], ntype);
        assert.deepEqual(
            [0, 131071],
            byteData.unpackArray(buffer, ntype));
    });
    it('int17 to bytes to int17', function() {
        var ntype = {"bits": 17, "signed": true};
        var buffer = byteData.packArray([-65536, 65535], ntype);
        assert.deepEqual(
            [-65536, 65535],
            byteData.unpackArray(buffer, ntype));
    });


    it('uInt18 to bytes to uInt18', function() {
        var ntype = {"bits": 18};
        var buffer = byteData.packArray([0, 262143], ntype);
        assert.deepEqual(
            [0, 262143],
            byteData.unpackArray(buffer, ntype));
    });
    it('int18 to bytes to int18', function() {
        var ntype = {"bits": 18, "signed": true};
        var buffer = byteData.packArray([-131072, 131071], ntype);
        assert.deepEqual(
            [-131072, 131071],
            byteData.unpackArray(buffer, ntype));
    });

    it('uInt19 to bytes to uInt19', function() {
        var ntype = {"bits": 19};
        var buffer = byteData.packArray([0, 524287], ntype);
        assert.deepEqual(
            [0, 524287],
            byteData.unpackArray(buffer, ntype));
    });
    it('int19 to bytes to int19', function() {
        var ntype = {"bits": 19, "signed": true};
        var buffer = byteData.packArray([-262144, 262143], ntype);
        assert.deepEqual(
            [-262144, 262143],
            byteData.unpackArray(buffer, ntype));
    });


    it('uInt20 to bytes to uInt20', function() {
        var ntype = {"bits": 20};
        var buffer = byteData.packArray([0, 1048575], ntype);
        assert.deepEqual(
            [0, 1048575],
            byteData.unpackArray(buffer, ntype));
    });
    it('int20 to bytes to int20', function() {
        var ntype = {"bits": 20, "signed": true};
        var buffer = byteData.packArray([-524288, 524287], ntype);
        assert.deepEqual(
            [-524288, 524287],
            byteData.unpackArray(buffer, ntype));
    });


    it('uInt21 to bytes to uInt21', function() {
        var ntype = {"bits": 21};
        var buffer = byteData.packArray([0, 2097151], ntype);
        assert.deepEqual(
            [0, 2097151],
            byteData.unpackArray(buffer, ntype));
    });
    it('int21 to bytes to int21', function() {
        var ntype = {"bits": 21, "signed": true};
        var buffer = byteData.packArray([-1048576, 1048575], ntype);
        assert.deepEqual(
            [-1048576, 1048575],
            byteData.unpackArray(buffer, ntype));
    });


    it('uInt22 to bytes to uInt22', function() {
        var ntype = {"bits": 22};
        var buffer = byteData.packArray([0, 4194303], ntype);
        assert.deepEqual(
            [0, 4194303],
            byteData.unpackArray(buffer, ntype));
    });
    it('int22 to bytes to int22', function() {
        var ntype = {"bits": 22, "signed": true};
        var buffer = byteData.packArray([-2097152, 2097151], ntype);
        assert.deepEqual(
            [-2097152, 2097151],
            byteData.unpackArray(buffer, ntype));
    });
    it('int22 to bytes to int22', function() {
        var ntype = {"bits": 22, "signed": true};
        var buffer = byteData.packArray([-2097151, 2097151], ntype);
        assert.deepEqual(
            [-2097151, 2097151],
            byteData.unpackArray(buffer, ntype));
    });
    it('int22 to bytes to int22', function() {
        var ntype = {"bits": 22, "signed": true};
        var buffer = byteData.packArray([-1, 1], ntype);
        assert.deepEqual(
            [-1, 1],
            byteData.unpackArray(buffer, ntype));
    });
    it('int22 to bytes to int22', function() {
        var ntype = {"bits": 22, "signed": true};
        var buffer = byteData.packArray([0], ntype);
        assert.deepEqual(
            [0],
            byteData.unpackArray(buffer, ntype));
    });

    it('uInt23 to bytes to uInt23', function() {
        var ntype = {"bits": 23};
        var buffer = byteData.packArray([0, 8388607], ntype);
        assert.deepEqual(
            [0, 8388607],
            byteData.unpackArray(buffer, ntype));
    });
    it('int23 to bytes to int23', function() {
        var ntype = {"bits": 23, "signed": true};
        var buffer = byteData.packArray([-4194304, 4194303], ntype);
        assert.deepEqual(
            [-4194304, 4194303],
            byteData.unpackArray(buffer, ntype));
    });
    it('int23 to bytes to int23', function() {
        var ntype = {"bits": 23, "signed": true};
        var buffer = byteData.packArray([-4194303, 4194303], ntype);
        assert.deepEqual(
            byteData.unpackArray(buffer, ntype),
            [-4194303, 4194303]);
    });
    it('int23 to bytes to int23', function() {
        var ntype = {"bits": 23, "signed": true};
        var buffer = byteData.packArray([-4194302, 4194303], ntype);
        assert.deepEqual(
            byteData.unpackArray(buffer, ntype),
            [-4194302, 4194303]);
    });
    it('int23 to bytes to int23', function() {
        var ntype = {"bits": 23, "signed": true};
        var buffer = byteData.packArray([-4194301, 4194303], ntype);
        assert.deepEqual(
            byteData.unpackArray(buffer, ntype),
            [-4194301, 4194303]);
    });
    it('int23 to bytes to int23', function() {
        var ntype = {"bits": 23, "signed": true};
        var buffer = byteData.packArray([-4194300, 4194303], ntype);
        assert.deepEqual(
            byteData.unpackArray(buffer, ntype),
            [-4194300, 4194303]);
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

