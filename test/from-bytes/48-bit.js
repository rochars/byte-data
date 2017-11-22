
var assert = require('assert');

describe('48-bit from bytes', function() {
    
    let byteData = require('../../index.js');

    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (max range)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            [0,0,0,0,0,0], 48, {"base": 10, "signed": false}),
            [0]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (max range)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["ff","ff","ff","ff","ff","ff"], 48, {"base": 16, "signed": false}),
            [281474976710655]);
    });
    it('should turn 5 bytes (hex) to 0 unsigned 48-bit int (not enough bytes)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["ff","ff","ff","ff","ff"], 48, {"base": 16, "signed": false}),
            []);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (max range)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["ff","ff","ff","ff","ff","7f"], 48, {"base": 16, "signed": true}),
            [140737488355327]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (min range)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["00","00","00","00","00","80"], 48, {"base": 16, "signed": true}),
            [-140737488355328]);
    });

    // 40 bit tests should work the same with 48-bit
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (65535)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["ff","ff","0","0","0","0"], 48, {"base": 16, "signed": false}),
            [65535]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (32767)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["ff","7f","0","0","0", "00"], 48, {"base": 16, "signed": false}),
            [32767]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (549755813887)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["ff","ff","ff","ff","7f", "00"], 48, {"base": 16, "signed": false}),
            [549755813887]);
    });
    it('should turn 6 bytes (bin) to 1 unsigned 48-bit int  (500000000080)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["01010000", "10001000", "01010010",  "01101010",  "01110100", "00000000" ],
            48,
            {"base": 2, "signed": false}),
            [500000000080]);
    });
    it('should turn 6 bytes (dec) to 1 unsigned 48-bit int (max 40-bit  range)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["ff","ff","ff","ff","ff","00"], 48, {"base": 16, "signed": false}),
            [1099511627775]);
    });
    it('should turn 6 bytes (bin) to 1 unsigned 48-bit int (max 40-bit range)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            [255,255,255,255,255, 0], 48, {"base": 10, "signed": false}),
            [1099511627775]);
    });
    it('should turn 6 bytes (bin) to 1 unsigned 48-bit int (max 48-bit range)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            [255,255,255,255,255, 255], 48, {"base": 10, "signed": false}),
            [281474976710655]);
    });

    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int (149515627075)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["43","6a", "d3","cf","22","00"], 48, {"base": 16, "signed": false}),
            [149515627075]);
    });
    it('should turn 6 bytes (bin) to 1 unsigned 48-bit int (149515627075)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["01000011","01101010", "11010011","11001111","00100010","00000000"],
            48, {"base": 2, "signed": false}),
            [149515627075]);
    });
    it('should turn 6 bytes (bin) to 1 unsigned 48-bit int (149515627075) (padding)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["1000011","1101010", "11010011","11001111","100010","00000000"], 
            48, {"base": 2, "signed": false}),
            [149515627075]);
    });

    // 48 bit signed
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-32768)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["0","80","ff","ff","ff","ff"], 48, {"base": 16, "signed": true}),
            [-32768]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-65535)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["1","0","ff","ff","ff","ff"], 48, {"base": 16, "signed": true}),
            [-65535]);
    });
        
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-1)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["ff","ff","ff","ff","ff","ff"], 48, {"base": 16, "signed": true}),
            [-1]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-2)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["fe","ff","ff","ff","ff","ff"], 48, {"base": 16, "signed": true}),
            [-2]);
    });
    it('should turn 5 bytes (hex) to 1 signed 48-bit int  (-3)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["fd","ff","ff","ff","ff","ff"], 48, {"base": 16, "signed": true}),
            [-3]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-10)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["f6","ff","ff","ff","ff","ff"], 48, {"base": 16, "signed": true}),
            [-10]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-100)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["9c","ff","ff","ff","ff","ff"], 48, {"base": 16, "signed": true}),
            [-100]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-1000)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["18","fc","ff","ff","ff","ff"], 48, {"base": 16, "signed": true}),
            [-1000]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-10000)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["f0","d8","ff","ff","ff","ff"], 48, {"base": 16, "signed": true}),
            [-10000]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-100000)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["60", "79","fe","ff","ff","ff"], 48, {"base": 16, "signed": true}),
            [-100000]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-1000000)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["c0", "bd","f0","ff","ff","ff"], 48, {"base": 16, "signed": true}),
            [-1000000]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-32768)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["0","80","ff","ff","ff","ff"], 48, {"base": 16, "signed": true}),
            [-32768]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-32768)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["8","80","ff","ff","ff","ff"], 48, {"base": 16, "signed": true}),
            [-32760]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-12345)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["c7","cf","ff","ff","ff","ff"], 48, {"base": 16, "signed": true}),
            [-12345]);
    });
    it('should turn 6 bytes (hex) to 1 signed 48-bit int  (-12345)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["00","00","00","00","80","ff"], 48, {"base": 16, "signed": true}),
            [-549755813888]);
    });
    it('should turn 6 bytes (bin) to 1 signed 48-bit int (65535)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["ff","ff","0","0","0","0"], 48, {"base": 16, "signed": false}),
            [65535]);
    });
    it('should turn 6 bytes (hex) to 1 unsigned 48-bit int  (32767)',
            function() {
        assert.deepEqual(byteData.fromBytes(
            ["ff","7f","0","0","0","0"], 48, {"base": 16, "signed": false}),
            [32767]);
    });
});
