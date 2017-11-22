
var assert = require('assert');

describe('64-bit from bytes', function() {
    
    let byteData = require('../../index.js');

    it('should turn 8 bytes to 1 64-bit float', function() {
        assert.equal(byteData.fromBytes(
            [75,40,253,58,221,154,191,63], 64)[0],
            0.123456789876543);
    });
    it('should turn 7 bytes to 0 64-bit float (not enough bytes)', function() {
        assert.deepEqual(byteData.fromBytes([75,40,253,58,221,154,191], 64),
            []);
    });
    it('should turn 8 bytes to 1 64-bit float (Uint8Array)', function() {
        assert.equal(byteData.fromBytes(
            new Uint8Array([75,40,253,58,221,154,191,63]), 64)[0],
            0.123456789876543);
    });
    it('should turn 8 bytes to 1 64-bit float (Buffer)', function() {
        assert.equal(byteData.fromBytes(
            new Buffer.from([75,40,253,58,221,154,191,63]), 64)[0],
            0.123456789876543);
    });
    it('should turn 9 bytes to 1 64-bit float (ignore the extra byte) (Buffer)', function() {
        assert.equal(byteData.fromBytes(
            new Buffer.from([75,40,253,58,221,154,191,63,00]), 64)[0],
            0.123456789876543);
    });
    it('should turn 8 bytes to 1 64-bit float', function() {
        assert.equal(byteData.fromBytes(
            [0,0,0,0,0,0,0,0], 64)[0].toFixed(15),
            0);
    });
    it('should turn 16 bytes to 2 64-bit floats', function() {
        assert.equal(byteData.fromBytes(
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 64)[0].toFixed(15),
            0);
        assert.equal(byteData.fromBytes(
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 64)[1].toFixed(15),
            0);
    });

    
    it('should turn 8 bytes bin to 1 64-bit float', function() {
        assert.equal(byteData.fromBytes(
            [
                "00000000",
                "00000000",
                "00000000",
                "00000000",
                "00000000",
                "00000000",
                "00000000",
                "00000000"
            ], 64, {"base": 2})[0].toFixed(15),
            0);
    });
    

    it('should turn 8 bytes bin to 1 64-bit float', function() {
        assert.equal(byteData.fromBytes(
            [
                "01001011",
                "00101000",
                "11111101",
                "00111010",
                "11011101",
                "10011010",
                "10111111",
                "00111111"
            ], 64, {"base": 2})[0].toFixed(15),
            0.123456789876543);
    });
});
