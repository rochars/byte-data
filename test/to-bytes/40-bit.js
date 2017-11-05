
var assert = require('assert');

describe('40-bit to bytes', function() {
    
    let byteData = require('../../index.js');

    // 40 bit
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (max range)', function() {
        assert.deepEqual(byteData.intTo5Bytes([549755813887], 16),
            ["ff","ff","ff","ff","7f"]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (949752813887)', function() {
        assert.deepEqual(byteData.intTo5Bytes([949752813887], 16),
            ["3f", "d9", "ad", "21", "dd"]);
    });  
    it('should turn 1 signed 40-bit int to 5 bytes (hex) (max range)', function() {
        assert.deepEqual(byteData.intTo5Bytes([-549755813888], 16),
            ["00","00","00","00","80"]);
    });
    it('should turn 1 unsigned 40-bit int to 5 bytes (hex) (max range)', function() {
        assert.deepEqual(byteData.intTo5Bytes([1099511627775], 16),
            ["ff","ff","ff","ff","ff"]);
    });
    it('should turn 1 unsigned 40-bit int to 5 bytes (max range)', function() {
        assert.deepEqual(byteData.intTo5Bytes([1099511627775], 10),
            [255,255,255,255,255]);
    });
});
