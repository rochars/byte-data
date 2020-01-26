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
 * @fileoverview Encode and decode int numbers to and from byte buffers.
 * @see https://github.com/rochars/byte-data
 */

/**
 * A class to write and read integer numbers to and from byte buffers.
 */
export class IntParser {
  
  /**
   * @param {number} bits The number of bits used by the integer.
   */
  constructor(bits, signed, clamp) {
    /**
     * The number of bits used by one number.
     * @type {number}
     */
    this.bits = bits;
    /**
     * The number of bytes used by one number.
     * @type {number}
     */
    this.bytes = bits < 8 ? 1 : Math.ceil(bits / 8);
    /**
     * @type {number}
     * @protected
     */
    this.max = Math.pow(2, bits) - 1;
    /**
     * @type {number}
     * @protected
     */
    this.min = 0;
    /** @type {number} */
    let r = 8 - ((((bits - 1) | 7) + 1) - bits);
    /**
     * @type {number}
     * @private
     */
    this.lastByteMask_ = Math.pow(2, r > 0 ? r : 8) - 1;
    /**
     * @type {Function}
     * @protected
     */
    this.unpack = this.unpackUnsigned_;
    if (signed) {
      this.max = Math.pow(2, bits) / 2 - 1;
      this.min = -this.max - 1;
      this.unpack = this.unpackSigned_;
    }
    if (clamp) {
      this.overflow_ = this.overflowClamp_;
    }
  }

  /**
   * Write one unsigned integer to a byte buffer.
   * @param {!Uint8Array|!Array<number>} buffer An array of bytes.
   * @param {number} num The number. Overflows are truncated.
   * @param {number=} index The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   */
  pack(buffer, num, index=0) {
    if (num !== num || num.constructor != Number) {
      throw new TypeError();
    }
    num = this.overflow_(num);
    buffer[index] = (num < 0 ? num + Math.pow(2, this.bits) : num) & 255;
    index++;
    for (let i = 2, len = this.bytes; i < len; i++) {
      buffer[index] = Math.floor(num / Math.pow(2, ((i - 1) * 8))) & 255;
      index++;
    }
    if (this.bits > 8) {
      buffer[index] = Math.floor(
        num / Math.pow(2, ((this.bytes - 1) * 8))) & this.lastByteMask_;
      index++;
    }
    return index;
  }

  /**
   * Read one unsigned integer from a byte buffer.
   * Does not check for overflows.
   * @param {!Uint8Array|!Array<number>} buffer An array of bytes.
   * @param {number=} index The index to read.
   * @return {number}
   */
  unpack_(buffer, index=0) {
    /** @type {number} */
    let num = 0;
    for(let x = 0; x < this.bytes; x++) {
      num += buffer[index + x] * Math.pow(256, x);
    }
    return num;
  }

  unpackUnsigned_(buffer, index=0) {
    return this.overflow_(this.unpack_(buffer, index));
  }

  /**
   * Read one two's complement signed integer from a byte buffer.
   * @param {!Uint8Array|!Array<number>} buffer An array of bytes.
   * @param {number=} index The index to read.
   * @return {number}
   */
  unpackSigned_(buffer, index=0) {
    return this.overflow_(this.sign_(this.unpack_(buffer, index)));
  }

  /**
   * Truncate values in case of overflow.
   * @param {number} num The number.
   * @private
   */
  overflow_(num) {
    if (num > this.max || num < this.min) {
      throw new RangeError();
    }
    return num;
  }

  /**
   * Truncate values in case of overflow.
   * @param {number} num The number.
   * @private
   */
  overflowClamp_(num) {
    if (num > this.max) {
      return this.max;
    } else if (num < this.min) {
      return this.min;
    }
    return num;
  }

  /**
   * Sign a number.
   * @param {number} num The number.
   * @return {number}
   * @private
   */
  sign_(num) {
    if (num > this.max) {
      num -= (this.max * 2) + 2;
    }
    return num;
  }
}