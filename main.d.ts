// Type definitions for byte-data 14.0
// Project: https://github.com/rochars/byte-data
// Definitions by: Rafael S. Rocha <https://github.com/rochars>
// Definitions: https://github.com/rochars/byte-data

export function unpackString(buffer: Uint8Array|ArrayLike<number>, index?: number, len?: number): string;

export function packString(str: string): Array<number>;

export function packStringTo(str: string, buffer: ArrayLike<number>, index?: number): number;

export function pack(value: number, theType: object): Array<number>;

export function packTo(value: number, theType: object, buffer: ArrayLike<number>, index?: number): number;

export function packArray(values: Array<number>|ArrayLike<number>, theType: object): Array<number>;

export function packArrayTo(values: Array<number>|ArrayLike<number>, theType: object, buffer: ArrayLike<number>, index?: number): number;

export function unpack(buffer: Uint8Array|ArrayLike<number>, theType: object, index?: number): number;

export function unpackArray(buffer: Uint8Array|ArrayLike<number>, theType: object, index?: number, end?: number): Array<number>;

export function unpackArrayTo(buffer: Uint8Array|ArrayLike<number>, theType: object, output: ArrayLike<number>, index?: number, end?: number): void;
