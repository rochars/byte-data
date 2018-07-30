/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
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

import TwosComplementBuffer from 'twos-complement-buffer';
import UintBuffer from 'uint-buffer';

/**
 * A class to write and read two's complement ints and unsigned ints
 * to and from byte buffers.
 */
export default class IntBuffer {
  
  /**
   * @param {number} bits The number of bits used by the integer.
   **/
  constructor(theType) {
    /** @type {TwosComplementBuffer|UintBuffer} */
    this.parser = null;
    if (theType.signed) {
      this.parser = new TwosComplementBuffer(theType.bits);
    } else {
      this.parser = new UintBuffer(theType.bits);
    }
  }

  /**
   * Write one unsigned integer to a byte buffer.
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
   * Read one unsigned integer from a byte buffer.
   * @param {!Uint8Array|!Array<number>} buffer An array of bytes.
   * @param {number=} index The index to read.
   * @return {number} The number.
   * @throws {Error} On overflow.
   */
  unpack(buffer, index=0) {
    return this.parser.unpack(buffer, index);
  }
}
