# byte-data
Bytes to and from numbers and strings.  
Copyright (c) 2017 Rafael da Silva Rocha.  
https://github.com/rochars/byte-data

[![Build Status](https://travis-ci.org/rochars/byte-data.svg?branch=master)](https://travis-ci.org/rochars/byte-data) [![Build status](https://ci.appveyor.com/api/projects/status/g2ellp44s7a0kvid?svg=true)](https://ci.appveyor.com/project/rochars/byte-data) [![codecov](https://codecov.io/gh/rochars/byte-data/branch/master/graph/badge.svg)](https://codecov.io/gh/rochars/byte-data) [![NPM version](https://img.shields.io/npm/v/byte-data.svg?style=flat)](https://www.npmjs.com/package/byte-data) [![NPM downloads](https://img.shields.io/npm/dm/byte-data.svg?style=flat)](https://www.npmjs.com/package/byte-data)

## Install
```
npm install byte-data
```

Should work the same on Node.js and in the browser.

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

// Take a array of numbers,
// return a Uint8Array of bytes
bytes = byteData.floatTo8Bytes(numbers);
bytes = byteData.floatTo4Bytes(numbers);
bytes = byteData.intTo4Bytes(numbers);
bytes = byteData.intTo3Bytes(numbers);
bytes = byteData.intTo2Bytes(numbers);
bytes = byteData.intTo1Byte(numbers);

// Take a Uint8Array of bytes,
// return a array of numbers
numbers = byteData.floatFrom8Bytes(bytes);
numbers = byteData.floatFrom4Bytes(bytes);
numbers = byteData.intFrom4Bytes(bytes);
numbers = byteData.uIntFrom4Bytes(bytes);
numbers = byteData.intFrom3Bytes(bytes);
numbers = byteData.uIntFrom3Bytes(bytes);
numbers = byteData.intFrom2Bytes(bytes);
numbers = byteData.uIntFrom2Bytes(bytes);
numbers = byteData.intFrom1Byte(bytes);
numbers = byteData.uIntFrom1Byte(bytes);

// Strings
bytes = byteData.stringToBytes(string);
string = byteData.stringFromBytes(bytes);

// Look for some string and return the
// start offset of its first occurrence
let index = byteData.findString(bytes, "chunk");
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
