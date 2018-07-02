// Type definitions for byte-data 13.0.1
// Project: https://github.com/rochars/byte-data
// Definitions by: Rafael S. Rocha <https://github.com/rochars>
// Definitions: https://github.com/rochars/byte-data

export function pack(value: number, theType: object): Array<number>;

export function packArray(values: Array<number>, theType: object): Array<number>;

export function packArrayTo(values: Array<number>, theType: object, buffer: Uint8Array, index?: number): number;

export function packString(str: string): Array<number>;

export function packStringTo(str: string, bytes: Uint8Array, index?: number): number;

export function packTo(value: number, theType: object, buffer: Uint8Array, index?: number): number;

export function unpack(buffer: Uint8Array, theType: object): number;

export function unpackArray(buffer: Uint8Array, theType: object): Array<number>;

export function unpackArrayFrom(buffer: Uint8Array, theType: object, start?: number, end?: number): Array<number>;

export function unpackArrayTo(buffer: Uint8Array, theType: object, output: TypedArray): void;

export function unpackFrom(buffer: Uint8Array, theType: object, index?: number): number;

export function unpackString(bytes: Uint8Array, index?: number, len?: number): string;
