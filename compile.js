/*
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * https://github.com/rochars/wavefile
 *
 */

const byteData = require("./index.js");

// functions
window['byteData'] = byteData;
window['byteData']['pack'] = byteData.pack;
window['byteData']['unpack'] = byteData.unpack;
window['byteData']['packArray'] = byteData.packArray;
window['byteData']['unpackArray'] = byteData.unpackArray;

// types
window['byteData']['chr'] = byteData.chr;
window['byteData']['fourCC'] = byteData.fourCC;
window['byteData']['bool'] = byteData.bool;
window['byteData']['int2'] = byteData.int2;
window['byteData']['uInt2'] = byteData.uInt2;
window['byteData']['int4'] = byteData.int4;
window['byteData']['uInt4'] = byteData.uInt4;
window['byteData']['int8'] = byteData.int8;
window['byteData']['uInt8'] = byteData.uInt8;
// types: LE
window['byteData']['int16'] = byteData.int16;
window['byteData']['uInt16'] = byteData.uInt16;
window['byteData']['float16'] = byteData.float16;
window['byteData']['int24'] = byteData.int24;
window['byteData']['uInt24'] = byteData.uInt24;
window['byteData']['int32'] = byteData.int32;
window['byteData']['uInt32'] = byteData.uInt32;
window['byteData']['float32'] = byteData.float32;
window['byteData']['int40'] = byteData.int40;
window['byteData']['uInt40'] = byteData.uInt40;
window['byteData']['int48'] = byteData.int48;
window['byteData']['uInt48'] = byteData.uInt48;
window['byteData']['float64'] = byteData.float64;
// types: BE
window['byteData']['int16BE'] = byteData.int16BE;
window['byteData']['uInt16BE'] = byteData.uInt16BE;
window['byteData']['float16BE'] = byteData.float16BE;
window['byteData']['int24BE'] = byteData.int24BE;
window['byteData']['uInt24BE'] = byteData.uInt24BE;
window['byteData']['int32BE'] = byteData.int32BE;
window['byteData']['uInt32BE'] = byteData.uInt32BE;
window['byteData']['float32BE'] = byteData.float32BE;
window['byteData']['int40BE'] = byteData.int40BE;
window['byteData']['uInt40BE'] = byteData.uInt40BE;
window['byteData']['int48BE'] = byteData.int48BE;
window['byteData']['uInt48BE'] = byteData.uInt48BE;
window['byteData']['float64BE'] = byteData.float64BE;
