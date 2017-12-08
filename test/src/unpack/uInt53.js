/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../index.js');
let uInt53 = new byteData.Type({"bits": 53});

describe('53-bit from bytes', function() { 
    
    it('should turn 1 unsigned 53-bit int to 7 bytes (hex) (max range)', function() {
        assert.deepEqual(
            byteData.unpackArray(["ff", "ff", "ff", "ff", "ff", "ff", "1f"], uInt53, 16),
            [9007199254740991]); 
    });
    it('should turn 1 unsigned 53-bit int to 7 bytes (0)', function() {
        assert.deepEqual(
            byteData.unpackArray([0,0,0,0,0,0,0], uInt53),
            [0]);
    });
});