
var assert = require('assert');

describe('8-bit from bytes', function() {
    
    let byteData = require('../../index.js');

    it('should turn 1 byte to a 8-bit uInt', function() {
        assert.deepEqual(byteData.fromBytes(
            [0,0], 8),
            [0,0]);
    });

    it('should turn 1 hex byte to a 8-bit uInt (max range)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["0","ff"], 8, {"base": 16}),
            [0, 255]);
    });
    it('should turn 1 hex byte to a 8-bit int (max range)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["ff","7f"], 8, {"base": 16, "signed": true}),
            [-1, 127]);
    });
    it('should turn 1 hex byte to a 8-bit int (max range)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["80","7f"], 8, {"base": 16, "signed": true}),
            [-128, 127]);
    });
    it('should turn 1 bin byte to a 8-bit uInt (max range)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["00000000","11111111"], 8, {"base": 2, "signed": false}),
            [0, 255]);
    });
    it('should turn 1 bin byte to a 8-bit int (max range)', function() {
        assert.deepEqual(byteData.fromBytes(
            ["10000000","01111111"], 8, {"base": 2, "signed": true}),
            [-128, 127]);
    });
});
