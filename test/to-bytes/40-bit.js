/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('40-bit to bytes', function() { 
    
    // 40 bit
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (max range)', function() {
        assert.deepEqual(byteData.toBytes([549755813887], 40, {"base": 16}),
            ["ff","ff","ff","ff","7f"]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (949752813887)', function() {
        assert.deepEqual(byteData.toBytes([949752813887], 40, {"base": 16}),
            ["3f", "d9", "ad", "21", "dd"]);
    });  
    it('should turn 1 signed 40-bit int to 5 bytes (hex) (max range)', function() {
        assert.deepEqual(byteData.toBytes([-549755813888], 40, {"base": 16, "signed": true}),
            ["00","00","00","00","80"]);
    });
    it('should turn 1 unsigned 40-bit int to 5 bytes (hex) (max range)', function() {
        assert.deepEqual(byteData.toBytes([1099511627775], 40, {"base": 16}),
            ["ff","ff","ff","ff","ff"]);
    });
    it('should turn 1 unsigned 40-bit int to 5 bytes (max range)', function() {
        assert.deepEqual(byteData.toBytes([1099511627775], 40, {"base": 10}),
            [255,255,255,255,255]);
    });
    it('should turn 1 unsigned 40-bit int to 5 bytes in a Uint8Array (max range)', function() {
        assert.deepEqual(byteData.toBytes([1099511627775], 40, {"buffer": true}),
            [255,255,255,255,255]);
    });
});
