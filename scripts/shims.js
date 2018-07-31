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
 * @fileoverview Make the byte-data API compatible with old browsers.
 * @see https://github.com/rochars/byte-data
 */

/**
 * Write a string of UTF-8 characters as a byte buffer.
 * The original function creates a Uint8Array; this one uses a
 * a Uint8Array if available. If not, a regular array is used.
 * @param {string} str The string to pack.
 * @return {!Uint8Array|Array<number>} The buffer with the string written.
 */
function packString(str) {
  var buffer;
  if (typeof Uint8Array === 'function') {
    buffer =  new Uint8Array(utf8BufferSize(str));
  } else {
    buffer = [];
  }
  pack(str, buffer, 0);
  return buffer;
}
