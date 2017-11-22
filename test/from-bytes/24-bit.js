
var assert = require('assert');

describe('24-bit from bytes', function() {
    
    let byteData = require('../../index.js');

    it('should turn 6 bytes to 2 24-bit ints', function() {
        assert.deepEqual(byteData.fromBytes(
            [0,0,0,0,0,0], 24, {"base": 10, "signed": false}),
            [0,0]);
    });
    it('should turn 6 bytes bin to 2 24-bit ints (max range)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["00000000","00000000","10000000","11111111","11111111","01111111"],
            24, {"base": 2, "signed": true}),
            [-8388608, 8388607]);
    });
    it('should turn 6 bytes bin to 2 24-bit uInts (max range)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["00000000","00000000","00000000","11111111","11111111","11111111"],
            24, {"base": 2, "signed": false}),
            [0,16777215]);
    });
    it('should turn 7 bytes bin to 2 24-bit uInts (ignore the extra byte) (max range)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["00000000","00000000","00000000","11111111","11111111","11111111","11111111"],
            24, {"base": 2, "signed": false}),
            [0,16777215]);
    });
    it('should turn 2 bytes bin to 0 24-bit uInts (not enough bytes)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["11111111","11111111"], 
            24, {"base": 2, "signed": false}),
            []);
    });
    it('should turn 6 bytes hex to 2 24-bit ints (max range)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["0","0","80", "ff","ff","7f"], 
            24, {"base": 16, "signed": true}),
            [-8388608, 8388607]);
    });
    it('should turn 6 bytes hex to 2 24-bit uInts (max range)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["0","0","0","ff","ff","ff"],
            24, {"base": 16, "signed": false}),
            [0,16777215]);
    });
});
