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
 * @fileoverview Methods to pack and unpack binary data.
 */

/**
 * @type {!Function}
 * @private
 */
import {endianness} from 'endianness';
/**
 * @constructor
 * @private
 */
import {default as Integer} from './integer';
/**
 * @type {!Int8Array}
 * @private
 */
const int8_ = new Int8Array(8);
/**
 * @type {!Uint32Array}
 * @private
 */
const ui32_ = new Uint32Array(int8_.buffer);
/**
 * @type {!Float32Array}
 * @private
 */
const f32_ = new Float32Array(int8_.buffer);
/**
 * @type {!Float64Array}
 * @private
 */
const f64_ = new Float64Array(int8_.buffer);
/**
 * @type {Function}
 * @private
 */
let reader_;
/**
 * @type {Function}
 * @private
 */
let writer_;
/**
 * @type {Object}
 * @private
 */
let gInt_ = {};

/**
 * Turn a byte buffer into what the bytes represent.
 * @param {!Array<number|string>|!Uint8Array} buffer An array of bytes.
 * @param {!Object} theType The type definition.
 * @return {!Array<number>}
 * @private
 */
export function fromBytes(buffer, theType) {
    if (theType['be']) {
        endianness(buffer, theType['offset']);
    }
    let len = buffer.length;
    let values = [];
    len = len - (theType['offset'] - 1);
    for (let i=0; i<len; i+=theType['offset']) {
        values.push(reader_(buffer, i));
    }
    return values;
}

/**
 * Turn numbers and strings to bytes.
 * @param {!Array<number|string>} values The data.
 * @param {!Object} theType The type definition.
 * @return {!Array<number|string>} the data as a byte buffer.
 * @private
 */
export function toBytes(values, theType) {
    let j = 0;
    let bytes = [];
    let len = values.length;
    let validate = validateNotNull;
    if (theType['char']) {
        validate = validateString;
    }
    for(let i=0; i < len; i++) {
        validate(values[i], theType);
        j = writer_(bytes, values[i], j);
    }
    if (theType['be']) {
        endianness(bytes, theType['offset']);
    }
    return bytes;
}

/**
 * Read int values from bytes.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 * @private
 */
function readInt_(bytes, i) {
    return gInt_.read(bytes, i);
}

/**
 * Read 1 16-bit float from bytes.
 * Thanks https://stackoverflow.com/a/8796597
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 * @private
 */
function read16F_(bytes, i) {
    let int = gInt_.read(bytes, i);
    let exponent = (int & 0x7C00) >> 10;
    let fraction = int & 0x03FF;
    let floatValue;
    if (exponent) {
        floatValue =  Math.pow(2, exponent - 15) * (1 + fraction / 0x400);
    } else {
        floatValue = 6.103515625e-5 * (fraction / 0x400);
    }
    return floatValue * (int >> 15 ? -1 : 1);
}

/**
 * Read 1 32-bit float from bytes.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 * @private
 */
function read32F_(bytes, i) {
    ui32_[0] = gInt_.read(bytes, i);
    return f32_[0];
}

/**
 * Read 1 64-bit float from bytes.
 * Thanks https://gist.github.com/kg/2192799
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 * @private
 */
function read64F_(bytes, i) {
    ui32_[0] = gInt_.read(bytes, i);
    ui32_[1] = gInt_.read(bytes, i + 4);
    return f64_[0];
}

/**
 * Read 1 char from bytes.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {string}
 * @private
 */
function readChar_(bytes, i) {
    let chrs = '';
    for(let j=0; j < gInt_.offset; j++) {
        chrs += String.fromCharCode(bytes[i+j]);
    }
    return chrs;
}

/**
 * Write a integer value to a byte buffer.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} number The number to write as bytes.
 * @param {number} j The index being written in the byte buffer.
 * @return {!number} The next index to write on the byte buffer.
 * @private
 */
function writeInt_(bytes, number, j) {
    return gInt_.write(bytes, number, j);
}

/**
 * Write one 16-bit float as a binary value.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} number The number to write as bytes.
 * @param {number} j The index being written in the byte buffer.
 * @return {number} The next index to write on the byte buffer.
 * @private
 */
function write16F_(bytes, number, j) {
    f32_[0] = number;
    let x = ui32_[0];
    let bits = (x >> 16) & 0x8000;
    let m = (x >> 12) & 0x07ff;
    let e = (x >> 23) & 0xff;
    if (e >= 103) {
        bits |= ((e - 112) << 10) | (m >> 1);
        bits += m & 1;
    }
    bytes[j++] = bits & 0xFF;
    bytes[j++] = bits >>> 8 & 0xFF;
    return j;
}

/**
 * Write one 32-bit float as a binary value.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} number The number to write as bytes.
 * @param {number} j The index being written in the byte buffer.
 * @return {number} The next index to write on the byte buffer.
 * @private
 */
