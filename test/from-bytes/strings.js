
var assert = require('assert');

describe('from-bytes', function() {
    
    let byteData = require('../../index.js');

    it('should turn bytes to a string', function() {
        assert.deepEqual(byteData.stringFromBytes(
            [97, 98]),
            "ab");
    });
    it('should turn hex bytes to a string', function() {
        assert.deepEqual(byteData.stringFromBytes(
            ["61", "62"], 16),
            "ab");
    });
    it('should turn bin bytes to a string', function() {
        assert.deepEqual(byteData.stringFromBytes(
            ["01100001", "01100010"], 2),
            "ab");
    });
});
