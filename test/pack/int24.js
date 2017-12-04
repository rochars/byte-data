/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('pack int24', function() {
    
    it('should turn 2 signed 24-bit ints to 6 bytes (max range)', function() {
        assert.deepEqual(
            byteData.packArray([-8388608, 8388607], byteData.int24),
            [0,0,128,255,255,127]
        );
    });
    it('should turn 2 signed 24-bit ints to 6 bytes (overflow)', function() {
        assert.deepEqual(
            byteData.packArray([-18388608, 18388607], byteData.int24),
            [0,0,128,255,255,127]
        );
    });
});
