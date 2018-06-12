/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');
let float32 = byteData.float32;

describe('unpack float32', function() {
    
    it('should turn 4 bytes bin to 1 32-bit float', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [95,112,9,64],
                float32, 2)[0].toFixed(7),
            2.1474836);
    });
    it('should turn 4 bytes hex to 1 32-bit float', function() {
        assert.deepEqual(
            byteData.unpackArray(
                [95,112,9,64], float32, 16)[0].toFixed(7),
            2.1474836);
    });
    it('should turn 3 bytes hex to 0 32-bit float (not enough bytes)', function() {
        assert.deepEqual(
            byteData.unpackArray([95,112,9], float32, 16),
            []);
    });
    it('should turn 1 32-bit float to 4 bytes', function() {
        assert.deepEqual(
            byteData.unpackArray([95,112,9,64], float32)[0].toFixed(7),
            2.1474836);
    });
    it('should turn 8 bytes to 2 32-bit floats', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,0,0,0,0,0], float32),
            [0,0]);
    });
});
