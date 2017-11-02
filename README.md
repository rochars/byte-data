# byte-data
Bytes to and from numbers and strings.  
Copyright (c) 2017 Rafael da Silva Rocha.  
https://github.com/rochars/byte-data

[![codecov](https://codecov.io/gh/rochars/byte-data/branch/master/graph/badge.svg)](https://codecov.io/gh/rochars/byte-data) [![NPM version](https://img.shields.io/npm/v/byte-data.svg?style=flat)](https://www.npmjs.com/package/byte-data) [![NPM downloads](https://img.shields.io/npm/dm/byte-data.svg?style=flat)](https://www.npmjs.com/package/byte-data)

## Install
```
npm install byte-data
```

Should work the same on Node.js and in the browser.

Bytes are little-endian.

Arguments can be **Array**, **Uint8Array** and **Buffer** objects.

**byte-data** functions always return regular **arrays**.

### Supports:
- Signed 8-bit ints
- Unsigned 8-bit ints
- Signed 16-bit ints
- Unsigned 16-bit ints
- Signed 24-bit ints
- Unsigned 24-bit ints
- Signed 32-bit ints
- Unsigned 32-bit ints
- 32-bit floats
- 64-bit floats
- Strings

## Example
```javascript
intTo4Bytes([-2147483648, 2147483647]);
// returns [0,0,0,128,255,255,255,127]

floatFrom8Bytes([75, 40, 253, 58, 221, 154, 191, 63]);
// returns [0.123456789876543]
```

## Use
```javascript
let byteData = require('byte-data');

/**
 * numbers to bytes, all:
 * @param {!Array<number>} numbers The numbers.
 * @param {number} base Base 10 or 16. If ommited defaults to 10.
 * @return {!Array<number>} the bytes.
 */
bytes = byteData.doubleTo8Bytes(numbers);
bytes = byteData.floatTo4Bytes(numbers);
bytes = byteData.intTo4Bytes(numbers);
bytes = byteData.intTo3Bytes(numbers);
bytes = byteData.intTo2Bytes(numbers);
bytes = byteData.intTo1Byte(numbers);

/**
 * numbers from bytes, all:
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @return {!Array<number>} The numbers.
 */
numbers = byteData.doubleFrom8Bytes(bytes);
numbers = byteData.floatFrom4Bytes(bytes);
numbers = byteData.intFrom4Bytes(bytes);
numbers = byteData.uIntFrom4Bytes(bytes);
numbers = byteData.intFrom3Bytes(bytes);
numbers = byteData.uIntFrom3Bytes(bytes);
numbers = byteData.intFrom2Bytes(bytes);
numbers = byteData.uIntFrom2Bytes(bytes);
numbers = byteData.intFrom1Byte(bytes);
numbers = byteData.uIntFrom1Byte(bytes);

// strings
bytes = byteData.stringToBytes(string);
string = byteData.stringFromBytes(bytes);

// look for some string and return the start offset
// of its first occurrence in the buffer 
index = byteData.findString(bytes, "chunk");
```

Bytes are returned in base 10 by default. To get hex values:
```javascript
byteData.floatTo8Bytes([-1], 16)
//['0','0','0','0','0','0','f0','bf']
```

### Python struct.pack VS Node.js byte-data
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
byteData.intTo2Bytes([765], 16);

//struct.pack('<i', -2147483648)
byteData.intTo4Bytes([-2147483648], 16);

//struct.pack('<I', -2147483648)
byteData.intTo4Bytes([4294967295]);

//struct.pack('<f', -1)
byteData.floatTo4Bytes([-1], -1);

//struct.pack('<d', -1)
byteData.doubleTo8Bytes([-1], -1);
```

## Browser
```html
<script src="byte-data-min.js"></script>
<script>
    var byteStr = stringToBytes("ab"); // [97, 98]
    var myStr = stringFromBytes([97, 98]); //"ab";
    ...
</script>
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
