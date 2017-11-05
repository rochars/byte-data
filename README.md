# byte-data
Bytes to and from numbers and strings.  
Copyright (c) 2017 Rafael da Silva Rocha.  
https://github.com/rochars/byte-data

[![Build Status](https://travis-ci.org/rochars/byte-data.svg?branch=master)](https://travis-ci.org/rochars/byte-data) [![Build status](https://ci.appveyor.com/api/projects/status/g2ellp44s7a0kvid?svg=true)](https://ci.appveyor.com/project/rochars/byte-data) [![codecov](https://codecov.io/gh/rochars/byte-data/branch/master/graph/badge.svg)](https://codecov.io/gh/rochars/byte-data) [![NPM version](https://img.shields.io/npm/v/byte-data.svg?style=flat)](https://www.npmjs.com/package/byte-data) [![NPM downloads](https://img.shields.io/npm/dm/byte-data.svg?style=flat)](https://www.npmjs.com/package/byte-data) [![Stability](https://img.shields.io/badge/stability-experimental-red.svg)](https://www.npmjs.com/package/byte-data) 


## Install
```
npm install byte-data
```

For Node.js and the browser.

Bytes are little-endian.

Arguments can be **Array**, **Uint8Array** and **Buffer** objects.

**byte-data** functions always return regular **arrays**.

Bytes can be represented as **numbers** or as **hex** and **binary** strings both in the input and the output. Decimal is assumed by default in both cases.

### Supports:
- booleans
- Signed crumbs
- Unsigned crumbs
- Signed nibbles
- Unsigned nibbles
- Signed 8-bit ints
- Unsigned 8-bit ints
- Signed 16-bit ints
- Unsigned 16-bit ints
- Signed 24-bit ints
- Unsigned 24-bit ints
- Signed 32-bit ints
- Unsigned 32-bit ints
- Signed 40-bit ints
- Unsigned 40-bit ints
- Strings

## Example
```javascript
intTo4Bytes([-2147483648, 2147483647]);
// returns [0,0,0,128,255,255,255,127]

intFrom4Bytes([0,0,0,128,255,255,255,127]);
// returns [-2147483648, 2147483647]
```

## Use
```javascript
let byteData = require('byte-data');

/**
 * numbers to bytes, all:
 * @param {!Array<number>} numbers The numbers.
 * @param {number} base Base 2, 10 or 16. If ommited defaults to 10.
 * @return {!Array<number>} the bytes.
 */
bytes = byteData.intTo4Bytes(numbers);
bytes = byteData.intTo3Bytes(numbers);
bytes = byteData.intTo2Bytes(numbers);
bytes = byteData.intTo1Byte(numbers);
bytes = byteData.intToNibble(numbers);
bytes = byteData.toCrumb(numbers);
bytes = byteData.toBoolean(numbers);

/**
 * numbers from bytes, all:
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} base Base 2, 10 or 16. If ommited defaults to 10.
 * @return {!Array<number>} The numbers.
 */
numbers = byteData.intFrom4Bytes(bytes);
numbers = byteData.uIntFrom4Bytes(bytes);
numbers = byteData.intFrom3Bytes(bytes);
numbers = byteData.uIntFrom3Bytes(bytes);
numbers = byteData.intFrom2Bytes(bytes);
numbers = byteData.uIntFrom2Bytes(bytes);
numbers = byteData.intFrom1Byte(bytes);
numbers = byteData.uIntFrom1Byte(bytes);
numbers = byteData.intFromNibble(bytes);
numbers = byteData.uIntFromNibble(bytes);
numbers = byteData.intFromCrumb(bytes);
numbers = byteData.uIntFromCrumb(bytes);
numbers = byteData.fromBoolean(bytes);

// strings
bytes = byteData.stringToBytes(string);
string = byteData.stringFromBytes(bytes);

// look for some string and return the start offset
// of its first occurrence in the buffer 
index = byteData.findString(bytes, "chunk");
```

Bytes are returned in base 10 by default.
```javascript
byteData.intTo4Bytes([-2147483648]);
// returns [0, 0, 0, 128]
```

To get hex values:
```javascript
byteData.intTo4Bytes([-2147483648], 16)
//["00", "00","00","80",]
```

To get binaries:
```javascript
byteData.intTo4Bytes([-2147483648], 2)
//["00000000", "00000000","00000000","10000000",]
```

Binary nibbles:
```javascript
byteData.intToNibbles([6], 2)
//["0110"]
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

## Browser
```html
<script src="byte-data-min.js"></script>
<script>
    let byteString = stringToBytes("ab"); // [97, 98]
    let myString = stringFromBytes([97, 98]); //"ab";
    ...
</script>
```

## Python struct.pack VS Node.js byte-data
```javascript
//struct.pack('<c', "a")
byteData.stringToBytes("a", 16);

//struct.pack('<b', -1)
byteData.intTo1Byte([-1], 16);

//struct.pack('<B', 1)
byteData.intTo1Byte([1], 16);

//struct.pack('<h', -1)
byteData.intTo2Bytes([-1], 16);

//struct.pack('<H', 1)
byteData.intTo2Bytes([1], 16);

//struct.pack('<i', -2147483648)
byteData.intTo4Bytes([-2147483648], 16);

//struct.pack('<I', 4294967295)
byteData.intTo4Bytes([4294967295], 16);
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
