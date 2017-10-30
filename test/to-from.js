
var assert = require('assert');

describe('to-from', function() {
    
    let byteData = require('../index.js');

    describe('#indexOf()', function() {

        // 32-bit / 4 bytes unsigned
        it('should turn 1 32-bit unsigned int to 4 bytes and back (0s)',
                function() {
            let bytes = byteData.intTo4Bytes([0]);
            let num = byteData.uIntFrom4Bytes(bytes);
            assert.deepEqual([0], num);
        });
        it('should turn 1 32-bit unsigned int to 4 bytes and back ' +
                '(4294967295)', function() {
            let bytes = byteData.intTo4Bytes([4294967295]);
            let num = byteData.uIntFrom4Bytes(bytes);
            assert.deepEqual([255,255,255,255], bytes);
            assert.deepEqual([4294967295], num);
        });
        it('should turn 1 32-bit unsigned int to 4 bytes and back (300)',
                function() {
            let bytes = byteData.intTo4Bytes([300]);
            let num = byteData.uIntFrom4Bytes(bytes);
            assert.deepEqual([44,1,0,0], bytes);
            assert.deepEqual([300], num);
        });
        it('should turn 1 32-bit unsigned int to 4 byte and back (1)',
                function() {
            let bytes = byteData.intTo4Bytes([1]);
            let num = byteData.uIntFrom4Bytes(bytes);
            assert.deepEqual([1,0,0,0], bytes);
            assert.deepEqual([1], num);
        });
        // 32-bit / 4 bytes signed
        it('should turn 1 32-bit signed int to 4 bytes and back (0s)',
                function() {
            let bytes = byteData.intTo4Bytes([0]);
            let num = byteData.intFrom4Bytes(bytes);
            assert.deepEqual([0], num);
        });
        it('should turn 2 32-bit signed int to 4 bytes and back ' +
            '(-2147483648, 2147483647)', function() {
            let bytes = byteData.intTo4Bytes([-2147483648, 2147483647]);
            let num = byteData.intFrom4Bytes(bytes);
            assert.deepEqual([0,0,0,128, 255,255,255,127], bytes);
            assert.deepEqual([-2147483648, 2147483647], num);
        });
        it('should turn 1 32-bit signed int to 4 bytes and back (1)',
                function() {
            let bytes = byteData.intTo4Bytes([1]);
            let num = byteData.intFrom4Bytes(bytes);
            assert.deepEqual([1], num);
        });

        // 24-bit / 3 bytes unsigned
        it('should turn 1 24-bit unsigned int to 3 bytes and back (0s)',
                function() {
            let bytes = byteData.intTo3Bytes([0]);
            let num = byteData.uIntFrom3Bytes(bytes);
            assert.deepEqual([0], num);
        });
        it('should turn 1 24-bit unsigned int to 3 bytes and back (16777215)',
                function() {
            let bytes = byteData.intTo3Bytes([16777215]);
            let num = byteData.uIntFrom3Bytes(bytes);
            assert.deepEqual([16777215], num);
        });
        it('should turn 1 24-bit unsigned int to 3 byte and back (1)',
                function() {
            let bytes = byteData.intTo3Bytes([1]);
            let num = byteData.uIntFrom3Bytes(bytes);
            assert.deepEqual([1], num);
        });
        // 24-bit / 3 bytes signed
        it('should turn 1 24-bit signed int to 3 bytes and back (0s)',
                function() {
            let bytes = byteData.intTo3Bytes([0]);
            let num = byteData.intFrom3Bytes(bytes);
            assert.deepEqual([0], num);
        });
        it('should turn 2 24-bit signed int to 3 bytes and back ' +
            '(-8388608, 8388607)', function() {
            let bytes = byteData.intTo3Bytes([-8388608, 8388607]);
            let num = byteData.intFrom3Bytes(bytes);
            assert.deepEqual([-8388608, 8388607], num);
        });
        it('should turn 1 24-bit signed int to 3 byte and back (1)',
                function() {
            let bytes = byteData.intTo3Bytes([1]);
            let num = byteData.intFrom3Bytes(bytes);
            assert.deepEqual([1], num);
        });

        // 16-bit / 2 bytes unsigned
        it('should turn 1 16-bit unsigned int to 2 bytes and back (0s)',
                function() {
            let bytes = byteData.intTo2Bytes([0]);
            let num = byteData.uIntFrom2Bytes(bytes);
            assert.deepEqual([0], num);
        });
        it('should turn 1 16-bit unsigned int to 2 bytes and back (65535)',
                function() {
            let bytes = byteData.intTo2Bytes([65535]);
            let num = byteData.uIntFrom2Bytes(bytes);
            assert.deepEqual([65535], num);
        });
        it('should turn 1 16-bit unsigned int to 2 byte and back (1)',
                function() {
            let bytes = byteData.intTo2Bytes([1]);
            let num = byteData.uIntFrom2Bytes(bytes);
            assert.deepEqual([1], num);
        });
        // 16-bit / 2 bytes signed
        it('should turn 1 16-bit signed int to 2 bytes and back (0s)',
                function() {
            let bytes = byteData.intTo2Bytes([0]);
            let num = byteData.intFrom2Bytes(bytes);
            assert.deepEqual([0], num);
        });
        it('should turn 2 16-bit signed int to 2 bytes and back ' +
            '(-32768, 32767)',
                function() {
            let bytes = byteData.intTo2Bytes([-32768, 32767]);
            let num = byteData.intFrom2Bytes(bytes);
            assert.deepEqual([-32768, 32767], num);
        });
        it('should turn 1 16-bit signed int to 2 byte and back (1)',
                function() {
            let bytes = byteData.intTo2Bytes([1]);
            let num = byteData.intFrom2Bytes(bytes);
            assert.deepEqual([1], num);
        });

        // 8-bit / 1 byte
        it('should turn 1 8-bit unsigned int to 2 bytes and back (0s)',
                function() {
            let bytes = byteData.uIntTo1Byte([0]);
            let num = byteData.uIntFrom1Byte(bytes);
            assert.deepEqual([0], num);
        });
        it('should turn 1 8-bit unsigned int to 2 bytes and back (max)',
                function() {
            let bytes = byteData.uIntTo1Byte([255]);
            let num = byteData.uIntFrom1Byte(bytes);
            assert.deepEqual([255], num);
        });
        it('should turn 1 8-bit unsigned int to 1 byte and back (1)',
                function() {
            let bytes = byteData.uIntTo1Byte([1]);
            let num = byteData.uIntFrom1Byte(bytes);
            assert.deepEqual([1], num);
        });

        // string
        it('should turn a 2 char string to bytes and back', function() {
            let bytes = byteData.stringToBytes("ab");
            let string = byteData.stringFromBytes(bytes);
            assert.deepEqual("ab", string);
        });
    });
});
