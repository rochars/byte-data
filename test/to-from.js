/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../index.js');

describe('to-from', function() {
            
    it('should turn 8 bytes to 1 64-bit float and back (1', function() {
        let bytes = byteData.toBytes([612345678987654.3], 64);
        let num = byteData.fromBytes(bytes, 64)
        assert.deepEqual(num, [612345678987654.3]);
    });
    it('should turn 8 bytes to 1 64-bit float and back (1', function() {
        let bytes = byteData.toBytes([612345678.9876543], 64);
        let num = byteData.fromBytes(bytes, 64)
        assert.deepEqual(num, [612345678.9876543]);
    });
    it('should turn 8 bytes to 1 64-bit float and back (1', function() {
        let bytes = byteData.toBytes([612345678.9876543], 64);
        let num = byteData.fromBytes(bytes, 64)
        assert.ok(num != [612345678.9876540]);
    });
    it('should turn 8 bytes to 1 64-bit float and back (1 round)', function() {
        let bytes = byteData.toBytes([612345678987654.3], 64);
        let num = byteData.fromBytes(bytes, 64)
        assert.ok(num[0] != 612345678987654.1);
    });

    it('should turn 8 bytes to 1 64-bit float and back', function() {
        let bytes = byteData.toBytes([0.123456789876543], 64);
        let num = byteData.fromBytes(bytes, 64)
        assert.deepEqual([0.123456789876543], num);
    });
    it('should turn 8 bytes to 1 64-bit float and back (precision)', function() {
        let bytes = byteData.toBytes([0.123456789876543], 64);
        let num = byteData.fromBytes(bytes, 64)
        assert.ok(0.123456789876544 != num[0]);
    });

    // 48-bit
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (max range)',
            function() {
        let bytes = byteData.toBytes([1], 48);
        let num = byteData.fromBytes(bytes, 48, {"signed": true})
        assert.equal(1, num[0]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (max range)',
            function() {
        let bytes = byteData.toBytes([11], 48);
        let num = byteData.fromBytes(bytes, 48, {"signed": true})
        assert.equal(11, num[0]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (max range)',
            function() {
        let bytes = byteData.toBytes([0], 48);
        let num = byteData.fromBytes(bytes, 48, {"base": 16, "signed": false})
        assert.equal(0, num[0]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (max range)',
            function() {
        let bytes = byteData.toBytes([281474976710655], 48);
        let num = byteData.fromBytes(bytes, 48, {"signed": false})
        assert.equal(281474976710655, num[0]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (max range)',
            function() {
        let bytes = byteData.toBytes([140737488355327], 48);
        let num = byteData.fromBytes(bytes, 48, {"signed": true});
        assert.equal(140737488355327, num[0]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (min range)',
            function() {
        let bytes = byteData.toBytes([-140737488355328], 48, {"signed": true});
        let num = byteData.fromBytes(bytes, 48, {"signed": true});
        assert.equal(-140737488355328, num[0]);
    });

    // 40-bit
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (1)',
            function() {
        let bytes = byteData.toBytes([1], 40);
        let num = byteData.fromBytes(bytes, 40, {"signed": false})
        assert.equal(1, num[0]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (11)',
            function() {
        let bytes = byteData.toBytes([11], 40);
        let num = byteData.fromBytes(bytes, 40, {"signed": false})
        assert.equal(11, num[0]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (0)',
            function() {
        let bytes = byteData.toBytes([0], 40);
        let num = byteData.fromBytes(bytes, 40, {"signed": false})
        assert.equal(0, num[0]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (max range)',
            function() {
        let bytes = byteData.toBytes([1099511627775], 40);
        let num = byteData.fromBytes(bytes, 40, {"signed": false})
        assert.equal(1099511627775, num[0]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (max range)',
            function() {
        let bytes = byteData.toBytes([549755813887], 40);
        let num = byteData.fromBytes(bytes, 40, {"signed": true});
        assert.equal(549755813887, num[0]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (min range)',
            function() {
        let bytes = byteData.toBytes([-549755813888], 40, {"signed": true});
        let num = byteData.fromBytes(bytes, 40, {"signed": true});
        assert.equal(-549755813888, num[0]);
    });


    // 32 bit float
    it('should turn 1 32-bit float to 4 bytes and back (0s)',
            function() {
        let bytes = byteData.toBytes([0], 32, {"float": true});
        let num = byteData.fromBytes(bytes, 32, {"float": true});
        assert.deepEqual([0], num);
    });
    it('should turn 1 32-bit float to 4 bytes and back (1)',
            function() {
        let bytes = byteData.toBytes([1], 32, {"float": true});
        let num = byteData.fromBytes(bytes, 32, {"float": true});
        assert.deepEqual([1], num);
    });
    it('should turn 1 32-bit float to 4 bytes and back (0.1234567)',
            function() {
        let bytes = byteData.toBytes([0.1234567], 32, {"float": true});
        let num = byteData.fromBytes(bytes, 32, {"float": true});
        assert.deepEqual(0.1234567, num[0].toFixed(7));
    });

    // 32-bit / 4 bytes unsigned
    it('should turn 1 32-bit unsigned int to 4 bytes and back (0s)',
            function() {
        let bytes = byteData.toBytes([0], 32);
        let num = byteData.fromBytes(bytes, 32, {"signed": false});
        assert.deepEqual([0], num);
    });
    it('should turn 1 32-bit unsigned int to 4 bytes and back ' +
            '(4294967295)', function() {
        let bytes = byteData.toBytes([4294967295], 32);
        let num = byteData.fromBytes(bytes, 32, {"signed": false});
        assert.deepEqual([255,255,255,255], bytes);
        assert.deepEqual([4294967295], num);
    });
    it('should turn 1 32-bit unsigned int to 4 bytes and back (300)',
            function() {
        let bytes = byteData.toBytes([300], 32);
        let num = byteData.fromBytes(bytes, 32, {"signed": false});
        assert.deepEqual([44,1,0,0], bytes);
        assert.deepEqual([300], num);
    });
    it('should turn 1 32-bit unsigned int to 4 byte and back (1)',
            function() {
        let bytes = byteData.toBytes([1], 32);
        let num = byteData.fromBytes(bytes, 32, {"signed": false});
        assert.deepEqual([1,0,0,0], bytes);
        assert.deepEqual([1], num);
    });
    // 32-bit / 4 bytes signed
    it('should turn 1 32-bit signed int to 4 bytes and back (0s)',
            function() {
        let bytes = byteData.toBytes([0], 32);
        let num = byteData.fromBytes(bytes, 32, {"signed": true});
        assert.deepEqual([0], num);
    });
    it('should turn 2 32-bit signed int to 8 bytes and back ' +
        '(-2147483648, 2147483647)', function() {
        let bytes = byteData.toBytes([-2147483648, 2147483647], 32, {"signed": true});
        let num = byteData.fromBytes(bytes, 32, {"signed": true});
        assert.deepEqual([0,0,0,128, 255,255,255,127], bytes);
        assert.deepEqual([-2147483648, 2147483647], num);
    });
    it('should turn 1 32-bit signed int to 4 bytes and back (1)',
            function() {
        let bytes = byteData.toBytes([1], 32);
        let num = byteData.fromBytes(bytes, 32, {"signed": true});
        assert.deepEqual([1], num);
    });

    // 24-bit / 3 bytes unsigned
    it('should turn 1 24-bit unsigned int to 3 bytes and back (0s)',
            function() {
        let bytes = byteData.toBytes([0], 24);
        let num = byteData.fromBytes(bytes, 24, {"signed": false});
        assert.deepEqual([0], num);
    });
    it('should turn 1 24-bit unsigned int to 3 bytes and back (16777215)',
            function() {
        let bytes = byteData.toBytes([16777215], 24);
        let num = byteData.fromBytes(bytes, 24, {"signed": false});
        assert.deepEqual([16777215], num);
    });
    it('should turn 1 24-bit unsigned int to 3 byte and back (1)',
            function() {
        let bytes = byteData.toBytes([1], 24);
        let num = byteData.fromBytes(bytes, 24, {"signed": false});
        assert.deepEqual([1], num);
    });
    // 24-bit / 3 bytes signed
    it('should turn 1 24-bit signed int to 3 bytes and back (0s)',
            function() {
        let bytes = byteData.toBytes([0], 24);
        let num = byteData.fromBytes(bytes, 24, {"signed": true})
        ;
        assert.deepEqual([0], num);
    });
    it('should turn 2 24-bit signed int to 6 bytes and back ' +
        '(-8388608, 8388607)', function() {
        let bytes = byteData.toBytes([-8388608, 8388607], 24, {"signed": true});
        let num = byteData.fromBytes(bytes, 24, {"signed": true});
        assert.deepEqual([-8388608, 8388607], num);
    });
    it('should turn 1 24-bit signed int to 3 byte and back (1)',
            function() {
        let bytes = byteData.toBytes([1], 24);
        let num = byteData.fromBytes(bytes, 24, {"signed": true});
        assert.deepEqual([1], num);
    });

    // 16-bit / 2 bytes unsigned
    it('should turn 1 16-bit unsigned int to 2 bytes and back (0s)',
            function() {
        let bytes = byteData.toBytes([0], 16);
        let num = byteData.fromBytes(bytes, 16, {"signed": false});
        assert.deepEqual([0], num);
    });
    it('should turn 1 16-bit unsigned int to 2 bytes and back (65535)',
            function() {
        let bytes = byteData.toBytes([65535], 16);
        let num = byteData.fromBytes(bytes, 16, {"signed": false});
        assert.deepEqual([65535], num);
    });
    it('should turn 1 16-bit unsigned int to 2 byte and back (1)',
            function() {
        let bytes = byteData.toBytes([1], 16);
        let num = byteData.fromBytes(bytes, 16, {"signed": false});
        assert.deepEqual([1], num);
    });
    // 16-bit / 2 bytes signed
    it('should turn 1 16-bit signed int to 2 bytes and back (0s)',
            function() {
        let bytes = byteData.toBytes([0], 16);
        let num = byteData.fromBytes(bytes, 16, {"signed": true});
        assert.deepEqual([0], num);
    });
    it('should turn 2 16-bit signed int to 4 bytes and back ' +
        '(-32768, 32767)',
            function() {
        let bytes = byteData.toBytes([-32768, 32767], 16, {"signed": true});
        let num = byteData.fromBytes(bytes, 16, {"signed": true});
        assert.deepEqual([-32768, 32767], num);
    });
    it('should turn 1 16-bit signed int to 2 byte and back (1)',
            function() {
        let bytes = byteData.toBytes([1], 16);
        let num = byteData.fromBytes(bytes, 16, {"signed": true});
        assert.deepEqual([1], num);
    });

    it('should turn 1 16-bit float to 2 byte and back (0.0006)',
            function() {
        let bytes = byteData.packArray([0.0006], byteData.float16);
        let num = byteData.unpackArray(bytes, byteData.float16);
        assert.deepEqual(0.0006, num[0].toFixed(4));
    });
    it('should turn 1 16-bit float to 2 byte and back (-0.0006)',
            function() {
        let bytes = byteData.packArray([-0.0006], byteData.float16);
        let num = byteData.unpackArray(bytes, byteData.float16);
        assert.deepEqual(-0.0006, num[0].toFixed(4));
    });
    it('should turn 1 16-bit float to 2 byte and back (0.0106)',
            function() {
        let bytes = byteData.packArray([0.0106], byteData.float16);
        let num = byteData.unpackArray(bytes, byteData.float16);
        assert.deepEqual(0.0106, num[0].toFixed(4));
    });
    it('should turn 1 16-bit float to 2 byte and back (-0.1006)',
            function() {
        let bytes = byteData.packArray([-0.1006], byteData.float16);
        let num = byteData.unpackArray(bytes, byteData.float16);
        assert.deepEqual(-0.1006, num[0].toFixed(4));
    });
    it('should turn 1 16-bit float to 2 byte and back (0.00106)',
            function() {
        let bytes = byteData.packArray([0.00106], byteData.float16);
        let num = byteData.unpackArray(bytes, byteData.float16);
        assert.deepEqual(0.00106, num[0].toFixed(5));
    });
    it('should turn 1 16-bit float to 2 byte and back (-0.01006)',
            function() {
        let bytes = byteData.packArray([-0.01006], byteData.float16);
        let num = byteData.unpackArray(bytes, byteData.float16);
        assert.deepEqual(-0.01006, num[0].toFixed(5));
    });
    it('should turn 1 16-bit float to 2 byte and back (-0.01006 vs -0.01005)',
            function() {
        let bytes = byteData.packArray([-0.01006], byteData.float16);
        let num = byteData.unpackArray(bytes, byteData.float16);
        assert.ok(-0.01005 != num[0].toFixed(5));
    });

    // 8-bit / 1 byte unsigned
    it('should turn 1 8-bit unsigned int to 1 byte and back (0s)',
            function() {
        let bytes = byteData.toBytes([0], 8);
        let num = byteData.fromBytes(bytes, 8, {"signed": false});
        assert.deepEqual([0], num);
    });
    it('should turn 1 8-bit unsigned int to 1 byte and back (max)',
            function() {
        let bytes = byteData.toBytes([255], 8);
        let num = byteData.fromBytes(bytes, 8, {"signed": false});
        assert.deepEqual([255], num);
    });
    it('should turn 1 8-bit unsigned int to 1 byte and back (1)',
            function() {
        let bytes = byteData.toBytes([1], 8);
        let num = byteData.fromBytes(bytes, 8, {"signed": false});
        assert.deepEqual([1], num);
    });
    // 8-bit / 1 byte signed
    it('should turn 2 8-bit signed int to 2 bytes (0s)', function() {
        let bytes = byteData.toBytes([0], 8);
        let num = byteData.fromBytes(bytes, 8, {"signed": true});
        assert.deepEqual([0], num);
    });
    it('should turn 2 8-bit signed int to 2 bytes (-128, 127)', function() {
        let bytes = byteData.toBytes([-128, 127], 8, {"signed": true});
        let num = byteData.fromBytes(bytes, 8, {"signed": true});
        assert.deepEqual([-128, 127], num);
    });
    it('should turn 1 8-bit signed int to 1 byte (-1)', function() {
        let bytes = byteData.toBytes([-1], 8, {"signed": true});
        let num = byteData.fromBytes(bytes, 8, {"signed": true});
        assert.deepEqual([-1], num);
    });

    // 8-bit / 1 byte unsigned
    it('should turn 1 4-bit unsigned int to 1 nibbles and back (0s)',
            function() {
        let bytes = byteData.toBytes([0], 4);
        let num = byteData.fromBytes(bytes, 4, {"signed": false});
        assert.deepEqual([0], num);
    });
    it('should turn 1 4-bit unsigned int to 1 nibbles and back (max)',
            function() {
        let bytes = byteData.toBytes([15], 4);
        let num = byteData.fromBytes(bytes, 4, {"signed": false});
        assert.deepEqual([15], num);
    });
    it('should turn 1 4-bit unsigned int to 1 nibble and back (1)',
            function() {
        let bytes = byteData.toBytes([1], 4);
        let num = byteData.fromBytes(bytes, 4, {"signed": false});
        assert.deepEqual([1], num);
    });
    // 4-bit / 1 byte signed
    it('should turn 1 4-bit signed int to 1 nibbles (0s)', function() {
        let bytes = byteData.toBytes([0], 4);
        let num = byteData.fromBytes(bytes, 4, {"signed": true});
        assert.deepEqual([0], num);
    });
    it('should turn 2 4-bit signed int to 2 nibbles (-8, 7)', function() {
        let bytes = byteData.toBytes([-8, 7], 4, {"signed": true});
        let num = byteData.fromBytes(bytes, 4, {"signed": true});
        assert.deepEqual([-8, 7], num);
    });
    it('should turn 1 4-bit signed int to a nibble (-1)', function() {
        let bytes = byteData.toBytes([-1], 4, {"signed": true});
        let num = byteData.fromBytes(bytes, 4, {"signed": true});
        assert.deepEqual([-1], num);
    });

    // 2-bit / 1 byte signed
    it('should turn 1 2-bit signed int to 1 crumb (0s)', function() {
        let crumbs = byteData.toBytes([0], 2);
        let num = byteData.fromBytes(crumbs, 2);
        assert.deepEqual([0], num);
    });
    it('should turn 2 2-bit signed int to 2 crumb (-2, 1)', function() {
        let crumbs = byteData.toBytes([-2, 1], 2, {"signed": true});
        let num = byteData.fromBytes(crumbs, 2, {"signed": true});
        assert.deepEqual([-2, 1], num);
    });
    it('should turn 1 2-bit signed int to a crumb (-1)', function() {
        let crumbs = byteData.toBytes([-1], 2, {"signed": true});
        let num = byteData.fromBytes(crumbs, 2, {"signed": true});
        assert.deepEqual([-1], num);
    });

    // 1-bit
    it('should turn 1-bit int to boolean (0s)', function() {
        let bool = byteData.toBytes([0], 1);
        let num = byteData.fromBytes(bool, 1);
        assert.deepEqual([0], num);
    });
    it('should turn 1-bit int to boolean (1)', function() {
        let bool = byteData.toBytes([1], 1);
        let num = byteData.fromBytes(bool, 1);
        assert.deepEqual([1], num);
    });

    // string
    it('should turn a 2 char string to bytes and back', function() {
        let bytes = byteData.toBytes("ab", 8,  {"char": true});
        let string = byteData.fromBytes(bytes, 8, {"char": true});
        assert.deepEqual("ab", string);
    });
});
