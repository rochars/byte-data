/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

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
    it('should turn 1 signed 32-bit int to 4 bytes bin (max range)', function() {
        assert.deepEqual(
            byteData.packArray([-2147483648], byteData.int32, 16),
            ["00","00","00","80"]);
    });
});
