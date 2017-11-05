
var assert = require('assert');

describe('Nibbles from bytes', function() {
    
    let byteData = require('../../index.js');

    it('should turn 1 nibble to a 4-bit uInt', function() {
        assert.deepEqual(byteData.uIntFromNibble(
            [0]),
            [0]);
    });
    it('should turn 1 nibble to a 4-bit uInt', function() {
        assert.deepEqual(byteData.uIntFromNibble(
            [15]),
            [15]);
    });
    it('should turn 1 nibble to a 4-bit int', function() {
        assert.deepEqual(byteData.intFromNibble(
            [15]),
            [-1]);
    });
    it('should turn 2 nibbles to a 4-bit uInts', function() {
        assert.deepEqual(byteData.uIntFromNibble(
            [0,1]),
            [0,1]);
    });


    it('should turn 1 nibble to a 4-bit uInt', function() {
        assert.deepEqual(byteData.uIntFromNibble(
            ["1111"], 2),
            [15]);
    });
    it('should turn 1 nibble to a 4-bit int', function() {
        assert.deepEqual(byteData.intFromNibble(
            ["1111"], 2),
            [-1]);
    });
    it('should turn 1 nibble to a 4-bit uInt', function() {
        assert.deepEqual(byteData.uIntFromNibble(
            ["f"], 16),
            [15]);
    });
    it('should turn 1 nibble to a 4-bit int', function() {
        assert.deepEqual(byteData.intFromNibble(
            ["f"], 16),
            [-1]);
    });

});
