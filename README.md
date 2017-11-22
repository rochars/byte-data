# byte-data
Readable data to and from byte buffers.  
Copyright (c) 2017 Rafael da Silva Rocha.  
https://github.com/rochars/byte-data

[![Build Status](https://travis-ci.org/rochars/byte-data.svg?branch=master)](https://travis-ci.org/rochars/byte-data) [![Build status](https://ci.appveyor.com/api/projects/status/g2ellp44s7a0kvid?svg=true)](https://ci.appveyor.com/project/rochars/byte-data) [![codecov](https://codecov.io/gh/rochars/byte-data/branch/master/graph/badge.svg)](https://codecov.io/gh/rochars/byte-data) [![NPM version](https://img.shields.io/npm/v/byte-data.svg?style=flat)](https://www.npmjs.com/package/byte-data) [![NPM downloads](https://img.shields.io/npm/dm/byte-data.svg?style=flat)](https://www.npmjs.com/package/byte-data) [![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

## Install
```
npm install byte-data
```

For Node.js and the browser.

Arguments can be **Array**, **Uint8Array** and **Buffer** objects.

Bytes can be represented as **base 10 integers** or as **hex** and **binary** strings when reading and writing.

### Support:
- booleans
- crumbs (2-bit, signed/unsigned)
- nibbles (4-bit, signed/unsigned)
- 8-bit int (signed/unsigned)
- 16-bit int (signed/unsigned)
- 16-bit half precision float
- 24-bit int (signed/unsigned)
- 32-bit int (signed/unsigned)
- 32-bit single precision float
- 40-bit ints (signed/unsigned)
- 48-bit int (signed/unsigned)
- 64-bit double precision float
- Strings

## Example
```javascript
toBytes([-2147483648, 2147483647], 32);
// returns [0,0,0,128,255,255,255,127]

fromBytes([0,0,0,128,255,255,255,127], 32, {"signed": true});
// returns [-2147483648, 2147483647]
```

## Use

```javascript
let byteData = require('byte-data');

/**
 * Turn numbers and strings to bytes.
 * @param {!Array<number>|string} values The values.
 * @param {number} bitDepth The desired bitDepth for the data.
 * @param {Object} params The params. defaults to:
 *   - "float", defaults to false, true for floats.
 *       "float" is available for 16, 32 and 64 bit depths.
 *   - "base", defaults to 10, can be 2, 10 or 16
 *   - "char", defaults to false, true for strings
 *   - "be", defaults to false, true for big endian
 * @return {!Array<number>} the bytes.
 */
bytes = toBytes(numbers, bitDepth)

/**
 * Turn a array of bytes into an array of what the bytes should represent.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} bitDepth The bitDepth. 1, 2, 4, 8, 16, 24, 32, 40, 48, 64.
 * @param {Object} params The options. They are:
 *   - "signed", defaults to false
 *   - "float", defaults to false, true for floats.
 *       float is available for 16, 32 and 64 bit depths.
 *   - "base", defaults to 10, can be 2, 10 or 16
 *   - "char", defaults to false, true for strings
 *   - "be", defaults to false, true for big endian
 * @return {!Array<number>|string} The values represented in the bytes.
 */
values = fromBytes(bytes, bitDepth)

// look for some string and return the start offset
// of its first occurrence in the buffer, -1 if not found
index = byteData.findString(bytes, "chunk");
```

### Pack your nibbles

Packing nibbles:
```javascript
byteData.packNibbles([15, 15, 1, 4, 1, 15]);
//[255, 20, 31]);
```
This will pack 2 nibbles into one byte.

Unpacking nibbles:
```javascript
byteData.unpackNibbles([255, 20, 31]);
//[15, 15, 1, 4, 1, 15]
```

### Pack your crumbs

Packing crumbs:
```javascript
byteData.packCrumbs([3,3,3,3,1,2,3,0,1,1,0,0]);
//[255, 108, 80]);
```
This will pack 4 crumbs into one byte.

Unpacking crumbs:
```javascript
byteData.unpackCrumbs([108]);
//[1, 2, 3, 0]
```

### Pack your booleans

Packing booleans:
```javascript
byteData.packBooleans([0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0]);
//[0,76]);
```
This will pack 8 booleans into one byte.

Unpacking booleans:
```javascript
byteData.unpackBooleans([77]);
//[0,1,0,0,1,1,0,1]
```

## LICENSE
Copyright (c) 2017 Rafael da Silva Rocha.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
