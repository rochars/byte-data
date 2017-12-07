/**
 * from-bytes: Numbers and strings from bytes.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

const Type = require("../src/type");
const endianness = require("endianness");

/**
 * Turn a byte buffer into what the bytes represent.
 * @param {!Array<number>|!Array<string>|Uint8Array} buffer An array of bytes.
 * @param {Object} type One of the available types.
 * @return {!Array<number>|number|string}
 */
function fromBytes(buffer, type) {
    makeBigEndian(buffer, type);
    bytesFromBase(buffer, type.base);
    let values = readBytes(
            buffer,
            type
        );
    if (type.single) {
        values = getSingleValue(values, type);
    }
    return values;
}

/**
 * Turn numbers and strings to bytes.
 * @param {!Array<number>|number|string} values The data.
 * @param {Object} type One of the available types.
 * @return {!Array<number>|!Array<string>|Uint8Array} the data as a byte buffer.
 */
function toBytes(values, type) {
    let bytes = writeBytes(values, type);
    makeBigEndian(bytes, type);
    if (type.base != 10) {
        bytesToBase(bytes, type.base);
        formatOutput(bytes, type);
    }
    return bytes;
}

/**
 * Get the full type spec for the reading/writing.
 * @param {Object} atype One of the available types.
 * @param {number} base The base of the input.
 * @param {boolean} single True if its a single value, false for array.
 * @return {Object}
 */
function getType(atype, base, single) {
    let theType = Object.assign(new Type({}), atype);
    theType.base = base;
    theType.single = single;
    return theType;
}

/**
 * Make a single value an array in case it is not.
 * If the value is a string it stays a string.
 * @param {!Array<number>|number|string} values The value or values.
 * @return {!Array<number>|string}
 */
function turnToArray(values) {
    if (!Array.isArray(values) && typeof values != "string") {
        values = [values];
    }
    return values;
}

/**
 * Return the first value from the result value array.
 * @param {!Array<number>|string} values The values.
 * @param {Object} type One of the available types.
 * @return {number|string}
 */
function getSingleValue(values, type) {
    if (type.char) {
        values = values.slice(0, type.bits / 8);
    } else {
        values = values[0];
    }
    return values;
}

/**
 * Turn a array of bytes into an array of what the bytes should represent.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {Object} type The type.
 * @return {!Array<number>|string}
 */
function readBytes(bytes, type) {
    let values = [];
    let i = 0;
    let len = bytes.length - (type.offset - 1);
    while (i < len) {
        values.push(
                type.sign(type.reader(bytes, i, type))
            );
        i += type.offset;
    }
    if (type.char) {
        values = values.join("");
    }
    return values;
}

/**
 * Turn bytes to base 10.
 * @param {!Array<number>|Uint8Array} bytes The bytes as binary or hex strings.
 * @param {number} base The base.
 */
function bytesFromBase(bytes, base) {
    if (base != 10) {
        let i = 0;
        let len = bytes.length;
        while(i < len) {
            bytes[i] = parseInt(bytes[i], base);
            i++;
        }
    }
}

/**
 * Swap the endianness to big endian.
 * @param {!Array<number>|!Array<string>|Uint8Array} bytes The values.
 * @param {Object} type The type.
 */
function makeBigEndian(bytes, type) {
    if (type.be) {
        endianness(bytes, type.offset);
    }
}

/**
 * Turn the output to the correct base.
 * @param {Array} bytes The bytes.
 * @param {Object} type The type.
 */
function formatOutput(bytes, type) {
    if (type.bits > 1) {
        let i = 0;
        let len = bytes.length;
        let offset = getOutputByteOffset(type);
        while(i < len) {
            bytes[i] = Array(offset - bytes[i].length).join("0") + bytes[i];
            i++;
        }
    }
}

/**
 * Get the number of chars a non-string output should have
 * according to the number of bits used by the type.
 * @param {Object} type The type.
 * @return {number}
 */
function getOutputByteOffset(type) {
    let offset = 1;
    if (type.bits > 7) {
        offset = (type.base == 2 ? 8 : 2);
    } else {
        offset = (type.base == 2 ? type.bits : 1);
        offset = (type.base == 2 ? type.bits : 1);
    }
    return offset + 1;
}

/**
 * Turn bytes to base 2, 10 or 16.
 * @param {!Array<string>|!Array<number>|null} bytes The bytes.
 * @param {number} base The base.
 */
function bytesToBase(bytes, base) {
    let i = 0;
    let len = bytes.length;
    while (i < len) {
        bytes[i] = bytes[i].toString(base);
        i++;
    }
}

/**
 * Write values as bytes.
 * @param {!Array<number>|number|string} values The data.
 * @param {Object} type One of the available types.
 * @return {!Array<number>} the bytes.
 */
function writeBytes(values, type) {
    let i = 0;
    let j = 0;
    let len = values.length;
    let bytes = [];
    while (i < len) {
        j = type.writer(bytes, type.overflow(values[i]), j);
        i++;
    }
    return bytes;
}

module.exports.getType = getType;
module.exports.turnToArray = turnToArray;
module.exports.toBytes = toBytes;
module.exports.fromBytes = fromBytes;
