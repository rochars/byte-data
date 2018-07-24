/*
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * Copyright (c) 2013 DeNA Co., Ltd.
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
 * @fileoverview Functions to work with IEEE 754 floating point numbers.
 * @see https://github.com/rochars/byte-data
 * @see https://github.com/kazuho/ieee754.js
 */

/**
 * Unpack a IEEE754 floating point number.
 *
 * Derived from IEEE754 by DeNA Co., Ltd., MIT License.
 * Adapted to handle NaN. Should port the solution to the original repo.
 * @see https://github.com/kazuho/ieee754.js/blob/master/ieee754.js
 * @param {!Uint8Array|!Array<number>} bytes The byte buffer to unpack.
 * @param {number} offset the start index to read.
 * @param {number} numBytes the number of bytes used by the number.
 * @param {number} exponentBits The number of bits of the exponent.
 * @param {number} exponentBias The exponent bias.
 */
export function unpackIEEE754(bytes, offset, numBytes, exponentBits, exponentBias) {
  let eMax = (1 << exponentBits) - 1;
  let bias = Math.pow(2, -(8 * numBytes - 1 - exponentBits));
  let significand;
  let leftBits = "";
  for (let i = numBytes - 1; i >= 0 ; i--) {
    let t = bytes[i + offset].toString(2);
    leftBits += "00000000".substring(t.length) + t;
  }
  let sign = leftBits.charAt(0) == "1" ? -1 : 1;
  leftBits = leftBits.substring(1);
  let exponent = parseInt(leftBits.substring(0, exponentBits), 2);
  leftBits = leftBits.substring(exponentBits);
  if (exponent == eMax) {
    if (parseInt(leftBits, 2) !== 0) {
      return NaN;
    } else {
      return sign * Infinity;  
    }
  } else if (exponent == 0) {
    exponent += 1;
    significand = parseInt(leftBits, 2);
  } else {
    significand = parseInt("1" + leftBits, 2);
  }
  return sign * significand * bias * Math.pow(2, exponent - exponentBias);
}
