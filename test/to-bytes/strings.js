
var assert = require('assert');

describe('to-bytes', function() {
    
    let byteData = require('../../index.js');

    // string
    it('should turn a 2 char string to bytes', function() {
        assert.deepEqual(byteData.toBytes("ab", 8, {"base":10, "char": true}),
            [97, 98]);
    });
    it('should turn a 2 char string to bytes (hex)', function() {
        assert.deepEqual(byteData.toBytes("ab", 8, {"base":16, "char": true}),
            ["61", "62"]);
    });

    it('should turn a 1 char string to bytes', function() {
        assert.deepEqual(byteData.toBytes("a", 8, {"base":10, "char": true}),
            [97]);
    });
    it('should turn a 1 char string to bytes (hex)', function() {
        assert.deepEqual(byteData.toBytes("a",  8, {"base":16, "char": true}),
            ["61"]);
    });
});
