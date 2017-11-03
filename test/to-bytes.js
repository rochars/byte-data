
var assert = require('assert');

describe('to-bytes', function() {
    
    let byteData = require('../index.js');

    // 64-bit / 8 bytes
    it('should turn 2 64-bit floats to 16 bytes (-1, 1)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([1,-1]),
            [0,0,0,0,0,0,240,63,0,0,0,0,0,0,240,191]);
    });
    it('should turn 1 64-bit floats to 16 bytes hex (-1)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([-1], 16),
            ['0','0','0','0','0','0','f0','bf']);
    });
    it('should turn 1 64-bit floats to 16 bytes hex (-0.5)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([-0.5], 16),
            ['0','0','0','0','0','0','e0','bf']);
    });

    it('should turn 2 64-bit floats to 16 bytes (0s)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([0, 0]),
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    });
    it('should turn 3 64-bit floats to 16 bytes (0 0 1)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([0, 0, 1]),
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63]);
    });
    it('should turn 3 64-bit floats to 16 bytes (0 1 0)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([0, 1, 0]),
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,240,63,0,0,0,0,0,0,0,0]);
    });
    it('should turn 1 64-bit floats to 8 bytes (0.5)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([0.5]),
            [0,0,0,0,0,0,224,63]);
    });
    it('should turn 1 64-bit float to 8 bytes (-0.5)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([-0.5]),
            [0,0,0,0,0,0,224,191]);
    });
    //
    it('should turn 1 64-bit float to 8 bytes (pi)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([3.141592653589793]),
            [24,45,68,84,251,33,9,64]);
    });
    it('should turn 1 64-bit float to 8 bytes (pi)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([9]),
            [0,0,0,0,0,0,34,64]);
    });
    it('should turn 1 64-bit float to 8 bytes (14)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([31.41592653589793]),
            [94,56,85,41,122,106,63,64]);
    });
    it('should turn 1 64-bit float to 8 bytes (1)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([314159265358979.3]),
            [53,72,162,118,158,219,241,66]);
    });
    it('should turn 1 64-bit float to 8 bytes (hex) (0)', function() {
        assert.deepEqual(byteData.floatTo8Bytes([0], 16),
            ["0","0","0","0","0","0","0","0"]);

    // 48 bit
    });
    it('should turn 1 signed 48-bit int to 6 bytes (hex) (max range)', function() {
        assert.deepEqual(byteData.intTo6Bytes([-140737488355328], 16),
            ["0","0","0","0","0","80"]);
    });
    it('should turn 1 signed 48-bit int to 6 bytes (hex) (max range)', function() {
        // struct.pack('<q', 120637438355317) 'u\xe7\xa8\x17\xb8m\x00\x00'
        assert.deepEqual(byteData.intTo6Bytes([120637438355317], 16),
            ["75", "e7", "a8", "17", "b8", "6d"]); 
    });
    it('should turn 1 signed 48-bit int to 6 bytes (hex) (max range)', function() {
        assert.deepEqual(byteData.intTo6Bytes([140737488355327], 10),
            [255,255,255,255,255,127]); 
    });
    it('should turn 1 unsigned 48-bit int to 6 bytes (max range)', function() {
        assert.deepEqual(byteData.intTo6Bytes([281474976710655], 10),
            [255,255,255,255,255,255]);
    });

    // 40 bit
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (max range)', function() {
        assert.deepEqual(byteData.intTo5Bytes([549755813887], 16),
            ["ff","ff","ff","ff","7f"]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (949752813887)', function() {
        assert.deepEqual(byteData.intTo5Bytes([949752813887], 16),
            ["3f", "d9", "ad", "21", "dd"]);
    });  
    it('should turn 1 signed 40-bit int to 5 bytes (hex) (max range)', function() {
        assert.deepEqual(byteData.intTo5Bytes([-549755813888], 16),
            ["0","0","0","0","80"]);
    });
    it('should turn 1 unsigned 40-bit int to 5 bytes (hex) (max range)', function() {
        assert.deepEqual(byteData.intTo5Bytes([1099511627775], 16),
            ["ff","ff","ff","ff","ff"]);
    });
    it('should turn 1 unsigned 40-bit int to 5 bytes (max range)', function() {
        assert.deepEqual(byteData.intTo5Bytes([1099511627775], 10),
            [255,255,255,255,255]);
    });

    // 32-bit / 4 bytes
    it('should turn 2 signed 32-bit floats to 8 bytes (0s)', function() {
        assert.deepEqual(byteData.floatTo4Bytes([0, 0]), 
            [0,0,0,0,0,0,0,0]);
    });
    it('should turn 1 signed 32-bit float to 4 bytes (pi)', function() {
        assert.deepEqual(byteData.floatTo4Bytes([2.147483647]), 
            [95,112,9,64]);
    });
    it('should turn 1 signed 32-bit float to 4 bytes', function() {
        assert.deepEqual(byteData.floatTo4Bytes([2.147483647], 16), 
            ["5f","70","9","40"]);
    });
    it('should turn 1 signed 32-bit float to 4 bytes (1)', function() {
        assert.deepEqual(byteData.floatTo4Bytes([214748364.7]), 
            [205,204,76,77]);
    });

    it('should turn 2 signed 32-bit int to 8 bytes (max range)', function() {
        assert.deepEqual(byteData.intTo4Bytes([-2147483648, 2147483647]),
            [0,0,0,128,255,255,255,127]);
    });
    it('should turn 2 unsigned 32-bit ints to 8 bytes (0s)', function() {
        assert.deepEqual(byteData.intTo4Bytes([0, 0]), 
            [0,0,0,0,0,0,0,0]);
    });
    it('should turn 2 unsigned 32-bit int to 8 bytes (max range)', function() {
        assert.deepEqual(byteData.intTo4Bytes([0, 4294967295]),
            [0,0,0,0,255,255,255,255]);
    });

    it('should turn 1 signed 32-bit int to 4 bytes bin (min range)', function() {
        assert.deepEqual(byteData.intTo4Bytes([-2147483648], 2),
            ["00000000", "00000000","00000000","10000000",]);
    });
    it('should turn 1 signed 32-bit int to 4 bytes bin (max range)', function() {
        assert.deepEqual(byteData.intTo4Bytes([2147483647], 2),
            ["11111111","11111111","11111111","01111111"]);
    });

    it('should turn 1 signed 32-bit int to 4 bytes bin (max range)', function() {
        assert.deepEqual(byteData.intTo4Bytes([-2147483648], 16),
            ["0","0","0","80"]);
    });
    it('should turn 1 unsigned 32-bit int to 4 bytes hex (max range)', function() {
        assert.deepEqual(byteData.intTo4Bytes([4294967295], 16),
            ["ff","ff","ff","ff"]);
    });

    // 24-bit / 3 bytes 
    // signed
    it('should turn 2 signed 24-bit ints to 6 bytes (max range)', function() {
        assert.deepEqual(byteData.intTo3Bytes(
            [-8388608, 8388607]),
            [0,0,128,255,255,127]
        );
    });
    it('should turn 1 signed 24-bit int to 3 bytes hex (16777215)', function() {
        assert.deepEqual(byteData.intTo3Bytes(
            [16777215], 16),
            ["ff","ff","ff"]
        );
    });
    it('should turn 2 signed 24-bit ints to 6 bytes (0s)', function() {
        assert.deepEqual(byteData.intTo3Bytes(
            [0, 0]),
            [0, 0, 0, 0, 0, 0]
        );
    });
    it('should turn 2 unsigned 24-bit ints to 6 bytes (max range)', function() {
        assert.deepEqual(byteData.intTo3Bytes(
            [0, 16777215]),
            [0,0,0,255,255,255]
        );
    });
    it('should turn 2 unsigned 24-bit ints to 6 bytes (0s)', function() {
        assert.deepEqual(byteData.intTo3Bytes(
            [0, 0]),
            [0, 0, 0, 0, 0, 0]
        );
    });

    // 16-bit / 2 bytes
    // signed
    it('should turn 2 signed 16-bit ints to 4 bytes (0s)', function() {
        assert.deepEqual(byteData.intTo2Bytes([0, 0]),
            [0, 0, 0, 0]);
    });
    it('should turn 1 signed 16-bit int to 2 bytes (0)', function() {
        assert.deepEqual(byteData.intTo2Bytes([0]),
            [0, 0]);
    });
    it('should turn 2 signed 16-bit ints to 4 bytes (max range)', function() {
        assert.deepEqual(byteData.intTo2Bytes([-32768, 32767]),
            [0, 128, 255, 127]
        );
    });
    it('should turn 1 16-bit signed int to 1 byte hex (-1)', function() {
        console.log(byteData.intTo2Bytes([-1], 16));
        assert.deepEqual(byteData.intTo2Bytes([-1], 16),
            ['ff', 'ff']);
    });

    // unsigned
    it('should turn 2 unsigned 16-bit ints to 4 bytes (0s)', function() {
        assert.deepEqual(byteData.intTo2Bytes([0, 0]),
            [0, 0, 0, 0]);
    });
    it('should turn 1 unsigned 16-bit int to 2 bytes (0)', function() {
        assert.deepEqual(byteData.intTo2Bytes([0]),
            [0, 0]);
    });
    it('should turn 2 unsigned 16-bit ints to 4 bytes (max range)', function() {
        assert.deepEqual(byteData.intTo2Bytes([0, 65535]),
            [0, 0, 255, 255]
        );
    });
    it('should turn 1 unsigned 16-bit int to 2 bytes (0)', function() {
        assert.deepEqual(byteData.intTo2Bytes([765], 16),
            ["fd", "2"]);
    });

    // 8-bit / 1 byte unsigned
    it('should turn 2 8-bit unsigned int to 2 bytes (0s)', function() {
        assert.deepEqual(byteData.intTo1Byte([0, 0]),
            [0, 0]);
    });
    it('should turn 2 8-bit unsigned int to 2 bytes (min, max)', function() {
        assert.deepEqual(byteData.intTo1Byte([0, 255]),
            [0, 255]);
    });
    it('should turn 1 8-bit unsigned int to 1 byte', function() {
        assert.deepEqual(byteData.intTo1Byte([1]),
            [1]);
    });

    // 8-bit / 1 byte signed
    it('should turn 2 8-bit signed int to 2 bytes (0s)', function() {
        assert.deepEqual(byteData.intTo1Byte([0, 0]),
            [0, 0]);
    });
    it('should turn 2 8-bit signed int to 2 bytes (-128, 127)', function() {
        assert.deepEqual(byteData.intTo1Byte([-128, 127]),
            [128, 127]);
    });
    it('should turn 1 8-bit signed int to 1 byte (-1)', function() {
        assert.deepEqual(byteData.intTo1Byte([-1]),
            [255]);
    });
    it('should turn 1 8-bit signed int to 1 byte (-1, 5)', function() {
        assert.deepEqual(byteData.intTo1Byte([-1, 5]),
            [255, 5]);
    });
    it('should turn 1 8-bit signed int to 1 byte hex (-1)', function() {
        assert.deepEqual(byteData.intTo1Byte([-1], 16),
            ['ff']);
    });
    it('should turn 1 8-bit signed int to 1 byte hex (-1)', function() {
        assert.deepEqual(byteData.intTo1Byte([127], 16),
            ['7f']);
    });
    it('should turn 1 8-bit signed int to 1 byte hex (-1)', function() {
        assert.deepEqual(byteData.intTo1Byte([-128], 16),
            ['80']);
    });

    // 4-bit / half byte byte signed
    it('should turn 2 4-bit signed int to 2 nibbles (0s)', function() {
        assert.deepEqual(byteData.intToNibble([0, 0]),
            [0, 0]);
    });
    it('should turn 2 4-bit signed int to 2 bytes (-8, 7)', function() {
        assert.deepEqual(byteData.intToNibble([-8, 7]),
            [8, 7]);
    });
    it('should turn 1 4-bit signed int to 1 nibble (-1)', function() {
        assert.deepEqual(byteData.intToNibble([-1]),
            [15]);
    });
    it('should turn 1 4-bit signed int to 1 nibble (-1, 5)', function() {
        assert.deepEqual(byteData.intToNibble([-1, 5]),
            [15, 5]);
    });
    it('should turn 1 4-bit signed int to 1 nibble hex (-1)', function() {
        assert.deepEqual(byteData.intToNibble([-1], 16),
            ['f']);
    });
    it('should turn 1 4-bit signed int to 1 nibble hex (-8)', function() {
        assert.deepEqual(byteData.intToNibble([-8], 16),
            ['8']);
    });
    it('should turn 1 4-bit signed int to 1 nibble hex (7)', function() {
        assert.deepEqual(byteData.intToNibble([7], 16),
            ['7']);
    });
    it('should turn 1 4-bit signed int to 1 nibble bin (6)', function() {
        assert.deepEqual(byteData.intToNibble([6], 2),
            ['0110']);
    });

    // booleans
    it('should turn 1 value to 1 booolean bin (6)', function() {
        assert.deepEqual(byteData.toBoolean([6], 2),
            ['1']);
    });
    it('should turn 1 value to 1 booolean hex (6)', function() {
        assert.deepEqual(byteData.toBoolean([6], 16),
            ['1']);
    });
    it('should turn 1 value to 1 booolean decimal (6)', function() {
        assert.deepEqual(byteData.toBoolean([6]),
            [1]);
    });
    it('should turn 1 value to 1 booolean bin (0)', function() {
        assert.deepEqual(byteData.toBoolean([0], 2),
            ['0']);
    });
    it('should turn 1 value to 1 booolean hex (0)', function() {
        assert.deepEqual(byteData.toBoolean([0], 16),
            ['0']);
    });
    it('should turn 1 value to 1 booolean decimal (0)', function() {
        assert.deepEqual(byteData.toBoolean([0]),
            [0]);
    });


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
