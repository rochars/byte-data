/*
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview Test errors.
 * @see https://github.com/rochars/byte-data
 */

var byteData = byteData || require('../../test/loader.js');
var testFunc;
var assert = assert || require('assert');

describe('Errors', function() {
    it('thows error if packing something other than Number, Boolean or null', function() {
        testFunc = function() {
            byteData.pack({some: 'thing'}, byteData.types.uInt16);
        };
        assert.throws(testFunc, Error);
    });
    it("undefined value", function () {
        testFunc = function() {
            byteData.pack(undefined, {"bits": 8});
        };
        assert.throws(testFunc, /Undefined value./);
    });

    // overflow and underflow
    it("8-bit overflow", function () {
        testFunc = function() {
            byteData.pack(256, {"bits": 8});
        };
        assert.throws(testFunc, /Overflow./);
    });
    it("8-bit underflow", function () {
        testFunc = function() {
            byteData.pack(-1, {"bits": 8});
        };
        assert.throws(testFunc, /Underflow./);
    });
    
    // Invalid types
    it("More than 64 bits", function () {
        testFunc = function() {
            byteData.pack(2);
        };
        assert.throws(testFunc, /Undefined type./);
    });
    it("More than 64 bits", function () {
        testFunc = function() {
            byteData.pack(2, {"bits": 65});
        };
        assert.throws(testFunc, /Bad type definition./);
    });
    it("Less than 1 bit (0)", function () {
        testFunc = function() {
            byteData.pack(2, {"bits": 0});
        };
        assert.throws(testFunc, /Bad type definition./);
    });
    it("Less than 1 bit (-1)", function () {
        testFunc = function() {
            byteData.pack(2, {"bits": -1});
        };
        assert.throws(testFunc, /Bad type definition./);
    });
    it("17 float (-1)", function () {
        testFunc = function() {
            byteData.pack(2, {"bits": 17, "float": true});
        };
        assert.throws(testFunc, /Bad float type./);
    });
});
