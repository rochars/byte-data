
var assert = require('assert');

describe('40-bit from bytes', function() {
    
    let byteData = require('../../index.js');

    // 40 bit unsigned
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (65535)',
            function() {
        assert.deepEqual(byteData.uIntFrom5Bytes(
            ["ff","ff","0","0","0"], 16),
            [65535]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (32767)',
            function() {
        assert.deepEqual(byteData.uIntFrom5Bytes(
            ["ff","7f","0","0","0"], 16),
            [32767]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (549755813887)',
            function() {
        assert.deepEqual(byteData.uIntFrom5Bytes(
            ["ff","ff","ff","ff","7f"], 16),
            [549755813887]);
    });
    it('should turn 5 bytes (bin) to 1 unsigned 40-bit int  (500000000080)',
            function() {
        assert.deepEqual(byteData.uIntFrom5Bytes(
            ["01010000", "10001000", "01010010",  "01101010",  "01110100" ], 2),
            [500000000080]);
    });
    it('should turn 5 bytes (dec) to 1 unsigned 40-bit int (max range)',
            function() {
        assert.deepEqual(byteData.uIntFrom5Bytes(
            ["ff","ff","ff","ff","ff"], 16),
            [1099511627775]);
    });
    it('should turn 5 bytes (bin) to 1 unsigned 40-bit int (max range)',
            function() {
        assert.deepEqual(byteData.uIntFrom5Bytes(
            [255,255,255,255,255]),
            [1099511627775]);
    });


    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int (149515627075)',
            function() {
        assert.deepEqual(byteData.uIntFrom5Bytes(
            ["43","6a", "d3","cf","22"], 16),
            [149515627075]);
    });
    it('should turn 5 bytes (bin) to 1 unsigned 40-bit int (149515627075)',
            function() {
        assert.deepEqual(byteData.uIntFrom5Bytes(
            ["01000011","01101010", "11010011","11001111","00100010"], 2),
            [149515627075]);
    });
    it('should turn 5 bytes (bin) to 1 unsigned 40-bit int (149515627075) (padding)',
            function() {
        assert.deepEqual(byteData.uIntFrom5Bytes(
            ["1000011","1101010", "11010011","11001111","100010"], 2),
            [149515627075]);
    });




    // 40 bit signed
    
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-32768)',
            function() {
        assert.deepEqual(byteData.intFrom5Bytes(
            ["0","80","ff","ff","ff"], 16),
            [-32768]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-65535)',
            function() {
        assert.deepEqual(byteData.intFrom5Bytes(
            ["1","0","ff","ff","ff"], 16),
            [-65535]);
    });
    
    
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-1)',
            function() {
        assert.deepEqual(byteData.intFrom5Bytes(
            ["ff","ff","ff","ff","ff"], 16),
            [-1]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-2)',
            function() {
        assert.deepEqual(byteData.intFrom5Bytes(
            ["fe","ff","ff","ff","ff"], 16),
            [-2]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-3)',
            function() {
        assert.deepEqual(byteData.intFrom5Bytes(
            ["fd","ff","ff","ff","ff"], 16),
            [-3]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-10)',
            function() {
        assert.deepEqual(byteData.intFrom5Bytes(
            ["f6","ff","ff","ff","ff"], 16),
            [-10]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-100)',
            function() {
        assert.deepEqual(byteData.intFrom5Bytes(
            ["9c","ff","ff","ff","ff"], 16),
            [-100]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-1000)',
            function() {
        assert.deepEqual(byteData.intFrom5Bytes(
            ["18","fc","ff","ff","ff"], 16),
            [-1000]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-10000)',
            function() {
        assert.deepEqual(byteData.intFrom5Bytes(
            ["f0","d8","ff","ff","ff"], 16),
            [-10000]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-100000)',
            function() {
        assert.deepEqual(byteData.intFrom5Bytes(
            ["60", "79","fe","ff","ff"], 16),
            [-100000]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-1000000)',
            function() {
        assert.deepEqual(byteData.intFrom5Bytes(
            ["c0", "bd","f0","ff","ff"], 16),
            [-1000000]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-32768)',
            function() {
        assert.deepEqual(byteData.intFrom5Bytes(
            ["0","80","ff","ff","ff"], 16),
            [-32768]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-32768)',
            function() {
        assert.deepEqual(byteData.intFrom5Bytes(
            ["8","80","ff","ff","ff"], 16),
            [-32760]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-12345)',
            function() {
        assert.deepEqual(byteData.intFrom5Bytes(
            ["c7","cf","ff","ff","ff"], 16),
            [-12345]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-12345)',
            function() {
        assert.deepEqual(byteData.intFrom5Bytes(
            ["00","00","00","00","80"], 16),
            [-549755813888]);
    });
    it('should turn 5 bytes (bin) to 1 signed 40-bit int (65535)',
            function() {
        assert.deepEqual(byteData.intFrom5Bytes(
            ["ff","ff","0","0","0"], 16),
            [65535]);
    });
    it('should turn 5 bytes (hex) to 1 unsigned 40-bit int  (32767)',
            function() {
        assert.deepEqual(byteData.intFrom5Bytes(
            ["ff","7f","0","0","0"], 16),
            [32767]);
    });
    
    /*
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (min range)',
            function() {
        assert.deepEqual(byteData.intFrom5Bytes(
            ["ff","ff","ff","ff","7f"], 16),
            [-549755813888]);
    });
    it('should turn 5 bytes (bin) to 1 signed 40-bit int  (-500000000080)',
            function() {
        assert.deepEqual(byteData.intFrom5Bytes(
            ["01010000", "10001000", "01010010",  "01101010",  "01110100" ], 2),
            [-500000000080]);
    });
    it('should turn 5 bytes (dec) to 1 signed 40-bit int (max range)',
            function() {
        assert.deepEqual(byteData.intFrom5Bytes(
            ["ff","ff","ff","ff","ff"], 16),
            [549755813887]);
    });
    it('should turn 5 bytes (bin) to 1 signed 40-bit int (32767)',
            function() {
        assert.deepEqual(byteData.intFrom5Bytes(
            [255,255,255,255,255]),
            [32767]);
    });
    */
});
