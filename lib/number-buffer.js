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
 * @fileoverview Sserialize and deserialize integers and floats.
 * @see https://github.com/rochars/byte-data
 */

import { IEEE754Buffer } from 'ieee754-buffer';
import { TwosComplementBuffer } from 'twos-complement-buffer';
import { UintBuffer } from 'uint-buffer';

/**
 * A class to pack and unpack integers and floating-point numbers.
 * Signed integers are two's complement.
 * Floating-point numbers are IEEE 754 standard.
 */
export default class NumberBuffer {
  
  /**
   * Read one number from a byte buffer.
   * @param {number} bits The number of bits of the number.
   * @param {boolean} fp Tue for floating-point numbers.
   * @param {boolean} signed True for signed numbers.
   * @throws {Error} If the type definition is not valid.
   */
  constructor(bits, fp, signed) {
    /** @type {!Object} */
    this.parser = this.getParser_(bits, fp, signed);
    /** @type {number} */
    this.offset = Math.ceil(bits / 8);
  }
  
  /**
   * Read one number from a byte buffer.
   * @param {!Uint8Array|!Array<number>} buffer An array of bytes.
   * @param {number=} index The index to read.
   * @return {number} The number.
   * @throws {Error} On overflow.
   */
  unpack(buffer, index=0) {
    return this.parser.unpack(buffer, index);
  }

  /**
   * Write one number to a byte buffer.
   * @param {!Uint8Array|!Array<number>} buffer An array of bytes.
   * @param {number} num The number.
   * @param {number=} index The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @throws {Error} If num is NaN.
   * @throws {Error} On overflow.
   */
  pack(buffer, num, index=0) {
    return this.parser.pack(buffer, num, index);
  }

  /**
   * Return a parser for int, uint or fp numbers.
   * @param {number} bits The number of bits.
   * @return {!Object}
   * @throws {Error} If the type definition is not valid.
   * @private
   */
  getParser_(bits, fp, signed) {
    if (fp) {
      validateFloatType(bits);
      return this.getFPParser_(bits);
    }
    validateIntType(bits);
    return signed ? new TwosComplementBuffer(bits) : new UintBuffer(bits);
  }

  /**
   * Return a instance a parser for fp numbers.
   * @param {number} bits The number of bits.
   * @return {!Object}
   * @private
   */
  getFPParser_(bits) {
    if (bits === 16) {
      return new IEEE754Buffer(5, 11);
    } else if(bits === 32) {
      return new IEEE754Buffer(8, 23);
    }
    return new IEEE754Buffer(11, 52);
  }
}

/**
 * @type {string} The type definition error message.
 * @private
 */
const TYPE_ERR = 'Unsupported type';

/**
 * Validate the type definition of floating-point numbers.
 * @param {number} bits The number of bits.
 * @throws {Error} If the type definition is not valid.
 * @private
 */
function validateFloatType(bits) {
  if (!bits || bits !== 16 && bits !== 32 && bits !== 64) {
    throw new Error(TYPE_ERR + ': float, bits: ' + bits);
  }
}

/**
 * Validate the type definition of integers.
 * @param {number} bits The number of bits.
 * @throws {Error} If the type definition is not valid.
 * @private
 */
function validateIntType(bits) {
  if (!bits || bits < 1 || bits > 53) {
    throw new Error(TYPE_ERR + ': int, bits: ' + bits);
  }
}
