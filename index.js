/**
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

/**
 * @type {!Object}
 * @private
 */
const packer = require("./lib/packer");

/**
 * Write a number a string to a byte buffer.
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
 * Read a number or a string from a byte buffer.
 * @param {!Array<number>|!Uint8Array} buffer An array of bytes.
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
 * Write an array of numbers or strings to a byte buffer.
 * @param {!Array<number|string>} values The values.
 * @param {!Object} theType The type definition.
 * @return {!Array<number>}
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If any of the values is not valid.
 */
function packArray(values, theType) {
    packer.setUp(theType);
    return packer.toBytes(values, theType);
}

/**
 * Read an array of numbers or strings from a byte buffer.
 * @param {!Array<number>|!Uint8Array} buffer The byte array.
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
