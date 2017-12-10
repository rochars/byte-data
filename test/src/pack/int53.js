
let assert = require('assert');
let byteData = require('../../../index.js');
let int53 = new byteData.Type({"bits": 53, "signed": true});
let int24 = new byteData.Type({"bits": 24, "signed": true});

describe('53-bit signed integers to bytes', function() { 
    
    it('pack int53 0', function() {
        assert.deepEqual(
            byteData.packArray([0], int53),
            [0,0,0,0,0,0,0]);
    });
    it('pack int53 min', function() {
        assert.deepEqual(
            byteData.packArray([-4503599627370496], int53, 16),
            ["00", "00", "00", "00", "00", "00", "10"]); 
    });
    it('pack int53 min', function() {
        assert.deepEqual(
            byteData.packArray([-1], int53, 2),
            ["11111111", "11111111", "11111111", "11111111",
            "11111111", "11111111", "00011111"]); 
    });
    it('pack int53 min', function() {
        assert.deepEqual(
            byteData.packArray([-1], int53, 16),
            ["ff", "ff", "ff", "ff",
            "ff", "ff", "1f"]); 
    });

    it('pack int53 min', function() {
        assert.deepEqual(
            byteData.packArray([-1], int24, 16),
            ["ff", "ff", "ff"]); 
    });
});
