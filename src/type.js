/**
 * type: The Type class.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

/** @private */
let f32 = new Float32Array(1);
/** @private */
let i32 = new Int32Array(f32.buffer);
/** @private */
let f64 = new Float64Array(1);
/** @private */
let ui32 = new Uint32Array(f64.buffer);

/**
 * Functions to read data from bytes.
 * @enum {Function}
 */
const BitReader = {

    /**
     * Read 1 8-bit int from from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read8Bit": function (bytes, i) {
        return bytes[i];
    },

    /**
     * Read 1 16-bit int from from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read16Bit": function (bytes, i) {
        let v = bytes[1 + i] << 8 | bytes[i];
        return v;
    },

    /**
     * Read 1 16-bit float from from bytes.
     * Thanks https://stackoverflow.com/a/8796597
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read16BitFloat": function (bytes, i) {
        let binary = parseInt(getBinary([bytes[i], bytes[i+1]]), 2);
        let exponent = (binary & 0x7C00) >> 10;
        let fraction = binary & 0x03FF;
        let floatValue;
        if (exponent) {
            floatValue =  Math.pow(2, exponent - 15) * (1 + fraction / 0x400);
        } else {
            floatValue = 6.103515625e-5 * (fraction / 0x400);
        }
        return  floatValue * (binary >> 15 ? -1 : 1);
    },

    /**
     * Read 1 24-bit int from from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read24Bit": function (bytes, i) {
        return bytes[2 + i] << 16 | BitReader["read16Bit"](bytes, i);
    },

    /**
     * Read 1 32-bit int from from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read32Bit": function (bytes, i) {
        return (bytes[3 + i] << 24 |
            BitReader["read24Bit"](bytes, i)) >>> 0;
    },

    /**
     * Read 1 32-bit float from from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read32BitFloat": function (bytes, i) {
        i32[0] = BitReader["read32Bit"](bytes, i);
        return f32[0];
    },

    /**
     * Read 1 40-bit int from from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read40Bit": function (bytes, i) {
        return readBytesAsBits(bytes, i, 5);
    },

    /**
     * Read 1 48-bit int from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read48Bit": function (bytes, i) {
        return readBytesAsBits(bytes, i, 6);
    },

    /**
     * Read 1 53-bit int from bytes. // 
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read56Bit": function (bytes, i) {
        return readBytesAsBits(bytes, i, 7);
    },

    /**
     * Read 1 64-bit double from bytes.
     * Thanks https://gist.github.com/kg/2192799
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @return {number}
     */
    "read64BitFloat": function (bytes, i) {
        ui32[0] = BitReader["read32Bit"](bytes, i);
        ui32[1] = BitReader["read32Bit"](bytes, i + 4);
        return f64[0];
    },

    /**
     * Read 1 char from bytes.
     * @param {!Array<number>|Uint8Array} bytes An array of bytes.
     * @param {number} i The index to read.
     * @param {Object} type The index to read.
     * @return {string}
     */
    "readChar": function (bytes, i, type) {
        let chrs = "";
        let j = 0;
        let len = type.bits / 8;
        while(j < len) {
            chrs += String.fromCharCode(bytes[i+j]);
            j++;
        }
        return chrs;
    }
};

/**
 * Functions to write data to bytes.
 * @enum {Function}
 */
