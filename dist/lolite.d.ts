// Type definitions for LoLite
// Project: https://github.com/10xly/lolite

declare interface PrivateUtils {
  arrayOfAllBooleans: boolean[]
  crash: () => never
  date: DateConstructor
  invertFallback: (value: number) => number
  isNotInteger: (value: any) => boolean
  multiplyFallback: (multiplier: number, multiplicand: number) => number
}

export const __private: PrivateUtils

/**
 * Removes all falsy values from an array.
 * @param array - The array to compact
 * @returns A new array with all falsy values removed
 */
export function compact<T>(
  array: T[]
): Array<Exclude<T, null | undefined | false | 0 | "">>

/**
 * Flattens an array a single level deep.
 * @param array - The array to flatten
 * @returns A new flattened array
 */
export function flatten<T>(array: any[]): T[]

/**
 * Gets the first element of an array.
 * @param array - The array to query
 * @returns The first element of the array
 */
export function first<T>(array: T[]): T | undefined

/**
 * Gets the first element of an array (alias for first).
 * @param array - The array to query
 * @returns The first element of the array
 */
export function head<T>(array: T[]): T | undefined

/**
 * Gets the last element of an array.
 * @param array - The array to query
 * @returns The last element of the array
 */
export function last<T>(array: T[]): T | undefined

/**
 * Gets all but the first element of an array.
 * @param array - The array to query
 * @returns A new array with all but the first element, or undefined for non-arrays
 */
export function tail<T>(array: T[]): T[] | undefined

/**
 * Gets all but the last element of an array.
 * @param array - The array to query
 * @returns A new array with all but the last element, or undefined for non-arrays
 */
export function initial<T>(array: T[]): T[] | undefined

/**
 * Gets a random element from an array.
 * @param array - The array to get a random element from.
 * @returns A random element from the array.
 */
export function sample(array: array): any

/**
 * Invokes the iteratee `number` times, returning an array of the results of each invocation.
 * The iteratee is invoked with one argument: (index).
 * * @param number - The number of times to invoke the iteratee
 * @param iteratee - The function invoked per iteration
 * @returns A new array of the results of each invocation
 */
export function times<T = any>(
  number: number,
  iteratee?: (index: number) => T
): T[]

/**
 * Adds two numbers.
 * @param augend - The first number to add
 * @param addend - The second number to add
 * @returns The sum of the two numbers
 */
export function add(augend: number, addend: number): number

/**
 * Subtracts two numbers.
 * @param minuend - The number to subtract from
 * @param subtrahend - The number to subtract
 * @returns The difference of the two numbers
 */
export function subtract(minuend: number, subtrahend: number): number

/**
 * Multiplies two numbers.
 * @param multiplier - The first number to multiply
 * @param multiplicand - The second number to multiply
 * @returns The product of the two numbers
 */
export function multiply(multiplier: number, multiplicand: number): number

/**
 * Divides two numbers.
 * @param dividend - The number to be divided
 * @param divisor - The number to divide by
 * @returns The quotient of the two numbers
 */
export function divide(dividend: number, divisor: number): number

/**
 * Inverts the sign of a number (negates it).
 * @param number - The number to invert
 * @returns The inverted number
 */
export function invert(number: number): number

/**
 * Computes the absolute value of a number.
 * @param value - The number to process
 * @returns The absolute value
 */
export function abs(value: number): number

/**
 * Returns the sign of a number.
 * @param value - The number to check
 * @returns -1 for negative, 0 for zero, 1 for positive
 */
export function sign(value: number): -1 | 0 | 1

/**
 * Computes the power of a number.
 * @param base - The base number
 * @param exponent - The exponent
 * @returns The result of base raised to the power of exponent
 */
export function power(base: number, exponent: number): number

/**
 * Computes the modulo of two numbers.
 * @param dividend - The dividend
 * @param divisor - The divisor
 * @returns The remainder
 */
export function modulo(dividend: number, divisor: number): number

/**
 * Computes the floor of a number.
 * @param value - The number to floor
 * @returns The floored number
 */
export function floor(value: number): number

/**
 * Computes the ceiling of a number.
 * @param value - The number to ceil
 * @returns The ceiled number
 */
export function ceil(value: number): number

/**
 * Rounds a number to the nearest integer.
 * @param value - The number to round
 * @returns The rounded number
 */
export function round(value: number): number

/**
 * Truncates the decimal part of a number.
 * @param value - The number to truncate
 * @returns The truncated number
 */
export function trunc(value: number): number

/**
 * Returns the maximum of two numbers.
 * @param a - The first number
 * @param b - The second number
 * @returns The larger number
 */
export function max(a: number, b: number): number

/**
 * Returns the minimum of two numbers.
 * @param a - The first number
 * @param b - The second number
 * @returns The smaller number
 */
export function min(a: number, b: number): number

/**
 * Clamps a number within the inclusive lower and upper bounds.
 * @param value - The number to clamp
 * @param lower - The lower bound
 * @param upper - The upper bound
 * @returns The clamped number
 */
export function clamp(value: number, lower: number, upper: number): number

/**
 * Performs a logical AND operation.
 * @param a- The first value
 * @param b - The second value
 * @returns The result of the AND operation
 */
export function and<T, U>(a: T, sb: U): T | U

/**
 * Performs a logical OR operation.
 * @param a - The first value
 * @param b - The second value
 * @returns The result of the OR operation
 */
export function or<T, U>(a: T, b: U): T | U

/**
 * Performs a logical NOT operation.
 * @param value - The value to negate
 * @returns The negated boolean
 */
export function not(value: any): boolean

/**
 * Performs a logical NAND operation.
 * @param a - The first value
 * @param b - The second value
 * @returns The result of the NAND operation
 */
