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
 * @fileoverview Standard type definitions.
 */

/** @module byteData/types */

/**
 * byte-data standard types.
 * @type {!Object}
 */
export const types = {
	/**
	 * A char.
	 * @type {!Object}
	 * @export
	 */
	chr: {'bits': 8, 'char': true},
	/**
	 * A 4-char string
	 * @type {!Object}
	 * @export
	 */
	fourCC: {'bits': 32, 'char': true},
	/**
	 * Booleans
	 * @type {!Object}
	 * @export
	 */
	bool: {'bits': 1},
	/**
	 * Signed 2-bit integers
	 * @type {!Object}
	 * @export
	 */
	int2: {'bits': 2, 'signed': true},
	/**
	 * Unsigned 2-bit integers
	 * @type {!Object}
	 * @export
	 */
	uInt2: {'bits': 2},
	/**
	 * Signed 4-bit integers
	 * @type {!Object}
	 * @export
	 */
	int4: {'bits': 4, 'signed': true},
	/**
	 * Unsigned 4-bit integers
	 * @type {!Object}
	 * @export
	 */
	uInt4: {'bits': 4},
	/**
	 * Signed 8-bit integers
	 * @type {!Object}
	 * @export
	 */
	int8: {'bits': 8, 'signed': true},
	/**
	 * Unsigned 4-bit integers
	 * @type {!Object}
	 * @export
	 */
	uInt8: {'bits': 8},
	// LE
	/**
	 * Signed 16-bit integers little-endian
	 * @type {!Object}
	 * @export
	 */
	int16 : {'bits': 16, 'signed': true},
	/**
	 * Unsigned 16-bit integers little-endian
	 * @type {!Object}
	 * @export
	 */
	uInt16: {'bits': 16},
	/**
	 * Half-precision floating-point numbers little-endian
	 * @type {!Object}
	 * @export
	 */
	float16: {'bits': 16, 'float': true},
	/**
	 * Signed 24-bit integers little-endian
	 * @type {!Object}
	 * @export
	 */
	int24: {'bits': 24, 'signed': true},
	/**
	 * Unsigned 24-bit integers little-endian
	 * @type {!Object}
	 * @export
	 */
	uInt24: {'bits': 24},
	/**
	 * Signed 32-bit integers little-endian
	 * @type {!Object}
	 * @export
	 */
	int32: {'bits': 32, 'signed': true},
	/**
	 * Unsigned 32-bit integers little-endian
	 * @type {!Object}
	 * @export
	 */
	uInt32: {'bits': 32},
	/**
	 * Single-precision floating-point numbers little-endian
	 * @type {!Object}
	 * @export
	 */
	float32: {'bits': 32, 'float': true},
	/**
	 * Signed 40-bit integers little-endian
	 * @type {!Object}
	 * @export
	 */
	int40: {'bits': 40, 'signed': true},
	/**
	 * Unsigned 40-bit integers little-endian
	 * @type {!Object}
	 * @export
	 */
	uInt40: {'bits': 40},
	/**
	 * Signed 48-bit integers little-endian
	 * @type {!Object}
	 * @export
	 */
	int48: {'bits': 48, 'signed': true},
	/**
	 * Unsigned 48-bit integers little-endian
	 * @type {!Object}
	 * @export
	 */
	uInt48: {'bits': 48},
	/**
	 * Double-precision floating-point numbers little-endian
	 * @type {!Object}
	 * @export
	 */
	float64: {'bits': 64, 'float': true},
	// BE
	/**
	 * Signed 16-bit integers big-endian
	 * @type {!Object}
	 * @export
	 */
	int16BE : {'bits': 16, 'signed': true, 'be': true},
	/**
	 * Unsigned 16-bit integers big-endian
	 * @type {!Object}
	 * @export
	 */
	uInt16BE: {'bits': 16, 'be': true},
	/**
	 * Half-precision floating-point numbers big-endian
	 * @type {!Object}
	 * @export
	 */
	float16BE: {'bits': 16, 'float': true, 'be': true},
	/**
	 * Signed 24-bit integers big-endian
	 * @type {!Object}
	 * @export
	 */
	int24BE: {'bits': 24, 'signed': true, 'be': true},
	/**
	 * Unsigned 24-bit integers big-endian
	 * @type {!Object}
	 * @export
	 */
	uInt24BE: {'bits': 24, 'be': true},
	/**
	 * Signed 32-bit integers big-endian
	 * @type {!Object}
	 * @export
	 */
	int32BE: {'bits': 32, 'signed': true, 'be': true},
	/**
	 * Unsigned 32-bit integers big-endian
	 * @type {!Object}
	 * @export
	 */
	uInt32BE: {'bits': 32, 'be': true},
	/**
	 * Single-precision floating-point numbers big-endian
	 * @type {!Object}
	 * @export
	 */
	float32BE: {'bits': 32, 'float': true, 'be': true},
	/**
	 * Signed 40-bit integers big-endian
	 * @type {!Object}
	 * @export
	 */
	int40BE: {'bits': 40, 'signed': true, 'be': true},
	/**
	 * Unsigned 40-bit integers big-endian
	 * @type {!Object}
	 * @export
	 */
	uInt40BE: {'bits': 40, 'be': true},
	/**
	 * Signed 48-bit integers big-endian
	 * @type {!Object}
	 * @export
	 */
	int48BE: {'bits': 48, 'signed': true, 'be': true},
	/**
	 * Unsigned 48-bit integers big-endian
	 * @type {!Object}
	 * @export
	 */
	uInt48BE: {'bits': 48, 'be': true},
	/**
	 * Double-precision floating-point numbers big-endian
	 * @type {!Object}
	 * @export
	 */
	float64BE: {'bits': 64, 'float': true, 'be': true},
};
