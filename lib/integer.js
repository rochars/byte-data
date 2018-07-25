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
 * @fileoverview Pack and unpack two's complement ints and unsigned ints.
 * @see https://github.com/rochars/byte-data
 */

/**
 * A class to pack and unpack two's complement ints and unsigned ints.
 */
export default class Integer {

  constructor() {
    /**
     * @type {number}
     */
    this.offset = 0;
    /**
     * @type {number}
     */
    this.realOffset_ = 0;
    /**
     * @type {number}
     * @private
     */
    this.bits_ = 0;
    /**
     * @type {number}
     * @private
     */
    this.lastByteMask_ = 0;
    /**
     * @type {number}
     * @private
     */
    this.max_ = 0;
    /**
     * @type {number}
     * @private
     */
    this.min_ = 0;
  }

  /**
   * Set up the object to start serializing/deserializing a data type..
   * @param {!Object} theType The type definition.
   */
  setUp(theType) {
    /**
     * The max number of bits used by the data.
     * @type {number}
     * @private
     */
    this.bits_ = theType.bits;
    // Set the min and max values according to the number of bits
    /** @type {number} */
    let max = Math.pow(2, this.bits_);
    if (theType.signed) {
      this.max_ = max / 2 -1;
      this.min_ = -max / 2;
    } else {
      this.max_ = max - 1;
      this.min_ = 0;
    }
    this.setLastByteMask_();
    this.offset = this.bits_ < 8 ? 1 : Math.ceil(this.bits_ / 8);
    this.realOffset_ = this.bits_ === 64 ? 4 : this.offset;
  }

  /**
   * Read one integer number from a byte buffer.
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number=} i The index to read.
   * @return {number}
   */
  read(bytes, i=0) {
    let num = 0;
    for(let x=0; x<this.realOffset_; x++) {
      num += bytes[i + x] * Math.pow(256, x);
    }
    num = this.sign_(num);
    this.overflow_(num);
    return num; 
  }

  /**
   * Write one integer number to a byte buffer.
   * @param {!Uint8Array|!Array<number>} bytes An array of bytes.
   * @param {number} num The number.
   * @param {number=} j The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @private
   */
  write(bytes, num, j=0) {
    this.overflow_(num);
    bytes[j] = (num < 0 ? num + Math.pow(2, this.bits_) : num) & 255;
    j++;
    for (let i = 2, len = this.realOffset_; i < len; i++, j++) {
      bytes[j] = Math.floor(num / Math.pow(2, ((i - 1) * 8))) & 255;
    }
    if (this.bits_ > 8) {
      bytes[j] = Math.floor(
          num / Math.pow(2, ((this.realOffset_ - 1) * 8))) & this.lastByteMask_;
      j++;
    }
    return j;
  }

  /**
   * Sign a number.
   * @param {number} num The number.
   * @return {number}
   * @private
   */
  sign_(num) {
    if (num > this.max_) {
      num -= (this.max_ * 2) + 2;
    }
    return num;
  }

  /**
   * Trows error in case of overflow.
   * @param {number} num The number.
   * @throws {Error} on overflow.
   * @private
   */
  overflow_(num) {
    if (num > this.max_) {
      throw new Error('Overflow.');
    } else if (num < this.min_) {
      throw new Error('Underflow.');
    }
  }

  /**
   * Set the mask that should be used when writing the last byte.
   * @private
   */
  setLastByteMask_() {
    /** @type {number} */
    let r = 8 - ((((this.bits_ - 1) | 7) + 1) - this.bits_);
    this.lastByteMask_ = Math.pow(2, r > 0 ? r : 8) - 1;
  }
}
