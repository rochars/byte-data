/**
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

var chai = chai || require("chai");
var byteData = byteData || require('../../test/loader.js');
let testFunc;
let typeError = "Bad type definition.";
let floatTypeError = "Bad float type.";

describe('Errors', function() {
    it("invalid ASCII code", function () {
        testFunc = function() {
            byteData.packString('ƒ');
        };
        chai.expect(testFunc).to.throw("Bad ASCII code.");
    });

    it("undefined value", function () {
        testFunc = function() {
            byteData.pack(undefined, {"bits": 8});
        };
        chai.expect(testFunc).to.throw("Undefined value.");
    });

    // overflow and underflow
    it("8-bit overflow", function () {
        testFunc = function() {
            byteData.pack(256, {"bits": 8});
        };
        chai.expect(testFunc).to.throw("Overflow.");
    });
    it("8-bit underflow", function () {
        testFunc = function() {
            byteData.pack(-1, {"bits": 8});
        };
        chai.expect(testFunc).to.throw("Underflow.");
    });
    
    // Invalid types
    it("More than 64 bits", function () {
        testFunc = function() {
            byteData.pack(2);
        };
        chai.expect(testFunc).to.throw("Undefined type.");
    });
    it("More than 64 bits", function () {
        testFunc = function() {
            byteData.pack(2, {"bits": 65});
        };
        chai.expect(testFunc).to.throw(typeError);
    });
    it("Less than 1 bit (0)", function () {
        testFunc = function() {
            byteData.pack(2, {"bits": 0});
        };
        chai.expect(testFunc).to.throw(typeError);
    });
    it("Less than 1 bit (-1)", function () {
        testFunc = function() {
            byteData.pack(2, {"bits": -1});
        };
        chai.expect(testFunc).to.throw(typeError);
    });
    it("17 float (-1)", function () {
        testFunc = function() {
            byteData.pack(2, {"bits": 17, "float": true});
        };
        chai.expect(testFunc).to.throw(floatTypeError);
    });
});
