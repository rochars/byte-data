/**
 * type: The Type class.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 */

/** @private */
const bitParser = require("../src/bit-parser.js");

/**
 * A class to represent byte-data types.
 */
class Type {

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
         * If this type represent a single value or an array.
         * @type {boolean}
         */
        this.single = true;
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
         * @type {number}
         */
        this.base = 10;
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
        this.offset = this.bits < 8 ? 1 : this.bits / 8;
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
        this.reader = this.char ?
            bitParser.BitReader["readChar"] : bitParser.BitReader[
                'read' + (this.bits < 8 ? 8 : this.bits) +
                'Bit' + (this.float ? "Float" : "")];
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
                'write' + this.bits + 'Bit' + (this.float ? "Float" : "")];
        }
    }

    /**
     * Set the minimum and maximum values for the type.
     * @private
     */
    setMinMax_() {
        let max = Math.pow(2, this.bits);
        if (this.signed) {
            this.max = (max / 2) - 1;
            this.min = (max / 2) * -1;
        } else {
            this.max = max - 1;
            this.min = 0;
        }
    }
}

module.exports = Type;
