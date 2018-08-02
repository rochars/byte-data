/*
 * Copyright (c) 2018 Rafael da Silva Rocha.
 * Copyright (c) 2013 DeNA Co., Ltd.
 * Copyright (c) 2010, Linden Research, Inc
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
 * @fileoverview Functions to pack and unpack IEEE 754 floating point numbers.
 * @see https://github.com/rochars/ieee754-buffer
 */

/** @module ieee754Buffer */

/**
 * Pack a IEEE 754 floating point number.
 * Derived from typedarray.js by Linden Research, MIT License.
 * @see https://bitbucket.org/lindenlab/llsd/raw/7d2646cd3f9b4c806e73aebc4b32bd81e4047fdc/js/typedarray.js
 * @param {!Uint8Array|!Array<number>} buffer The buffer.
 * @param {number} index The index to write on the buffer.
 * @param {number} num The number.
 * @param {number} ebits The number of bits of the exponent.
 * @param {number} fbits The number of bits of the fraction.
 * @return {number} The next index to write on the buffer.
 */
export function pack(buffer, index, num, ebits, fbits) {
  /** @type {number} */
  let bias = (1 << (ebits - 1)) - 1;
  // Round overflows
  if (Math.abs(num) > Math.pow(2, bias + 1) - ((ebits + fbits) * 2)) {
    num = num < 0 ? -Infinity : Infinity;
  }
  /**
   * sign, need this to handle negative zero
   * @see http://cwestblog.com/2014/02/25/javascript-testing-for-negative-zero/
   * @type {number}
   */
  let sign = (((num = +num) || 1 / num) < 0) ? 1 : num < 0 ? 1 : 0;
  num = Math.abs(num);
  /** @type {number} */
  let exp = Math.min(Math.floor(Math.log(num) / Math.LN2), 1023);
  /** @type {number} */
  let fraction = roundToEven(num / Math.pow(2, exp) * Math.pow(2, fbits));
  // NaN
  if (num !== num) {
    fraction = Math.pow(2, fbits - 1);
    exp = (1 << ebits) - 1;
  // Number
  } else if (num !== 0) {
    if (num >= Math.pow(2, 1 - bias)) {
      if (fraction / Math.pow(2, fbits) >= 2) {
        exp = exp + 1;
        fraction = 1;
      }
      // Overflow
      if (exp > bias) {
        exp = (1 << ebits) - 1;
        fraction = 0;
      } else {
        exp = exp + bias;
        fraction = roundToEven(fraction) - Math.pow(2, fbits);
      }
    } else {
      fraction = roundToEven(num / Math.pow(2, 1 - bias - fbits));
      exp = 0;
    } 
  }
  return packFloatBits_(buffer, index, ebits, fbits, sign, exp, fraction);
}

/**
 * Unpack a IEEE 754 floating point number.
 * Derived from IEEE754 by DeNA Co., Ltd., MIT License. 
 * Adapted to handle NaN. Should port the solution to the original repo.
 * @see https://github.com/kazuho/ieee754.js/blob/master/ieee754.js
 * @param {!Uint8Array|!Array<number>} buffer The buffer.
 * @param {number} index The index to read from the buffer.
 * @param {number} ebits The number of bits of the exponent.
 * @param {number} fbits The number of bits of the fraction.
 * @return {number} The floating point number.
 */
export function unpack(buffer, index, ebits, fbits) {
  let exponentBias = (1 << (ebits - 1)) - 1;
  let numBytes = Math.ceil((ebits + fbits) / 8);
  /** @type {number} */
  let eMax = (1 << ebits) - 1;
  /** @type {number} */
  let bias = Math.pow(2, -(8 * numBytes - 1 - ebits));
  /** @type {number} */
  let significand;
  /** @type {string} */
  let leftBits = "";
  for (let i = numBytes - 1; i >= 0 ; i--) {
    /** @type {string} */
    let t = buffer[i + index].toString(2);
    leftBits += "00000000".substring(t.length) + t;
  }
  /** @type {number} */
  let sign = leftBits.charAt(0) == "1" ? -1 : 1;
  leftBits = leftBits.substring(1);
  /** @type {number} */
  let exponent = parseInt(leftBits.substring(0, ebits), 2);
  leftBits = leftBits.substring(ebits);
  if (exponent == eMax) {
    if (parseInt(leftBits, 2) !== 0) {
      return NaN;
    }
    return sign * Infinity;  
  } else if (exponent === 0) {
    exponent += 1;
    significand = parseInt(leftBits, 2);
  } else {
    significand = parseInt("1" + leftBits, 2);
  }
  return sign * significand * bias * Math.pow(2, exponent - exponentBias);
}

/**
 * Pack a IEEE754 from its sign, exponent and fraction bits
 * and place it in a byte buffer.
 * @param {!Uint8Array|!Array<number>} buffer The byte buffer to write to.
 * @param {number} index The buffer index to write.
 * @param {number} ebits The number of bits of the exponent.
 * @param {number} fbits The number of bits of the fraction.
 * @param {number} sign The sign.
 * @param {number} exp the exponent.
 * @param {number} fraction The fraction.
 * @return {number}
 * @private
 */
function packFloatBits_(buffer, index, ebits, fbits, sign, exp, fraction) {
  /** @type {!Array<number>} */
  let bits = [];
  // the sign
  bits.push(sign);
  // the exponent
  for (let i = ebits; i > 0; i -= 1) {
    bits[i] = (exp % 2 ? 1 : 0);
    exp = Math.floor(exp / 2);
  }
  // the fraction
  let len = bits.length;
  for (let i = fbits; i > 0; i -= 1) {
    bits[len + i] = (fraction % 2 ? 1 : 0);
    fraction = Math.floor(fraction / 2);
  }
  // pack as bytes
  /** @type {string} */
  let str = bits.join('');
  /** @type {number} */
  let numBytes = Math.floor((ebits + fbits + 1) / 8) + index - 1;
  /** @type {number} */
  let k = index;
  while (numBytes >= index) {
    buffer[numBytes] = parseInt(str.substring(0, 8), 2);
    str = str.substring(8);
    numBytes--;
    k++;
  }
  return k;
}

function roundToEven(n) {
  var w = Math.floor(n), f = n - w;
  if (f < 0.5) {
    return w;
  }
  if (f > 0.5) {
    return w + 1;
  }
  return w % 2 ? w + 1 : w;
}
