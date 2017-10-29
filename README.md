# byte-data
Bytes to and from numbers and strings.  
Copyright (c) 2017 Rafael da Silva Rocha.  
https://github.com/rochars/byte-data

[![Build Status](https://travis-ci.org/rochars/byte-data.svg?branch=master)](https://travis-ci.org/rochars/byte-data) [![Build status](https://ci.appveyor.com/api/projects/status/g2ellp44s7a0kvid?svg=true)](https://ci.appveyor.com/project/rochars/byte-data) [![codecov](https://codecov.io/gh/rochars/byte-data/branch/master/graph/badge.svg)](https://codecov.io/gh/rochars/byte-data) [![NPM version](https://img.shields.io/npm/v/byte-data.svg?style=flat)](https://www.npmjs.com/package/byte-data) [![NPM downloads](https://img.shields.io/npm/dm/byte-data.svg?style=flat)](https://www.npmjs.com/package/byte-data)

## Install
```
npm install byte-data
```

### Supports:
- Unsigned 8-bit ints
- Signed 16-bit ints
- Unsigned 16-bit ints
- Signed 24-bit ints
- Unsigned 24-bit ints
- Signed 32-bit ints
- Unsigned 32-bit ints
- Signed 32-bit floats in the -1.0 to 1.0 range
- Signed 64-bits floats in the -1.0 to 1.0 range
- Strings

## Use
```
let byteData = require('byte-data');

// Takes a array of numbers,
// returns a flat array of bytes
byteData.floatTo8Bytes();
byteData.floatTo4Bytes();
byteData.intTo4Bytes();
byteData.intTo3Bytes();
byteData.intTo2Bytes();
byteData.uIntTo1Byte();

// Takes a flat array of bytes,
// returns a array of numbers
byteData.floatFrom8Bytes();
byteData.floatFrom4Bytes();
byteData.intFrom4Bytes();
byteData.uIntFrom4Bytes();
byteData.intFrom3Bytes();
byteData.uIntFrom3Bytes();
byteData.intFrom2Bytes();
byteData.uIntFrom2Bytes();
byteData.uIntFrom1Byte();

// Strings
byteData.stringToBytes("ab"); // [97, 98]
byteData.stringFromBytes([97, 98]); //"ab";
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
