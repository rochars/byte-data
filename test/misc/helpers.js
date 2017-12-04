/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let helpers = require('../../src/helpers.js');

describe('helpers', function() {
    
    // bin
    it('should pad 7 bits to a byte', function() {
        assert.deepEqual(helpers.bytePadding('1111101', 2), '01111101');
    });
    it('should pad 6 bits to a byte', function() {
        assert.deepEqual(helpers.bytePadding('111101', 2), '00111101');
    });
    it('should pad 1 bit to a byte', function() {
        assert.deepEqual(helpers.bytePadding('1', 2), '00000001');
    });
    it('should pad 0 bit to a byte', function() {
        assert.deepEqual(helpers.bytePadding('0', 2), '00000000');
    });

    // hex
    it('should pad 1 hex digit to a byte', function() {
        assert.deepEqual(helpers.bytePadding('f', 16), '0f');
    });
    it('should pad 6 bits to a byte', function() {
        assert.deepEqual(helpers.bytePadding('0', 16), '00');
    });
});
