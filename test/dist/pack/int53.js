
let assert = require('assert');
let byteData = require('../../../test/loader.js');
let int53 = {"bits": 53, "signed": true};
let int24 = {"bits": 24, "signed": true};

describe('53-bit signed integers to bytes', function() { 
    
    it('pack int53 0', function() {
        assert.deepEqual(
            byteData.packArray([0], int53),
            [0,0,0,0,0,0,0]);
    });
    it('pack int53 min', function() {
        assert.deepEqual(
            byteData.packArray([-4503599627370496], int53, 16),
            [0, 0, 0, 0, 0, 0, 16]); 
    });
    it('pack int53 min', function() {
        assert.deepEqual(
            byteData.packArray([-1], int53, 2),
            [255, 255, 255, 255,
            255, 255, 31]); 
    });
    it('pack int53 min', function() {
        assert.deepEqual(
            byteData.packArray([-1], int53, 16),
            [255, 255, 255, 255,
            255, 255, 31]); 
    });

    it('pack int53 min', function() {
        assert.deepEqual(
            byteData.packArray([-1], int24, 16),
            [255, 255, 255]); 
    });
});
