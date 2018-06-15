/*
 * byte-data: Pack and unpack binary data.
 * https://github.com/rochars/byte-data
 *
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

/**
 * @type {!Object}
 * @private
 */
const packer = require("./lib/packer");

/**
 * Pack a number or a string as a byte buffer.
 * @param {number|string} value The value.
 * @param {!Object} theType The type definition.
 * @return {!Array<number>}
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If the value is not valid.
 */
function pack(value, theType) {
    packer.setUp(theType);
    return packer.toBytes([value], theType);
}

/**
 * Unpack a number or a string from a byte buffer.
 * @param {!Array<number>|!Uint8Array} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @return {number|string}
 * @throws {Error} If the type definition is not valid.
 */
function unpack(buffer, theType) {
    packer.setUp(theType);
    let values = packer.fromBytes(
        buffer.slice(0, theType["offset"]), theType);
    return values ? values[0] : theType["char"] ? "" : null;
}

/**
 * Pack an array of numbers or strings to a byte buffer.
 * @param {!Array<number|string>} values The values.
 * @param {!Object} theType The type definition.
 * @return {!Array<number>}
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If any of the values are not valid.
 */
function packArray(values, theType) {
    packer.setUp(theType);
    return packer.toBytes(values, theType);
}

/**
 * Unpack an array of numbers or strings from a byte buffer.
 * @param {!Array<number>|!Uint8Array} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @return {!Array<number|string>}
 * @throws {Error} If the type definition is not valid.
 */
function unpackArray(buffer, theType) {
    packer.setUp(theType);
    return packer.fromBytes(buffer, theType);
}

/** @export */
module.exports.pack = pack;
/** @export */
module.exports.unpack = unpack;
/** @export */
module.exports.packArray = packArray;
/** @export */
module.exports.unpackArray = unpackArray;
/** @export */
module.exports.types = require("./lib/types");
