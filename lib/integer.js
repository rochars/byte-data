/*
 * byte-data: Pack and unpack binary data.
 * https://github.com/rochars/byte-data
 *
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

/**
 * @fileoverview Pack and unpack two's complement ints and unsigned ints.
 */

/**
 * A class to pack and unpack two's complement ints and unsigned ints.
 * 
 */
class Integer {

    /**
     * @param {number} bits Number of bits used by the data.
     * @param {boolean} signed True for signed types.
     * @throws {Error} if the number of bits is smaller than 1 or greater than 64.
     */
    constructor(bits, signed) {
        /**
         * The max number of bits used by the data.
         * @type {number}
         */
        this.bits = bits;
        /**
         * If this type it is signed or not.
         * @type {boolean}
         */
        this.signed = signed;
        /**
         * The number of bytes used by the data.
         * @type {number}
         */
        this.offset = 0;
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
        /**
         * The practical number of bits used by the data.
         * @type {number}
         * @private
         */
        this.realBits_ = this.bits;
        /**
         * The mask to be used in the last byte.
         * @type {number}
         * @private
         */
        this.lastByteMask_ = 255;
        this.build_();
    }

    /**
     * Read one integer number from a byte buffer.
     * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
     * @param {number=} i The index to read.
     * @return {number}
     */
    read(bytes, i=0) {
        let num = 0;
        let x = this.offset - 1;
        while (x > 0) {
            num = (bytes[x + i] << x * 8) | num;
            x--;
        }
        num = (bytes[i] | num) >>> 0;
        return this.overflow_(this.sign_(num));
    }

    /**
     * Write one integer number to a byte buffer.
     * @param {!Array<number>} bytes An array of bytes.
     * @param {number} number The number.
     * @param {number=} j The index being written in the byte buffer.
     * @return {number} The next index to write on the byte buffer.
     */
    write(bytes, number, j=0) {
        number = this.overflow_(number);
        bytes[j++] = number & 255;
        for (let i = 2; i <= this.offset; i++) {
            bytes[j++] = Math.floor(number / Math.pow(2, ((i - 1) * 8))) & 255;
        }
        return j;
    }

    /**
     * Write one integer number to a byte buffer.
     * @param {!Array<number>} bytes An array of bytes.
     * @param {number} number The number.
     * @param {number=} j The index being written in the byte buffer.
     * @return {number} The next index to write on the byte buffer.
     * @private
     */
    writeEsoteric_(bytes, number, j=0) {
        number = this.overflow_(number);
        j = this.writeFirstByte_(bytes, number, j);
        for (let i = 2; i < this.offset; i++) {
            bytes[j++] = Math.floor(number / Math.pow(2, ((i - 1) * 8))) & 255;
        }
        if (this.bits > 8) {
            bytes[j++] = Math.floor(
                    number / Math.pow(2, ((this.offset - 1) * 8))) &
                this.lastByteMask_;
        }
        return j;
    }

    /**
     * Read a integer number from a byte buffer by turning int bytes
     * to a string of bits. Used for data with more than 32 bits.
     * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
     * @param {number=} i The index to read.
     * @return {number}
     * @private
     */
    readBits_(bytes, i=0) {
        let binary = '';
        let j = 0;
        while(j < this.offset) {
            let bits = bytes[i + j].toString(2);
            binary = new Array(9 - bits.length).join('0') + bits + binary;
            j++;
        }
        return this.overflow_(this.sign_(parseInt(binary, 2)));
    }

    /**
     * Build the type.
     * @throws {Error} if the number of bits is smaller than 1 or greater than 64.
     * @private
     */
    build_() {
        this.setRealBits_();
        this.setLastByteMask_();
        this.setMinMax_();
        this.offset = this.bits < 8 ? 1 : Math.ceil(this.realBits_ / 8);
        if ((this.realBits_ != this.bits) || this.bits < 8 || this.bits > 32) {
            this.write = this.writeEsoteric_;
            this.read = this.readBits_;
        }
    }

    /**
     * Sign a number.
     * @param {number} num The number.
     * @return {number}
     * @private
     */
    sign_(num) {
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
     * @private
     */
    overflow_(value) {
        if (value > this.max) {
            throw new Error('Overflow.');
        } else if (value < this.min) {
            throw new Error('Underflow.');
        }
        return value;
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
     * Set the practical bit number for data with bit count different
     * from the standard types (8, 16, 32, 40, 48, 64) and more than 8 bits.
     * @private
     */
    setRealBits_() {
        if (this.bits > 8) {
            this.realBits_ = ((this.bits - 1) | 7) + 1;
        }
    }

    /**
     * Set the mask that should be used when writing the last byte.
     * @private
     */
    setLastByteMask_() {
        let r = 8 - (this.realBits_ - this.bits);
        this.lastByteMask_ = Math.pow(2, r > 0 ? r : 8) -1;
    }

    /**
     * Write the first byte of a integer number.
     * @param {!Array<number>} bytes An array of bytes.
     * @param {number} number The number.
     * @param {number} j The index being written in the byte buffer.
     * @return {number} The next index to write on the byte buffer.
     * @private
     */
    writeFirstByte_(bytes, number, j) {
        if (this.bits < 8) {
            bytes[j++] = number < 0 ? number + Math.pow(2, this.bits) : number;
        } else {
            bytes[j++] = number & 255;
        }
        return j;
    }
}

module.exports = Integer;
