
var assert = require('assert');

describe('booleans to bytes', function() {
    
    let byteData = require('../../index.js');

    // booleans
    it('should turn 1 value to 1 booolean bin (6)', function() {
        assert.deepEqual(byteData.toBytes([6], 1, {"base": 2}),
            ['1']);
    });
    it('should turn 1 value to 1 booolean hex (6)', function() {
        assert.deepEqual(byteData.toBytes([6], 1, {"base": 16}),
            ['1']);
    });
    it('should turn 1 value to 1 booolean decimal (6)', function() {
        assert.deepEqual(byteData.toBytes([6], 1, {"base": 10}),
            [1]);
    });
    it('should turn 1 value to 1 booolean bin (0)', function() {
        assert.deepEqual(byteData.toBytes([0], 1, {"base": 2}),
            ['0']);
    });
    it('should turn 1 value to 1 booolean hex (0)', function() {
        assert.deepEqual(byteData.toBytes([0], 1, {"base": 16}),
            ['0']);
    });
    it('should turn 1 value to 1 booolean decimal (0)', function() {
        assert.deepEqual(byteData.toBytes([0], 1, {"base": 10}),
            [0]);
    });
});
