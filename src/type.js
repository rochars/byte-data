/**
 * type: The Type class.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */


const bitParser = require("../src/bit-parser.js");

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

        this.build_();
        this.realBits = this.bits;
    }

    /**
     * Sign a number according to the type.
     * @param {number} num The number.
     * @return {number}
     */
    sign(num) {
        if (this.signed && num > this.max) {
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
        this.offset = this.bits < 8 ? 1 : this.realBits / 8;
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
            this.reader = bitParser.BitReader["readChar"];
        } else {
            this.reader = bitParser.BitReader[
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
            this.writer = bitParser.BitWriter["writeString"];
        } else {
            this.writer = bitParser.BitWriter[
                'write' + this.realBits + 'Bit' + (this.float ? "Float" : "")];
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
            } else if (this.bits <= 53) {
                this.realBits = 53;
            } else {
                this.realBits = 64;
            }
        } else {
            this.realBits = this.bits;
        }
    }
}

module.exports = Type;
