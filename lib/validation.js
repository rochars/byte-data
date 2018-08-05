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
 * @fileoverview Functions to validate input.
 * @see https://github.com/rochars/byte-data
 */

const TYPE_ERR = 'Unsupported type';

/**
 * Validate that the value is not null or undefined.
 * @param {*} value The value.y.
 * @throws {Error} If the value is not Number or Boolean.
 * @throws {Error} If the value is NaN, Infinity or -Infinity.
 */
export function validateIsInt(value) {
  validateIsNumber(value);
  if (value !== value || value === Infinity || value === -Infinity) {
    throwValueErr_('integer');
  }
}

/**
 * Validate that the value is not null or undefined.
 * @param {*} value The value.
 * @throws {Error} If the value is not Number or Boolean.
 */
export function validateIsNumber(value) {
  if (value === undefined || value === null) {
    throwValueErr_();
  }
  if (value.constructor != Number && value.constructor != Boolean) {
    throwValueErr_();
  }
}

/**
 * Validate the type definition of floating-point numbers.
 * @param {number} bits The number of bits.
 * @throws {Error} If the type definition is not valid.
 * @private
 */
export function validateFloatType(bits) {
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
export function validateIntType(bits) {
  if (!bits || bits < 1 || bits > 53) {
    throw new Error(TYPE_ERR + ': int, bits: ' + bits);
  }
}

/**
 * Throw a error about the input value.
 * @param {string} theType The name of the type the value was expected to be.
 * @throws {Error} Always when called.
 * @private
 */
function throwValueErr_(theType='valid number') {
  throw new Error('Argument is not a ' + theType);
}
