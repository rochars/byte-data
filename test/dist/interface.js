/**
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

require('browser-env')();let assert = require('assert');
require('../../dist/byte-data-min.js');

describe('test dist/byte-data-min', function() {
    
    // pack
    it('pack uInt16 (65535, 16)', function() {
        assert.deepEqual(
            window.byteData.pack(65535, window.byteData.uInt16, 16),
            ["ff","ff"]);
    });
    it('pack chr ("abcd")', function() {
        assert.deepEqual(
            window.byteData.pack("abcd", window.byteData.chr),
            [97]);
    });
    it('pack float32 (2.1474836, 16)', function() {
        assert.deepEqual(
            window.byteData.pack(2.1474836, window.byteData.float32, 16),
            ["5f","70","09","40"]);
    });
    it('pack int4 (-1)', function() {
        assert.deepEqual(window.byteData.pack(-1, window.byteData.int4),
            [15]);
    });
    it('pack uInt4 (15)', function() {
        assert.deepEqual(window.byteData.pack(15, window.byteData.uInt4),
            [15]);
    });
    it('pack bool (6, 16) should return "1"', function() {
        assert.deepEqual(window.byteData.pack(6, window.byteData.bool, 16),
            ['1']);
    });
    it('pack chr ("a")', function() {
        assert.deepEqual(window.byteData.pack("a", window.byteData.chr),
            [97]);
    });
    it('pack uInt8 (254)', function() {
        assert.deepEqual(window.byteData.pack(254, window.byteData.uInt8),
            [254]);
    });
    it('pack uInt8 (255)', function() {
        assert.deepEqual(window.byteData.pack(255, window.byteData.uInt8),
            [255]);
    });
    it('pack uInt8 (300) should return [255]', function() {
        assert.deepEqual(window.byteData.pack(300, window.byteData.uInt8),
            [255]);
    });
    it('pack uInt8 (-1) should return [0]', function() {
        assert.deepEqual(window.byteData.pack(-1, window.byteData.uInt8),
            [0]);
    });
    it('pack int8 (-1)', function() {
        assert.deepEqual(window.byteData.pack(-1, window.byteData.int8),
            [255]);
    });
    it('pack int8 (-2)', function() {
        assert.deepEqual(window.byteData.pack(-2, window.byteData.int8),
            [254]);
    });

    // unpack
    it('unpack chr', function() {
        assert.deepEqual(
            window.byteData.unpack([97, 98, 99, 199], window.byteData.chr),
            "a");
    });
    it('unpack uInt16', function() {
        assert.deepEqual(
            window.byteData.unpack(["ff", "ff"], window.byteData.uInt16, 16),
            65535);
    });
    it('unpack float16', function() {
        assert.equal(
            window.byteData.unpack(["01010101", "00110101"], window.byteData.float16).toFixed(5),
            0.33325);
    });
    it('unpack int2', function() {
        assert.equal(window.byteData.unpack(['11'], window.byteData.int2, 2), -1);
    });
    it('unpack uInt2', function() {
        assert.equal(window.byteData.unpack([3], window.byteData.uInt2), 3);
    });
    it('unpack chr', function() {
        assert.deepEqual(window.byteData.unpack([97, 98], window.byteData.chr), "a");
    });
    it('unpack uInt16', function() {
        assert.equal(window.byteData.unpack(
            ["ff","ff"], window.byteData.uInt16, 16),
            65535);
    });

    // packArray
    it('packArray uInt16', function() {
        assert.deepEqual(window.byteData.packArray([65535, 0], window.byteData.uInt16, 16),
            ["ff", "ff", "00", "00"]);
    });
    it('packArray int32', function() {
        assert.deepEqual(window.byteData.packArray([-2147483648, 2147483647], window.byteData.int32),
            [0,0,0,128,255,255,255,127]);
    });
    it('packArray float32', function() {
        assert.deepEqual(window.byteData.packArray([-1, 1], window.byteData.float32),
            [0,0,128,191,0,0,128,63]);
    });
    it('packArray chr', function() {
        assert.deepEqual(window.byteData.packArray("ab", window.byteData.chr),
            [97, 98]);
    });

    // unpackArray
    it('unpackArray uInt16', function() {
        assert.deepEqual(window.byteData.unpackArray(
            ["ff", "ff", "00", "00"], window.byteData.uInt16, 16),
            [65535, 0]);
    });
    it('unpackArray uInt2', function() {
        assert.deepEqual(
                window.byteData.unpackArray(['11'], window.byteData.uInt2, 2),
                 [3]
             );
    });
    it('unpackArray float64', function() {
        assert.deepEqual(
                window.byteData.unpackArray(
                        ['00','00','00','00','00','00','f0','3f'],
                        window.byteData.float64,
                        16
                    ),
                    [1]
             );
    });
});


describe('find-string', function() {
    
    it('should find the "a" among the junk', function() {
        let index = window.byteData.findString([1, 0, 1, 100, 97, 98, 2, 2, 0], "a");
        assert.equal(index, 4);
    });
    it('should find the "ab" among the junk', function() {
        let index = window.byteData.findString([1, 0, 1, 100, 97, 98, 2, 2, 0], "ab");
        assert.equal(index, 4);
    });
    it('should return -1 if the string is not found', function() {
        let index = window.byteData.findString([1, 0, 1, 100, 95, 98, 2, 2, 0], "ab");
        assert.equal(index, -1);
    });
});


let chr = window.byteData.chr;
let fourCC = window.byteData.fourCC;
let bool = window.byteData.bool;
let uInt2 = window.byteData.uInt2;
let int2 = window.byteData.int2;
let uInt4 = window.byteData.uInt4;
let int4 = window.byteData.int4;
let uInt8 = window.byteData.uInt8;
let int8 = window.byteData.int8;
let uInt16 = window.byteData.uInt16;
let int16 = window.byteData.int16;
let float16 = window.byteData.float16;
let uInt24 = window.byteData.uInt24;
let int24 = window.byteData.int24;
let float32 = window.byteData.float32;
let uInt32 = window.byteData.uInt32;
let int32 = window.byteData.int32;
let uInt40 = window.byteData.uInt40;
let int40 = window.byteData.int40;
let uInt48 = window.byteData.uInt48;
let int48 = window.byteData.int48;
let float64 = window.byteData.float64;

/**
 * Unsigned 48-bit integers little-endian
 * @type {!Type}
 */
