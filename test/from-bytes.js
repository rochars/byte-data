
var assert = require('assert');

describe('from-bytes', function() {
    
    let byteData = require('../index.js');

    describe('#indexOf()', function() {
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
                [0,0,0,0,0,0,0,0])[0].toFixed(20),
                0);
        });
        it('should turn 16 bytes to 2 64-bit floats', function() {
            assert.equal(byteData.floatFrom8Bytes(
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])[0].toFixed(20),
                0);
            assert.equal(byteData.floatFrom8Bytes(
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])[1].toFixed(20),
                0);
        });

        /*
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
                ], 2)[0].toFixed(20),
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
                ], 2)[0].toFixed(20),
                0.123456789876543);
        });
        
        // 32
        it('should turn 4 bytes bin to 1 32-bit float', function() {
            assert.deepEqual(byteData.floatFrom4Bytes(
                ["01011111","01110000","00001001","01000000"], 2),
                [2.147483647]);
        });
        it('should turn 4 bytes hex to 1 32-bit float', function() {
            assert.deepEqual(byteData.floatFrom4Bytes(
                ["5f","70","9","40"], 16),
                [2.147483647]);
        });
        it('should turn 1 32-bit float to 4 bytes (pi)', function() {
            assert.deepEqual(
                byteData.floatFrom4Bytes([95,112,9,64]),
                [2.147483647]
            );
        });
        it('should turn 8 bytes to 2 32-bit floats', function() {
            assert.deepEqual(byteData.floatFrom4Bytes(
                [0,0,0,0,0,0,0,0]),
                [0,0]);
        });
        */
        it('should turn 8 bytes to 2 32-bit ints', function() {
            assert.deepEqual(byteData.intFrom4Bytes(
                [0,0,0,0,0,0,0,0]),
                [0,0]);
        });


        it('should turn 8 bytes bin to 2 32-bit ints (max range)', function() {
            assert.deepEqual(byteData.intFrom4Bytes(
                ["00000000","00000000","00000000","10000000",
                "11111111","11111111","11111111","01111111"], 2),
                [-2147483648,2147483647]);
        });
        it('should turn 8 bytes hex to 2 32-bit ints (max range)', function() {
            assert.deepEqual(byteData.intFrom4Bytes(
                ["0","0","0","80", "ff","ff","ff","7f"], 16),
                [-2147483648,2147483647]);
        });
        it('should turn 8 bytes bin to 2 32-bit uInts (max range)', function() {
            assert.deepEqual(byteData.uIntFrom4Bytes(
                ["00000000","00000000","00000000","00000000",
                "11111111","11111111","11111111","11111111"], 2),
                [0,4294967295]);
        });
        it('should turn 8 bytes hex to 2 32-bit uInts (max range)', function() {
            assert.deepEqual(byteData.uIntFrom4Bytes(
                ["0","0","0","00", "ff","ff","ff","ff"], 16),
                [0,4294967295]);
        });

        it('should turn 6 bytes to 2 24-bit ints', function() {
            assert.deepEqual(byteData.intFrom3Bytes(
                [0,0,0,0,0,0]),
                [0,0]);
        });
        it('should turn 6 bytes bin to 2 24-bit ints (max range)', function() {
            assert.deepEqual(byteData.intFrom3Bytes(
                ["00000000","00000000","10000000","11111111","11111111","01111111"], 2),
                [-8388608, 8388607]);
        });
        it('should turn 6 bytes bin to 2 24-bit uInts (max range)', function() {
            assert.deepEqual(byteData.uIntFrom3Bytes(
                ["00000000","00000000","00000000","11111111","11111111","11111111"], 2),
                [0,16777215]);
        });
        it('should turn 6 bytes hex to 2 24-bit ints (max range)', function() {
            assert.deepEqual(byteData.intFrom3Bytes(
                ["0","0","80", "ff","ff","7f"], 16),
                [-8388608, 8388607]);
        });
        it('should turn 6 bytes hex to 2 24-bit uInts (max range)', function() {
            assert.deepEqual(byteData.uIntFrom3Bytes(
                ["0","0","0","ff","ff","ff"], 16),
                [0,16777215]);
        });


        it('should turn 2 bytes to a 16-bit int', function() {
            assert.deepEqual(byteData.intFrom2Bytes(
                [0,0,0,0]),
                [0,0]);
        });

        it('should turn 4 bytes bin to 2 16-bit ints (max range)', function() {
            assert.deepEqual(byteData.intFrom2Bytes(
                ["00000000", "10000000", "11111111", "01111111"], 2),
                [-32768, 32767]);
        });
        it('should turn 4 bytes bin to 2 16-bit uInts (max range)', function() {
            assert.deepEqual(byteData.uIntFrom2Bytes(
                ["00000000","00000000","11111111","11111111"], 2),
                [0, 65535]);
        });
        it('should turn 4 bytes hex to 2 16-bit ints (max range)', function() {
            assert.deepEqual(byteData.intFrom2Bytes(
                ["0","80","ff","7f"], 16),
                [-32768, 32767]);
        });
        it('should turn 4 bytes hex to 2 16-bit uInts (max range)', function() {
            assert.deepEqual(byteData.uIntFrom2Bytes(
                ["0","0","ff","ff"], 16),
                [0, 65535]);
        });

        it('should turn 1 byte to a 8-bit uInt', function() {
            assert.deepEqual(byteData.uIntFrom1Byte(
                [0,0]),
                [0,0]);
        });

        it('should turn 1 hex byte to a 8-bit uInt (max range)', function() {
            assert.deepEqual(byteData.uIntFrom1Byte(
                ["0","ff"], 16),
                [0, 255]);
        });
        it('should turn 1 hex byte to a 8-bit int (max range)', function() {
            assert.deepEqual(byteData.intFrom1Byte(
                ["80","7f"], 16),
                [-128, 127]);
        });
        it('should turn 1 bin byte to a 8-bit uInt (max range)', function() {
            assert.deepEqual(byteData.uIntFrom1Byte(
                ["00000000","11111111"], 2),
                [0, 255]);
        });
        it('should turn 1 bin byte to a 8-bit int (max range)', function() {
            assert.deepEqual(byteData.intFrom1Byte(
                ["10000000","01111111"], 2),
                [-128, 127]);
        });

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


        it('should turn bytes to a string', function() {
            assert.deepEqual(byteData.stringFromBytes(
                [97, 98]),
                "ab");
        });
    });
});
