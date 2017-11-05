
var assert = require('assert');

describe('to-bytes', function() {
    
    let byteData = require('../../index.js');

    // string
    it('should turn a 2 char string to bytes', function() {
        assert.deepEqual(byteData.stringToBytes("ab"),
            [97, 98]);
    });
    it('should turn a 2 char string to bytes (hex)', function() {
        assert.deepEqual(byteData.stringToBytes("ab", 16),
            ["61", "62"]);
    });

    it('should turn a 1 char string to bytes', function() {
        assert.deepEqual(byteData.stringToBytes("a"),
            [97]);
    });
    it('should turn a 1 char string to bytes (hex)', function() {
        assert.deepEqual(byteData.stringToBytes("a", 16),
            ["61"]);
    });
});
