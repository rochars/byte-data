
var assert = require('assert');

describe('crumbs from bytes', function() {   
    let byteData = require('../../index.js');

    // 2-bit
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.fromBytes([0], 2, {"base": 10}),
            [0]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.fromBytes([1], 2, {"base": 10}),
            [1]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.fromBytes([2], 2, {"base": 10}),
            [2]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.fromBytes([3], 2, {"base": 10}),
            [3]);
    });

    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.fromBytes(['00'], 2, {"base": 2}),
            [0]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.fromBytes(['01'], 2, {"base": 2}),
            [1]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.fromBytes(['10'], 2, {"base": 2}),
            [2]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.fromBytes(['11'], 2, {"base": 2}),
            [3]);
    });

    it('should turn 1 2-bit signed int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.fromBytes(['10'], 2, {"base": 2, "signed": true}),
            [-2]);
    });
    it('should turn 1 2-bit signed int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.fromBytes(['11'], 2, {"base": 2, "signed": true}),
            [-1]);
    });
    it('should turn 1 2-bit signed int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.fromBytes(['00'], 2, {"base": 2, "signed": false}),
            [0]);
    });
    it('should turn 1 2-bit signed int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.fromBytes(['01'], 2, {"base": 2, "signed": false}),
            [1]);
    });

    it('should turn 1 2-bit signed int to 2 bytes (-2)', function() {
        assert.deepEqual(byteData.fromBytes([2], 2, {"base": 10, "signed": true}),
            [-2]);
    });
    it('should turn 1 2-bit signed int to 1 crumb (-1)', function() {
        assert.deepEqual(byteData.fromBytes([3], 2, {"base": 10, "signed": true}),
            [-1]);
    });
    it('should turn 1 2-bit signed int to 1 crumb hex (-1)', function() {
        assert.deepEqual(byteData.fromBytes(['03'], 2, {"base": 16, "signed": true}),
            [-1]);
    });
    it('should turn 1 2-bit unsigned int to 1 crumb hex (2)', function() {
        assert.deepEqual(byteData.fromBytes(['02'], 2, {"base": 16, "signed": false}),
            [2]);
    });
    it('should turn 1 2-bit unsigned int to 1 crumb bin (1)', function() {
        assert.deepEqual(byteData.fromBytes(['01'], 2, {"base": 2, "signed": false}),
            [1]);
    });
});
