/**
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('unpackArrayTo: LE', function() {
    
    // Create a typed array
    let file = new Uint8Array([255, 255, 0, 0]);

    // First position in the array to write
    let index = 0;

    let output = new Uint16Array(2);

    // Unpack to the typed array passing an index to read
    byteData.unpackArrayTo(file, byteData.types.uInt16, output);

    // pack
    it('Unpack the first value', function() {
        assert.deepEqual(output, new Uint16Array([65535, 0]));
    });

});

/*
describe('unpackArrayTo: BE', function() {
    
    // Create a typed array
    let file = new Uint8Array([255, 255, 2, 253]);

    // First position in the array to write
    let index = 0;

    // Unpack to the typed array passing an index to read
    let value = byteData.unpackFrom(file, byteData.types.uInt16BE, index);

    // unpack
    it('Unpack the first value', function() {
        assert.equal(value, 65535);
    });
    it('Original buffer should be untouched', function() {
        assert.deepEqual(file, new Uint8Array([255, 255, 2, 253]));
    });
});
*/