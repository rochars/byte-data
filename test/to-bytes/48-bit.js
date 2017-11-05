
var assert = require('assert');

describe('48-bit to bytes', function() {
    
    let byteData = require('../../index.js');

    // 48 bit
    it('should turn 1 signed 48-bit int to 6 bytes (hex) (max range)', function() {
        assert.deepEqual(byteData.intTo6Bytes([-140737488355328], 16),
            ["00","00","00","00","00","80"]);
    });
    it('should turn 1 signed 48-bit int to 6 bytes (hex) (max range)', function() {
        // struct.pack('<q', 120637438355317) 'u\xe7\xa8\x17\xb8m\x00\x00'
        assert.deepEqual(byteData.intTo6Bytes([120637438355317], 16),
            ["75", "e7", "a8", "17", "b8", "6d"]); 
    });
    it('should turn 1 signed 48-bit int to 6 bytes (hex) (max range)', function() {
        assert.deepEqual(byteData.intTo6Bytes([140737488355327], 10),
            [255,255,255,255,255,127]); 
    });
    it('should turn 1 unsigned 48-bit int to 6 bytes (max range)', function() {
        assert.deepEqual(byteData.intTo6Bytes([281474976710655], 10),
            [255,255,255,255,255,255]);
    });

});
