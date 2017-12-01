/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../index.js');

describe('types', function() {
    
    //module.exports.floatLE = {"float": true, "single": true};
    it('should turn 8 bytes to 2 32-bit ints (0s)', function() {
        assert.equal(byteData.fromBytes(
            [0,0,0,0,0,0,0,0], 32, byteData.floatLE),
            0);
    });

    //module.exports.intLE = {"signed": true, "single": true};
    it('should turn 2 bytes to 2 8-bit signed ints', function() {
        assert.equal(
            byteData.fromBytes([128], 8, byteData.intLE),
            -128);
    });

    //module.exports.uIntLE = {"single": true};
    it('should turn 6 bytes to 1 unsigned 48-bit int',
            function() {
        assert.equal(byteData.fromBytes(
            [255,255,255,255,255, 0], 48, byteData.uIntLE),
            1099511627775);
    });

    //module.exports.floatBE = {"float": true, "single": true, "be": true};
    it('should turn 1 32-bit float to 4 bytes', function() {
        assert.deepEqual(
            byteData.fromBytes([64,9,112,95], 32, byteData.floatBE).toFixed(7),
            2.1474836);
    });

    //module.exports.intBE = {"signed": true, "single": true, "be": true};
    it('should turn 6 bytes BE to 1 24-bit int (0s)', function() {
        assert.deepEqual(byteData.fromBytes(
            [0,0,0,0,0,0], 24, byteData.intBE),
            0);
    });

    //module.exports.uIntBE = {"single": true, "be": true};
    it('should turn 6 bytes BE to 1 unsigned 48-bit int',
            function() {
        assert.equal(byteData.fromBytes(
            [0, 255,255,255,255,255], 48, byteData.uIntBE),
            1099511627775);
    });

    //module.exports.char = {"char": true, "single": true};
    it('should turn bytes to a char', function() {
        assert.deepEqual(byteData.fromBytes(
            [97, 98], 8, byteData.chr),
            "a");
    });

    //module.exports.floatArrayLE = {"float": true};
    it('should turn 8 bytes to 2 32-bit ints (0s)', function() {
        assert.deepEqual(byteData.fromBytes(
            [0,0,0,0,0,0,0,0], 32, byteData.floatArrayLE),
            [0, 0]);
    });

    //module.exports.intArrayLE = {"signed": true};
    it('should turn 2 bytes to 2 8-bit signed ints', function() {
        assert.deepEqual(
            byteData.fromBytes([128, 127], 8, byteData.intArrayLE),
            [-128, 127]);
    });

    //module.exports.uIntArrayLE = {};
    it('should turn 12 bytes LE to 2 unsigned 48-bit int',
            function() {
        assert.deepEqual(byteData.fromBytes(
            [255,255,255,255,255, 0, 255,255,255,255,255, 0], 48, byteData.uIntArrayLE),
            [1099511627775, 1099511627775]);
    });

    //module.exports.floatArrayBE = {"float": true, "be": true};
    it('should turn 1 32-bit float to 4 bytes', function() {
        assert.deepEqual(
            byteData.fromBytes([64,9,112,95], 32, byteData.floatArrayBE)[0].toFixed(7),
            2.1474836);
    });

    //module.exports.intArrayBE = {"signed": true, "be": true};
    it('should turn 2 bytes to 2 8-bit signed ints', function() {
        assert.deepEqual(
            byteData.fromBytes([128, 127], 8, byteData.intArrayLE),
            [-128, 127]);
    });

    //module.exports.uIntArrayBE = {"be": true};
    it('should turn 12 bytes BE to 2 unsigned 48-bit int',
            function() {
        assert.deepEqual(byteData.fromBytes(
            [0, 255,255,255,255,255, 0, 255,255,255,255,255], 48, byteData.uIntArrayBE),
            [1099511627775, 1099511627775]);
    });

    //module.exports.str = {"char": true};
    it('should turn bytes to a string', function() {
        assert.deepEqual(byteData.fromBytes(
            [97, 98], 8, byteData.str),
            "ab");
    });
    
});