export function nand<T, U>(a: T, b: U): boolean

/**
 * Performs a logical NOR operation.
 * @param a - The first value
 * @param b - The second value
 * @returns The result of the NOR operation
 */
export function nor<T, U>(a: T, b: U): boolean

/**
 * Performs a logical XOR operation.
 * @param a - The first value
 * @param b - The second value
 * @returns The result of the XOR operation
 */
export function xor<T, U>(a: T, b: U): boolean

/**
 * Performs a logical XNOR operation.
 * @param a - The first value
 * @param b - The second value
 * @returns The result of the XNOR operation
 */
export function xnor<T, U>(a: T, b: U): boolean

/**
 * Checks if a value is truthy.
 * @param value - The value to check
 * @returns True if the value is truthy
 */
export function isTruthy(value: any): boolean

/**
 * Checks if a value is falsy.
 * @param value - The value to check
 * @returns True if the value is falsy
 */
export function isFalsy(value: any): boolean

/**
 * Checks if a value is undefined.
 * @param value - The value to check
 * @returns True if the value is undefined
 */
export function isUndefined(value: any): value is undefined

/**
 * Checks if a value is null.
 * @param value - The value to check
 * @returns True if the value is null
 */
export function isNull(value: any): value is null

/**
 * Checks if a value is null or undefined.
 * @param value - The value to check
 * @returns True if the value is null or undefined
 */
export function isNil(value: any): value is null | undefined

/**
 * Checks if a value is a boolean.
 * @param value - The value to check
 * @returns True if the value is a boolean
 */
export function isBoolean(value: any): value is boolean

/**
 * Checks if a value is a number.
 * @param value - The value to check
 * @returns True if the value is a number
 */
export function isNumber(value: any): value is number

/**
 * Checks if a value is a BigInt.
 * @param value - The value to check
 * @returns True if the value is a BigInt
 */
export function isBigInt(value: any): value is bigint

/**
 * Checks if a value is a string.
 * @param value - The value to check
 * @returns True if the value is a string
 */
export function isString(value: any): value is string

/**
 * Checks if a value is a symbol.
 * @param value - The value to check
 * @returns True if the value is a symbol
 */
export function isSymbol(value: any): value is symbol

/**
 * Checks if a value is a primitive type.
 * @param value - The value to check
 * @returns True if the value is a primitive
 */
export function isPrimitive(
  value: any
): value is string | number | boolean | null | undefined | symbol | bigint

/**
 * Checks if a value is an object.
 * @param value - The value to check
 * @returns True if the value is an object
 */
export function isObject(value: any): value is object

/**
 * Checks if a value is a function.
 * @param value - The value to check
 * @returns True if the value is a function
 */
export function isFunction(value: any): value is Function

/**
 * Checks if a value is an array.
 * @param value - The value to check
 * @returns True if the value is an array
 */
export function isArray(value: any): value is any[]

/**
 * Checks if a value is a Map.
 * @param value - The value to check
 * @returns True if the value is a Map
 */
export function isMap(value: any): value is Map<any, any>

/**
 * Checks if a value is a WeakMap.
 * @param value - The value to check
 * @returns True if the value is a WeakMap
 */
export function isWeakMap(value: any): value is WeakMap<any, any>

/**
 * Checks if a value is a Set.
 * @param value - The value to check
 * @returns True if the value is a Set
 */
export function isSet(value: any): value is Set<any>

/**
 * Checks if a value is a WeakSet.
 * @param value - The value to check
 * @returns True if the value is a WeakSet
 */
export function isWeakSet(value: any): value is WeakSet<any>

/**
 * Checks if a value is a plain object.
 * @param value - The value to check
 * @returns True if the value is a plain object
 */
export function isPlainObject(value: any): value is Record<string, any>

/**
 * Checks if a value is an object and not null.
 * @param value - The value to check
 * @returns True if the value is a non-null object
 */
export function isNonNullObject(value: any): value is object

/**
 * Checks if a value is NaN.
 * @param value - The value to check
 * @returns True if the value is NaN
 */
export function isNaN(value: any): boolean

/**
 * Checks if a value is a finite number.
 * @param value - The value to check
 * @returns True if the value is finite
 */
export function isFinite(value: any): boolean

/**
 * Checks if a value is an integer.
 * @param value - The value to check
 * @returns True if the value is an integer
 */
export function isInteger(value: any): boolean

/**
 * Checks if a value is a safe integer.
 * @param value - The value to check
 * @returns True if the value is a safe integer
 */
export function isSafeInteger(value: any): boolean

/**
 * Checks if a value is an arguments object.
 * @param value - The value to check
 * @returns True if the value is an arguments object
 */
export function isArguments(value: any): boolean

/**
 * A function that does nothing.
 */
export function noop(): void

/**
 * Returns the value passed to it.
 * @param value - The value to return
 * @returns The same value
 */
export function identity<T>(value: T): T

/**
 * Creates a function that returns a constant value.
 * @param value - The value to return
 * @returns A function that returns the value
 */
export function constant<T>(value: T): () => T

/**
 * Returns undefined.
 * @returns Undefined
 */
export function stubUndefined(): undefined

/**
 * Returns null.
 * @returns Null
 */
export function stubNull(): null

/**
 * Returns true.
 * @returns True
 */
export function stubTrue(): boolean

/**
 * Returns false.
 * @returns False
 */
export function stubFalse(): boolean

/**
 * Returns NaN.
 * @returns NaN
 */
export function stubNaN(): number

/**
 * Gets the number of milliseconds that have elapsed since the Unix epoch.
 * @returns The current Unix timestamp in milliseconds.
 */
export function now(): number