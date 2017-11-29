var assert = require('assert');

describe('interface', function() {
    
    let byteData = require('../index.js');

    it('should find the "ab" among the junk', function() {
        let index = byteData.findString([1, 0, 1, 100, 97, 98, 2, 2, 0], "ab");
        assert.equal(index, 4);
    });
    it('should return -1 if the string is not found', function() {
        let index = byteData.findString([1, 0, 1, 100, 95, 98, 2, 2, 0], "ab");
        assert.equal(index, -1);
    });
    it('BitDepthOffsets should be available', function() {
        assert.ok(byteData.BitDepthOffsets[32]);
    });

    it('BitDepthMaxValues should be available', function() {
        assert.ok(byteData.BitDepthMaxValues[32]);
    });
    it('should turn 1 bytes hex to 1 16-bit uInt single value (not array)', function() {
        assert.equal(byteData.fromBytes(
            ["ff","ff"], 16, {"base": 16, "single": true}),
            65535);
    });
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        assert.deepEqual(byteData.toBytes(
            65535, 16, {"base": 16}),
            ["ff","ff"]);
    });
});
