/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('booleans to bytes', function() {
    
    // booleans
    it('should turn 1 value to 1 booolean bin (6)', function() {
        assert.deepEqual(
            byteData.packArray([6], byteData.bool, 2),
            ['00000001']);
    });
    it('should turn 1 value to 1 booolean hex (6)', function() {
        assert.deepEqual(
            byteData.packArray([6], byteData.bool, 16),
            ['01']);
    });
    it('should turn 1 value to 1 booolean decimal (6)', function() {
        assert.deepEqual(
            byteData.packArray([6], byteData.bool),
            [1]);
    });
    it('should turn 1 value to 1 booolean bin (0)', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.bool, 2),
            ['00000000']);
    });
    it('should turn 1 value to 1 booolean hex (0)', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.bool, 16),
            ['00']);
    });
    it('should turn 1 value to 1 booolean decimal (0)', function() {
        assert.deepEqual(
            byteData.packArray([0], byteData.bool),
            [0]);
    });
});
