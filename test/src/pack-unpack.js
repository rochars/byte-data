/*
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview Test packing and then unpacking the same values.
 * @see https://github.com/rochars/byte-data
 */

var byteData = byteData || require('../../test/loader.js');
var assert = assert || require('assert');

var uInt2 = byteData.types.uInt2;
var int2 = byteData.types.int2;
var uInt4 = byteData.types.uInt4;
var int4 = byteData.types.int4;
var uInt8 = byteData.types.uInt8;
var int8 = byteData.types.int8;
var uInt16 = byteData.types.uInt16;
var int16 = byteData.types.int16;
var uInt24 = byteData.types.uInt24;
var int24 = byteData.types.int24;
var float32 = byteData.types.float32;
var uInt32 = byteData.types.uInt32;
var int32 = byteData.types.int32;
var uInt40 = byteData.types.uInt40;
var int40 = byteData.types.int40;
var uInt48 = byteData.types.uInt48;
var int48 = byteData.types.int48;
var float64 = byteData.types.float64;
var uInt53 = {"bits": 53};

describe('pack-unpack', function() {
    
    it('should turn 8 bytes to 1 64-bit float and back (1', function() {
        var bytes = byteData.packArray([612345678987654.3], float64);
        var num = byteData.unpackArray(bytes, float64);
        assert.deepEqual(num, [612345678987654.3]);
    });
    it('should turn 8 bytes to 1 64-bit float and back (1', function() {
        var bytes = byteData.packArray([612345678.9876543], float64);
        var num = byteData.unpackArray(bytes, float64);
        assert.deepEqual(num[0], 612345678.9876543);
    });
    it('should turn 8 bytes to 1 64-bit float and back (1', function() {
        var bytes = byteData.packArray([612345678.9876543], float64);
        var num = byteData.unpackArray(bytes, float64);
        assert.ok(num != [612345678.9876540]);
    });
    it('should turn 8 bytes to 1 64-bit float and back (1 round)', function() {
        var bytes = byteData.packArray([612345678987654.3], float64);
        var num = byteData.unpackArray(bytes, float64);
        assert.ok(num[0] != 612345678987654.1);
    });
    it('should turn 8 bytes to 1 64-bit float and back', function() {
        var bytes = byteData.packArray([0.123456789876543], float64);
        var num = byteData.unpackArray(bytes, float64);
        assert.deepEqual([0.123456789876543], num);
    });
    it('should turn 8 bytes to 1 64-bit float and back (precision)', function() {
        var bytes = byteData.packArray([0.123456789876543], float64);
        var num = byteData.unpackArray(bytes, float64);
        assert.ok(0.123456789876544 != num[0]);
    });

    
    // 53-bit
    it('53 bit uInt to-from (max range)',
            function() {
        var bytes = byteData.packArray([9007199254740991], uInt53);
        var num = byteData.unpackArray(bytes, uInt53);
        assert.equal(9007199254740991, num[0]);
    });
    it('53 bit uInt to-from (max range, check rounding)',
            function() {
        var bytes = byteData.packArray([9007199254740991], uInt53);
        var num = byteData.unpackArray(bytes, uInt53);
        assert.ok(9007199254740990 != num[0]);
        assert.ok(9007199254740992 != num[0]);
    });
    
    // 48-bit
    
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (max range)',
            function() {
        var bytes = byteData.packArray([1], int48);
        var num = byteData.unpackArray(bytes, int48);
        assert.equal(1, num[0]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (max range)',
            function() {
        var bytes = byteData.packArray([11], int48);
        var num = byteData.unpackArray(bytes, int48);
        assert.equal(11, num[0]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (max range)',
            function() {
        var bytes = byteData.packArray([0], uInt48);
        var num = byteData.unpackArray(bytes, uInt48);
        assert.equal(0, num[0]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (max range)',
            function() {
        var bytes = byteData.packArray([281474976710655], uInt48);
        var num = byteData.unpackArray(bytes, uInt48);
        assert.equal(281474976710655, num[0]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (max range)',
            function() {
        var bytes = byteData.packArray([140737488355327], int48);
        var num = byteData.unpackArray(bytes, int48);
        assert.equal(140737488355327, num[0]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (min range)',
            function() {
        var bytes = byteData.packArray([-140737488355328], int48);
        var num = byteData.unpackArray(bytes, int48);
        assert.equal(-140737488355328, num[0]);
    });

    // 40-bit
    
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (1)',
            function() {
        var bytes = byteData.packArray([1], uInt40);
        var num = byteData.unpackArray(bytes, uInt40);
        assert.equal(1, num[0]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (11)',
            function() {
        var bytes = byteData.packArray([11], uInt40);
        var num = byteData.unpackArray(bytes, uInt40);
        assert.equal(11, num[0]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (0)',
            function() {
        var bytes = byteData.packArray([0], uInt40);
        var num = byteData.unpackArray(bytes, uInt40);
        assert.equal(0, num[0]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (max range)',
            function() {
        var bytes = byteData.packArray([1099511627775], uInt40);
        var num = byteData.unpackArray(bytes, uInt40);
        assert.equal(1099511627775, num[0]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (max range)',
            function() {
        var bytes = byteData.packArray([549755813887], int40);
        var num = byteData.unpackArray(bytes, int40);
        assert.equal(549755813887, num[0]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (min range)',
            function() {
        var bytes = byteData.packArray([-549755813888], int40);
        var num = byteData.unpackArray(bytes, int40);
        assert.equal(-549755813888, num[0]);
    });

    // 32 bit float
    it('should turn 1 32-bit float to 4 bytes and back (0s)',
            function() {
        var bytes = byteData.packArray([0], float32);
        var num = byteData.unpackArray(bytes, float32);
        assert.deepEqual([0], num);
    });
    it('should turn 1 32-bit float to 4 bytes and back (1)',
            function() {
        var bytes = byteData.packArray([1], float32);
        var num = byteData.unpackArray(bytes, float32);
        assert.deepEqual([1], num);
    });
    it('should turn 1 32-bit float to 4 bytes and back (0.1234567)',
            function() {
        var bytes = byteData.packArray([0.1234567], float32);
        var num = byteData.unpackArray(bytes, float32);
        assert.deepEqual('0.1234567', num[0].toFixed(7));
    });

    // 32-bit / 4 bytes unsigned
    it('should turn 1 32-bit unsigned int to 4 bytes and back (0s)',
            function() {
        var bytes = byteData.packArray([0], uInt32);
        var num = byteData.unpackArray(bytes, uInt32);
        assert.deepEqual([0], num);
    });
    it('should turn 1 32-bit unsigned int to 4 bytes and back ' +
            '(4294967295)', function() {
        var bytes = byteData.packArray([4294967295], uInt32);
        var num = byteData.unpackArray(bytes, uInt32);
        assert.deepEqual([255,255,255,255], bytes);
        assert.deepEqual([4294967295], num);
    });
    it('should turn 1 32-bit unsigned int to 4 bytes and back (300)',
            function() {
        var bytes = byteData.packArray([300], uInt32);
        var num = byteData.unpackArray(bytes, uInt32);
        assert.deepEqual([44,1,0,0], bytes);
        assert.deepEqual([300], num);
    });
    it('should turn 1 32-bit unsigned int to 4 byte and back (1)',
            function() {
        var bytes = byteData.packArray([1], uInt32);
        var num = byteData.unpackArray(bytes, uInt32);
        assert.deepEqual([1,0,0,0], bytes);
        assert.deepEqual([1], num);
    });
    // 32-bit / 4 bytes signed
    it('should turn 1 32-bit signed int to 4 bytes and back (0s)',
            function() {
        var bytes = byteData.packArray([0], int32);
        var num = byteData.unpackArray(bytes, int32);
        assert.deepEqual([0], num);
    });
    it('should turn 2 32-bit signed int to 8 bytes and back ' +
        '(-2147483648, 2147483647)', function() {
        var bytes = byteData.packArray([-2147483648, 2147483647], int32);
        var num = byteData.unpackArray(bytes, int32);
        assert.deepEqual([0,0,0,128, 255,255,255,127], bytes);
        assert.deepEqual([-2147483648, 2147483647], num);
    });

    it('should turn 2 32-bit signed int to 8 bytes and back ' +
        '(-2147483648, 2147483647)', function() {
        var bytes = byteData.packArray([-2147483648, 2147483647], int32);
        assert.deepEqual([0,0,0,128, 255,255,255,127], bytes);
        var num = byteData.unpackArray(bytes, int32);
        assert.deepEqual([-2147483648, 2147483647], num);
    });
    it('should turn 2 32-bit signed int to 8 bytes and back ' +
        '(-2147483647, 2147483647)', function() {
        var bytes = byteData.packArray([-2147483647, 2147483647], int32);
        assert.deepEqual([1,0,0,128, 255,255,255,127], bytes);
        var num = byteData.unpackArray(bytes, int32);
        assert.deepEqual([-2147483647, 2147483647], num);
    });
    it('should turn 2 32-bit signed int to 8 bytes and back ' +
        '(-2147483646, 2147483647)', function() {
        var bytes = byteData.packArray([-2147483646, 2147483647], int32);
        assert.deepEqual([2,0,0,128, 255,255,255,127], bytes);
        var num = byteData.unpackArray(bytes, int32);
        assert.deepEqual([-2147483646, 2147483647], num);
    });
    it('should turn 2 32-bit signed int to 8 bytes and back ' +
        '(-1, 2147483647)', function() {
        var bytes = byteData.packArray([-1, 2147483647], int32);
        //assert.deepEqual([2,0,0,128, 255,255,255,127], bytes);
        var num = byteData.unpackArray(bytes, int32);
        assert.deepEqual([-1, 2147483647], num);
    });
    it('should turn 2 32-bit signed int to 8 bytes and back ' +
        '(-2, 2147483647)', function() {
        var bytes = byteData.packArray([-2, 2147483647], int32);
        //assert.deepEqual([2,0,0,128, 255,255,255,127], bytes);
        var num = byteData.unpackArray(bytes, int32);
        assert.deepEqual([-2, 2147483647], num);
    });

    it('should turn 1 32-bit signed int to 4 bytes and back (1)',
            function() {
        var bytes = byteData.packArray([1], int32);
        var num = byteData.unpackArray(bytes, int32);
        assert.deepEqual([1], num);
    });

    // 24-bit / 3 bytes unsigned
    it('should turn 1 24-bit unsigned int to 3 bytes and back (0s)',
            function() {
        var bytes = byteData.packArray([0], uInt24);
        var num = byteData.unpackArray(bytes, uInt24);
        assert.deepEqual([0], num);
    });
    it('should turn 1 24-bit unsigned int to 3 bytes and back (16777215)',
            function() {
        var bytes = byteData.packArray([16777215], uInt24);
        var num = byteData.unpackArray(bytes, uInt24);
        assert.deepEqual([16777215], num);
    });
    it('should turn 1 24-bit unsigned int to 3 byte and back (1)',
            function() {
        var bytes = byteData.packArray([1], uInt24);
        var num = byteData.unpackArray(bytes, uInt24);
        assert.deepEqual([1], num);
    });
    // 24-bit / 3 bytes signed
    it('should turn 1 24-bit signed int to 3 bytes and back (0s)',
            function() {
        var bytes = byteData.packArray([0], int24);
        var num = byteData.unpackArray(bytes, int24);
        assert.deepEqual([0], num);
    });
    it('should turn 2 24-bit signed int to 6 bytes and back ' +
        '(-8388608, 8388607)', function() {
        var bytes = byteData.packArray([-8388608, 8388607], int24);
        var num = byteData.unpackArray(bytes, int24);
        assert.deepEqual([-8388608, 8388607], num);
    });
    it('should turn 2 24-bit signed int to 6 bytes and back ' +
        '(-8388607, 8388607)', function() {
        var bytes = byteData.packArray([-8388607, 8388607], int24);
        var num = byteData.unpackArray(bytes, int24);
        assert.deepEqual([-8388607, 8388607], num);
    });
    it('should turn 2 24-bit signed int to 6 bytes and back ' +
        '(-8388607, 8388607)', function() {
        var bytes = byteData.packArray([-8388606, 8388607], int24);
        var num = byteData.unpackArray(bytes, int24);
        assert.deepEqual([-8388606, 8388607], num);
    });
    it('should turn 2 24-bit signed int to 6 bytes and back ' +
        '(-1, 8388607)', function() {
        var bytes = byteData.packArray([-1, 8388607], int24);
        var num = byteData.unpackArray(bytes, int24);
        assert.deepEqual([-1, 8388607], num);
    });
    it('should turn 1 24-bit signed int to 3 byte and back (1)',
            function() {
        var bytes = byteData.packArray([1], int24);
        var num = byteData.unpackArray(bytes, int24);
        assert.deepEqual([1], num);
    });

    // 16-bit / 2 bytes unsigned
    it('should turn 1 16-bit unsigned int to 2 bytes and back (0s)',
            function() {
        var bytes = byteData.packArray([0], uInt16);
        var num = byteData.unpackArray(bytes, uInt16);
        assert.deepEqual([0], num);
    });
    it('should turn 1 16-bit unsigned int to 2 bytes and back (65535)',
            function() {
        var bytes = byteData.packArray([65535], uInt16);
        var num = byteData.unpackArray(bytes, uInt16);
        assert.deepEqual([65535], num);
    });
    it('should turn 1 16-bit unsigned int to 2 byte and back (1)',
            function() {
        var bytes = byteData.packArray([1], uInt16);
        var num = byteData.unpackArray(bytes, uInt16);
        assert.deepEqual([1], num);
    });
    // 16-bit / 2 bytes signed
    it('should turn 1 16-bit signed int to 2 bytes and back (0s)',
            function() {
        var bytes = byteData.packArray([0], int16);
        var num = byteData.unpackArray(bytes, int16);
        assert.deepEqual([0], num);
    });
    it('should turn 2 16-bit signed int to 4 bytes and back ' +
        '(-32768, 32767)',
            function() {
        var bytes = byteData.packArray([-32768, 32767], int16);
        var num = byteData.unpackArray(bytes, int16);
        assert.deepEqual([-32768, 32767], num);
    });
    it('should turn 2 16-bit signed int to 4 bytes and back ' +
        '(-32767, 32767)',
            function() {
        var bytes = byteData.packArray([-32767, 32767], int16);
        var num = byteData.unpackArray(bytes, int16);
        assert.deepEqual([-32767, 32767], num);
    });
    it('should turn 2 16-bit signed int to 4 bytes and back ' +
        '(-32766, 32767)',
            function() {
        var bytes = byteData.packArray([-32766, 32767], int16);
        var num = byteData.unpackArray(bytes, int16);
        assert.deepEqual([-32766, 32767], num);
    });
    it('should turn 2 16-bit signed int to 4 bytes and back ' +
        '(-1, 32767)',
            function() {
        var bytes = byteData.packArray([-1, 32767], int16);
        var num = byteData.unpackArray(bytes, int16);
        assert.deepEqual([-1, 32767], num);
    });
    it('should turn 2 16-bit signed int to 4 bytes and back ' +
        '(-2, 32767)',
            function() {
        var bytes = byteData.packArray([-2, 32767], int16);
        var num = byteData.unpackArray(bytes, int16);
        assert.deepEqual([-2, 32767], num);
    });
    it('should turn 1 16-bit signed int to 2 byte and back (1)',
            function() {
        var bytes = byteData.packArray([1], int16);
        var num = byteData.unpackArray(bytes, int16);
        assert.deepEqual([1], num);
    });

    it('should turn 1 16-bit float to 2 byte and back (0.0006)',
            function() {
        var bytes = byteData.packArray([0.0006], byteData.types.float16);
        var num = byteData.unpackArray(bytes, byteData.types.float16);
        assert.deepEqual('0.0006', num[0].toFixed(4));
    });
    it('should turn 1 16-bit float to 2 byte and back (-0.0006)',
            function() {
        var bytes = byteData.packArray([-0.0006], byteData.types.float16);
        var num = byteData.unpackArray(bytes, byteData.types.float16);
        assert.deepEqual('-0.0006', num[0].toFixed(4));
    });
    it('should turn 1 16-bit float to 2 byte and back (0.0106)',
            function() {
        var bytes = byteData.packArray([0.0106], byteData.types.float16);
        var num = byteData.unpackArray(bytes, byteData.types.float16);
        assert.deepEqual('0.0106', num[0].toFixed(4));
    });
    it('should turn 1 16-bit float to 2 byte and back (-0.1006)',
            function() {
        var bytes = byteData.packArray([-0.1006], byteData.types.float16);
        var num = byteData.unpackArray(bytes, byteData.types.float16);
        assert.deepEqual('-0.1006', num[0].toFixed(4));
    });
    it('should turn 1 16-bit float to 2 byte and back (0.00106)',
            function() {
        var bytes = byteData.packArray([0.00106], byteData.types.float16);
        var num = byteData.unpackArray(bytes, byteData.types.float16);
        assert.deepEqual('0.00106', num[0].toFixed(5));
    });
    it('should turn 1 16-bit float to 2 byte and back (-0.01006)',
            function() {
        var bytes = byteData.packArray([-0.01006], byteData.types.float16);
        var num = byteData.unpackArray(bytes, byteData.types.float16);
        assert.deepEqual('-0.01006', num[0].toFixed(5));
    });
    it('should turn 1 16-bit float to 2 byte and back (-0.01006 vs -0.01005)',
            function() {
        var bytes = byteData.packArray([-0.01006], byteData.types.float16);
        var num = byteData.unpackArray(bytes, byteData.types.float16);
        assert.ok('-0.01005' != num[0].toFixed(5));
    });

    // 8-bit / 1 byte unsigned
    it('should turn 1 8-bit unsigned int to 1 byte and back (0s)',
            function() {
        var bytes = byteData.packArray([0], uInt8);
        var num = byteData.unpackArray(bytes, uInt8);
        assert.deepEqual([0], num);
    });
    it('should turn 1 8-bit unsigned int to 1 byte and back (max)',
            function() {
        var bytes = byteData.packArray([255], uInt8);
        var num = byteData.unpackArray(bytes, uInt8);
        assert.deepEqual([255], num);
    });
    it('should turn 1 8-bit unsigned int to 1 byte and back (1)',
            function() {
        var bytes = byteData.packArray([1], uInt8);
        var num = byteData.unpackArray(bytes, uInt8);
        assert.deepEqual([1], num);
    });
    // 8-bit / 1 byte signed
    it('should turn 2 8-bit signed int to 2 bytes (0s)', function() {
        var bytes = byteData.packArray([0], int8);
        var num = byteData.unpackArray(bytes, int8);
        assert.deepEqual([0], num);
    });
    it('should turn 2 8-bit signed int to 2 bytes (-128, 127)', function() {
        var bytes = byteData.packArray([-128, 127], int8);
        var num = byteData.unpackArray(bytes, int8);
        assert.deepEqual([-128, 127], num);
    });
    it('should turn 1 8-bit signed int to 1 byte (-1)', function() {
        var bytes = byteData.packArray([-1], int8);
        var num = byteData.unpackArray(bytes, int8);
        assert.deepEqual([-1], num);
    });

    // 8-bit / 1 byte unsigned
    it('should turn 1 4-bit unsigned int to 1 nibbles and back (0s)',
            function() {
        var bytes = byteData.packArray([0], uInt4);
        var num = byteData.unpackArray(bytes, uInt4);
        assert.deepEqual([0], num);
    });
    it('should turn 1 4-bit unsigned int to 1 nibbles and back (max)',
            function() {
        var bytes = byteData.packArray([15], uInt4);
        var num = byteData.unpackArray(bytes, uInt4);
        assert.deepEqual([15], num);
    });
    it('should turn 1 4-bit unsigned int to 1 nibble and back (1)',
            function() {
        var bytes = byteData.packArray([1], uInt4);
        var num = byteData.unpackArray(bytes, uInt4);
        assert.deepEqual([1], num);
    });
    // 4-bit / 1 byte signed
    it('should turn 1 4-bit signed int to 1 nibbles (0s)', function() {
        var bytes = byteData.packArray([0], int4);
        var num = byteData.unpackArray(bytes, int4);
        assert.deepEqual([0], num);
    });
    it('should turn 2 4-bit signed int to 2 nibbles (-8, 7)', function() {
        var bytes = byteData.packArray([-8, 7], int4);
        var num = byteData.unpackArray(bytes, int4);
        assert.deepEqual([-8, 7], num);
    });
    it('should turn 1 4-bit signed int to a nibble (-1)', function() {
        var bytes = byteData.packArray([-1], int4);
        var num = byteData.unpackArray(bytes, int4);
        assert.deepEqual([-1], num);
    });

    // 2-bit / 1 byte signed
    it('should turn 1 2-bit signed int to 1 crumb (0s)', function() {
        var crumbs = byteData.packArray([0], int2);
        var num = byteData.unpackArray(crumbs, int2);
        assert.deepEqual([0], num);
    });
    it('should turn 2 2-bit signed int to 2 crumb (-2, 1)', function() {
        var crumbs = byteData.packArray([-2, 1], int2);
        var num = byteData.unpackArray(crumbs, int2);
        assert.deepEqual([-2, 1], num);
    });
    it('should turn 1 2-bit signed int to a crumb (-1)', function() {
        var crumbs = byteData.packArray([-1], int2);
        var num = byteData.unpackArray(crumbs, int2);
        assert.deepEqual([-1], num);
    });
});
 