let BitWriter = {

    /**
     * Write one 64-bit float as a binary value.
     * @param {!Array<number>} bytes An array of bytes.
     * @param {number} number The number to write as bytes.
     * @param {number} j The index being written in the byte buffer.
     * @return {number} The next index to write on the byte buffer.
     */
    "write64BitFloat": function(bytes, number, j) {
        f64[0] = number;
        bytes[j++] = ui32[0] & 0xFF;
        bytes[j++] = ui32[0] >>> 8 & 0xFF;
        bytes[j++] = ui32[0] >>> 16 & 0xFF;
        bytes[j++] = ui32[0] >>> 24 & 0xFF;
        bytes[j++] = ui32[1] & 0xFF;
        bytes[j++] = ui32[1] >>> 8 & 0xFF;
        bytes[j++] = ui32[1] >>> 16 & 0xFF;
        bytes[j++] = ui32[1] >>> 24 & 0xFF;
        //j = BitWriter["write"](bytes, ui32[0], j, new Type({"bits": 32}));
        return j; //BitWriter["write"](bytes, ui32[1], j, new Type({"bits": 32}));
    },

    /**
     * Write one 32-bit float as a binary value.
     * @param {!Array<number>} bytes An array of bytes.
     * @param {number} number The number to write as bytes.
     * @param {number} j The index being written in the byte buffer.
     * @param {Object} type The type.
     * @return {number} The next index to write on the byte buffer.
     */
    "write32BitFloat": function (bytes, number, j, type) {
        f32[0] = number;
        j = BitWriter["write"](bytes, i32[0], j, type);
        return j;
    },

    /**
     * Write one 16-bit float as a binary value.
     * @param {!Array<number>} bytes An array of bytes.
     * @param {number} number The number to write as bytes.
     * @param {number} j The index being written in the byte buffer.
     * @return {number} The next index to write on the byte buffer.
     */
    "write16BitFloat": function (bytes, number, j) {
        f32[0] = number;
        let x = i32[0];
        let bits = (x >> 16) & 0x8000;
        let m = (x >> 12) & 0x07ff;
        let e = (x >> 23) & 0xff;
        if (e >= 103) {
            bits |= ((e - 112) << 10) | (m >> 1);
            bits += m & 1;
        }
        bytes[j++] = bits & 0xFF;
        bytes[j++] = bits >>> 8 & 0xFF;
        return j;
    },
    
    /**
     * Write one char as a byte.
     * @param {!Array<number>} bytes An array of bytes.
     * @param {string} string The string to write as bytes.
     * @param {number} j The index being written in the byte buffer.
     * @return {number} The next index to write on the byte buffer.
     */
    "writeString": function (bytes, string, j) {
        bytes[j++] = string.charCodeAt(0);
        return j;
    },

    /**
     * Write one char as a byte.
     * @param {!Array<number>} bytes An array of bytes.
     * @param {number} number The number.
     * @param {number} j The index being written in the byte buffer.
     * @param {Object} type The type.
     * @return {number} The next index to write on the byte buffer.
     */
    "write": function (bytes, number, j, type) {
        let mask = 255;
        for (let i = 1; i <= type.offset; i++) {
            if (i == 1) {
                if (type.offset == 1) {
                    if (type.bits < 8) {
                        mask = Math.pow(2, type.bits);
                        bytes[j++] = number < 0 ? number + mask : number;
                        return j;
                    }
                }
                bytes[j++] = number & mask;
            } else {
                if (i == type.offset) {
                    let r = 8 - (type.realBits - type.bits);
                    mask = Math.pow(2, r > 0 ? r : 8) -1;
                }
                bytes[j++] = Math.floor(number / Math.pow(2, ((i - 1) * 8))) & mask;    
            }
        }
        return j;
    }
};

/**
 * A class to represent byte-data types.
 */
class Type {

    /**
     * @param {Object} options The type definition.
     * @param {number} options.bits Number of bits used by data of this type.
     * @param {boolean} options.char True for string/char types.
     * @param {boolean} options.float True for float types.
     *    Available only for 16, 32 and 64-bit data.
     * @param {boolean} options.be True for signed types.
     * @param {boolean} options.signed True for signed types.
     */
    constructor(options) {
        /**
         * The max number of bits used by data of this type.
         * @type {number}
         */
        this.bits = options["bits"];
        /**
         * If this type represent floating-point values or not.
         * @type {boolean}
         */
        this.char = options["char"];
        /**
         * If this type it is signed or not.
         * @type {boolean}
         */
        this.float = options["float"];
        /**
         * If this type is big-endian or not.
         * @type {boolean}
         */
        this.be = options["be"];
        /**
         * If this type it is signed or not.
         * @type {boolean}
         */
        this.signed = this.float ? true : options["signed"];
        /**
         * The function to read values of this type from buffers.
         * @type {Function}
         */
        this.reader = null;
        /**
         * The function to write values of this type to buffers.
         * @type {Function}
         */
        this.writer = null;
        /**
         * The number of bytes used by data of this type.
         * @type {number}
         */
        this.offset = 0;
        /**
         * The base used to represent data of this type.
         * Default is 10.
         * @type {number}
         */
        this.base = options["base"] ? options["base"] : 10;
        /**
         * Min value for numbers of this type.
         * @type {number}
         */
        this.min = -Infinity;
        /**
         * Max value for numbers of this type.
         * @type {number}
         */
        this.max = Infinity;
        this.realBits = this.bits;
        this.build_();
    }

