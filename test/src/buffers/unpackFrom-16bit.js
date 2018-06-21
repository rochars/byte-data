/**
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('unpackFrom: LE', function() {
    
    // Create a typed array
    let file = new Uint8Array([255, 255, 253, 2]);

    // First position in the array to write
    let index = 0;

    // Unpack to the typed array passing an index to read
    let value = byteData.unpackFrom(file, byteData.types.uInt16, index);

    // pack
    it('Unpack the first value', function() {
        assert.equal(value, 65535);
    });

});

describe('unpackFrom: LE (read to the middle of array)', function() {
    
    // Create a typed array
    let file = new Uint8Array([255, 255, 253, 2]);

    // First position in the array to write
    let index = 2;

    // Unpack to the typed array passing an index to read
    let value = byteData.unpackFrom(file, byteData.types.uInt16, index);

    // pack
    it('Unpack the second value', function() {
        assert.equal(value, 765);
    });
});

describe('unpackFrom: BE', function() {
    
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

describe('unpackFrom: BE (read to the middle of array)', function() {
    
    // Create a typed array
    let file = new Uint8Array([255, 255, 2, 253]);

    // First position in the array to write
    let index = 2;

    // Unpack to the typed array passing an index to read
    let value = byteData.unpackFrom(file, byteData.types.uInt16BE, index);

    // unpack
    it('Unpack the first value', function() {
        assert.equal(value, 765);
    });
    it('Original buffer should be untouched', function() {
        assert.deepEqual(file, new Uint8Array([255, 255, 2, 253]));
    });
});
