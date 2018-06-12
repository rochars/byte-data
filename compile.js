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
window['byteData']['types'] = byteData.types;
window['byteData']['types']['chr'] = byteData.types.chr;
window['byteData']['types']['fourCC'] = byteData.types.fourCC;
window['byteData']['types']['bool'] = byteData.types.bool;
window['byteData']['types']['int2'] = byteData.types.int2;
window['byteData']['types']['uInt2'] = byteData.types.uInt2;
window['byteData']['types']['int4'] = byteData.types.int4;
window['byteData']['types']['uInt4'] = byteData.types.uInt4;
window['byteData']['types']['int8'] = byteData.types.int8;
window['byteData']['types']['uInt8'] = byteData.types.uInt8;
// types: LE
window['byteData']['types']['int16'] = byteData.types.int16;
window['byteData']['types']['uInt16'] = byteData.types.uInt16;
window['byteData']['types']['float16'] = byteData.types.float16;
window['byteData']['types']['int24'] = byteData.types.int24;
window['byteData']['types']['uInt24'] = byteData.types.uInt24;
window['byteData']['types']['int32'] = byteData.types.int32;
window['byteData']['types']['uInt32'] = byteData.types.uInt32;
window['byteData']['types']['float32'] = byteData.types.float32;
window['byteData']['types']['int40'] = byteData.types.int40;
window['byteData']['types']['uInt40'] = byteData.types.uInt40;
window['byteData']['types']['int48'] = byteData.types.int48;
window['byteData']['types']['uInt48'] = byteData.types.uInt48;
window['byteData']['types']['float64'] = byteData.types.float64;
// types: BE
window['byteData']['types']['int16BE'] = byteData.types.int16BE;
window['byteData']['types']['uInt16BE'] = byteData.types.uInt16BE;
window['byteData']['types']['float16BE'] = byteData.types.float16BE;
window['byteData']['types']['int24BE'] = byteData.types.int24BE;
window['byteData']['types']['uInt24BE'] = byteData.types.uInt24BE;
window['byteData']['types']['int32BE'] = byteData.types.int32BE;
window['byteData']['types']['uInt32BE'] = byteData.types.uInt32BE;
window['byteData']['types']['float32BE'] = byteData.types.float32BE;
window['byteData']['types']['int40BE'] = byteData.types.int40BE;
window['byteData']['types']['uInt40BE'] = byteData.types.uInt40BE;
window['byteData']['types']['int48BE'] = byteData.types.int48BE;
window['byteData']['types']['uInt48BE'] = byteData.types.uInt48BE;
window['byteData']['types']['float64BE'] = byteData.types.float64BE;
