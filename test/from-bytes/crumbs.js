
var assert = require('assert');

describe('crumbs from bytes', function() {   
    let byteData = require('../../index.js');

    // 2-bit
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.uIntFromCrumb([0]),
            [0]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.uIntFromCrumb([1]),
            [1]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.uIntFromCrumb([2]),
            [2]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.uIntFromCrumb([3]),
            [3]);
    });

    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.uIntFromCrumb(['00'], 2),
            [0]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.uIntFromCrumb(['01'], 2),
            [1]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.uIntFromCrumb(['10'], 2),
            [2]);
    });
    it('should turn 1 2-bit unsigned int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.uIntFromCrumb(['11'], 2),
            [3]);
    });

    it('should turn 1 2-bit signed int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.intFromCrumb(['10'], 2),
            [-2]);
    });
    it('should turn 1 2-bit signed int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.intFromCrumb(['11'], 2),
            [-1]);
    });
    it('should turn 1 2-bit signed int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.uIntFromCrumb(['00'], 2),
            [0]);
    });
    it('should turn 1 2-bit signed int to 2 crumb (0s)', function() {
        assert.deepEqual(byteData.uIntFromCrumb(['01'], 2),
            [1]);
    });

    it('should turn 1 2-bit signed int to 2 bytes (-2)', function() {
        assert.deepEqual(byteData.intFromCrumb([2]),
            [-2]);
    });
    it('should turn 1 2-bit signed int to 1 crumb (-1)', function() {
        assert.deepEqual(byteData.intFromCrumb([3]),
            [-1]);
    });
    it('should turn 1 2-bit signed int to 1 crumb hex (-1)', function() {
        assert.deepEqual(byteData.intFromCrumb(['03'], 16),
            [-1]);
    });
    it('should turn 1 2-bit unsigned int to 1 crumb hex (2)', function() {
        assert.deepEqual(byteData.uIntFromCrumb(['02'], 16),
            [2]);
    });
    it('should turn 1 2-bit unsigned int to 1 crumb bin (1)', function() {
        assert.deepEqual(byteData.uIntFromCrumb(['01'], 2),
            [1]);
    });
});
