/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('48-bit to bytes', function() { 
    
    it('should turn 1 signed 48-bit int to 6 bytes (hex) (max range)', function() {
        assert.deepEqual(
            byteData.packArray([120637438355317], byteData.types.uInt48, 16),
            [117, 231, 168, 23, 184, 109]); 
    });
    it('should turn 1 signed 48-bit int to 6 bytes (hex) (max range)', function() {
        assert.deepEqual(
            byteData.packArray([140737488355327], byteData.types.uInt48),
            [255,255,255,255,255,127]); 
    });
    it('should turn 1 unsigned 48-bit int to 6 bytes (max range)', function() {
        assert.deepEqual(
            byteData.packArray([281474976710655], byteData.types.uInt48),
            [255,255,255,255,255,255]);
    });
    it('should turn 1 unsigned 48-bit int to 6 bytes (max range)', function() {
        assert.deepEqual(
            byteData.packArray([281474976710655], byteData.types.uInt48),
            [255,255,255,255,255,255]);
    });
});
