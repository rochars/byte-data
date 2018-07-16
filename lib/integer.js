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

  /**
   * @param {number} bits Number of bits used by the data.
   * @param {boolean} signed True for signed types.
   * @throws {Error} if the number of bits is smaller than 1 or greater than 64.
   */
  constructor(bits, signed) {
    /**
     * The max number of bits used by the data.
     * @type {number}
     * @private
     */
    this.bits_ = bits;
    /**
     * The number of bytes used by the data.
     * @type {number}
     * @private
     */
    this.offset_ = 0;
    /**
     * The practical number of bits used by the data.
     * @type {number}
     * @private
     */
    this.realBits_ = this.bits_;
    /**
     * The mask to be used in the last byte.
     * @type {number}
     * @private
     */
    this.lastByteMask_ = 255;
    /** @type {number} */
    let max = Math.pow(2, this.bits_);
    if (signed) {
      this.max_ = max / 2 -1;
      this.min_ = -max / 2;
    } else {
      this.max_ = max - 1;
      this.min_ = 0;
    }
    this.build_();
  }

  /**
   * Read one integer number from a byte buffer.
   * @param {!Uint8Array} bytes An array of bytes.
   * @param {number=} i The index to read.
   * @return {number}
   */
  read(bytes, i=0) {
    /** @type {number} */
    let num = 0;
    /** @type {number} */
    let x = this.offset_ - 1;
    for (; x > 0; x--) {
      num = (bytes[x + i] << x * 8) | num;
    }
    num = (bytes[i] | num) >>> 0;
    return this.overflow_(this.sign_(num));
  }

  /**
   * Write one integer number to a byte buffer.
   * @param {!Array<number>} bytes An array of bytes.
   * @param {number} num The number.
   * @param {number=} j The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   */
  write(bytes, num, j=0) {
    bytes[j] = this.overflow_(num) & 255;
    j++;
    for (let i = 2; i <= this.offset_; i++, j++) {
      bytes[j] = Math.floor(num / Math.pow(2, ((i - 1) * 8))) & 255;
    }
    return j;
  }

  /**
   * Write one integer number to a byte buffer.
   * @param {!Array<number>} bytes An array of bytes.
   * @param {number} num The number.
   * @param {number=} j The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @private
   */
  writeEsoteric_(bytes, num, j=0) {
    j = this.writeFirstByte_(bytes, this.overflow_(num), j);
    for (let i = 2; i < this.offset_; i++, j++) {
      bytes[j] = Math.floor(num / Math.pow(2, ((i - 1) * 8))) & 255;
    }
    if (this.bits_ > 8) {
      bytes[j] = Math.floor(
          num / Math.pow(2, ((this.offset_ - 1) * 8))) & this.lastByteMask_;
      j++;
    }
    return j;
  }

  /**
   * Read a integer number from a byte buffer by turning int bytes
   * to a string of bits. Used for data with more than 32 bits.
   * @param {!Uint8Array} bytes An array of bytes.
   * @param {number=} i The index to read.
   * @return {number}
   * @private
   */
  readBits_(bytes, i=0) {
    /** @type {string} */
    let binary = '';
    for (let j = 0; j < this.offset_; j++) {
      /** @type {string} */
      let bits = bytes[i + j].toString(2);
      binary = new Array(9 - bits.length).join('0') + bits + binary;
    }
    return this.overflow_(this.sign_(parseInt(binary, 2)));
  }

  /**
   * Build the type.
   * @throws {Error} if the number of bits is smaller than 1 or greater than 64.
   * @private
   */
  build_() {
    this.setRealBits_();
    this.setLastByteMask_();
    this.offset_ = this.bits_ < 8 ? 1 : Math.ceil(this.realBits_ / 8);
    if ((this.realBits_ != this.bits_) || this.bits_ < 8 || this.bits_ > 32) {
      this.write = this.writeEsoteric_;
      this.read = this.readBits_;
    }
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
   * Trows error in case of underflow or overflow.
   * @param {number} num The number.
   * @return {number}
   * @throws {Error} on overflow or underflow.
   * @private
   */
  overflow_(num) {
    if (num > this.max_) {
      throw new Error('Overflow.');
    } else if (num < this.min_) {
      throw new Error('Underflow.');
    }
    return num;
  }

  /**
   * Set the practical bit number for data with bit count different
   * from the standard types (8, 16, 32, 40, 48, 64).
   * @private
   */
  setRealBits_() {
    this.realBits_ = ((this.bits_ - 1) | 7) + 1;
  }

  /**
   * Set the mask that should be used when writing the last byte.
   * @private
   */
  setLastByteMask_() {
    /** @type {number} */
    let r = 8 - (this.realBits_ - this.bits_);
    this.lastByteMask_ = Math.pow(2, r > 0 ? r : 8) - 1;
  }

  /**
   * Write the first byte of a integer number.
   * @param {!Array<number>} bytes An array of bytes.
   * @param {number} number The number.
   * @param {number} j The index being written in the byte buffer.
   * @return {number} The next index to write on the byte buffer.
   * @private
   */
  writeFirstByte_(bytes, number, j) {
    if (this.bits_ < 8) {
      bytes[j] = number < 0 ? number + Math.pow(2, this.bits_) : number;
    } else {
      bytes[j] = number & 255;
    }
    return j + 1;
  }
}
