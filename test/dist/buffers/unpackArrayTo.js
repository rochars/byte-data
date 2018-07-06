/**
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');

describe('unpackArrayTo: LE', function() {
    
    let file = new Uint8Array([255, 255, 0, 0]);

    it('should unpack the values to the providade typed array', function() {
        let output = new Uint16Array(2);
        byteData.unpackArrayTo(file, byteData.types.uInt16, output);
        assert.deepEqual(output, new Uint16Array([65535, 0]));
    });
    it('should unpack the values to the providade typed array starting on the index', function() {
        let index = 0;
        let output = new Uint16Array(1);
        byteData.unpackArrayTo(file, byteData.types.uInt16, output, 2);
        assert.deepEqual(output, new Uint16Array([0]));
    });
    it('should unpack the values to the providade typed array starting on the index', function() {
        let index = 0;
        let output = new Uint16Array(1);
        byteData.unpackArrayTo(file, byteData.types.uInt16, output, 1);
        assert.deepEqual(output, new Uint16Array([255]));
    });
});

describe('unpackArrayTo: BE', function() {

    let file = new Uint8Array([2, 253, 0, 0]);
    let output = new Uint16Array(2);
    byteData.unpackArrayTo(file, byteData.types.uInt16BE, output);

    it('Unpack the first value', function() {
        assert.deepEqual(output, new Uint16Array([765, 0]));
    });
});