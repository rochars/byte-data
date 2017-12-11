/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('pack int32', function() {     

    it('should turn 2 signed 32-bit int to 8 bytes (max range)', function() {
        assert.deepEqual(
            byteData.packArray([-2147483648, 2147483647], byteData.int32),
            [0,0,0,128,255,255,255,127]);
    });
    it('should turn 1 signed 32-bit int to 4 bytes bin (min range)', function() {
        assert.deepEqual(
            byteData.packArray([-2147483648], byteData.int32, 2),
            ["00000000", "00000000","00000000","10000000"]);
    });
    
    // 0
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.int32, 16),
            ["00","00","00","00"]);
    });
    // min
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-2147483648], byteData.int32, 16),
            ["00","00","00","80"]);
    });
    // -125
    it('min', function() {
        assert.deepEqual(
            byteData.packArray([-125], byteData.int32, 16),
            ["83","ff","ff","ff"]);
    });
    // min + 1
    it('min + 1', function() {
        assert.deepEqual(
            byteData.packArray([-2147483647], byteData.int32, 16),
            ["01","00","00","80"]
        );
    });
    // min + 2
    it('min + 2', function() {
        assert.deepEqual(
            byteData.packArray([-2147483646], byteData.int32, 16),
            ["02","00","00","80"]
        );
    });
    // min + 3
    it('min + 3', function() {
        assert.deepEqual(
            byteData.packArray([-2147483645], byteData.int32, 16),
            ["03","00","00","80"]
        );
    });

    // -1
    it('-1', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.int32, 16),
            ["ff", "ff", "ff", "ff"]
        );
    });
    // -2
    it('-2', function() {
        assert.deepEqual(
            byteData.packArray([-2], byteData.int32, 16),
            ["fe", "ff", "ff", "ff"]
        );
    });
    // -3
    it('-3', function() {
        assert.deepEqual(
            byteData.packArray([-3], byteData.int32, 16),
            ["fd", "ff", "ff", "ff"]
        );
    });


    // overflow
    it('overflow', function() {
        assert.deepEqual(
            byteData.packArray([-2147483649, 2147483648], byteData.int32),
            [0,0,0,128,255,255,255,127]
        );
    });
    it('larger overflow', function() {
        assert.deepEqual(
            byteData.packArray([-12147483649, 12147483648], byteData.int32),
            [0,0,0,128,255,255,255,127]
        );
    });
});
