
var assert = require('assert');

describe('booleans from bytes', function() {
    
    let byteData = require('../../index.js');

    // booleans
    it('should turn 1 boolean bin to 1 number (1)', function() {
        assert.deepEqual(byteData.fromBoolean(['1'], 2),
            [1]);
    });
    it('should turn 1 boolean hex to 1 number (1)', function() {
        assert.deepEqual(byteData.fromBoolean([1], 16),
            [1]);
    });
    it('should turn 1 value to 1 booolean decimal (1)', function() {
        assert.deepEqual(byteData.fromBoolean([1]),
            [1]);
    });
    it('should turn 1 value to 1 booolean bin (0)', function() {
        assert.deepEqual(byteData.fromBoolean(['0'], 2),
            [0]);
    });
    it('should turn 1 value to 1 booolean hex (0)', function() {
        assert.deepEqual(byteData.fromBoolean(['0'], 16),
            [0]);
    });
    it('should turn 1 value to 1 booolean decimal (0)', function() {
        assert.deepEqual(byteData.fromBoolean([0]),
            [0]);
    });

});
