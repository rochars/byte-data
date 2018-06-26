// Type definitions for byte-data
// Project: https://github.com/rochars/byte-data
// Definitions by: Rafael S. Rocha <https://github.com/rochars>
// Definitions: https://github.com/rochars/byte-data

export const types: {
    bool: {
        bits: number;
    };
    float16: {
        bits: number;
        float: boolean;
    };
    float16BE: {
        be: boolean;
        bits: number;
        float: boolean;
    };
    float32: {
        bits: number;
        float: boolean;
    };
    float32BE: {
        be: boolean;
        bits: number;
        float: boolean;
    };
    float64: {
        bits: number;
        float: boolean;
    };
    float64BE: {
        be: boolean;
        bits: number;
        float: boolean;
    };
    int16: {
        bits: number;
        signed: boolean;
    };
    int16BE: {
        be: boolean;
        bits: number;
        signed: boolean;
    };
    int2: {
        bits: number;
        signed: boolean;
    };
    int24: {
        bits: number;
        signed: boolean;
    };
    int24BE: {
        be: boolean;
        bits: number;
        signed: boolean;
    };
    int32: {
        bits: number;
        signed: boolean;
    };
    int32BE: {
        be: boolean;
        bits: number;
        signed: boolean;
    };
    int4: {
        bits: number;
        signed: boolean;
    };
    int40: {
        bits: number;
        signed: boolean;
    };
    int40BE: {
        be: boolean;
        bits: number;
        signed: boolean;
    };
    int48: {
        bits: number;
        signed: boolean;
    };
    int48BE: {
        be: boolean;
        bits: number;
        signed: boolean;
    };
    int8: {
        bits: number;
        signed: boolean;
    };
    uInt16: {
        bits: number;
    };
    uInt16BE: {
        be: boolean;
        bits: number;
    };
    uInt2: {
        bits: number;
    };
    uInt24: {
        bits: number;
    };
    uInt24BE: {
        be: boolean;
        bits: number;
    };
    uInt32: {
        bits: number;
    };
    uInt32BE: {
        be: boolean;
        bits: number;
    };
    uInt4: {
        bits: number;
    };
    uInt40: {
        bits: number;
    };
    uInt40BE: {
        be: boolean;
        bits: number;
    };
    uInt48: {
        bits: number;
    };
    uInt48BE: {
        be: boolean;
        bits: number;
    };
    uInt8: {
        bits: number;
    };
};

export function pack(value: number, theType: object): Array<number>;

export function packArray(values: Array<number>, theType: object): Array<number>;

export function packArrayTo(values: Array<number>, theType: object, buffer: Uint8Array, index: number): number;

export function packString(str: string): Array<number>;

export function packStringTo(str: string, bytes: Uint8Array, index?: number): number;

export function packTo(value: number, theType: object, buffer: Uint8Array, index: number): number;

export function unpack(buffer: Uint8Array, theType: object): number;

export function unpackArray(buffer: Uint8Array, theType: object): Array<number>;

export function unpackArrayFrom(buffer: Uint8Array, theType: object, start?: number, end?: number): Array<number>;

export function unpackFrom(buffer: Uint8Array, theType: object, index?: number): number;

export function unpackString(bytes: Uint8Array, index?: number, len?: number): string;
