
var assert = require('assert');

describe('from-bytes', function() {
    
    let byteData = require('../../index.js');

    it('should turn bytes to a string', function() {
        assert.deepEqual(byteData.fromBytes(
            [97, 98], 8, {"base": 10, "char": true}),
            "ab");
    });
    it('should turn hex bytes to a string', function() {
        assert.deepEqual(byteData.fromBytes(
            ["61", "62"], 8, {"base": 16, "char": true}),
            "ab");
    });
    it('should turn bin bytes to a string', function() {
        assert.deepEqual(byteData.fromBytes(
            ["01100001", "01100010"], 8, {"base": 2, "char": true}),
            "ab");
    });
});
