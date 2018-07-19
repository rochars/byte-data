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

    // UTF-8 unpack errors
    // @see https://stackoverflow.com/a/3886015
    it('replaces invalid 2 byte UTF-8 char (2nd byte)', function() {
        assert.equal(byteData.unpackString([0xa0,0xa1]), '\uFFFD\uFFFD');
    });
    // 3 bytes
    it('replaces invalid 3 byte UTF-8 char (2rd byte)', function() {
        //testFunc = function() {
        //    console.log(byteData.unpackString([0xe2,0x28,0xa1]));
        //};
        assert.equal(byteData.unpackString([0xe2,0x28,0xa1]), '\uFFFD');
    });
    it('replaces invalid 3 byte UTF-8 char (2rd byte)', function() {
        //testFunc = function() {
        //    console.log(byteData.unpackString([0xe2,0x28,0xa1]));
        //};
        assert.equal(byteData.unpackString(
            [97,0xe2,0x28,0xa1,98]), 'a\uFFFDb');
    });
    it('replaces invalid 3 byte UTF-8 char (3rd byte)', function() {
        //testFunc = function() {
        //    console.log(byteData.unpackString([0xe2,0x82,0x28]));
        //};
        assert.equal(byteData.unpackString([0xe2,0x82,0x28]), '\uFFFD');
    });
    it('replaces invalid 3 byte UTF-8 char (3rd byte)', function() {
        //testFunc = function() {
        //    console.log(byteData.unpackString([0xe2,0xE0,0x28]));
        //};
        assert.equal(byteData.unpackString([0xe2,0xE0,0x28]), '\uFFFD');
    });
    it('replaces invalid 3 byte UTF-8 char (3rd byte)', function() {
        //testFunc = function() {
        //    console.log(byteData.unpackString([0xe2,0xED,0x28]));
        //};
        assert.equal(byteData.unpackString([0xe2,0xED,0x28]), '\uFFFD');
    });
    // 4 bytes
    it('replaces invalid 4 byte UTF-8 char (2th byte)', function() {
        //testFunc = function() {
        //    console.log(byteData.unpackString([0xf0,0x28,0x8c,0xbc]));
        //};
        assert.equal(byteData.unpackString([0xf0,0x28,0x8c,0xbc]), '\uFFFD');
    });
    it('replaces invalid 4 byte UTF-8 char (3th byte)', function() {
        //testFunc = function() {
        //    console.log(byteData.unpackString([0xf0,0x90,0x28,0xbc]));
        //};
        assert.equal(byteData.unpackString([0xf0,0x90,0x28,0xbc]), '\uFFFD');
    });
    it('replaces invalid 4 byte UTF-8 char (4th byte)', function() {
        //testFunc = function() {
        //    console.log(byteData.unpackString([0xf0,0x28,0x8c,0x28]));
        //};
        assert.equal(byteData.unpackString(
            [97,0xf0,0x28,0x8c,0x28,240,175,167,159,240,175,167,159]),
        'a\uFFFD輸輸');
    });
    it('replaces invalid 4 byte UTF-8 char (4th byte)', function() {
        //testFunc = function() {
        //    console.log(byteData.unpackString([0xf0,0xF4,0x8c,0x28]));
        //};
        assert.equal(byteData.unpackString([0xf0,0xF4,0x8c,0x28]), '\uFFFD');
    });
    it('replaces invalid 4 byte UTF-8 char (4th byte)', function() {
        //testFunc = function() {
        //    console.log(byteData.unpackString([0xf0,0xF0,0x8c,0x28]));
        //};
        assert.equal(byteData.unpackString([0xf0,0xF0,0x8c,0x28]), '\uFFFD');
    });

    // undefined
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

    // Bad buffer length on unpack
    it("Bad buffer length on unpack", function () {
        testFunc = function() {
            byteData.unpack([1], {"bits": 16});
        };
        assert.throws(testFunc, /Bad buffer length./);
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