    /**
     * Sign a number according to the type.
     * @param {number} num The number.
     * @return {number}
     */
    sign(num) {
        if (num > this.max) {
            num -= (this.max * 2) + 2;
        }
        return num;
    }

    /**
     * Limit the value according to the bit depth in case of
     * overflow or underflow.
     * @param {number} value The data.
     * @return {number}
     */
    overflow(value) {
        if (value > this.max) {
            value = this.max;
        } else if (value < this.min) {
            value = this.min;
        }
        return value;
    }

    /**
     * Build the type.
     * @private
     */
    build_() {
        this.setRealBits_();
        this.offset = this.bits < 8 ? 1 : Math.ceil(this.realBits / 8);
        this.setReader_();
        this.setWriter_();
        if (!this.float) {
            this.setMinMax_();
        }
    }

    /**
     * Set the function to read data of this type.
     * @private
     */
    setReader_() {
        if (this.char) {
            this.reader = BitReader["readChar"];
        } else {
            this.reader = BitReader[
                'read' + (this.bits < 8 ? 8 : this.realBits) +
                'Bit' + (this.float ? "Float" : "")];
        }
    }

    /**
     * Set the function to write data of this type.
     * @private
     */
    setWriter_() {
        if (this.char) {
            this.writer = BitWriter["writeString"];
        } else if (this.float) {
            this.writer = BitWriter[
                'write' + this.realBits + 'BitFloat'];
        } else {
            this.writer = BitWriter["write"];      
        }
    }

    /**
     * Set the minimum and maximum values for the type.
     * @private
     */
    setMinMax_() {
        let max = Math.pow(2, this.bits);
        if (this.signed) {
            this.max = max / 2 -1;
            this.min = -max / 2;
        } else {
            this.max = max - 1;
            this.min = 0;
        }
    }

    /**
     * Set the real bit depth for data with bit count different from the

     * standard types (1, 2, 4, 8, 16, 32, 40, 48, 64): the closest bigger
     * standard number of bits. The data is then treated as data of the
     * standard type on all aspects except for the min and max values.
     * Ex: a 11-bit uInt is treated as 16-bit uInt with a max value of 2048.
     * @private
     */
    setRealBits_() {
        if (this.bits > 8) {
            if (this.bits <= 16) {
                this.realBits = 16;
            } else if (this.bits <= 24) {
                this.realBits = 24;
            } else if (this.bits <= 32) {
                this.realBits = 32;
            } else if (this.bits <= 40) {
                this.realBits = 40;
            } else if (this.bits <= 48) {
                this.realBits = 48;
            } else if (this.bits <= 56) {
                this.realBits = 56;
            } else {
                this.realBits = 64;
            }
        } else {
            this.realBits = this.bits;
        }
    }
}

/**
 * Get a binary string representation of a value described as bytes.
 * @param {Array<number>|number} bytes The bytes.
 * @return {string}
 */
function getBinary(bytes) {
    let binary = "";
    let i = 0;
    let bytesLength = bytes.length;
    while(i < bytesLength) {
        let bits = bytes[i].toString(2);
        binary = Array(9 - bits.length).join("0") + bits + binary;
        i++;
    }
    return binary;
}

/**
 * Read a group of bytes by turning it to bits.
 * @param {!Array<number>|Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @param {number} numBytes The number of bytes
 *      (1 for 8-bit, 2 for 16-bit, etc).
 * @return {number}
 */
function readBytesAsBits(bytes, i, numBytes) {
    let j = numBytes-1;
    let byte = "";
    while (j >= 0) {
        let bits = bytes[j + i].toString(2);
        byte += Array(9 - bits.length).join("0") + bits;
        j--;
    }
    return parseInt(byte, 2);
}

module.exports = Type;
