// Type definitions for byte-data 13.2.0
// Project: https://github.com/rochars/byte-data
// Definitions by: Rafael S. Rocha <https://github.com/rochars>
// Definitions: https://github.com/rochars/byte-data

export function pack(value: number, theType: object): Array<number>;

export function packArray(values: Array<number>|ArrayLike<number>, theType: object): Array<number>;

export function packArrayTo(values: Array<number>|ArrayLike<number>, theType: object, buffer: ArrayLike<number>, index?: number): number;

export function packString(str: string): Array<number>;

export function packStringTo(str: string, buffer: ArrayLike<number>, index?: number): number;

export function packTo(value: number, theType: object, buffer: ArrayLike<number>, index?: number): number;

export function unpack(buffer: Uint8Array, theType: object): number;

export function unpackArray(buffer: Uint8Array, theType: object): Array<number>;

export function unpackArrayFrom(buffer: Uint8Array, theType: object, start?: number, end?: number): Array<number>;

export function unpackArrayTo(buffer: Uint8Array, theType: object, output: ArrayLike<number>): void;

export function unpackFrom(buffer: Uint8Array, theType: object, index?: number): number;

export function unpackString(bytes: Uint8Array, index?: number, len?: number): string;
