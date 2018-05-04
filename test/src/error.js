/**
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let expect = require("chai").expect;
let byteData = require('../../test/loader.js');
let testFunc;
let typeError = "Not a supported type.";

describe('Word size errors', function() {
    
    it("More than 64 bits", function () {
        testFunc = function() {
            byteData.pack(2, {"bits": 65});
        };
        expect(testFunc).to.throw(typeError);
    });
    it("Less than 1 bit (0)", function () {
        testFunc = function() {
            byteData.pack(2, {"bits": 0});
        };
        expect(testFunc).to.throw(typeError);
    });
    it("Less than 1 bit (-1)", function () {
        testFunc = function() {
            byteData.pack(2, {"bits": -1});
        };
        expect(testFunc).to.throw(typeError);
    });
});
