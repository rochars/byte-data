/*
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
 * @fileoverview Functions to read and write numbers and strings as bytes.
 * @see https://github.com/rochars/byte-data
 */

/** @module byteData */

import endianness from 'endianness';
import {pack as packUTF8, unpack as unpackUTF8} from 'utf8-buffer';
import NumberBuffer from './lib/number-buffer.js';
import {validateIsInt, validateIsNumber} from './lib/validation.js';

/**
 * Read a string of UTF-8 characters from a byte buffer.
 * @param {!Uint8Array|!Array<number>} buffer A byte buffer.
 * @param {number=} index The buffer index to start reading.
 * @param {?number=} end The buffer index to stop reading.
 *   If end is null will read until the end of the buffer.
 * @return {string}
 */
export function unpackString(buffer, index=0, end=null) {
  return unpackUTF8(buffer, index, end);
}

/**
 * Write a string of UTF-8 characters as a byte buffer.
 * @param {string} str The string to pack.
 * @return {!Array<number>} The UTF-8 string bytes.
 */ 
export function packString(str) {
  /** @type {!Array<number>} */
  let buffer = [];
  packUTF8(str, buffer, 0);
  return buffer;
}

/**
 * Write a string of UTF-8 characters to a byte buffer.
 * @param {string} str The string to pack.
 * @param {!Uint8Array|!Array<number>} buffer The output buffer.
 * @param {number=} index The buffer index to start writing.
 *   Assumes zero if undefined.
 * @return {number} The next index to write in the buffer.
 */
export function packStringTo(str, buffer, index=0) {
  return packUTF8(str, buffer, index);
}

// Numbers
/**
 * Pack a number as a byte buffer.
 * @param {number} value The number.
 * @param {!Object} theType The type definition.
 * @return {!Array<number>} The packed value.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If the value is not valid.
 */
export function pack(value, theType) {
  /** @type {!Array<number>} */
  let output = [];
  packTo(value, theType, output);
  return output;
}

/**
 * Pack a number to a byte buffer.
 * @param {number} value The value.
 * @param {!Object} theType The type definition.
 * @param {!Uint8Array|!Array<number>} buffer The output buffer.
 * @param {number=} index The buffer index to write. Assumes 0 if undefined.
 * @return {number} The next index to write.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If the value is not valid.
 */
export function packTo(value, theType, buffer, index=0) {
  return packArrayTo([value], theType, buffer, index);
}

/**
 * Pack an array of numbers as a byte buffer.
 * @param {!Array<number>|!TypedArray} values The values.
 * @param {!Object} theType The type definition.
 * @return {!Array<number>} The packed values.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If any of the values are not valid.
 */
export function packArray(values, theType) {
  /** @type {!Array<number>} */
  let output = [];
  packArrayTo(values, theType, output);
  return output;
}

/**
 * Pack a array of numbers to a byte buffer.
 * @param {!Array<number>|!TypedArray} values The value.
 * @param {!Object} theType The type definition.
 * @param {!Uint8Array|!Array<number>} buffer The output buffer.
 * @param {number=} index The buffer index to start writing.
 *   Assumes zero if undefined.
 * @return {number} The next index to write.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If the value is not valid.
 */
export function packArrayTo(values, theType, buffer, index=0) {
  theType = theType || {};
  /** @type {NumberBuffer} */
  let packer = new NumberBuffer(
    theType.bits, theType.fp, theType.signed);
  /** @type {number} */
  let offset = offset_(theType.bits);
  /** @type {Function} */
  let validateInput = theType.fp ? validateIsNumber : validateIsInt;
  /** @type {number} */
  let i = 0;
  try {
    for (let valuesLen = values.length; i < valuesLen; i++) {
      validateInput(values[i]);
      /** @type {number} */
      let len = index + offset;
      while (index < len) {
        index = packer.pack(buffer, values[i], index);
      }
      swap_(theType.be, buffer, offset, index - offset, index);
    }
  } catch (e) {
    throw new Error(e.message + ' at input index ' + i);
  }
  return index;
}

