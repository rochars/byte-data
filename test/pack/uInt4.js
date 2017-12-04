/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('pack uInt4', function() {
    
    it('should turn 2 4-bit signed int to 2 nibbles (0s)', function() {
        assert.deepEqual(
            byteData.packArray([0, 0], byteData.uInt4),
            [0, 0]);
    });
    it('should turn 1 4-bit signed int to 1 nibble hex (7)', function() {
        assert.deepEqual(
            byteData.packArray([7], byteData.uInt4, 16),
            ['7']);
    });
    it('should turn 1 4-bit signed int to 1 nibble bin (6)', function() {
        assert.deepEqual(
            byteData.packArray([6], byteData.uInt4, 2),
            ['0110']);
    });
});
