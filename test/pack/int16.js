/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('pack int16', function() { 
    
    it('should turn 2 signed 16-bit ints to 4 bytes (max range)', function() {
        assert.deepEqual(
            byteData.packArray([-32768, 32767], byteData.int16),
            [0, 128, 255, 127]
        );
    });
    it('should turn 1 16-bit signed int to 1 byte hex (-1)', function() {
        assert.deepEqual(
            byteData.packArray([-1], byteData.int16, 16),
            ['ff', 'ff']);
    });
});