/**
 * Unpack a number from a byte buffer.
 * @param {!Uint8Array|!Array<number>} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @param {number=} index The buffer index to read. Assumes zero if undefined.
 * @return {number}
 * @throws {Error} If the type definition is not valid
 * @throws {Error} On bad buffer length.
 * @throws {Error} On overflow
 */
export function unpack(buffer, theType, index=0) {
  return unpackArray(
    buffer, theType, index, index + offset_(theType.bits), true)[0];
}

/**
 * Unpack an array of numbers from a byte buffer.
 * @param {!Uint8Array|!Array<number>} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @param {number=} start The buffer index to start reading.
 *   Assumes zero if undefined.
 * @param {number=} end The buffer index to stop reading.
 *   Assumes the buffer length if undefined.
 * @param {boolean=} safe If set to false, extra bytes in the end of
 *   the array are ignored and input buffers with insufficient bytes will
 *   output a empty array. If safe is set to true the function
 *   will throw a 'Bad buffer length' error. Defaults to false.
 * @return {!Array<number>}
 * @throws {Error} If the type definition is not valid
 * @throws {Error} On overflow
 */
export function unpackArray(
    buffer, theType, start=0, end=buffer.length, safe=false) {
  /** @type {!Array<number>} */
  let output = [];
  unpackArrayTo(buffer, theType, output, start, end, safe);
  return output;
}

/**
 * Unpack a array of numbers to a typed array.
 * @param {!Uint8Array|!Array<number>} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @param {!TypedArray|!Array<number>} output The output array.
 * @param {number=} start The buffer index to start reading.
 *   Assumes zero if undefined.
 * @param {number=} end The buffer index to stop reading.
 *   Assumes the buffer length if undefined.
 * @param {boolean=} safe If set to false, extra bytes in the end of
 *   the array are ignored and input buffers with insufficient bytes will
 *   write nothing to the output array. If safe is set to true the function
 *   will throw a 'Bad buffer length' error. Defaults to false.
 * @throws {Error} If the type definition is not valid
 * @throws {Error} On overflow
 */
export function unpackArrayTo(
    buffer, theType, output, start=0, end=buffer.length, safe=false) {
  theType = theType || {};
  /** @type {NumberBuffer} */
  let packer = new NumberBuffer(
    theType.bits, theType.fp, theType.signed);
  /** @type {number} */
  let offset = offset_(theType.bits);
  /** @type {number} */
  let extra = (end - start) % offset;
  if (safe && (extra || buffer.length < offset)) {
    throw new Error('Bad buffer length');
  }
  end -= extra;
  /** @type {number} */
  let i = 0;
  try {
    swap_(theType.be, buffer, offset, start, end);
    for (let j = start; j < end; j += offset, i++) {
      output[i] = packer.unpack(buffer, j);
    }
    swap_(theType.be, buffer, offset, start, end);
  } catch (e) {
    throw new Error(e.message + ' at output index ' + i);
  }
}

/**
 * Swap endianness in a slice of an array when flip == true.
 * @param {boolean} flip True if should swap endianness.
 * @param {!Uint8Array|!Array<number>} buffer The buffer.
 * @param {number} offset The number of bytes each value use.
 * @param {number} start The buffer index to start the swap.
 * @param {number} end The buffer index to end the swap.
 * @throws {Error} On bad buffer length for the swap.
 * @private
 */
function swap_(flip, buffer, offset, start, end) {
  if (flip) {
    endianness(buffer, offset, start, end);
  }
}

/**
 * Get the byte offset of a type based on its number of bits.
 * @param {number} bits The number of bits.
 * @private
 */
function offset_(bits) {
  return bits < 8 ? 1 : Math.ceil(bits / 8);
}
