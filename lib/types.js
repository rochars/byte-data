
/*
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

/**
 * A char.
 * @type {!Object}
 * @export
 */
module.exports.chr = {"bits": 8, "char": true};
/**
 * A 4-char string
 * @type {!Object}
 * @export
 */
module.exports.fourCC = {"bits": 32, "char": true};
/**
 * Booleans
 * @type {!Object}
 * @export
 */
module.exports.bool = {"bits": 1};
/**
 * Signed 2-bit integers
 * @type {!Object}
 * @export
 */
module.exports.int2 = {"bits": 2, "signed": true};
/**
 * Unsigned 2-bit integers
 * @type {!Object}
 * @export
 */
module.exports.uInt2 = {"bits": 2};
/**
 * Signed 4-bit integers
 * @type {!Object}
 * @export
 */
module.exports.int4 = {"bits": 4, "signed": true};
/**
 * Unsigned 4-bit integers
 * @type {!Object}
 * @export
 */
module.exports.uInt4 = {"bits": 4};
/**
 * Signed 8-bit integers
 * @type {!Object}
 * @export
 */
module.exports.int8 = {"bits": 8, "signed": true};
/**
 * Unsigned 4-bit integers
 * @type {!Object}
 * @export
 */
module.exports.uInt8 = {"bits": 8};
// LE
/**
 * Signed 16-bit integers little-endian
 * @type {!Object}
 * @export
 */
module.exports.int16  = {"bits": 16, "signed": true};
/**
 * Unsigned 16-bit integers little-endian
 * @type {!Object}
 * @export
 */
module.exports.uInt16 = {"bits": 16};
/**
 * Half-precision floating-point numbers little-endian
 * @type {!Object}
 * @export
 */
module.exports.float16 = {"bits": 16, "float": true};
/**
 * Signed 24-bit integers little-endian
 * @type {!Object}
 * @export
 */
module.exports.int24 = {"bits": 24, "signed": true};
/**
 * Unsigned 24-bit integers little-endian
 * @type {!Object}
 * @export
 */
module.exports.uInt24 = {"bits": 24};
/**
 * Signed 32-bit integers little-endian
 * @type {!Object}
 * @export
 */
module.exports.int32 = {"bits": 32, "signed": true};
/**
 * Unsigned 32-bit integers little-endian
 * @type {!Object}
 * @export
 */
module.exports.uInt32 = {"bits": 32};
/**
 * Single-precision floating-point numbers little-endian
 * @type {!Object}
 * @export
 */
module.exports.float32 = {"bits": 32, "float": true};
/**
 * Signed 40-bit integers little-endian
 * @type {!Object}
 * @export
 */
module.exports.int40 = {"bits": 40, "signed": true};
/**
 * Unsigned 40-bit integers little-endian
 * @type {!Object}
 * @export
 */
module.exports.uInt40 = {"bits": 40};
/**
 * Signed 48-bit integers little-endian
 * @type {!Object}
 * @export
 */
module.exports.int48 = {"bits": 48, "signed": true};
/**
 * Unsigned 48-bit integers little-endian
 * @type {!Object}
 * @export
 */
module.exports.uInt48 = {"bits": 48};
/**
 * Double-precision floating-point numbers little-endian
 * @type {!Object}
 * @export
 */
module.exports.float64 = {"bits": 64, "float": true};
// BE
/**
 * Signed 16-bit integers big-endian
 * @type {!Object}
 * @export
 */
module.exports.int16BE  = {"bits": 16, "signed": true, "be": true};
/**
 * Unsigned 16-bit integers big-endian
 * @type {!Object}
 * @export
 */
module.exports.uInt16BE = {"bits": 16, "be": true};
/**
 * Half-precision floating-point numbers big-endian
 * @type {!Object}
 * @export
 */
module.exports.float16BE = {"bits": 16, "float": true, "be": true};
/**
 * Signed 24-bit integers big-endian
 * @type {!Object}
 * @export
 */
module.exports.int24BE = {"bits": 24, "signed": true, "be": true};
/**
 * Unsigned 24-bit integers big-endian
 * @type {!Object}
 * @export
 */
module.exports.uInt24BE = {"bits": 24, "be": true};
/**
 * Signed 32-bit integers big-endian
 * @type {!Object}
 * @export
 */
module.exports.int32BE = {"bits": 32, "signed": true, "be": true};
/**
 * Unsigned 32-bit integers big-endian
 * @type {!Object}
 * @export
 */
module.exports.uInt32BE = {"bits": 32, "be": true};
/**
 * Single-precision floating-point numbers big-endian
 * @type {!Object}
 * @export
 */
module.exports.float32BE = {"bits": 32, "float": true, "be": true};
/**
 * Signed 40-bit integers big-endian
 * @type {!Object}
 * @export
 */
module.exports.int40BE = {"bits": 40, "signed": true, "be": true};
/**
 * Unsigned 40-bit integers big-endian
 * @type {!Object}
 * @export
 */
module.exports.uInt40BE = {"bits": 40, "be": true};
/**
 * Signed 48-bit integers big-endian
 * @type {!Object}
 * @export
 */
module.exports.int48BE = {"bits": 48, "signed": true, "be": true};
/**
 * Unsigned 48-bit integers big-endian
 * @type {!Object}
 * @export
 */
module.exports.uInt48BE = {"bits": 48, "be": true};
/**
 * Double-precision floating-point numbers big-endian
 * @type {!Object}
 * @export
 */
module.exports.float64BE = {"bits": 64, "float": true, "be": true};
