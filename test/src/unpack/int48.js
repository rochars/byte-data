/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('48-bit from bytes', function() {
    
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (max range)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["ff","ff","ff","ff","ff","7f"], byteData.int48, 16),
            [140737488355327]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (min range)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["00","00","00","00","00","80"], byteData.int48, 16),
            [-140737488355328]);
    });

    // 40 bit tests should work the same with 48-bit
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-32768)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["0","80","ff","ff","ff","ff"], byteData.int48, 16),
            [-32768]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-65535)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["1","0","ff","ff","ff","ff"], byteData.int48, 16),
            [-65535]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-1)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["ff","ff","ff","ff","ff","ff"], byteData.int48, 16),
            [-1]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-2)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["fe","ff","ff","ff","ff","ff"], byteData.int48, 16),
            [-2]);
    });
    it('should turn 5 bytes (hex) to 1 signed 48-bit int  (-3)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["fd","ff","ff","ff","ff","ff"], byteData.int48, 16),
            [-3]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-10)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["f6","ff","ff","ff","ff","ff"], byteData.int48, 16),
            [-10]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-100)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["9c","ff","ff","ff","ff","ff"], byteData.int48, 16),
            [-100]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-1000)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["18","fc","ff","ff","ff","ff"], byteData.int48, 16),
            [-1000]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-10000)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["f0","d8","ff","ff","ff","ff"], byteData.int48, 16),
            [-10000]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-100000)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["60", "79","fe","ff","ff","ff"], byteData.int48, 16),
            [-100000]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-1000000)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["c0", "bd","f0","ff","ff","ff"], byteData.int48, 16),
            [-1000000]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-32768)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["0","80","ff","ff","ff","ff"], byteData.int48, 16),
            [-32768]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-32768)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["8","80","ff","ff","ff","ff"], byteData.int48, 16),
            [-32760]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-12345)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["c7","cf","ff","ff","ff","ff"], byteData.int48, 16),
            [-12345]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-12345)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["00","00","00","00","80","ff"], byteData.int48, 16),
            [-549755813888]);
    });


    // 0
    it('min', function() {
        assert.deepEqual(
            byteData.unpackArray(["00","00","00","00","00","00"], byteData.int48, 16),
            [0]);
    });
    // min
    it('min', function() {
        assert.deepEqual(
            byteData.unpackArray(["00","00","00","00","00","80"], byteData.int48, 16),
            [-140737488355328]);
    });
    // -125
    it('min', function() {
        assert.deepEqual(
            byteData.unpackArray(["83","ff","ff","ff","ff","ff"], byteData.int48, 16),
            [-125]);
    });
    // min + 1
    it('min + 1', function() {
        assert.deepEqual(
            byteData.unpackArray(["01","00","00","00","00","80"], byteData.int48, 16),
            [-140737488355327]);
    });
    // min + 2
    it('min + 2', function() {
        assert.deepEqual(
            byteData.unpackArray(["02","00","00","00","00","80"], byteData.int48, 16),
            [-140737488355326]);
    });
    // min + 3
    it('min + 3', function() {
        assert.deepEqual(
            byteData.unpackArray(["03","00","00","00","00","80"], byteData.int48, 16),
            [-140737488355325]);
    });

    // -1
    it('-1', function() {
        assert.deepEqual(
            byteData.unpackArray(["ff", "ff", "ff", "ff", "ff", "ff"], byteData.int48, 16),
            [-1]);
    });
    // -2
    it('-2', function() {
        assert.deepEqual(
            byteData.unpackArray(["fe", "ff", "ff", "ff", "ff", "ff"], byteData.int48, 16),
            [-2]);
    });
    // -3
    it('-3', function() {
        assert.deepEqual(
            byteData.unpackArray(["fd", "ff", "ff", "ff", "ff", "ff"], byteData.int48, 16),
            [-3]);
    });

});
