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

    // pack
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        assert.deepEqual(
            byteData.pack(65535, byteData.uInt16, 16),
            ["ff", "ff"]);
    });
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        assert.deepEqual(
            byteData.pack(2.1474836, byteData.float32, 16),
            ["5f","70","09","40"]);
    });

    // unpack
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        assert.deepEqual(
            byteData.unpack(["ff", "ff"], byteData.uInt16, 16),
            65535);
    });
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        assert.equal(
            byteData.unpack(["00110101", "01010101"], byteData.float16).toFixed(5),
            0.33325);
    });

    // packSequence
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        assert.deepEqual(byteData.packSequence([65535, 0], byteData.uInt16, 16),
            ["ff", "ff", "00", "00"]);
    });
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        assert.deepEqual(byteData.packSequence([-2147483648, 2147483647], byteData.int32),
            [0,0,0,128,255,255,255,127]);
    });

    // unpackSequence
    it('should turn 1 value (not array) to 2 byte hex (not array)', function() {
        assert.deepEqual(byteData.unpackSequence(
            ["ff", "ff", "00", "00"], byteData.uInt16, 16),
            [65535, 0]);
    });
});