let uInt53 = new window.byteData.Type({"bits": 53});

describe('pack-unpack', function() {
            
    it('should turn 8 bytes to 1 64-bit float and back (1', function() {
        let bytes = window.byteData.packArray([612345678987654.3], float64);
        let num = window.byteData.unpackArray(bytes, float64);
        assert.deepEqual(num, [612345678987654.3]);
    });
    it('should turn 8 bytes to 1 64-bit float and back (1', function() {
        let bytes = window.byteData.packArray([612345678.9876543], float64);
        let num = window.byteData.unpackArray(bytes, float64);
        assert.deepEqual(num, [612345678.9876543]);
    });
    it('should turn 8 bytes to 1 64-bit float and back (1', function() {
        let bytes = window.byteData.packArray([612345678.9876543], float64);
        let num = window.byteData.unpackArray(bytes, float64);
        assert.ok(num != [612345678.9876540]);
    });
    it('should turn 8 bytes to 1 64-bit float and back (1 round)', function() {
        let bytes = window.byteData.packArray([612345678987654.3], float64);
        let num = window.byteData.unpackArray(bytes, float64);
        assert.ok(num[0] != 612345678987654.1);
    });

    it('should turn 8 bytes to 1 64-bit float and back', function() {
        let bytes = window.byteData.packArray([0.123456789876543], float64);
        let num = window.byteData.unpackArray(bytes, float64);
        assert.deepEqual([0.123456789876543], num);
    });
    it('should turn 8 bytes to 1 64-bit float and back (precision)', function() {
        let bytes = window.byteData.packArray([0.123456789876543], float64);
        let num = window.byteData.unpackArray(bytes, float64);
        assert.ok(0.123456789876544 != num[0]);
    });

    // 53-bit
    it('53 bit uInt to-from (max range)',
            function() {
        let bytes = window.byteData.packArray([9007199254740991], uInt53);
        let num = window.byteData.unpackArray(bytes, uInt53)
        assert.equal(9007199254740991, num[0]);
    });
    it('53 bit uInt to-from (max range, check rounding)',
            function() {
        let bytes = window.byteData.packArray([9007199254740991], uInt53);
        let num = window.byteData.unpackArray(bytes, uInt53)
        assert.ok(9007199254740990 != num[0]);
        assert.ok(9007199254740992 != num[0]);
    });

    // 48-bit
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (max range)',
            function() {
        let bytes = window.byteData.packArray([1], int48);
        let num = window.byteData.unpackArray(bytes, int48)
        assert.equal(1, num[0]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (max range)',
            function() {
        let bytes = window.byteData.packArray([11], int48);
        let num = window.byteData.unpackArray(bytes, int48)
        assert.equal(11, num[0]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (max range)',
            function() {
        let bytes = window.byteData.packArray([0], uInt48);
        let num = window.byteData.unpackArray(bytes, uInt48);
        assert.equal(0, num[0]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (max range)',
            function() {
        let bytes = window.byteData.packArray([281474976710655], uInt48);
        let num = window.byteData.unpackArray(bytes, uInt48);
        assert.equal(281474976710655, num[0]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (max range)',
            function() {
        let bytes = window.byteData.packArray([140737488355327], int48);
        let num = window.byteData.unpackArray(bytes, int48);
        assert.equal(140737488355327, num[0]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (min range)',
            function() {
        let bytes = window.byteData.packArray([-140737488355328], int48);
        let num = window.byteData.unpackArray(bytes, int48);
        assert.equal(-140737488355328, num[0]);
    });

    // 40-bit
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (1)',
            function() {
        let bytes = window.byteData.packArray([1], uInt40);
        let num = window.byteData.unpackArray(bytes, uInt40);
        assert.equal(1, num[0]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (11)',
            function() {
        let bytes = window.byteData.packArray([11], uInt40);
        let num = window.byteData.unpackArray(bytes, uInt40);
        assert.equal(11, num[0]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (0)',
            function() {
        let bytes = window.byteData.packArray([0], uInt40);
        let num = window.byteData.unpackArray(bytes, uInt40);
        assert.equal(0, num[0]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (max range)',
            function() {
        let bytes = window.byteData.packArray([1099511627775], uInt40);
        let num = window.byteData.unpackArray(bytes, uInt40);
        assert.equal(1099511627775, num[0]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (max range)',
            function() {
        let bytes = window.byteData.packArray([549755813887], int40);
        let num = window.byteData.unpackArray(bytes, int40);
        assert.equal(549755813887, num[0]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (min range)',
            function() {
        let bytes = window.byteData.packArray([-549755813888], int40);
        let num = window.byteData.unpackArray(bytes, int40);
        assert.equal(-549755813888, num[0]);
    });


    // 32 bit float
    it('should turn 1 32-bit float to 4 bytes and back (0s)',
            function() {
        let bytes = window.byteData.packArray([0], float32);
        let num = window.byteData.unpackArray(bytes, float32);
        assert.deepEqual([0], num);
    });
    it('should turn 1 32-bit float to 4 bytes and back (1)',
            function() {
        let bytes = window.byteData.packArray([1], float32);
        let num = window.byteData.unpackArray(bytes, float32);
        assert.deepEqual([1], num);
    });
    it('should turn 1 32-bit float to 4 bytes and back (0.1234567)',
            function() {
        let bytes = window.byteData.packArray([0.1234567], float32);
        let num = window.byteData.unpackArray(bytes, float32);
        assert.deepEqual(0.1234567, num[0].toFixed(7));
    });

    // 32-bit / 4 bytes unsigned
    it('should turn 1 32-bit unsigned int to 4 bytes and back (0s)',
            function() {
        let bytes = window.byteData.packArray([0], uInt32);
        let num = window.byteData.unpackArray(bytes, uInt32);
        assert.deepEqual([0], num);
    });
    it('should turn 1 32-bit unsigned int to 4 bytes and back ' +
            '(4294967295)', function() {
        let bytes = window.byteData.packArray([4294967295], uInt32);
        let num = window.byteData.unpackArray(bytes, uInt32);
        assert.deepEqual([255,255,255,255], bytes);
        assert.deepEqual([4294967295], num);
    });
    it('should turn 1 32-bit unsigned int to 4 bytes and back (300)',
            function() {
        let bytes = window.byteData.packArray([300], uInt32);
        let num = window.byteData.unpackArray(bytes, uInt32);
        assert.deepEqual([44,1,0,0], bytes);
        assert.deepEqual([300], num);
    });
    it('should turn 1 32-bit unsigned int to 4 byte and back (1)',
            function() {
        let bytes = window.byteData.packArray([1], uInt32);
        let num = window.byteData.unpackArray(bytes, uInt32);
        assert.deepEqual([1,0,0,0], bytes);
        assert.deepEqual([1], num);
    });
    // 32-bit / 4 bytes signed
    it('should turn 1 32-bit signed int to 4 bytes and back (0s)',
            function() {
        let bytes = window.byteData.packArray([0], int32);
        let num = window.byteData.unpackArray(bytes, int32);
        assert.deepEqual([0], num);
    });
    it('should turn 2 32-bit signed int to 8 bytes and back ' +
        '(-2147483648, 2147483647)', function() {
        let bytes = window.byteData.packArray([-2147483648, 2147483647], int32);
        let num = window.byteData.unpackArray(bytes, int32);
        assert.deepEqual([0,0,0,128, 255,255,255,127], bytes);
        assert.deepEqual([-2147483648, 2147483647], num);
    });
    it('should turn 1 32-bit signed int to 4 bytes and back (1)',
            function() {
        let bytes = window.byteData.packArray([1], int32);
        let num = window.byteData.unpackArray(bytes, int32);
        assert.deepEqual([1], num);
    });

    // 24-bit / 3 bytes unsigned
    it('should turn 1 24-bit unsigned int to 3 bytes and back (0s)',
            function() {
        let bytes = window.byteData.packArray([0], uInt24);
        let num = window.byteData.unpackArray(bytes, uInt24);
        assert.deepEqual([0], num);
    });
    it('should turn 1 24-bit unsigned int to 3 bytes and back (16777215)',
            function() {
        let bytes = window.byteData.packArray([16777215], uInt24);
        let num = window.byteData.unpackArray(bytes, uInt24);
        assert.deepEqual([16777215], num);
    });
    it('should turn 1 24-bit unsigned int to 3 byte and back (1)',
            function() {
        let bytes = window.byteData.packArray([1], uInt24);
        let num = window.byteData.unpackArray(bytes, uInt24);
        assert.deepEqual([1], num);
    });
    // 24-bit / 3 bytes signed
    it('should turn 1 24-bit signed int to 3 bytes and back (0s)',
            function() {
        let bytes = window.byteData.packArray([0], int24);
        let num = window.byteData.unpackArray(bytes, int24);
        ;
        assert.deepEqual([0], num);
    });
    it('should turn 2 24-bit signed int to 6 bytes and back ' +
        '(-8388608, 8388607)', function() {
        let bytes = window.byteData.packArray([-8388608, 8388607], int24);
        let num = window.byteData.unpackArray(bytes, int24);
        assert.deepEqual([-8388608, 8388607], num);
    });
    it('should turn 1 24-bit signed int to 3 byte and back (1)',
            function() {
        let bytes = window.byteData.packArray([1], int24);
        let num = window.byteData.unpackArray(bytes, int24);
        assert.deepEqual([1], num);
    });

    // 16-bit / 2 bytes unsigned
    it('should turn 1 16-bit unsigned int to 2 bytes and back (0s)',
            function() {
        let bytes = window.byteData.packArray([0], uInt16);
        let num = window.byteData.unpackArray(bytes, uInt16);
        assert.deepEqual([0], num);
    });
    it('should turn 1 16-bit unsigned int to 2 bytes and back (65535)',
            function() {
        let bytes = window.byteData.packArray([65535], uInt16);
        let num = window.byteData.unpackArray(bytes, uInt16);
        assert.deepEqual([65535], num);
    });
    it('should turn 1 16-bit unsigned int to 2 byte and back (1)',
            function() {
        let bytes = window.byteData.packArray([1], uInt16);
        let num = window.byteData.unpackArray(bytes, uInt16);
        assert.deepEqual([1], num);
    });
    // 16-bit / 2 bytes signed
    it('should turn 1 16-bit signed int to 2 bytes and back (0s)',
            function() {
        let bytes = window.byteData.packArray([0], int16);
        let num = window.byteData.unpackArray(bytes, int16);
        assert.deepEqual([0], num);
    });
    it('should turn 2 16-bit signed int to 4 bytes and back ' +
        '(-32768, 32767)',
            function() {
        let bytes = window.byteData.packArray([-32768, 32767], int16);
        let num = window.byteData.unpackArray(bytes, int16);
        assert.deepEqual([-32768, 32767], num);
    });
    it('should turn 1 16-bit signed int to 2 byte and back (1)',
            function() {
        let bytes = window.byteData.packArray([1], int16);
        let num = window.byteData.unpackArray(bytes, int16);
        assert.deepEqual([1], num);
    });

    it('should turn 1 16-bit float to 2 byte and back (0.0006)',
            function() {
        let bytes = window.byteData.packArray([0.0006], float16);
        let num = window.byteData.unpackArray(bytes, float16);
        assert.deepEqual(0.0006, num[0].toFixed(4));
    });
    it('should turn 1 16-bit float to 2 byte and back (-0.0006)',
            function() {
        let bytes = window.byteData.packArray([-0.0006], float16);
        let num = window.byteData.unpackArray(bytes, float16);
        assert.deepEqual(-0.0006, num[0].toFixed(4));
    });
    it('should turn 1 16-bit float to 2 byte and back (0.0106)',
            function() {
        let bytes = window.byteData.packArray([0.0106], float16);
        let num = window.byteData.unpackArray(bytes, float16);
        assert.deepEqual(0.0106, num[0].toFixed(4));
    });
    it('should turn 1 16-bit float to 2 byte and back (-0.1006)',
            function() {
        let bytes = window.byteData.packArray([-0.1006], float16);
        let num = window.byteData.unpackArray(bytes, float16);
        assert.deepEqual(-0.1006, num[0].toFixed(4));
    });
    it('should turn 1 16-bit float to 2 byte and back (0.00106)',
            function() {
        let bytes = window.byteData.packArray([0.00106], float16);
        let num = window.byteData.unpackArray(bytes, float16);
        assert.deepEqual(0.00106, num[0].toFixed(5));
    });
    it('should turn 1 16-bit float to 2 byte and back (-0.01006)',
            function() {
        let bytes = window.byteData.packArray([-0.01006], float16);
        let num = window.byteData.unpackArray(bytes, float16);
        assert.deepEqual(-0.01006, num[0].toFixed(5));
    });
    it('should turn 1 16-bit float to 2 byte and back (-0.01006 vs -0.01005)',
            function() {
        let bytes = window.byteData.packArray([-0.01006], float16);
        let num = window.byteData.unpackArray(bytes, float16);
        assert.ok(-0.01005 != num[0].toFixed(5));
    });

    // 8-bit / 1 byte unsigned
    it('should turn 1 8-bit unsigned int to 1 byte and back (0s)',
            function() {
        let bytes = window.byteData.packArray([0], uInt8);
        let num = window.byteData.unpackArray(bytes, uInt8);
        assert.deepEqual([0], num);
    });
    it('should turn 1 8-bit unsigned int to 1 byte and back (max)',
            function() {
        let bytes = window.byteData.packArray([255], uInt8);
        let num = window.byteData.unpackArray(bytes, uInt8);
        assert.deepEqual([255], num);
    });
    it('should turn 1 8-bit unsigned int to 1 byte and back (1)',
            function() {
        let bytes = window.byteData.packArray([1], uInt8);
        let num = window.byteData.unpackArray(bytes, uInt8);
        assert.deepEqual([1], num);
    });
    // 8-bit / 1 byte signed
    it('should turn 2 8-bit signed int to 2 bytes (0s)', function() {
        let bytes = window.byteData.packArray([0], int8);
        let num = window.byteData.unpackArray(bytes, int8);
        assert.deepEqual([0], num);
    });
    it('should turn 2 8-bit signed int to 2 bytes (-128, 127)', function() {
        let bytes = window.byteData.packArray([-128, 127], int8);
        let num = window.byteData.unpackArray(bytes, int8);
        assert.deepEqual([-128, 127], num);
    });
    it('should turn 1 8-bit signed int to 1 byte (-1)', function() {
        let bytes = window.byteData.packArray([-1], int8);
        let num = window.byteData.unpackArray(bytes, int8);
        assert.deepEqual([-1], num);
    });

    // 8-bit / 1 byte unsigned
    it('should turn 1 4-bit unsigned int to 1 nibbles and back (0s)',
            function() {
        let bytes = window.byteData.packArray([0], uInt4);
        let num = window.byteData.unpackArray(bytes, uInt4);
        assert.deepEqual([0], num);
    });
    it('should turn 1 4-bit unsigned int to 1 nibbles and back (max)',
            function() {
        let bytes = window.byteData.packArray([15], uInt4);
        let num = window.byteData.unpackArray(bytes, uInt4);
        assert.deepEqual([15], num);
    });
    it('should turn 1 4-bit unsigned int to 1 nibble and back (1)',
            function() {
        let bytes = window.byteData.packArray([1], uInt4);
        let num = window.byteData.unpackArray(bytes, uInt4);
        assert.deepEqual([1], num);
    });
    // 4-bit / 1 byte signed
    it('should turn 1 4-bit signed int to 1 nibbles (0s)', function() {
        let bytes = window.byteData.packArray([0], int4);
        let num = window.byteData.unpackArray(bytes, int4);
        assert.deepEqual([0], num);
    });
    it('should turn 2 4-bit signed int to 2 nibbles (-8, 7)', function() {
        let bytes = window.byteData.packArray([-8, 7], int4);
        let num = window.byteData.unpackArray(bytes, int4);
        assert.deepEqual([-8, 7], num);
    });
    it('should turn 1 4-bit signed int to a nibble (-1)', function() {
        let bytes = window.byteData.packArray([-1], int4);
        let num = window.byteData.unpackArray(bytes, int4);
        assert.deepEqual([-1], num);
    });

    // 2-bit / 1 byte signed
    it('should turn 1 2-bit signed int to 1 crumb (0s)', function() {
        let crumbs = window.byteData.packArray([0], int2);
        let num = window.byteData.unpackArray(crumbs, int2);
        assert.deepEqual([0], num);
    });
    it('should turn 2 2-bit signed int to 2 crumb (-2, 1)', function() {
        let crumbs = window.byteData.packArray([-2, 1], int2);
        let num = window.byteData.unpackArray(crumbs, int2);
        assert.deepEqual([-2, 1], num);
    });
    it('should turn 1 2-bit signed int to a crumb (-1)', function() {
        let crumbs = window.byteData.packArray([-1], int2);
        let num = window.byteData.unpackArray(crumbs, int2);
        assert.deepEqual([-1], num);
    });

    // 1-bit
    it('should turn 1-bit int to boolean (0s)', function() {
        let vbool = window.byteData.packArray([0], bool);
        let num = window.byteData.unpackArray(vbool, bool);
        assert.deepEqual([0], num);
    });
    it('should turn 1-bit int to boolean (1)', function() {
        let vbool = window.byteData.packArray([1], bool);
        let num = window.byteData.unpackArray(vbool, bool);
        assert.deepEqual([1], num);
    });

    // string
    it('should turn a 2 char string to bytes and back', function() {
        let bytes = window.byteData.packArray("ab", chr);
        let string = window.byteData.unpackArray(bytes, chr);
        assert.deepEqual("ab", string);
    });
});


describe('pack struct', function() {
    
    it('should not pack a LE struct when input have less items', function() {
        let struct = ["abcd", 4294967295];
        let def = [
            fourCC,
            uInt32,
            uInt16
        ];
        let expected = [];
        assert.deepEqual(
                window.byteData.packStruct(struct, def),
                expected
            );
    });

    it('should pack a LE struct when input have more items', function() {
        let struct = ["abcd", 4294967295, 65535, 65535, 65535, 65535];
        let def = [
            fourCC,
            uInt32,
            uInt16
        ];
        let expected = [97,98,99,100,255,255,255,255,255,255];
        assert.deepEqual(
                window.byteData.packStruct(struct, def),
                expected
            );
    });

    it('should pack a LE struct', function() {
        let struct = ["abcd", 4294967295, 65535];
        let def = [
            fourCC,
            uInt32,
            uInt16
        ];
        let expected = [97,98,99,100,255,255,255,255,255,255];
        assert.deepEqual(
                window.byteData.packStruct(struct, def),
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
            fourCC,
            chr,
            bool,
            int2,
            uInt2,
            int4,
            uInt4,
            int8,
            uInt8,
            int16,
            uInt16,
            float16,
            int24,
            uInt24,
            int32,
            uInt32,
            float32,
            int40,
            uInt40,
            int48,
            uInt48,
            float64
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
                window.byteData.packStruct(struct, def),
                expected
            );
    });
});

describe('unpack struct', function() {
    
    it('should not unpack a LE struct when there are less bytes', function() {
        let struct = [];
        let def = [
            fourCC,
            uInt32,
            uInt16
        ];
        let buffer = [97,98,99,100,255,255];
        assert.deepEqual(
                window.byteData.unpackStruct(buffer, def),
                struct
            );
    });

    it('should unpack a LE struct when there are more bytes', function() {
        let struct = ["abcd", 4294967295, 65535];
        let def = [
            fourCC,
            uInt32,
            uInt16
        ];
        let buffer = [97,98,99,100,255,255,255,255,255,255,
            2,1,97,98,99,100,255,255,255,255,255,255];
        assert.deepEqual(
                window.byteData.unpackStruct(buffer, def),
                struct
            );
    });

    it('should unpack a LE struct', function() {
        let struct = ["abcd", 4294967295, 65535];
        let def = [
            fourCC,
            uInt32,
            uInt16
        ];
        let buffer = [97,98,99,100,255,255,255,255,255,255];
        assert.deepEqual(
                window.byteData.unpackStruct(buffer, def),
                struct
            );
    });

    it('should unpack a LE struct with all available types', function() {
        let struct = [
            "abcd",
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
            -8388608,
            16777215,
            -2147483648,
            4294967295,
            -549755813888,
            1099511627775,
            -140737488355328,
            281474976710655,
            3.141592653589793
        ];
        let def = [
            fourCC,
            chr,
            bool,
            int2,
            uInt2,
            int4,
            uInt4,
            int8,
            uInt8,
            int16,
            uInt16,
            int24,
            uInt24,
            int32,
            uInt32,
            int40,
            uInt40,
            int48,
            uInt48,
            float64
        ];
        let expected = [
            97,98,99,100,
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
            0,0,128,
            255,255,255,
            0,0,0,128,
            255,255,255,255,
            0,0,0,0,128,
            255,255,255,255,255,
            0,0,0,0,0,128,
            255,255,255,255,255,255,
            24,45,68,84,251,33,9,64
        ];
        assert.deepEqual(
                window.byteData.unpackStruct(expected, def),
                struct
            );
    });
});

let uInt16BE = window.byteData.uInt16BE;
let float16BE = window.byteData.float16BE;
let int16BE = window.byteData.int16BE;
let uInt24BE = window.byteData.uInt24BE;
let int24BE = window.byteData.int24BE;
let uInt32BE = window.byteData.uInt32BE;
let int32BE = window.byteData.int32BE;
let float32BE = window.byteData.float32BE;
let uInt40BE = window.byteData.uInt40BE;
let int40BE = window.byteData.int40BE;
let uInt48BE = window.byteData.uInt48BE;
let int48BE = window.byteData.int48BE;
let float64BE = window.byteData.float64BE;

describe('unpack LE and BE', function() { 
    
    // 16-bit
    it('should turn 2 16-bit signed ints to 2 bytes BE (0s)', function() {
        assert.deepEqual(
            window.byteData.unpackArray([0, 0, 0, 0], int16BE),
            [0, 0]);
    });
    it('should turn 2 16-bit signed ints to 2 bytes LE (1s)', function() {
        assert.deepEqual(
            window.byteData.unpackArray([1, 0, 1, 0], int16),
            [1, 1]);
    });
    it('should turn 2 16-bit signed ints to 2 bytes BE (1s)', function() {
        assert.deepEqual(
            window.byteData.unpackArray([0, 1, 0, 1], int16BE),
            [1, 1]);
    });
    it('should turn 1 16-bit unsigned ints to 2 bytes BE (1s)', function() {
        assert.deepEqual(
            window.byteData.unpackArray([0, 1], uInt16BE),
            [1]);
    });
    it('should turn 2 bytes hex to 1 16-bit float BE (1/3)', function() {
        assert.deepEqual(
            window.byteData.unpackArray(["35", "55"], float16BE, 16)[0].toFixed(5),
            0.33325);
    });

    // 24-bit
    it('should turn 2 24-bit signed ints to 6 bytes BE (0s)', function() {
        assert.deepEqual(
            window.byteData.unpackArray([0, 0, 0, 0, 0, 0], int24BE),
            [0, 0]);
    });
    it('should turn 2 24-bit signed ints to 6 bytes LE (1s)', function() {
        assert.deepEqual(
            window.byteData.unpackArray([1, 0, 0, 1, 0, 0], int24),
            [1, 1]);
    });
    it('should turn 2 24-bit signed ints to 6 bytes BE (1s)', function() {
        assert.deepEqual(
            window.byteData.unpackArray([0, 0, 1, 0, 0, 1], int24BE),
            [1, 1]);
    });
    it('should turn 1 24-bit unsigned int to 3 bytes BE (8388607)', function() {
        assert.deepEqual(
            window.byteData.unpackArray(["7f", "ff", "ff"], uInt24BE, 16),
            [8388607]);
    });
    it('should turn 2 24-bit signed ints to 6 bytes BE (max range)', function() {
        assert.deepEqual(
            window.byteData.unpackArray(["80","00","00", "7f", "ff", "ff"],
                int24BE, 16),
            [-8388608, 8388607]);
    });
    it('should turn 2 24-bit signed ints to 6 bytes BE', function() {
        assert.deepEqual(
            window.byteData.unpackArray(["80","00","00" , "00","00","01", "7f", "ff", "ff"],
                int24BE, 16),
            [-8388608, 1, 8388607]);
    });

    // 32-bit
    it('should turn 2 32-bit signed ints to 8 bytes BE (0s)', function() {
        assert.deepEqual(
            window.byteData.unpackArray([0, 0, 0, 0, 0, 0, 0, 0],
                int32BE),
            [0, 0]);
    });
    it('should turn 2 32-bit signed ints to 8 bytes LE (1s)', function() {
        assert.deepEqual(
            window.byteData.unpackArray([1, 0, 0, 0, 1, 0, 0, 0],
                int32),
            [1, 1]);
    });
    it('should turn 2 32-bit signed ints to 8 bytes BE (1s)', function() {
        assert.deepEqual(
            window.byteData.unpackArray([0, 0, 0, 1, 0,0, 0, 1],
                int32BE),
            [1, 1]);
    });
    it('should turn 1 32-bit signed ints to 4 bytes BE (1s)', function() {
        assert.deepEqual(
            window.byteData.unpackArray([0, 0, 0, 1],
                int32BE),
            [1]);
    });
    it('should turn 8 bytes hex to 2 32-bit ints (max range)', function() {
        assert.deepEqual(
            window.byteData.unpackArray(
                ["80","0","0","0", "7f","ff","ff","ff"],
                int32BE, 16),
            [-2147483648,2147483647]);
    });
    it('should turn 1 32-bit float from 4 bytes BE hex (2.1474836)', function() {
        assert.deepEqual(
            window.byteData.unpackArray(
                ["40","9","70","5f"],
                float32BE, 16)[0].toFixed(7),
            2.1474836);
    });

    // 40-bit
    it('should turn 2 40-bit signed ints to 10 bytes BE (0s)', function() {
        assert.deepEqual(
            window.byteData.unpackArray([0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                int40BE),
            [0, 0]);
    });
    it('should turn 2 40-bit signed ints to 10 bytes LE (1s)', function() {
        assert.deepEqual(
            window.byteData.unpackArray([1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
                int40),
            [1, 1]);
    });
    it('should turn 2 40-bit signed ints to 10 bytes BE (1s)', function() {
        assert.deepEqual(
            window.byteData.unpackArray([0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                int40BE),
            [1, 1]);
    });
    it('should turn 1 40-bit signed ints to 10 bytes LE (1s)', function() {
        assert.deepEqual(
            window.byteData.unpackArray(
                [1, 0, 0, 0, 0], int40),
            [1]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int BE (149515627075)',
            function() {
        assert.deepEqual(
            window.byteData.unpackArray(
                ["22","cf","d3","6a","43"], uInt40BE, 16),
            [149515627075]);
    });

    // 48-bit
    it('should turn 2 48-bit ints to 12 bytes BE (0s)', function() {
        assert.deepEqual(
            window.byteData.unpackArray([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                int48BE),
            [0, 0]);
    });
    it('should turn 2 48-bit ints to 12 bytes LE (1s)', function() {
        assert.deepEqual(
            window.byteData.unpackArray([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                int48),
            [1, 1]);
    });
    it('should turn 2 48-bit ints to 12 bytes BE (1s)', function() {
        assert.deepEqual(
            window.byteData.unpackArray([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                int48BE),
            [1, 1]);
    });
    it('should turn 2 48-bit unsigned ints to 12 bytes BE (1s)', function() {
        assert.deepEqual(
            window.byteData.unpackArray([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                uInt48BE),
            [1, 1]);
    });
    it('should turn 1 48-bit ints to 6 bytes hex BE (120637438355317)', function() {
        assert.deepEqual(
            window.byteData.unpackArray(["6d", "b8", "17", "a8", "e7", "75"],
                uInt48BE, 16),
            [120637438355317]);
    });
    it('should turn 1 48-bit unsigned ints to 6 bytes hex BE (120637438355317)', function() {
        let bytes = ["6d", "b8", "17", "a8", "e7", "75", 
            "00", "00", "00", "00", "00", "01", 
            "00", "00", "00", "00", "00", "01"];
        assert.deepEqual(
            window.byteData.unpackArray(bytes, uInt48BE, 16),
            [120637438355317, 1, 1]);
    });

    // 64-bit
    it('should turn 1 64-bit float to 8 bytes BE (pi)', function() {
        assert.deepEqual(
            window.byteData.unpackArray([64, 9, 33, 251, 84, 68, 45, 24], float64BE),
            [3.141592653589793]);
    });
});


describe('53-bit to bytes', function() { 
    
    it('should turn 1 unsigned 53-bit int to 7 bytes (hex) (max range)', function() {
        assert.deepEqual(
            window.byteData.packArray([9007199254740991], uInt53, 16),
            ["ff", "ff", "ff", "ff", "ff", "ff", "1f"]); 
    });
    it('should turn 1 unsigned 53-bit int to 7 bytes (0)', function() {
        assert.deepEqual(
            window.byteData.packArray([0], uInt53),
            [0,0,0,0,0,0,0]);
    });
});

describe('53-bit from bytes', function() { 
    
    it('should turn 1 unsigned 53-bit int to 7 bytes (hex) (max range)', function() {
        assert.deepEqual(
            window.byteData.unpackArray(["ff", "ff", "ff", "ff", "ff", "ff", "1f"], uInt53, 16),
            [9007199254740991]); 
    });
    it('should turn 1 unsigned 53-bit int to 7 bytes (0)', function() {
        assert.deepEqual(
            window.byteData.unpackArray([0,0,0,0,0,0,0], uInt53),
            [0]);
    });
});
