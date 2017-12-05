/*
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

const BitReader = require("../src/read-bytes.js");
const BitWriter = require("../src/write-bytes.js");

/**
 * A class to represent byte-data types.
 */
class Type {

    constructor(options) {
        this.bits = options["bits"];
        this.char = options["char"];
        this.float = options["float"];
        this.be = options["be"];
        this.signed = this.float ? true : options["signed"];
        this.single = true;
        this.reader = null;
        this.writer = null;
        this.offset = 0;
        this.base = 10;
        this.min = null;
        this.max = null;
        this.build();
    }

    build() {
        if (this.bits < 8) {
            this.offset = 1;
        } else {
            this.offset = this.bits / 8;
        }
        this.setReader();
        this.setWriter();
        this.setMinMax();
    }

    /**
     * Set the function to read data of this type.
     */
    setReader() {
        this.reader = this.char ?
            BitReader["readChar"] : BitReader[
                'read' + (this.bits < 8 ? 8 : this.bits) +
                'Bit' + (this.float ? "Float" : "")];
    }

    /**
     * Set the function to write data of this type.
     */
    setWriter() {
        if (this.char) {
            this.writer = BitWriter["writeString"];
        } else {
            this.writer = BitWriter[
                'write' + this.bits + 'Bit' + (this.float ? "Float" : "")];
        }
    }

    /**
     * Set the minimum and maximum values for the type.
     */
    setMinMax() {
        let max = Math.pow(2, this.bits);
        if (this.float) {
            this.max = Infinity;
            this.min = Infinity;
        } else if (this.signed) {
            this.max = (max / 2) - 1;
            this.min = (max / 2) * -1;
        } else {
            this.max = max - 1;
            this.min = 0;
        }
    }

    /**
     * Sign a number according to the type.
     * @param {number} num The number.
     */
    sign(num) {
        if (num > this.max) {
            num -= (this.max * 2) + 2;
        }
        return num;
    }
}

module.exports = Type;
