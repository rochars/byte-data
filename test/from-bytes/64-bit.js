
var assert = require('assert');

describe('64-bit from bytes', function() {
    
    let byteData = require('../../index.js');

    it('should turn 8 bytes to 1 64-bit float', function() {
        assert.equal(byteData.floatFrom8Bytes(
            [75,40,253,58,221,154,191,63])[0],
            0.123456789876543);
    });
    it('should turn 8 bytes to 1 64-bit float (Uint8Array)', function() {
        assert.equal(byteData.floatFrom8Bytes(
            new Uint8Array([75,40,253,58,221,154,191,63]))[0],
            0.123456789876543);
    });
    it('should turn 8 bytes to 1 64-bit float (Buffer)', function() {
        assert.equal(byteData.floatFrom8Bytes(
            new Buffer.from([75,40,253,58,221,154,191,63]))[0],
            0.123456789876543);
    });
    it('should turn 8 bytes to 1 64-bit float', function() {
        assert.equal(byteData.floatFrom8Bytes(
            [0,0,0,0,0,0,0,0])[0].toFixed(15),
            0);
    });
    it('should turn 16 bytes to 2 64-bit floats', function() {
        assert.equal(byteData.floatFrom8Bytes(
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])[0].toFixed(15),
            0);
        assert.equal(byteData.floatFrom8Bytes(
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])[1].toFixed(15),
            0);
    });

    
    it('should turn 8 bytes bin to 1 64-bit float', function() {
        assert.equal(byteData.floatFrom8Bytes(
            [
                "00000000",
                "00000000",
                "00000000",
                "00000000",
                "00000000",
                "00000000",
                "00000000",
                "00000000"
            ], 2)[0].toFixed(15),
            0);
    });
    

    it('should turn 8 bytes bin to 1 64-bit float', function() {
        assert.equal(byteData.floatFrom8Bytes(
            [
                "01001011",
                "00101000",
                "11111101",
                "00111010",
                "11011101",
                "10011010",
                "10111111",
                "00111111"
            ], 2)[0].toFixed(15),
            0.123456789876543);
    });
});