function write32F_(bytes, number, j) {
    f32_[0] = number;
    return gInt_.write(bytes, ui32_[0], j);
}

/**
 * Write one 64-bit float as a binary value.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} number The number to write as bytes.
 * @param {number} j The index being written in the byte buffer.
 * @return {number} The next index to write on the byte buffer.
 * @private
 */
function write64F_(bytes, number, j) {
    f64_[0] = number;
    j = gInt_.write(bytes, ui32_[0], j);
    return gInt_.write(bytes, ui32_[1], j);
}

/**
 * Write one char as a byte.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {string} str The string to write as bytes.
 * @param {number} j The index being written in the byte buffer.
 * @return {number} The next index to write on the byte buffer.
 * @private
 */
function writeChar_(bytes, str, j) {
    for (let i=0; i<str.length; i++) {
        bytes[j++] = str.charCodeAt(i);
    }
    return j;
}

/**
 * Set the function to unpack the data.
 * @param {!Object} theType The type definition.
 * @private
 */
function setReader_(theType) {
    if (theType['float']) {
        if (theType['bits'] == 16) {
            reader_ = read16F_;
        } else if(theType['bits'] == 32) {
            reader_ = read32F_;
        } else if(theType['bits'] == 64) {
            reader_ = read64F_;
        }
    } else if (theType['char']) {
        reader_ = readChar_;
    } else {
        reader_ = readInt_;
    }
}

/**
 * Set the function to pack the data.
 * @param {!Object} theType The type definition.
 * @private
 */
function setWriter_(theType) {
    if (theType['float']) {
        if (theType['bits'] == 16) {
            writer_ = write16F_;
        } else if(theType['bits'] == 32) {
            writer_ = write32F_;
        } else if(theType['bits'] == 64) {
            writer_ = write64F_;
        }
    } else if (theType['char']) {
        writer_ = writeChar_;
    } else {
        writer_ = writeInt_;
    }   
}

/**
 * Validate the type and set up the packing/unpacking functions.
 * @param {!Object} theType The type definition.
 * @throws {Error} If the type definition is not valid.
 * @private
 */
export function setUp(theType) {
    validateType_(theType);
    theType['offset'] = theType['bits'] < 8 ? 1 : Math.ceil(theType['bits'] / 8);
    setReader_(theType);
    setWriter_(theType);
    if (!theType['char']) {
        gInt_ = new Integer(
            theType['bits'] == 64 ? 32 : theType['bits'],
            theType['float'] ? false : theType['signed']);
    } else {
        // Workaround; should not use Integer when type['char']
        gInt_.offset = theType['bits'] < 8 ? 1 : Math.ceil(theType['bits'] / 8);
    }
}

/**
 * Validate the type definition.
 * @param {!Object} theType The type definition.
 * @throws {Error} If the type definition is not valid.
 * @private
 */
function validateType_(theType) {
    if (!theType) {
        throw new Error('Undefined type.');
    }
    if (theType['float']) {
        validateFloatType_(theType);
    } else {
        if (theType['char']) {
            validateCharType_(theType);
        } else {
            validateIntType_(theType);
        }
    }
}

/**
 * Validate the type definition of floating point numbers.
 * @param {!Object} theType The type definition.
 * @throws {Error} If the type definition is not valid.
 * @private
 */
function validateFloatType_(theType) {
    if ([16,32,64].indexOf(theType['bits']) == -1) {
        throw new Error('Not a supported float type.');
    }
}

/**
 * Validate the type definition of char and strings.
 * @param {!Object} theType The type definition.
 * @throws {Error} If the type definition is not valid.
 * @private
 */
function validateCharType_(theType) {
    if (theType['bits'] < 8 || theType['bits'] % 2) {
        throw new Error('Wrong offset for type char.');
    }
}

/**
 * Validate the type definition of integers.
 * @param {!Object} theType The type definition.
 * @throws {Error} If the type definition is not valid.
 * @private
 */
function validateIntType_(theType) {
    if (theType['bits'] < 1 || theType['bits'] > 53) {
        throw new Error('Not a supported type.');
    }
}

/**
 * Validate strings with bad length.
 * @param {string|number} value The string to validate.
 * @param {!Object} theType The type definition.
 * @private
 */
function validateString(value, theType) {
    validateNotNull(value);
    if (value.length > theType['offset']) {
        throw new Error('String is bigger than its type definition.');
    } else if (value.length < theType['offset']) {
        throw new Error('String is smaller than its type definition.');
    }
}
/**
 * Validate that the value is not null.
 * @param {string|number} value The value.
 * @private
 */
function validateNotNull(value) {
    if (value === null || value === undefined) {
        throw new Error('Cannot pack null or undefined values.');
    }
}
