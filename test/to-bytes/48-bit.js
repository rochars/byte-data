/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../index.js');

describe('48-bit to bytes', function() { 
    
    // 48 bit
    it('should turn 1 signed 48-bit int to 6 bytes (hex) (max range)', function() {
        assert.deepEqual(byteData.toBytes([-140737488355328], 48, {"base": 16, "signed": true}),
            ["00","00","00","00","00","80"]);
    });
    it('should turn 1 signed 48-bit int to 6 bytes (hex) (max range)', function() {
        // struct.pack('<q', 120637438355317) 'u\xe7\xa8\x17\xb8m\x00\x00'
        assert.deepEqual(byteData.toBytes([120637438355317], 48, {"base": 16}),
            ["75", "e7", "a8", "17", "b8", "6d"]); 
    });
    it('should turn 1 signed 48-bit int to 6 bytes (hex) (max range)', function() {
        assert.deepEqual(byteData.toBytes([140737488355327], 48, {"base": 10}),
            [255,255,255,255,255,127]); 
    });
    it('should turn 1 unsigned 48-bit int to 6 bytes (max range)', function() {
        assert.deepEqual(byteData.toBytes([281474976710655], 48, {"base": 10}),
            [255,255,255,255,255,255]);
    });
    it('should turn 1 unsigned 48-bit int to 6 bytes (max range)', function() {
        assert.deepEqual(byteData.toBytes([281474976710655], 48, {"buffer": true}),
            [255,255,255,255,255,255]);
    });
});
