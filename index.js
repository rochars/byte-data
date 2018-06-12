/*
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
 * Write a number or fixed-length string to a byte buffer.
 * @param {number|string} value The value.
 * @param {!Object} theType The type definition.
 * @param {!boolean=} allowOverflow True to truncate values on overflow/underflow.
 * @return {!Array<number|string>}
 * @throws {Error} If the type definition is not valid.
 */
function pack(value, theType, allowOverflow=false) {
    packer.setUp(theType, allowOverflow);
    let packed = [];
    if (value === undefined) {
        return packed;
    }
    return packer.toBytes(
        [packer.fixBadString(value, theType)], theType);
}

/**
 * Read a number or a fixed-length string from a byte buffer.
 * @param {!Array<number|string>|!Uint8Array} buffer An array of bytes.
 * @param {!Object} theType The type definition.
 * @param {!boolean=} allowOverflow True to truncate values on overflow/underflow.
 * @return {number|string|null}
 * @throws {Error} If the type definition is not valid.
 */
function unpack(buffer, theType, allowOverflow=false) {
    packer.setUp(theType, allowOverflow);
    let values = packer.fromBytes(
        buffer.slice(0, theType["offset"]), theType);
    return values ? values[0] : theType["char"] ? "" : null;
}

/**
 * Write an array of numbers or a string to a byte buffer.
 * @param {!Array<number|string>} values The values.
 * @param {!Object} theType The type definition.
 * @param {!boolean=} allowOverflow True to truncate values on overflow/underflow.
 * @return {!Array<number|string>}
 * @throws {Error} If the type definition is not valid.
 */
function packArray(values, theType, allowOverflow=false) {
    packer.setUp(theType, allowOverflow);
    // Fix strings with bad length in the array
    if (theType["char"]) {
        let len = values.length;
        for (let i=0; i<len; i++) {
            values[i] = packer.fixBadString(values[i], theType);
        }
    }
    return packer.toBytes(values, theType);
}

/**
 * Read an array of numbers or a string from a byte buffer.
 * @param {!Array<number|string>|!Uint8Array} buffer The byte array.
 * @param {!Object} theType The type definition.
 * @param {!boolean=} allowOverflow True to truncate values on overflow/underflow.
 * @return {!Array<number|string>|number}
 * @throws {Error} If the type definition is not valid.
 */
function unpackArray(buffer, theType, allowOverflow=false) {
    packer.setUp(theType, allowOverflow);
    return packer.fromBytes(buffer, theType);
}

// Methods
module.exports.pack = pack;
module.exports.unpack = unpack;
module.exports.packArray = packArray;
module.exports.unpackArray = unpackArray;
module.exports.types = require("./lib/types");
