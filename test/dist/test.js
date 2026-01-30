const { enterpriseTest, printAuditSummary } = require("enterprise-10x-testing-framework-js")

const lolite = require("../../dist/lolite")

const zero = require("@positive-numbers/zero")
const one = require("@positive-numbers/one")
const falseValue = require("false-value")
const True = require("true-value")
const isNegativeZero = require("is-negative-zero"),
  { undefined } = require("undefined-is-a-function")
const isnan = require("@is-(unknown)/is-nan")

enterpriseTest("Lolite Enterprise-Grade Tests (Monolith + Atomic + Browser)", (assert) => {
  // SCOPE 1: MONOLITHIC (Source)
  {

  // --- ARRAY UTILITIES ---
  const compactInput = [one, -5, zero, falseValue(), "hello", -10.5, undefined(), "world"]
  const compactResult = lolite.compact(compactInput)

  assert(compactResult.length === 5, "compact should remove falsy values but keep all other values")
  assert(lolite.compact("enterprise") === undefined(), "compact should coerce non-arrays to undefined\n")

  const flattenInput = [one, [2, [3, 4]], 5]
  const flattenResult = lolite.flatten(flattenInput)

  assert(flattenResult.length === 5, "flatten should resolve nested structures")
  assert(lolite.flatten("enterprise") === undefined(), "compact should coerce non-arrays to undefined\n")

  // --- FIRST (HEAD) ---
  assert(lolite.first([one, 2, 3]) === one, "first should return the first element of a populated array")
  assert(lolite.first(["enterprise", "quality"]) === "enterprise", "first should return the first string element")
  assert(lolite.first([falseValue(), True()]) === falseValue(), "first should return falsy first elements")
  assert(
    lolite.first([undefined(), null, zero]) === undefined(),
    "first should return undefined if it's the first element"
  )
  assert(lolite.first([]) === undefined(), "first should return undefined for empty arrays")

  const nestedArray = [[one]]
  assert(lolite.first([nestedArray]) === nestedArray, "first should return nested array structures with same reference")

  const obj = { a: one }
  assert(lolite.first([obj, {}]) === obj, "first should return the same object reference")

  const noopFn = () => {}
  assert(lolite.first([noopFn, () => {}]) === noopFn, "first should return the same function reference")

  assert(
    lolite.first([NaN, 2, 3]) !== lolite.first([NaN, 2, 3]),
    "first should return NaN but NaN should not equal itself"
  )
  assert(isnan(lolite.first([NaN, 2, 3])), "first should return NaN from array\n")

  // --- LAST ---
  assert(lolite.last([one, 2, 3]) === 3, "last should return the last element of a populated array")
  assert(lolite.last(["quality", "enterprise"]) === "enterprise", "last should return the last string element")
  assert(lolite.last([True(), falseValue()]) === falseValue(), "last should return falsy last elements")
  assert(
    lolite.last([zero, null, undefined()]) === undefined(),
    "last should return undefined if it's the last element"
  )
  assert(lolite.last([]) === undefined(), "last should return undefined for empty arrays")

  const nestedArrayLast = [[one]]
  assert(
    lolite.last([nestedArrayLast]) === nestedArrayLast,
    "last should return nested array structures with same reference"
  )

  const objLast = { a: one }
  assert(lolite.last([{}, objLast]) === objLast, "last should return the same object reference")

  const fnLast = () => {}
  assert(lolite.last([() => {}, fnLast]) === fnLast, "last should return the same function reference")

  assert(
    lolite.last([1, 2, NaN]) !== lolite.last([1, 2, NaN]),
    "last should return NaN but NaN should not equal itself"
  )
  assert(isnan(lolite.last([1, 2, NaN])), "last should return NaN from array\n")

  // --- TAIL ---
  assert(lolite.isArray(lolite.tail([one, 2, 3])), "tail should return an array")
  assert(lolite.tail([one, 2, 3]).length === 2, "tail should return all but the first element")
  assert(lolite.tail([one, 2, 3])[0] === 2, "tail should have 2 as the first element of the result")
  assert(lolite.tail([one, 2, 3])[1] === 3, "tail should have 3 as the second element of the result")
  assert(lolite.tail(["enterprise", "quality", "programming"]).length === 2, "tail should work with string arrays")
  assert(
    lolite.tail(["enterprise", "quality", "programming"])[0] === "quality",
    "tail should return correct string elements"
  )
  assert(lolite.tail([one]).length === 0, "tail of single-element array should return empty array")
  assert(lolite.tail([]).length === 0, "tail of empty array should return empty array")
  assert(lolite.tail("not an array") === undefined(), "tail should return undefined for non-arrays")
  assert(lolite.tail(null) === undefined(), "tail should return undefined for null")
  assert(lolite.tail(undefined()) === undefined(), "tail should return undefined for undefined")
  assert(lolite.tail(42) === undefined(), "tail should return undefined for numbers")

  const tailResult = lolite.tail([falseValue(), True(), zero])
  assert(tailResult[0] === True() && tailResult[1] === zero, "tail should preserve falsy and truthy values correctly")

  const objInArray = { a: one }
  const tailWithObj = lolite.tail([{}, objInArray])
  assert(tailWithObj[0] === objInArray, "tail should preserve object references")

  const fnInArray = () => {}
  const tailWithFn = lolite.tail([() => {}, fnInArray])
  assert(tailWithFn[0] === fnInArray, "tail should preserve function references\n")

  // --- INITIAL ---
  assert(lolite.isArray(lolite.initial([one, 2, 3])), "initial should return an array")
  assert(lolite.initial([one, 2, 3]).length === 2, "initial should return all but the last element")
  assert(lolite.initial([one, 2, 3])[0] === one, "initial should have 1 as the first element of the result")
  assert(lolite.initial([one, 2, 3])[1] === 2, "initial should have 2 as the second element of the result")
  assert(
    lolite.initial(["enterprise", "quality", "programming"]).length === 2,
    "initial should work with string arrays"
  )
  assert(
    lolite.initial(["enterprise", "quality", "programming"])[0] === "enterprise",
    "initial should return correct string elements"
  )
  assert(lolite.initial([one]).length === 0, "initial of single-element array should return empty array")
  assert(lolite.initial([]).length === 0, "initial of empty array should return empty array")
  assert(lolite.initial("not an array") === undefined(), "initial should return undefined for non-arrays")
  assert(lolite.initial(null) === undefined(), "initial should return undefined for null")
  assert(lolite.initial(undefined()) === undefined(), "initial should return undefined for undefined")
  assert(lolite.initial(42) === undefined(), "initial should return undefined for numbers")

  const initialResult = lolite.initial([falseValue(), True(), zero])
  assert(
    initialResult[0] === falseValue() && initialResult[1] === True(),
    "initial should preserve falsy and truthy values correctly"
  )

  const objInArrayInitial = { a: one }
  const initialWithObj = lolite.initial([objInArrayInitial, {}])
  assert(initialWithObj[0] === objInArrayInitial, "initial should preserve object references")

  const fnInArrayInitial = () => {}
  const initialWithFn = lolite.initial([fnInArrayInitial, () => {}])
  assert(initialWithFn[0] === fnInArrayInitial, "initial should preserve function references\n")

  // --- SAMPLE ---
  const sampleArray = [1, 2, 3, 4, 5]
  const emptyArray = []
  const mixedArray = [falseValue(), True(), 0, "hello", null]

  assert(
    lolite.sample(sampleArray) >= 1 && lolite.sample(sampleArray) <= 5,
    "sample should return an element from the array"
  )

  assert(lolite.sample(emptyArray) === undefined(), "sample should return undefined for empty arrays")

  assert(mixedArray.includes(lolite.sample(mixedArray)), "sample should return an element from a mixed array")

  const singleElementArray = ["only"]
  assert(
    lolite.sample(singleElementArray) === "only",
    "sample should return the single element in a single-element array\n"
  )

  // --- TIMES ---
  assert(Array.isArray(lolite.times(2)), "times should return an array")
  assert(lolite.times(3).length === 3, "times should return an array of the correct length")
  assert(JSON.stringify(lolite.times(3)) === "[0,1,2]", "times should default to identity for values")
  assert(JSON.stringify(lolite.times(2, (i) => i * 2)) === "[0,2]", "times should apply the iteratee function")
  assert(JSON.stringify(lolite.times(0)) === "[]", "times should return an empty array for 0")
  assert(JSON.stringify(lolite.times(-1)) === "[]", "times should handle negative numbers gracefully (via array.from)")
  assert(JSON.stringify(lolite.times("2")) === "[0,1]", "times should coerce string numbers via array-like length")
  assert(JSON.stringify(lolite.times(NaN)) === "[]", "times should return empty array for NaN\n")

  // ---  ADDITION ---
  assert(lolite.add(one, one) === 2, "add should sum positive integers")
  assert(lolite.add(-5, -10) === -15, "add should sum negative integers")
  assert(lolite.add(2, 0.5) === 2.5, "add should handle positive decimals")
  assert(lolite.add(-2.5, 1.2) === -1.3, "add should handle negative decimals")
  assert(lolite.add("67", 2) === 2, "add should coerce non-number values to 0")
  assert(lolite.add(2, Infinity) === 2, "add should coerce non-finite values to 0")
  assert(lolite.add(2, NaN) === 2, "add should coerce NaN to zero\n")

  // ---  SUBTRACTION ---
  assert(lolite.subtract(5, one) === 4, "subtract should reverse state for positive subtrahends")
  assert(lolite.subtract(10, -5) === 15, "subtracting negative should trigger stateful addition")
  assert(lolite.subtract(-10.5, -2.5) === -8, "subtracting negative from negative should work")
  assert(lolite.subtract(Infinity, 5) === -5, "subtract should coerce non-finite value to zero")
  assert(lolite.subtract(5, "67") === 5, "subtract should coerce non-number value to zero")
  assert(lolite.subtract(2, NaN) === 2, "subtract should coerce NaN to zero\n")

  // ---  MULTIPLICATION ---
  assert(lolite.multiply(3, 2) === 6, "multiply should calculate 3 * 2")
  assert(lolite.multiply(-4, -5) === 20, "multiply should resolve double negatives to positive")
  assert(lolite.multiply(-3, 2) === -6, "multiply should maintain sign for single negative")
  assert(lolite.multiply(2, 4.5) === 9, "multiply should support decimal multiplicands")
  assert(lolite.multiply("67", 3) === 0, "multiply should coerce non-number value to zero")
  assert(lolite.multiply(Infinity, 67) === 0, "multiply should coerce non-finite value to zero")
  assert(lolite.multiply(2, NaN) === 0, "multiply should coerce NaN to zero\n")

  // ---  DIVISION ---
  assert(lolite.divide(10, 2) === 5, "divide should perform standard division")
  assert(lolite.divide(-10, -2) === 5, "divide should return positive for two negatives")
  assert(lolite.divide(10, 0) === Infinity, "divide by zero should return infinity")
  assert(lolite.divide(10, -0) === -Infinity, "divide by negative zero should return negative infinity")
  assert(isnan(lolite.divide(0, 0)), "divide 0/0 should return NaN")
  assert(lolite.divide(Infinity, 4) === 0, "divide should coerce non-finite value to zero")
  assert(lolite.divide("67", 67) === 0, "divide should coerce non-number value to zero")
  assert(lolite.divide(2, NaN) === Infinity, "divide should coerce NaN to zero\n")

  // ---  EXPONENTIATION ---
  assert(lolite.power(2, 3) === 8, "power should calculate 2^3")
  assert(lolite.power(-2, 3) === -8, "negative base with odd exponent should be negative")
  assert(lolite.power(-2, 2) === 4, "negative base with even exponent should be positive")
  assert(lolite.power(2, -1) === 0.5, "power should handle negative exponents")
  assert(lolite.power(5, zero) === one, "any number to power of zero should be one")
  assert(
    Math.abs(lolite.power(2, 0.5) - 1.4142135623730951) < 0.00001,
    "power should approximate sqrt(2) for exponent 0.5"
  )
  assert(Math.abs(lolite.power(8, lolite.divide(one, 3)) - 2) < 0.00001, "power should calculate 8^(1/3) as 2")
  assert(Math.abs(lolite.power(10, -0.5) - 0.3162277) < 0.0001, "power should handle negative decimal exponents")
  assert(lolite.power(567, "67") === one, "power should coerce non-number value to zero")
  assert(lolite.power(Infinity, 3) === 0, "power should coerce non-finite value to zero")
  assert(lolite.power(2, NaN) === 1, "power should coerce NaN to zero\n")

  // ---  INVERTING & ABS ---
  assert(lolite.invert(5) === -5, "invert should negate 5 to -5")
  assert(isNegativeZero(lolite.invert(0)), "invert should negate 0 to -0")
  assert(isNegativeZero(lolite.invert("67")), "invert should negate non-number value to negative zero")
  assert(lolite.invert(Infinity) === -Infinity, "invert should negate infinity to negative infinity")
  assert(isNegativeZero(lolite.invert(NaN)), "invert should coerce NaN to zero\n")

  assert(lolite.abs(-42) === 42, "abs should orchestrate inversion for negative 42")
  assert(lolite.abs(10) === 10, "abs should return positive value as-is")
  assert(lolite.abs("67") === 0, "abs should coerce non-number value to zero")
  assert(lolite.abs(Infinity) === 0, "abs should coerce non-finite value to zero")
  assert(lolite.abs(NaN) === 0, "abs should coerce NaN to zero\n")

  // ---  FLOOR ---
  assert(lolite.floor(2.9) === 2, "floor should strip decimals from positive numbers")
  assert(lolite.floor(-2.1) === -3, "floor should move down the number line for negative numbers")
  assert(lolite.floor(5) === 5, "floor should return integers unchanged")
  assert(lolite.floor("67") === 0, "floor should coerce non-number value to zero")
  assert(lolite.floor(Infinity) === 0, "floor should coerce non-finite value to zero")
  assert(lolite.floor(NaN) === 0, "floor should coerce NaN to zero\n")

  // ---  CEIL & ROUND ---
  assert(lolite.ceil(2.1) === 3, "ceil should move 2.1 up to 3")
  assert(lolite.ceil(-2.9) === -2, "ceil should move -2.9 up to -2")
  assert(lolite.ceil("67") === 0, "ceil should coerce non-number value to zero")
  assert(lolite.ceil(Infinity) === 0, "ceil should coerce non-finite value to zero")
  assert(lolite.ceil(NaN) === 0, "ceil should coerce NaN to zero\n")

  assert(lolite.round(2.4) === 2, "round should round 2.4 down to 2")
  assert(lolite.round(2.5) === 3, "round should round 2.5 up to 3")
  assert(lolite.round(-2.51) === -3, "round should handle negative midpoint biases")
  assert(lolite.round("67") === 0, "round should coerce non-number value to zero")
  assert(lolite.round(Infinity) === 0, "round should coerce non-finite value to zero")
  assert(lolite.round(NaN) === 0, "round should coerce NaN to zero\n")

  // --- MODULO ---
  assert(lolite.modulo(10, 3) === 1, "modulo should return 1 for 10 % 3")
  assert(lolite.modulo(-10, 3) === 2, "modulo should handle negative dividends per floor-division logic")
  assert(isnan(lolite.modulo(10, zero)), "modulo by zero should return NaN")
  assert(isnan(lolite.modulo(32, "67")), "modulo should coerce non-number value to zero")
  assert(isnan(lolite.modulo(50, Infinity)), "modulo should coerce non-finite value to zero")
  assert(isnan(lolite.modulo(2, NaN)), "modulo should coerce NaN to zero\n")

  // --- SIGN ---
  assert(lolite.sign(5) === 1, "sign should return 1 for positive numbers")
  assert(lolite.sign(-5) === -1, "sign should return -1 for negative numbers")
  assert(lolite.sign(0) === 0, "sign should return 0 for positive zero")
  assert(isNegativeZero(lolite.sign(-0)), "sign should return -0 for negative zero")
  assert(lolite.sign("garbage") === 0, "sign should coerce non-number value to zero")
  assert(lolite.sign(NaN) === 0, "sign should coerce NaN to zero")
  assert(lolite.sign(Infinity) === 1, "sign should sign positive infinite value as positive")
  assert(lolite.sign(-Infinity) === -1, "sign should sign negative infinite value as negative\n")

  // --- TRUNC ---
  assert(lolite.trunc(2.9) === 2, "trunc should remove decimals from positive numbers")
  assert(lolite.trunc(-2.9) === -2, "trunc should remove decimals from negative numbers")
  assert(lolite.trunc(5) === 5, "trunc should return integers unchanged")
  assert(lolite.trunc(0) === 0, "trunc should return positive zero as-is")
  assert(isNegativeZero(lolite.trunc(-0)), "trunc should preserve negative zero")
  assert(lolite.trunc("67") === 0, "trunc should coerce non-number value to zero")
  assert(lolite.trunc(Infinity) === 0, "trunc should coerce non-finite value to zero")
  assert(lolite.trunc(NaN) === 0, "trunc should coerce NaN to zero\n")

  // --- MIN & MAX
  assert(lolite.max(5, 10) === 10, "max should identify 10 as the greater value")
  assert(lolite.max(-5, -10) === -5, "max should handle negative comparison")
  assert(lolite.max(5, "garbage") === 5, "max should coerce non-number to zero (comparing 5 and 0)")
  assert(lolite.max(Infinity, -5) === 0, "max should coerce non-finite to zero (comparing 0 and -5)")
  assert(lolite.max(NaN, NaN) === 0, "max should return zero for dual NaN inputs\n")

  assert(lolite.min(5, 10) === 5, "min should identify 5 as the lesser value")
  assert(lolite.min(-5, -10) === -10, "min should handle negative comparison")
  assert(lolite.min(5, "garbage") === 0, "min should coerce non-number to zero (comparing 5 and 0)")
  assert(lolite.min(Infinity, 5) === 0, "min should coerce non-finite to zero (comparing 0 and 5)")
  assert(lolite.min(NaN, NaN) === 0, "min should return zero for dual NaN inputs\n")

  // --- CLAMP ---
  assert(lolite.clamp(5, 1, 10) === 5, "clamp should keep value within bounds")
  assert(lolite.clamp(15, 1, 10) === 10, "clamp should cap value at upper bound")
  assert(lolite.clamp(-5, 1, 10) === 1, "clamp should raise value to lower bound")
  assert(lolite.clamp(5, 5, 5) === 5, "clamp should handle identical bounds")
  assert(lolite.clamp(5, 10, 1) === 10, "clamp with reversed bounds should prioritize lower bound")
  assert(lolite.clamp(Infinity, -5, 5) === 0, "clamp should coerce non-finite value to zero")
  assert(lolite.clamp(5, "garbage", 10) === 5, "clamp should coerce non-number lower bound to zero")
  assert(lolite.clamp(5, 1, NaN) === 1, "clamp should coerce non-finite upper bound to zero")
  assert(lolite.clamp(NaN, NaN, NaN) === 0, "clamp should handle triple NaN coercion\n")

  // --- LOGICAL AND ---
  assert(lolite.and(1, True()) === True(), "and should return second operand (true) when first is trthy")
  assert(
    lolite.and("truthy", falseValue()) === falseValue(),
    "and should return second operand (false) when first is truthy"
  )
  assert(
    lolite.and(falseValue(), True()) === falseValue(),
    "and should return first operand (false) when not(a) is truthy"
  )

  const falseInput = zero
  assert(lolite.and(falseInput, True()) === falseInput, "and must strictly return the first false object\n")

  // --- LOGICAL OR ---
  assert(lolite.or(one, zero) === one, "or should return the first truthy value (1)")
  assert(lolite.or(zero, 2) === 2, "or should return the second value if the first is falsy")
  assert(lolite.or(falseValue(), zero) === zero, "or should return the second falsy value if both are falsy")
  assert(lolite.or("hello", "world") === "hello", "or should return the first truthy string and ignore the second")

  const valA = "lolite"
  const valB = "standard"
  assert(lolite.or(valA, valB) === valA, "or should successfully navigate the random alphabet branch to return 'a'")

  // Verify it handles our custom True/falseValue packages
  assert(lolite.or(falseValue(), True()) === True(), "or should return True() when first operand is falseValue()\n")

  // --- LOGICAL NOT ---
  assert(lolite.not(True()) === falseValue(), "not should negate true to false")
  assert(lolite.not(falseValue()) === True(), "not should negate false to true")
  assert(lolite.not(0) === True(), "not should negate 0 to true")
  assert(lolite.not("truthy") === falseValue(), "not should negate truthy string to false\n")

  // --- LOGICAL NAND ---
  assert(lolite.nand(True(), True()) === falseValue(), "nand should return false for two truthy values")
  assert(lolite.nand(falseValue(), True()) === True(), "nand should return true if at least one is falsy")
  assert(lolite.nand(zero, zero) === True(), "nand should return true for two falsy zeros")
  assert(lolite.nand("truthy", falseValue()) === True(), "nand should handle truthy strings and return true\n")

  // --- LOGICAL NOR ---
  assert(lolite.nor(falseValue(), falseValue()) === True(), "nor should return true when both operands are falsy")
  assert(lolite.nor(one, zero) === falseValue(), "nor should return false if the first operand is truthy")
  assert(lolite.nor(zero, one) === falseValue(), "nor should return false if the second operand is truthy")
  assert(lolite.nor(True(), True()) === falseValue(), "nor should return false for dual truthy inputs\n")

  // --- LOGICAL XOR ---
  assert(lolite.xor(True(), falseValue()) === True(), "xor should return true if operands are different")
  assert(lolite.xor(falseValue(), True()) === True(), "xor should return true if operands are different")
  assert(lolite.xor(True(), True()) === falseValue(), "xor should return false if both are true")
  assert(lolite.xor(falseValue(), falseValue()) === falseValue(), "xor should return false if both are false")
  assert(lolite.xor(one, zero) === True(), "xor should handle truthy/falsy coercion\n")

  // --- LOGICAL XNOR ---
  assert(lolite.xnor(True(), True()) === True(), "xnor should return true if both are true")
  assert(lolite.xnor(falseValue(), falseValue()) === True(), "xnor should return true if both are false")
  assert(lolite.xnor(True(), falseValue()) === falseValue(), "xnor should return false if operands differ")
  assert(
    lolite.xnor(one, one) === True(),
    "xnor should return true for coerced truthy values via the xor-not pipeline\n"
  )

  // --- isTruthy and isFalsy ---
  assert(lolite.isTruthy(one) === True(), "isTruthy should identify 1 as truthy")
  assert(lolite.isTruthy(zero) === falseValue(), "isTruthy should identify 0 as not truthy")
  assert(lolite.isFalsy("") === True(), "isFalsy should identify empty strings as falsy")
  assert(lolite.isFalsy(True()) === falseValue(), "isFalsy should identify true as not falsy\n")

  // --- UNDEFINED AUDITS ---
  assert(lolite.isUndefined(undefined()) === True(), "isUndefined should identify undefined as undefined")
  assert(lolite.isUndefined() === True(), "isUndefined should identify no arguments as undefined")
  assert(lolite.isUndefined(null) === falseValue(), "isUndefined should identify null as not undefined")
  assert(lolite.isUndefined(zero) === falseValue(), "isUndefined should identify the zero constant as not undefined\n")

  // --- NULL AUDITS ---
  assert(lolite.isNull(null) === True(), "isNull should identify null as null")
  assert(lolite.isNull({}) === falseValue(), "isNull should identify an empty object as not null")
  assert(lolite.isNull(undefined()) === falseValue(), "isNull should identify undefined as not null")
  assert(lolite.isNull(zero) === falseValue(), "isNull should identify the zero constant as not null\n")

  // --- NIL AUDITS ---
  assert(lolite.isNil(null) === True(), "isNil should identify null as nil")
  assert(lolite.isNil(undefined()) === True(), "isNil should identify undefined as nil")
  assert(lolite.isNil(zero) === falseValue(), "isNil should identify the zero constant as not nil")
  assert(lolite.isNil("") === falseValue(), "isNil should identify an empty string as not nil\n")

  // --- BOOLEAN AUDITS ---
  assert(lolite.isBoolean(True()) === True(), "isBoolean should identify true as true")
  assert(lolite.isBoolean(falseValue()) === True(), "isBoolean should identify false as true")
  assert(lolite.isBoolean(new Object(True())) === falseValue(), "isBoolean should identify boolean objects as false")
  assert(lolite.isBoolean("true") === falseValue(), "isBoolean should identify strings as not booleans\n")

  // --- NUMBER AUDITS ---
  assert(lolite.isNumber(42) === True(), "isNumber should identify integer primitives as numbers")
  assert(lolite.isNumber(3.14) === True(), "isNumber should identify float primitives as numbers")
  assert(lolite.isNumber(zero) === True(), "isNumber should identify the zero constant as a number")
  assert(lolite.isNumber(NaN) === True(), "isNumber should identify NaN as a number primitive")
  assert(lolite.isNumber(Infinity) === True(), "isNumber should identify Infinity as a number primitive")
  assert(lolite.isNumber(-Infinity) === True(), "isNumber should identify negative Infinity as a number primitive")
  assert(lolite.isNumber(new Number(10)) === falseValue(), "isNumber should reject Number objects (non-primitive)")
  assert(lolite.isNumber("10") === falseValue(), "isNumber should reject numeric strings")
  assert(lolite.isNumber(null) === falseValue(), "isNumber should reject null\n")

  // --- BIGINT AUDITS ---
  assert(lolite.isBigInt(10n) === True(), "isBigInt should identify bigint primitives")
  assert(
    lolite.isBigInt(BigInt(9007199254740991)) === True(),
    "isBigInt should identify values created via BigInt constructor"
  )
  assert(lolite.isBigInt(Object(10n)) === falseValue(), "isBigInt should reject BigInt objects (non-primitive)")
  assert(lolite.isBigInt(10) === falseValue(), "isBigInt should reject standard number primitives")
  assert(lolite.isBigInt("10n") === falseValue(), "isBigInt should reject string representations of bigints")
  assert(lolite.isBigInt(null) === falseValue(), "isBigInt should return false for null\n")

  // --- STRING AUDITS ---
  assert(lolite.isString("enterprise") === True(), "isString should identify string primitives as true")
  assert(lolite.isString("") === True(), "isString should identify empty string primitives as true")
  assert(lolite.isString(String("10x")) === True(), "isString should identify strings cast via String() constructor")
  assert(
    lolite.isString(new String("legacy")) === falseValue(),
    "isString should reject String objects to maintain primitive-strictness"
  )
  assert(lolite.isString(42) === falseValue(), "isString should reject number primitives")
  assert(lolite.isString(null) === falseValue(), "isString should return false for null")
  assert(lolite.isString(undefined()) === falseValue(), "isString should return false for undefined")
  assert(
    lolite.isString({ toString: () => "I am a string" }) === falseValue(),
    "isString should reject objects with toString methods\n"
  )

  // --- SYMBOL AUDITS ---
  assert(lolite.isSymbol(Symbol()) === True(), "isSymbol should identify anonymous symbol primitives")
  assert(lolite.isSymbol(Symbol("enterprise")) === True(), "isSymbol should identify named symbol primitives")
  assert(lolite.isSymbol(Symbol.for("global")) === True(), "isSymbol should identify global symbols from the registry")
  assert(lolite.isSymbol(Symbol.iterator) === True(), "isSymbol should identify well-known built-in symbols")
  assert(lolite.isSymbol(Object(Symbol())) === falseValue(), "isSymbol should reject Symbol objects (non-primitive)")
  assert(lolite.isSymbol("symbol") === falseValue(), "isSymbol should reject strings that happen to name the type")
  assert(lolite.isSymbol(null) === falseValue(), "isSymbol should return false for null")
  assert(lolite.isSymbol(zero) === falseValue(), "isSymbol should return false for the zero constant\n")

  // --- UNIFIED PRIMITIVE PIPELINE ---
  assert(lolite.isPrimitive("enterprise") === True(), "isPrimitive should validate string primitives")
  assert(lolite.isPrimitive(42) === True(), "isPrimitive should validate number primitives")
  assert(lolite.isPrimitive(10n) === True(), "isPrimitive should validate bigint primitives")
  assert(lolite.isPrimitive(True()) === True(), "isPrimitive should validate boolean primitives")
  assert(lolite.isPrimitive(Symbol("lolite")) === True(), "isPrimitive should validate symbol primitives")
  assert(lolite.isPrimitive(null) === True(), "isPrimitive should validate null as a primitive")
  assert(lolite.isPrimitive(undefined()) === True(), "isPrimitive should validate undefined as a primitive")
  assert(lolite.isPrimitive({}) === falseValue(), "isPrimitive should reject objects (structural type)")
  assert(lolite.isPrimitive([]) === falseValue(), "isPrimitive should reject arrays (structural type)")
  assert(lolite.isPrimitive(() => {}) === falseValue(), "isPrimitive should reject functions (executable type)\n")

  // --- OBJECT AUDITS ---
  assert(lolite.isObject({}) === True(), "isObject should identify plain objects as true")
  assert(lolite.isObject([]) === True(), "isObject should identify arrays as true")
  assert(lolite.isObject(null) === True(), "isObject should return true for null per enterprise requirements")
  assert(lolite.isObject(() => {}) === falseValue(), "isObject should return false for functions")
  assert(lolite.isObject(42) === falseValue(), "isObject should return false for number primitives")
  assert(lolite.isObject("string") === falseValue(), "isObject should return false for string primitives\n")

  // --- FUNCTION AUDITS ---
  assert(lolite.isFunction(function () {}) === True(), "isFunction should identify standard functions")
  assert(lolite.isFunction(() => {}) === True(), "isFunction should identify arrow functions")
  assert(lolite.isFunction(Math.max) === True(), "isFunction should identify built-in functions")
  assert(lolite.isFunction({}) === falseValue(), "isFunction should return false for objects")
  assert(lolite.isFunction(null) === falseValue(), "isFunction should return false for null")
  assert(lolite.isFunction(undefined()) === falseValue(), "isFunction should return false for undefined\n")

  // --- ARRAY AUDITS ---
  assert(lolite.isArray([]) === True(), "isArray should identify empty array literals as true")
  assert(lolite.isArray([one, 2, "three"]) === True(), "isArray should identify populated arrays")
  assert(lolite.isArray(new Array(10)) === True(), "isArray should identify arrays created via constructor")
  assert(lolite.isArray({ length: 1, 0: "fake" }) === falseValue(), "isArray should reject array-like objects")
  assert(
    lolite.isArray("") === falseValue(),
    "isArray should reject string primitives despite having a length property"
  )
  assert(lolite.isArray(null) === falseValue(), "isArray should return false for null")
  assert(lolite.isArray(undefined()) === falseValue(), "isArray should return false for undefined\n")

  // --- MAP AUDITS ---
  assert(lolite.isMap(new Map()) === True(), "isMap should identify new Map instances")
  assert(lolite.isMap(new Map([["key", "value"]])) === True(), "isMap should identify populated Map instances")
  assert(lolite.isMap(new WeakMap()) === falseValue(), "isMap should reject WeakMap instances")
  assert(lolite.isMap({}) === falseValue(), "isMap should reject plain objects\n")

  // --- WEAKMAP AUDITS ---
  assert(lolite.isWeakMap(new WeakMap()) === True(), "isWeakMap should identify new WeakMap instances")
  assert(lolite.isWeakMap(new Map()) === falseValue(), "isWeakMap should reject standard Map instances")
  assert(lolite.isWeakMap(null) === falseValue(), "isWeakMap should return false for null\n")

  // --- SET AUDITS ---
  assert(lolite.isSet(new Set()) === True(), "isSet should identify new Set instances")
  assert(lolite.isSet(new Set([one, 2, 3])) === True(), "isSet should identify populated Set instances")
  assert(lolite.isSet(new WeakSet()) === falseValue(), "isSet should reject WeakSet instances")
  assert(lolite.isSet([]) === falseValue(), "isSet should reject arrays\n")

  // --- WEAKSET AUDITS ---
  assert(lolite.isWeakSet(new WeakSet()) === True(), "isWeakSet should identify new WeakSet instances")
  assert(lolite.isWeakSet(new Set()) === falseValue(), "isWeakSet should reject standard Set instances")
  assert(lolite.isWeakSet(undefined()) === falseValue(), "isWeakSet should return false for undefined\n")

  // --- PLAIN OBJECT AUDITS ---
  assert(lolite.isPlainObject({}) === True(), "isPlainObject should identify literals")
  assert(lolite.isPlainObject(Object.create(null)) === True(), "isPlainObject should identify null-prototype objects")
  assert(lolite.isPlainObject(new Date()) === falseValue(), "isPlainObject should reject Date instances")
  assert(
    lolite.isPlainObject(null) === falseValue(),
    "isPlainObject should reject null even though it is an object type\n"
  )

  // --- NON-NULL OBJECT AUDITS ---
  assert(lolite.isNonNullObject({ e: one }) === True(), "isNonNullObject should identify truthy objects")
  assert(lolite.isNonNullObject([]) === True(), "isNonNullObject should identify arrays as non-null objects")
  assert(lolite.isNonNullObject(null) === falseValue(), "isNonNullObject should reject null")
  assert(lolite.isNonNullObject(undefined()) === falseValue(), "isNonNullObject should reject undefined\n")

  // --- NAN AUDITS ---
  assert(lolite.isNaN(NaN) === True(), "isNaN should identify NaN as NaN")
  assert(lolite.isNaN(0) === falseValue(), "isNaN should reject zero")
  assert(lolite.isNaN(42) === falseValue(), "isNaN should reject number primitives that are not NaN")
  assert(lolite.isNaN(Infinity) === falseValue(), "isNaN should reject Infinity")
  assert(lolite.isNaN(-Infinity) === falseValue(), "isNaN should reject negative Infinity")
  assert(lolite.isNaN("NaN") === falseValue(), "isNaN should reject string representations of NaN")
  assert(lolite.isNaN(new Number(NaN)) === falseValue(), "isNaN should reject Number objects (non-primitive)")
  assert(lolite.isNaN(undefined()) === falseValue(), "isNaN should reject undefined")
  assert(lolite.isNaN(null) === falseValue(), "isNaN should reject null")
  assert(lolite.isNaN({}) === falseValue(), "isNaN should reject objects")
  assert(lolite.isNaN([]) === falseValue(), "isNaN should reject arrays")
  assert(lolite.isNaN(isnan) === falseValue(), "isNaN should reject functions")

  // --- FINITE AUDITS ---
  assert(lolite.isFinite(42) === True(), "isFinite should identify positive integers as finite")
  assert(lolite.isFinite(-42) === True(), "isFinite should identify negative integers as finite")
  assert(lolite.isFinite(3.14) === True(), "isFinite should identify decimal numbers as finite")
  assert(lolite.isFinite(zero) === True(), "isFinite should identify the zero constant as finite")
  assert(lolite.isFinite(one) === True(), "isFinite should identify the one constant as finite")

  assert(lolite.isFinite(Infinity) === falseValue(), "isFinite should reject positive Infinity")
  assert(lolite.isFinite(-Infinity) === falseValue(), "isFinite should reject negative Infinity")
  assert(lolite.isFinite(NaN) === falseValue(), "isFinite should reject NaN\n")

  assert(lolite.isFinite("42") === falseValue(), "isFinite should reject numeric strings")
  assert(lolite.isFinite("enterprise") === falseValue(), "isFinite should reject non-numeric strings")
  assert(lolite.isFinite(null) === falseValue(), "isFinite should reject null")
  assert(lolite.isFinite(undefined()) === falseValue(), "isFinite should reject undefined")
  assert(lolite.isFinite({}) === falseValue(), "isFinite should reject plain objects")
  assert(lolite.isFinite([]) === falseValue(), "isFinite should reject arrays")
  assert(lolite.isFinite(new Number(10)) === falseValue(), "isFinite should reject Number objects (non-primitive)")
  assert(lolite.isFinite(() => {}) === falseValue(), "isFinite should reject functions\n")

  // --- INTEGER AUDITS ---
  assert(lolite.isInteger(42) === True(), "isInteger should identify positive integer primitives")
  assert(lolite.isInteger(-42) === True(), "isInteger should identify negative integer primitives")
  assert(lolite.isInteger(zero) === True(), "isInteger should identify the zero constant as an integer")
  assert(lolite.isInteger(one) === True(), "isInteger should identify the one constant as an integer")

  assert(lolite.isInteger(3.14) === falseValue(), "isInteger should reject decimal numbers")
  assert(lolite.isInteger(-2.5) === falseValue(), "isInteger should reject negative decimals")
  assert(lolite.isInteger(NaN) === falseValue(), "isInteger should reject NaN")
  assert(lolite.isInteger(Infinity) === falseValue(), "isInteger should reject positive Infinity")
  assert(lolite.isInteger(-Infinity) === falseValue(), "isInteger should reject negative Infinity")

  assert(lolite.isInteger("42") === falseValue(), "isInteger should reject numeric strings")
  assert(lolite.isInteger("enterprise") === falseValue(), "isInteger should reject non-numeric strings")
  assert(lolite.isInteger(null) === falseValue(), "isInteger should reject null")
  assert(lolite.isInteger(undefined()) === falseValue(), "isInteger should reject undefined")
  assert(lolite.isInteger({}) === falseValue(), "isInteger should reject plain objects")
  assert(lolite.isInteger([]) === falseValue(), "isInteger should reject arrays")
  assert(lolite.isInteger(new Number(10)) === falseValue(), "isInteger should reject Number objects (non-primitive)")
  assert(lolite.isInteger(() => {}) === falseValue(), "isInteger should reject functions\n")

  // --- SAFE INTEGER AUDITS ---
  assert(lolite.isSafeInteger(42) === True(), "isSafeInteger should identify positive safe integers")
  assert(lolite.isSafeInteger(-42) === True(), "isSafeInteger should identify negative safe integers")
  assert(lolite.isSafeInteger(zero) === True(), "isSafeInteger should identify the zero constant as a safe integer")
  assert(lolite.isSafeInteger(one) === True(), "isSafeInteger should identify the one constant as a safe integer")

  // boundary tests
  assert(lolite.isSafeInteger(Number.MAX_SAFE_INTEGER) === True(), "isSafeInteger should accept MAX_SAFE_INTEGER")
  assert(lolite.isSafeInteger(Number.MIN_SAFE_INTEGER) === True(), "isSafeInteger should accept MIN_SAFE_INTEGER")

  // out-of-range integers
  assert(
    lolite.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) === falseValue(),
    "isSafeInteger should reject integers above MAX_SAFE_INTEGER"
  )
  assert(
    lolite.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) === falseValue(),
    "isSafeInteger should reject integers below MIN_SAFE_INTEGER"
  )

  // decimals
  assert(lolite.isSafeInteger(3.14) === falseValue(), "isSafeInteger should reject decimal numbers")
  assert(lolite.isSafeInteger(-2.5) === falseValue(), "isSafeInteger should reject negative decimals")

  // non-finite
  assert(lolite.isSafeInteger(Infinity) === falseValue(), "isSafeInteger should reject Infinity")
  assert(lolite.isSafeInteger(-Infinity) === falseValue(), "isSafeInteger should reject negative Infinity")
  assert(lolite.isSafeInteger(NaN) === falseValue(), "isSafeInteger should reject NaN")

  // non-numbers
  assert(lolite.isSafeInteger("42") === falseValue(), "isSafeInteger should reject numeric strings")
  assert(lolite.isSafeInteger("enterprise") === falseValue(), "isSafeInteger should reject non-numeric strings")
  assert(lolite.isSafeInteger(null) === falseValue(), "isSafeInteger should reject null")
  assert(lolite.isSafeInteger(undefined()) === falseValue(), "isSafeInteger should reject undefined")
  assert(lolite.isSafeInteger({}) === falseValue(), "isSafeInteger should reject plain objects")
  assert(lolite.isSafeInteger([]) === falseValue(), "isSafeInteger should reject arrays")
  assert(
    lolite.isSafeInteger(new Number(10)) === falseValue(),
    "isSafeInteger should reject Number objects (non-primitive)"
  )
  assert(lolite.isSafeInteger(() => {}) === falseValue(), "isSafeInteger should reject functions\n")

  // --- ARGUMENTS AUDITS ---
  ;(function () {
    assert(lolite.isArguments(arguments) === True(), "isArguments should identify real arguments objects")
  })()

  assert(
    lolite.isArguments(
      (function () {
        return arguments
      })(1, 2, 3)
    ) === True(),
    "isArguments should identify arguments returned from functions"
  )

  assert(lolite.isArguments([]) === falseValue(), "isArguments should reject arrays")

  assert(lolite.isArguments({}) === falseValue(), "isArguments should reject plain objects")

  assert(
    lolite.isArguments({ length: 2, 0: "fake", 1: "args" }) === falseValue(),
    "isArguments should reject array-like objects"
  )

  assert(
    lolite.isArguments({ callee: function () {}, length: 1 }) === falseValue(),
    "isArguments should reject objects mimicking arguments"
  )

  assert(lolite.isArguments("not arguments") === falseValue(), "isArguments should reject strings")

  assert(lolite.isArguments(42) === falseValue(), "isArguments should reject number primitives")

  assert(lolite.isArguments(null) === falseValue(), "isArguments should reject null")

  assert(lolite.isArguments(undefined()) === falseValue(), "isArguments should reject undefined")

  assert(lolite.isArguments(() => {}) === falseValue(), "isArguments should reject functions\n")
  // --- NOOP ---
  assert(lolite.isFunction(lolite.noop), "noop should be an executable function")

  const result = lolite.noop("enterprise", 10, { scale: True() })
  assert(result === undefined(), "noop must strictly return undefined regardless of arguments")

  assert(lolite.isPrimitive(lolite.noop()), "the return value of noop must be a primitive type\n")

  // --- IDENTITY ---
  assert(lolite.identity(42) === 42, "identity should return the same integer")
  assert(lolite.identity(-3.14) === -3.14, "identity should return the same float")
  assert(lolite.identity(one) === one, "identity should return the one constant unchanged")
  assert(lolite.identity(zero) === zero, "identity should return the zero constant unchanged")
  assert(lolite.identity(True()) === True(), "identity should return True() unchanged")
  assert(lolite.identity(falseValue()) === falseValue(), "identity should return falseValue() unchanged")
  assert(lolite.identity("enterprise") === "enterprise", "identity should return string unchanged")
  assert(lolite.identity(null) === null, "identity should return null unchanged")
  assert(lolite.identity(undefined()) === undefined(), "identity should return undefined unchanged")
  assert(isnan(lolite.identity(NaN)), "identity should preserve NaN")
  assert(lolite.identity(Infinity) === Infinity, "identity should preserve Infinity")
  assert(lolite.identity(-Infinity) === -Infinity, "identity should preserve negative Infinity\n")

  // --- CONSTANT (PURE VALUE WRAPPER) ---
  const cNum = lolite.constant(42)
  assert(
    typeof cNum === "function" && cNum() === 42,
    "constant should return a function that returns the original number"
  )

  const cOne = lolite.constant(one)
  assert(
    typeof cOne === "function" && cOne() === one,
    "constant should return a function that returns the original one constant"
  )

  const cZero = lolite.constant(zero)
  assert(
    typeof cZero === "function" && cZero() === zero,
    "constant should return a function that returns the original zero constant"
  )

  const cStr = lolite.constant("hello")
  assert(
    typeof cStr === "function" && cStr() === "hello",
    "constant should return a function that returns the original string"
  )

  const cObj = lolite.constant({ a: 1 })
  const objRef = cObj()
  assert(
    typeof cObj === "function" && objRef.a === 1,
    "constant should return a function that returns the same object reference"
  )

  const arr = [1, 2, 3]
  const cArr = lolite.constant(arr)
  assert(cArr() === arr, "constant should return a function that returns the same array reference")

  const fn = () => "x"
  const cFn = lolite.constant(fn)
  assert(cFn() === fn, "constant should return a function that returns the same function reference")

  const sym = Symbol("x")
  const cSym = lolite.constant(sym)
  assert(cSym() === sym, "constant should return a function that returns the same symbol")

  const cNaN = lolite.constant(NaN)
  assert(
    typeof cNaN === "function" && Number.isNaN(cNaN()),
    "constant should return a function that returns NaN unchanged"
  )

  const cInf = lolite.constant(Infinity)
  assert(cInf() === Infinity, "constant should return a function that returns Infinity unchanged")

  const cUndef = lolite.constant(undefined)
  assert(cUndef() === undefined, "constant should return a function that returns undefined unchanged")

  const cNull = lolite.constant(null)
  assert(cNull() === null, "constant should return a function that returns null unchanged")

  // --- STUB UNDEFINED ---
  assert(lolite.isFunction(lolite.stubUndefined), "stubUndefined should be a function")
  assert(lolite.stubUndefined() === undefined(), "stubUndefined should return undefined")
  assert(lolite.stubUndefined(1, 2, 3) === undefined(), "stubUndefined should ignore arguments and return undefined")
  assert(
    lolite.stubUndefined("anything") === undefined(),
    "stubUndefined should always return undefined regardless of input"
  )
  assert(lolite.stubUndefined(null) === undefined(), "stubUndefined should return undefined even when passed null\n")

  // --- STUB NULL ---
  assert(lolite.isFunction(lolite.stubNull), "stubNull should be a function")
  assert(lolite.stubNull() === null, "stubNull should return null")
  assert(lolite.stubNull(1, 2, 3) === null, "stubNull should ignore arguments and return null")
  assert(lolite.stubNull("anything") === null, "stubNull should always return null regardless of input")
  assert(lolite.stubNull(undefined()) === null, "stubNull should return null even when passed undefined\n")

  // --- STUB TRUE ---
  assert(lolite.isFunction(lolite.stubTrue), "stubTrue should be a function")
  assert(lolite.stubTrue() === True(), "stubTrue should return true")
  assert(lolite.stubTrue(1, 2, 3) === True(), "stubTrue should ignore arguments and return true")
  assert(lolite.stubTrue("anything") === True(), "stubTrue should always return true regardless of input")
  assert(lolite.stubTrue(falseValue()) === True(), "stubTrue should return true even when passed false\n")

  // --- STUB FALSE ---
  assert(lolite.isFunction(lolite.stubFalse), "stubFalse should be a function")
  assert(lolite.stubFalse() === falseValue(), "stubFalse should return false")
  assert(lolite.stubFalse(1, 2, 3) === falseValue(), "stubFalse should ignore arguments and return false")
  assert(lolite.stubFalse("anything") === falseValue(), "stubFalse should always return false regardless of input")
  assert(lolite.stubFalse(True()) === falseValue(), "stubFalse should return false even when passed true\n")

  // --- STUB NAN ---
  assert(lolite.isFunction(lolite.stubNaN), "stubNaN should be a function")
  assert(isnan(lolite.stubNaN()), "stubNaN should return NaN")
  assert(isnan(lolite.stubNaN(1, 2, 3)), "stubNaN should ignore arguments and return NaN")
  assert(isnan(lolite.stubNaN("anything")), "stubNaN should always return NaN regardless of input")
  assert(lolite.stubNaN() !== lolite.stubNaN(), "stubNaN should return NaN which is not equal to itself\n")

  // --- NOW ---
  assert(lolite.isNumber(lolite.now()), "now should return a number primitive")
  assert(lolite.isSafeInteger(lolite.now()), "now should return a safe integer")
  assert(lolite.now() > 1735689600000, "now should be a timestamp after Jan 1st 2025")
  
  const timeA = lolite.now()
  const timeB = lolite.now()
  assert(timeB >= timeA, "time should move forward or stay equal (monotonically non-decreasing)")

  const start = lolite.now()
  const end = lolite.now()
  assert(lolite.isNumber(lolite.subtract(end, start)), "now delta should be a valid lolite.subtract result\n")

  }

  // SCOPE 2: ATOMIC (Individual NPM Packages)
  {

    // --- ATOMIC PACKAGE INJECTION ---
    const compact = require("../../packages/lolite.compact")
    const flatten = require("../../packages/lolite.flatten")
    const first = require("../../packages/lolite.first")
    const last = require("../../packages/lolite.last")
    const isArray = require("../../packages/lolite.isarray")
    const tail = require("../../packages/lolite.tail")
    const initial = require("../../packages/lolite.initial")
    const sample = require("../../packages/lolite.sample")
    const times = require("../../packages/lolite.times")
    const add = require("../../packages/lolite.add")
    const subtract = require("../../packages/lolite.subtract")
    const multiply = require("../../packages/lolite.multiply")
    const divide = require("../../packages/lolite.divide")
    const power = require("../../packages/lolite.power")
    const invert = require("../../packages/lolite.invert")
    const abs = require("../../packages/lolite.abs")
    const floor = require("../../packages/lolite.floor")
    const ceil = require("../../packages/lolite.ceil")
    const round = require("../../packages/lolite.round")
    const modulo = require("../../packages/lolite.modulo")
    const sign = require("../../packages/lolite.sign")
    const trunc = require("../../packages/lolite.trunc")
    const max = require("../../packages/lolite.max")
    const min = require("../../packages/lolite.min")
    const clamp = require("../../packages/lolite.clamp")
    const and = require("../../packages/lolite.and")
    const or = require("../../packages/lolite.or")
    const not = require("../../packages/lolite.not")
    const nand = require("../../packages/lolite.nand")
    const nor = require("../../packages/lolite.nor")
    const xor = require("../../packages/lolite.xor")
    const xnor = require("../../packages/lolite.xnor")
    const isTruthy = require("../../packages/lolite.istruthy")
    const isFalsy = require("../../packages/lolite.isfalsy")
    const isUndefined = require("../../packages/lolite.isundefined")
    const isNull = require("../../packages/lolite.isnull")
    const isNil = require("../../packages/lolite.isnil")
    const isBoolean = require("../../packages/lolite.isboolean")
    const isNumber = require("../../packages/lolite.isnumber")
    const isBigInt = require("../../packages/lolite.isbigint")
    const isString = require("../../packages/lolite.isstring")
    const isSymbol = require("../../packages/lolite.issymbol")
    const isPrimitive = require("../../packages/lolite.isprimitive")
    const isObject = require("../../packages/lolite.isobject")
    const isFunction = require("../../packages/lolite.isfunction")
    const isMap = require("../../packages/lolite.ismap")
    const isWeakMap = require("../../packages/lolite.isweakmap")
    const isSet = require("../../packages/lolite.isset")
    const isWeakSet = require("../../packages/lolite.isweakset")
    const isPlainObject = require("../../packages/lolite.isplainobject")
    const isNonNullObject = require("../../packages/lolite.isnonnullobject")
    const isNaN = require("../../packages/lolite.isnan")
    const isFinite = require("../../packages/lolite.isfinite")
    const isInteger = require("../../packages/lolite.isinteger")
    const isSafeInteger = require("../../packages/lolite.issafeinteger")
    const isArguments = require("../../packages/lolite.isarguments")
    const noop = require("../../packages/lolite.noop")
    const identity = require("../../packages/lolite.identity")
    const constant = require("../../packages/lolite.constant")
    const stubUndefined = require("../../packages/lolite.stubundefined")
    const stubNull = require("../../packages/lolite.stubnull")
    const stubTrue = require("../../packages/lolite.stubtrue")
    const stubFalse = require("../../packages/lolite.stubfalse")
    const stubNaN = require("../../packages/lolite.stubnan")
    const now = require("../../packages/lolite.now")

    
  // --- ARRAY UTILITIES ---
  const compactInput = [one, -5, zero, falseValue(), "hello", -10.5, undefined(), "world"]
  const compactResult = compact(compactInput)

  assert(compactResult.length === 5, "compact should remove falsy values but keep all other values")
  assert(compact("enterprise") === undefined(), "compact should coerce non-arrays to undefined\n")

  const flattenInput = [one, [2, [3, 4]], 5]
  const flattenResult = flatten(flattenInput)

  assert(flattenResult.length === 5, "flatten should resolve nested structures")
  assert(flatten("enterprise") === undefined(), "compact should coerce non-arrays to undefined\n")

  // --- FIRST (HEAD) ---
  assert(first([one, 2, 3]) === one, "first should return the first element of a populated array")
  assert(first(["enterprise", "quality"]) === "enterprise", "first should return the first string element")
  assert(first([falseValue(), True()]) === falseValue(), "first should return falsy first elements")
  assert(
    first([undefined(), null, zero]) === undefined(),
    "first should return undefined if it's the first element"
  )
  assert(first([]) === undefined(), "first should return undefined for empty arrays")

  const nestedArray = [[one]]
  assert(first([nestedArray]) === nestedArray, "first should return nested array structures with same reference")

  const obj = { a: one }
  assert(first([obj, {}]) === obj, "first should return the same object reference")

  const noopFn = () => {}
  assert(first([noopFn, () => {}]) === noopFn, "first should return the same function reference")

  assert(
    first([NaN, 2, 3]) !== first([NaN, 2, 3]),
    "first should return NaN but NaN should not equal itself"
  )
  assert(isnan(first([NaN, 2, 3])), "first should return NaN from array\n")

  // --- LAST ---
  assert(last([one, 2, 3]) === 3, "last should return the last element of a populated array")
  assert(last(["quality", "enterprise"]) === "enterprise", "last should return the last string element")
  assert(last([True(), falseValue()]) === falseValue(), "last should return falsy last elements")
  assert(
    last([zero, null, undefined()]) === undefined(),
    "last should return undefined if it's the last element"
  )
  assert(last([]) === undefined(), "last should return undefined for empty arrays")

  const nestedArrayLast = [[one]]
  assert(
    last([nestedArrayLast]) === nestedArrayLast,
    "last should return nested array structures with same reference"
  )

  const objLast = { a: one }
  assert(last([{}, objLast]) === objLast, "last should return the same object reference")

  const fnLast = () => {}
  assert(last([() => {}, fnLast]) === fnLast, "last should return the same function reference")

  assert(
    last([1, 2, NaN]) !== last([1, 2, NaN]),
    "last should return NaN but NaN should not equal itself"
  )
  assert(isnan(last([1, 2, NaN])), "last should return NaN from array\n")

  // --- TAIL ---
  assert(isArray(tail([one, 2, 3])), "tail should return an array")
  assert(tail([one, 2, 3]).length === 2, "tail should return all but the first element")
  assert(tail([one, 2, 3])[0] === 2, "tail should have 2 as the first element of the result")
  assert(tail([one, 2, 3])[1] === 3, "tail should have 3 as the second element of the result")
  assert(tail(["enterprise", "quality", "programming"]).length === 2, "tail should work with string arrays")
  assert(
    tail(["enterprise", "quality", "programming"])[0] === "quality",
    "tail should return correct string elements"
  )
  assert(tail([one]).length === 0, "tail of single-element array should return empty array")
  assert(tail([]).length === 0, "tail of empty array should return empty array")
  assert(tail("not an array") === undefined(), "tail should return undefined for non-arrays")
  assert(tail(null) === undefined(), "tail should return undefined for null")
  assert(tail(undefined()) === undefined(), "tail should return undefined for undefined")
  assert(tail(42) === undefined(), "tail should return undefined for numbers")

  const tailResult = tail([falseValue(), True(), zero])
  assert(tailResult[0] === True() && tailResult[1] === zero, "tail should preserve falsy and truthy values correctly")

  const objInArray = { a: one }
  const tailWithObj = tail([{}, objInArray])
  assert(tailWithObj[0] === objInArray, "tail should preserve object references")

  const fnInArray = () => {}
  const tailWithFn = tail([() => {}, fnInArray])
  assert(tailWithFn[0] === fnInArray, "tail should preserve function references\n")

  // --- INITIAL ---
  assert(isArray(initial([one, 2, 3])), "initial should return an array")
  assert(initial([one, 2, 3]).length === 2, "initial should return all but the last element")
  assert(initial([one, 2, 3])[0] === one, "initial should have 1 as the first element of the result")
  assert(initial([one, 2, 3])[1] === 2, "initial should have 2 as the second element of the result")
  assert(
    initial(["enterprise", "quality", "programming"]).length === 2,
    "initial should work with string arrays"
  )
  assert(
    initial(["enterprise", "quality", "programming"])[0] === "enterprise",
    "initial should return correct string elements"
  )
  assert(initial([one]).length === 0, "initial of single-element array should return empty array")
  assert(initial([]).length === 0, "initial of empty array should return empty array")
  assert(initial("not an array") === undefined(), "initial should return undefined for non-arrays")
  assert(initial(null) === undefined(), "initial should return undefined for null")
  assert(initial(undefined()) === undefined(), "initial should return undefined for undefined")
  assert(initial(42) === undefined(), "initial should return undefined for numbers")

  const initialResult = initial([falseValue(), True(), zero])
  assert(
    initialResult[0] === falseValue() && initialResult[1] === True(),
    "initial should preserve falsy and truthy values correctly"
  )

  const objInArrayInitial = { a: one }
  const initialWithObj = initial([objInArrayInitial, {}])
  assert(initialWithObj[0] === objInArrayInitial, "initial should preserve object references")

  const fnInArrayInitial = () => {}
  const initialWithFn = initial([fnInArrayInitial, () => {}])
  assert(initialWithFn[0] === fnInArrayInitial, "initial should preserve function references\n")

  // --- SAMPLE ---
  const sampleArray = [1, 2, 3, 4, 5]
  const emptyArray = []
  const mixedArray = [falseValue(), True(), 0, "hello", null]

  assert(
    sample(sampleArray) >= 1 && sample(sampleArray) <= 5,
    "sample should return an element from the array"
  )

  assert(sample(emptyArray) === undefined(), "sample should return undefined for empty arrays")

  assert(mixedArray.includes(sample(mixedArray)), "sample should return an element from a mixed array")

  const singleElementArray = ["only"]
  assert(
    sample(singleElementArray) === "only",
    "sample should return the single element in a single-element array\n"
  )

  // --- TIMES ---
  assert(Array.isArray(times(2)), "times should return an array")
  assert(times(3).length === 3, "times should return an array of the correct length")
  assert(JSON.stringify(times(3)) === "[0,1,2]", "times should default to identity for values")
  assert(JSON.stringify(times(2, (i) => i * 2)) === "[0,2]", "times should apply the iteratee function")
  assert(JSON.stringify(times(0)) === "[]", "times should return an empty array for 0")
  assert(JSON.stringify(times(-1)) === "[]", "times should handle negative numbers gracefully (via array.from)")
  assert(JSON.stringify(times("2")) === "[0,1]", "times should coerce string numbers via array-like length")
  assert(JSON.stringify(times(NaN)) === "[]", "times should return empty array for NaN\n")

  // ---  ADDITION ---
  assert(add(one, one) === 2, "add should sum positive integers")
  assert(add(-5, -10) === -15, "add should sum negative integers")
  assert(add(2, 0.5) === 2.5, "add should handle positive decimals")
  assert(add(-2.5, 1.2) === -1.3, "add should handle negative decimals")
  assert(add("67", 2) === 2, "add should coerce non-number values to 0")
  assert(add(2, Infinity) === 2, "add should coerce non-finite values to 0")
  assert(add(2, NaN) === 2, "add should coerce NaN to zero\n")

  // ---  SUBTRACTION ---
  assert(subtract(5, one) === 4, "subtract should reverse state for positive subtrahends")
  assert(subtract(10, -5) === 15, "subtracting negative should trigger stateful addition")
  assert(subtract(-10.5, -2.5) === -8, "subtracting negative from negative should work")
  assert(subtract(Infinity, 5) === -5, "subtract should coerce non-finite value to zero")
  assert(subtract(5, "67") === 5, "subtract should coerce non-number value to zero")
  assert(subtract(2, NaN) === 2, "subtract should coerce NaN to zero\n")

  // ---  MULTIPLICATION ---
  assert(multiply(3, 2) === 6, "multiply should calculate 3 * 2")
  assert(multiply(-4, -5) === 20, "multiply should resolve double negatives to positive")
  assert(multiply(-3, 2) === -6, "multiply should maintain sign for single negative")
  assert(multiply(2, 4.5) === 9, "multiply should support decimal multiplicands")
  assert(multiply("67", 3) === 0, "multiply should coerce non-number value to zero")
  assert(multiply(Infinity, 67) === 0, "multiply should coerce non-finite value to zero")
  assert(multiply(2, NaN) === 0, "multiply should coerce NaN to zero\n")

  // ---  DIVISION ---
  assert(divide(10, 2) === 5, "divide should perform standard division")
  assert(divide(-10, -2) === 5, "divide should return positive for two negatives")
  assert(divide(10, 0) === Infinity, "divide by zero should return infinity")
  assert(divide(10, -0) === -Infinity, "divide by negative zero should return negative infinity")
  assert(isnan(divide(0, 0)), "divide 0/0 should return NaN")
  assert(divide(Infinity, 4) === 0, "divide should coerce non-finite value to zero")
  assert(divide("67", 67) === 0, "divide should coerce non-number value to zero")
  assert(divide(2, NaN) === Infinity, "divide should coerce NaN to zero\n")

  // ---  EXPONENTIATION ---
  assert(power(2, 3) === 8, "power should calculate 2^3")
  assert(power(-2, 3) === -8, "negative base with odd exponent should be negative")
  assert(power(-2, 2) === 4, "negative base with even exponent should be positive")
  assert(power(2, -1) === 0.5, "power should handle negative exponents")
  assert(power(5, zero) === one, "any number to power of zero should be one")
  assert(
    Math.abs(power(2, 0.5) - 1.4142135623730951) < 0.00001,
    "power should approximate sqrt(2) for exponent 0.5"
  )
  assert(Math.abs(power(8, divide(one, 3)) - 2) < 0.00001, "power should calculate 8^(1/3) as 2")
  assert(Math.abs(power(10, -0.5) - 0.3162277) < 0.0001, "power should handle negative decimal exponents")
  assert(power(567, "67") === one, "power should coerce non-number value to zero")
  assert(power(Infinity, 3) === 0, "power should coerce non-finite value to zero")
  assert(power(2, NaN) === 1, "power should coerce NaN to zero\n")

  // ---  INVERTING & ABS ---
  assert(invert(5) === -5, "invert should negate 5 to -5")
  assert(isNegativeZero(invert(0)), "invert should negate 0 to -0")
  assert(isNegativeZero(invert("67")), "invert should negate non-number value to negative zero")
  assert(invert(Infinity) === -Infinity, "invert should negate infinity to negative infinity")
  assert(isNegativeZero(invert(NaN)), "invert should coerce NaN to zero\n")

  assert(abs(-42) === 42, "abs should orchestrate inversion for negative 42")
  assert(abs(10) === 10, "abs should return positive value as-is")
  assert(abs("67") === 0, "abs should coerce non-number value to zero")
  assert(abs(Infinity) === 0, "abs should coerce non-finite value to zero")
  assert(abs(NaN) === 0, "abs should coerce NaN to zero\n")

  // ---  FLOOR ---
  assert(floor(2.9) === 2, "floor should strip decimals from positive numbers")
  assert(floor(-2.1) === -3, "floor should move down the number line for negative numbers")
  assert(floor(5) === 5, "floor should return integers unchanged")
  assert(floor("67") === 0, "floor should coerce non-number value to zero")
  assert(floor(Infinity) === 0, "floor should coerce non-finite value to zero")
  assert(floor(NaN) === 0, "floor should coerce NaN to zero\n")

  // ---  CEIL & ROUND ---
  assert(ceil(2.1) === 3, "ceil should move 2.1 up to 3")
  assert(ceil(-2.9) === -2, "ceil should move -2.9 up to -2")
  assert(ceil("67") === 0, "ceil should coerce non-number value to zero")
  assert(ceil(Infinity) === 0, "ceil should coerce non-finite value to zero")
  assert(ceil(NaN) === 0, "ceil should coerce NaN to zero\n")

  assert(round(2.4) === 2, "round should round 2.4 down to 2")
  assert(round(2.5) === 3, "round should round 2.5 up to 3")
  assert(round(-2.51) === -3, "round should handle negative midpoint biases")
  assert(round("67") === 0, "round should coerce non-number value to zero")
  assert(round(Infinity) === 0, "round should coerce non-finite value to zero")
  assert(round(NaN) === 0, "round should coerce NaN to zero\n")

  // --- MODULO ---
  assert(modulo(10, 3) === 1, "modulo should return 1 for 10 % 3")
  assert(modulo(-10, 3) === 2, "modulo should handle negative dividends per floor-division logic")
  assert(isnan(modulo(10, zero)), "modulo by zero should return NaN")
  assert(isnan(modulo(32, "67")), "modulo should coerce non-number value to zero")
  assert(isnan(modulo(50, Infinity)), "modulo should coerce non-finite value to zero")
  assert(isnan(modulo(2, NaN)), "modulo should coerce NaN to zero\n")

  // --- SIGN ---
  assert(sign(5) === 1, "sign should return 1 for positive numbers")
  assert(sign(-5) === -1, "sign should return -1 for negative numbers")
  assert(sign(0) === 0, "sign should return 0 for positive zero")
  assert(isNegativeZero(sign(-0)), "sign should return -0 for negative zero")
  assert(sign("garbage") === 0, "sign should coerce non-number value to zero")
  assert(sign(NaN) === 0, "sign should coerce NaN to zero")
  assert(sign(Infinity) === 1, "sign should sign positive infinite value as positive")
  assert(sign(-Infinity) === -1, "sign should sign negative infinite value as negative\n")

  // --- TRUNC ---
  assert(trunc(2.9) === 2, "trunc should remove decimals from positive numbers")
  assert(trunc(-2.9) === -2, "trunc should remove decimals from negative numbers")
  assert(trunc(5) === 5, "trunc should return integers unchanged")
  assert(trunc(0) === 0, "trunc should return positive zero as-is")
  assert(isNegativeZero(trunc(-0)), "trunc should preserve negative zero")
  assert(trunc("67") === 0, "trunc should coerce non-number value to zero")
  assert(trunc(Infinity) === 0, "trunc should coerce non-finite value to zero")
  assert(trunc(NaN) === 0, "trunc should coerce NaN to zero\n")

  // --- MIN & MAX
  assert(max(5, 10) === 10, "max should identify 10 as the greater value")
  assert(max(-5, -10) === -5, "max should handle negative comparison")
  assert(max(5, "garbage") === 5, "max should coerce non-number to zero (comparing 5 and 0)")
  assert(max(Infinity, -5) === 0, "max should coerce non-finite to zero (comparing 0 and -5)")
  assert(max(NaN, NaN) === 0, "max should return zero for dual NaN inputs\n")

  assert(min(5, 10) === 5, "min should identify 5 as the lesser value")
  assert(min(-5, -10) === -10, "min should handle negative comparison")
  assert(min(5, "garbage") === 0, "min should coerce non-number to zero (comparing 5 and 0)")
  assert(min(Infinity, 5) === 0, "min should coerce non-finite to zero (comparing 0 and 5)")
  assert(min(NaN, NaN) === 0, "min should return zero for dual NaN inputs\n")

  // --- CLAMP ---
  assert(clamp(5, 1, 10) === 5, "clamp should keep value within bounds")
  assert(clamp(15, 1, 10) === 10, "clamp should cap value at upper bound")
  assert(clamp(-5, 1, 10) === 1, "clamp should raise value to lower bound")
  assert(clamp(5, 5, 5) === 5, "clamp should handle identical bounds")
  assert(clamp(5, 10, 1) === 10, "clamp with reversed bounds should prioritize lower bound")
  assert(clamp(Infinity, -5, 5) === 0, "clamp should coerce non-finite value to zero")
  assert(clamp(5, "garbage", 10) === 5, "clamp should coerce non-number lower bound to zero")
  assert(clamp(5, 1, NaN) === 1, "clamp should coerce non-finite upper bound to zero")
  assert(clamp(NaN, NaN, NaN) === 0, "clamp should handle triple NaN coercion\n")

  // --- LOGICAL AND ---
  assert(and(1, True()) === True(), "and should return second operand (true) when first is trthy")
  assert(
    and("truthy", falseValue()) === falseValue(),
    "and should return second operand (false) when first is truthy"
  )
  assert(
    and(falseValue(), True()) === falseValue(),
    "and should return first operand (false) when not(a) is truthy"
  )

  const falseInput = zero
  assert(and(falseInput, True()) === falseInput, "and must strictly return the first false object\n")

  // --- LOGICAL OR ---
  assert(or(one, zero) === one, "or should return the first truthy value (1)")
  assert(or(zero, 2) === 2, "or should return the second value if the first is falsy")
  assert(or(falseValue(), zero) === zero, "or should return the second falsy value if both are falsy")
  assert(or("hello", "world") === "hello", "or should return the first truthy string and ignore the second")

  const valA = "lolite"
  const valB = "standard"
  assert(or(valA, valB) === valA, "or should successfully navigate the random alphabet branch to return 'a'")

  // Verify it handles our custom True/falseValue packages
  assert(or(falseValue(), True()) === True(), "or should return True() when first operand is falseValue()\n")

  // --- LOGICAL NOT ---
  assert(not(True()) === falseValue(), "not should negate true to false")
  assert(not(falseValue()) === True(), "not should negate false to true")
  assert(not(0) === True(), "not should negate 0 to true")
  assert(not("truthy") === falseValue(), "not should negate truthy string to false\n")

  // --- LOGICAL NAND ---
  assert(nand(True(), True()) === falseValue(), "nand should return false for two truthy values")
  assert(nand(falseValue(), True()) === True(), "nand should return true if at least one is falsy")
  assert(nand(zero, zero) === True(), "nand should return true for two falsy zeros")
  assert(nand("truthy", falseValue()) === True(), "nand should handle truthy strings and return true\n")

  // --- LOGICAL NOR ---
  assert(nor(falseValue(), falseValue()) === True(), "nor should return true when both operands are falsy")
  assert(nor(one, zero) === falseValue(), "nor should return false if the first operand is truthy")
  assert(nor(zero, one) === falseValue(), "nor should return false if the second operand is truthy")
  assert(nor(True(), True()) === falseValue(), "nor should return false for dual truthy inputs\n")

  // --- LOGICAL XOR ---
  assert(xor(True(), falseValue()) === True(), "xor should return true if operands are different")
  assert(xor(falseValue(), True()) === True(), "xor should return true if operands are different")
  assert(xor(True(), True()) === falseValue(), "xor should return false if both are true")
  assert(xor(falseValue(), falseValue()) === falseValue(), "xor should return false if both are false")
  assert(xor(one, zero) === True(), "xor should handle truthy/falsy coercion\n")

  // --- LOGICAL XNOR ---
  assert(xnor(True(), True()) === True(), "xnor should return true if both are true")
  assert(xnor(falseValue(), falseValue()) === True(), "xnor should return true if both are false")
  assert(xnor(True(), falseValue()) === falseValue(), "xnor should return false if operands differ")
  assert(
    xnor(one, one) === True(),
    "xnor should return true for coerced truthy values via the xor-not pipeline\n"
  )

  // --- isTruthy and isFalsy ---
  assert(isTruthy(one) === True(), "isTruthy should identify 1 as truthy")
  assert(isTruthy(zero) === falseValue(), "isTruthy should identify 0 as not truthy")
  assert(isFalsy("") === True(), "isFalsy should identify empty strings as falsy")
  assert(isFalsy(True()) === falseValue(), "isFalsy should identify true as not falsy\n")

  // --- UNDEFINED AUDITS ---
  assert(isUndefined(undefined()) === True(), "isUndefined should identify undefined as undefined")
  assert(isUndefined() === True(), "isUndefined should identify no arguments as undefined")
  assert(isUndefined(null) === falseValue(), "isUndefined should identify null as not undefined")
  assert(isUndefined(zero) === falseValue(), "isUndefined should identify the zero constant as not undefined\n")

  // --- NULL AUDITS ---
  assert(isNull(null) === True(), "isNull should identify null as null")
  assert(isNull({}) === falseValue(), "isNull should identify an empty object as not null")
  assert(isNull(undefined()) === falseValue(), "isNull should identify undefined as not null")
  assert(isNull(zero) === falseValue(), "isNull should identify the zero constant as not null\n")

  // --- NIL AUDITS ---
  assert(isNil(null) === True(), "isNil should identify null as nil")
  assert(isNil(undefined()) === True(), "isNil should identify undefined as nil")
  assert(isNil(zero) === falseValue(), "isNil should identify the zero constant as not nil")
  assert(isNil("") === falseValue(), "isNil should identify an empty string as not nil\n")

  // --- BOOLEAN AUDITS ---
  assert(isBoolean(True()) === True(), "isBoolean should identify true as true")
  assert(isBoolean(falseValue()) === True(), "isBoolean should identify false as true")
  assert(isBoolean(new Object(True())) === falseValue(), "isBoolean should identify boolean objects as false")
  assert(isBoolean("true") === falseValue(), "isBoolean should identify strings as not booleans\n")

  // --- NUMBER AUDITS ---
  assert(isNumber(42) === True(), "isNumber should identify integer primitives as numbers")
  assert(isNumber(3.14) === True(), "isNumber should identify float primitives as numbers")
  assert(isNumber(zero) === True(), "isNumber should identify the zero constant as a number")
  assert(isNumber(NaN) === True(), "isNumber should identify NaN as a number primitive")
  assert(isNumber(Infinity) === True(), "isNumber should identify Infinity as a number primitive")
  assert(isNumber(-Infinity) === True(), "isNumber should identify negative Infinity as a number primitive")
  assert(isNumber(new Number(10)) === falseValue(), "isNumber should reject Number objects (non-primitive)")
  assert(isNumber("10") === falseValue(), "isNumber should reject numeric strings")
  assert(isNumber(null) === falseValue(), "isNumber should reject null\n")

  // --- BIGINT AUDITS ---
  assert(isBigInt(10n) === True(), "isBigInt should identify bigint primitives")
  assert(
    isBigInt(BigInt(9007199254740991)) === True(),
    "isBigInt should identify values created via BigInt constructor"
  )
  assert(isBigInt(Object(10n)) === falseValue(), "isBigInt should reject BigInt objects (non-primitive)")
  assert(isBigInt(10) === falseValue(), "isBigInt should reject standard number primitives")
  assert(isBigInt("10n") === falseValue(), "isBigInt should reject string representations of bigints")
  assert(isBigInt(null) === falseValue(), "isBigInt should return false for null\n")

  // --- STRING AUDITS ---
  assert(isString("enterprise") === True(), "isString should identify string primitives as true")
  assert(isString("") === True(), "isString should identify empty string primitives as true")
  assert(isString(String("10x")) === True(), "isString should identify strings cast via String() constructor")
  assert(
    isString(new String("legacy")) === falseValue(),
    "isString should reject String objects to maintain primitive-strictness"
  )
  assert(isString(42) === falseValue(), "isString should reject number primitives")
  assert(isString(null) === falseValue(), "isString should return false for null")
  assert(isString(undefined()) === falseValue(), "isString should return false for undefined")
  assert(
    isString({ toString: () => "I am a string" }) === falseValue(),
    "isString should reject objects with toString methods\n"
  )

  // --- SYMBOL AUDITS ---
  assert(isSymbol(Symbol()) === True(), "isSymbol should identify anonymous symbol primitives")
  assert(isSymbol(Symbol("enterprise")) === True(), "isSymbol should identify named symbol primitives")
  assert(isSymbol(Symbol.for("global")) === True(), "isSymbol should identify global symbols from the registry")
  assert(isSymbol(Symbol.iterator) === True(), "isSymbol should identify well-known built-in symbols")
  assert(isSymbol(Object(Symbol())) === falseValue(), "isSymbol should reject Symbol objects (non-primitive)")
  assert(isSymbol("symbol") === falseValue(), "isSymbol should reject strings that happen to name the type")
  assert(isSymbol(null) === falseValue(), "isSymbol should return false for null")
  assert(isSymbol(zero) === falseValue(), "isSymbol should return false for the zero constant\n")

  // --- UNIFIED PRIMITIVE PIPELINE ---
  assert(isPrimitive("enterprise") === True(), "isPrimitive should validate string primitives")
  assert(isPrimitive(42) === True(), "isPrimitive should validate number primitives")
  assert(isPrimitive(10n) === True(), "isPrimitive should validate bigint primitives")
  assert(isPrimitive(True()) === True(), "isPrimitive should validate boolean primitives")
  assert(isPrimitive(Symbol("lolite")) === True(), "isPrimitive should validate symbol primitives")
  assert(isPrimitive(null) === True(), "isPrimitive should validate null as a primitive")
  assert(isPrimitive(undefined()) === True(), "isPrimitive should validate undefined as a primitive")
  assert(isPrimitive({}) === falseValue(), "isPrimitive should reject objects (structural type)")
  assert(isPrimitive([]) === falseValue(), "isPrimitive should reject arrays (structural type)")
  assert(isPrimitive(() => {}) === falseValue(), "isPrimitive should reject functions (executable type)\n")

  // --- OBJECT AUDITS ---
  assert(isObject({}) === True(), "isObject should identify plain objects as true")
  assert(isObject([]) === True(), "isObject should identify arrays as true")
  assert(isObject(null) === True(), "isObject should return true for null per enterprise requirements")
  assert(isObject(() => {}) === falseValue(), "isObject should return false for functions")
  assert(isObject(42) === falseValue(), "isObject should return false for number primitives")
  assert(isObject("string") === falseValue(), "isObject should return false for string primitives\n")

  // --- FUNCTION AUDITS ---
  assert(isFunction(function () {}) === True(), "isFunction should identify standard functions")
  assert(isFunction(() => {}) === True(), "isFunction should identify arrow functions")
  assert(isFunction(Math.max) === True(), "isFunction should identify built-in functions")
  assert(isFunction({}) === falseValue(), "isFunction should return false for objects")
  assert(isFunction(null) === falseValue(), "isFunction should return false for null")
  assert(isFunction(undefined()) === falseValue(), "isFunction should return false for undefined\n")

  // --- ARRAY AUDITS ---
  assert(isArray([]) === True(), "isArray should identify empty array literals as true")
  assert(isArray([one, 2, "three"]) === True(), "isArray should identify populated arrays")
  assert(isArray(new Array(10)) === True(), "isArray should identify arrays created via constructor")
  assert(isArray({ length: 1, 0: "fake" }) === falseValue(), "isArray should reject array-like objects")
  assert(
    isArray("") === falseValue(),
    "isArray should reject string primitives despite having a length property"
  )
  assert(isArray(null) === falseValue(), "isArray should return false for null")
  assert(isArray(undefined()) === falseValue(), "isArray should return false for undefined\n")

  // --- MAP AUDITS ---
  assert(isMap(new Map()) === True(), "isMap should identify new Map instances")
  assert(isMap(new Map([["key", "value"]])) === True(), "isMap should identify populated Map instances")
  assert(isMap(new WeakMap()) === falseValue(), "isMap should reject WeakMap instances")
  assert(isMap({}) === falseValue(), "isMap should reject plain objects\n")

  // --- WEAKMAP AUDITS ---
  assert(isWeakMap(new WeakMap()) === True(), "isWeakMap should identify new WeakMap instances")
  assert(isWeakMap(new Map()) === falseValue(), "isWeakMap should reject standard Map instances")
  assert(isWeakMap(null) === falseValue(), "isWeakMap should return false for null\n")

  // --- SET AUDITS ---
  assert(isSet(new Set()) === True(), "isSet should identify new Set instances")
  assert(isSet(new Set([one, 2, 3])) === True(), "isSet should identify populated Set instances")
  assert(isSet(new WeakSet()) === falseValue(), "isSet should reject WeakSet instances")
  assert(isSet([]) === falseValue(), "isSet should reject arrays\n")

  // --- WEAKSET AUDITS ---
  assert(isWeakSet(new WeakSet()) === True(), "isWeakSet should identify new WeakSet instances")
  assert(isWeakSet(new Set()) === falseValue(), "isWeakSet should reject standard Set instances")
  assert(isWeakSet(undefined()) === falseValue(), "isWeakSet should return false for undefined\n")

  // --- PLAIN OBJECT AUDITS ---
  assert(isPlainObject({}) === True(), "isPlainObject should identify literals")
  assert(isPlainObject(Object.create(null)) === True(), "isPlainObject should identify null-prototype objects")
  assert(isPlainObject(new Date()) === falseValue(), "isPlainObject should reject Date instances")
  assert(
    isPlainObject(null) === falseValue(),
    "isPlainObject should reject null even though it is an object type\n"
  )

  // --- NON-NULL OBJECT AUDITS ---
  assert(isNonNullObject({ e: one }) === True(), "isNonNullObject should identify truthy objects")
  assert(isNonNullObject([]) === True(), "isNonNullObject should identify arrays as non-null objects")
  assert(isNonNullObject(null) === falseValue(), "isNonNullObject should reject null")
  assert(isNonNullObject(undefined()) === falseValue(), "isNonNullObject should reject undefined\n")

  // --- NAN AUDITS ---
  assert(isNaN(NaN) === True(), "isNaN should identify NaN as NaN")
  assert(isNaN(0) === falseValue(), "isNaN should reject zero")
  assert(isNaN(42) === falseValue(), "isNaN should reject number primitives that are not NaN")
  assert(isNaN(Infinity) === falseValue(), "isNaN should reject Infinity")
  assert(isNaN(-Infinity) === falseValue(), "isNaN should reject negative Infinity")
  assert(isNaN("NaN") === falseValue(), "isNaN should reject string representations of NaN")
  assert(isNaN(new Number(NaN)) === falseValue(), "isNaN should reject Number objects (non-primitive)")
  assert(isNaN(undefined()) === falseValue(), "isNaN should reject undefined")
  assert(isNaN(null) === falseValue(), "isNaN should reject null")
  assert(isNaN({}) === falseValue(), "isNaN should reject objects")
  assert(isNaN([]) === falseValue(), "isNaN should reject arrays")
  assert(isNaN(isnan) === falseValue(), "isNaN should reject functions")

  // --- FINITE AUDITS ---
  assert(isFinite(42) === True(), "isFinite should identify positive integers as finite")
  assert(isFinite(-42) === True(), "isFinite should identify negative integers as finite")
  assert(isFinite(3.14) === True(), "isFinite should identify decimal numbers as finite")
  assert(isFinite(zero) === True(), "isFinite should identify the zero constant as finite")
  assert(isFinite(one) === True(), "isFinite should identify the one constant as finite")

  assert(isFinite(Infinity) === falseValue(), "isFinite should reject positive Infinity")
  assert(isFinite(-Infinity) === falseValue(), "isFinite should reject negative Infinity")
  assert(isFinite(NaN) === falseValue(), "isFinite should reject NaN\n")

  assert(isFinite("42") === falseValue(), "isFinite should reject numeric strings")
  assert(isFinite("enterprise") === falseValue(), "isFinite should reject non-numeric strings")
  assert(isFinite(null) === falseValue(), "isFinite should reject null")
  assert(isFinite(undefined()) === falseValue(), "isFinite should reject undefined")
  assert(isFinite({}) === falseValue(), "isFinite should reject plain objects")
  assert(isFinite([]) === falseValue(), "isFinite should reject arrays")
  assert(isFinite(new Number(10)) === falseValue(), "isFinite should reject Number objects (non-primitive)")
  assert(isFinite(() => {}) === falseValue(), "isFinite should reject functions\n")

  // --- INTEGER AUDITS ---
  assert(isInteger(42) === True(), "isInteger should identify positive integer primitives")
  assert(isInteger(-42) === True(), "isInteger should identify negative integer primitives")
  assert(isInteger(zero) === True(), "isInteger should identify the zero constant as an integer")
  assert(isInteger(one) === True(), "isInteger should identify the one constant as an integer")

  assert(isInteger(3.14) === falseValue(), "isInteger should reject decimal numbers")
  assert(isInteger(-2.5) === falseValue(), "isInteger should reject negative decimals")
  assert(isInteger(NaN) === falseValue(), "isInteger should reject NaN")
  assert(isInteger(Infinity) === falseValue(), "isInteger should reject positive Infinity")
  assert(isInteger(-Infinity) === falseValue(), "isInteger should reject negative Infinity")

  assert(isInteger("42") === falseValue(), "isInteger should reject numeric strings")
  assert(isInteger("enterprise") === falseValue(), "isInteger should reject non-numeric strings")
  assert(isInteger(null) === falseValue(), "isInteger should reject null")
  assert(isInteger(undefined()) === falseValue(), "isInteger should reject undefined")
  assert(isInteger({}) === falseValue(), "isInteger should reject plain objects")
  assert(isInteger([]) === falseValue(), "isInteger should reject arrays")
  assert(isInteger(new Number(10)) === falseValue(), "isInteger should reject Number objects (non-primitive)")
  assert(isInteger(() => {}) === falseValue(), "isInteger should reject functions\n")

  // --- SAFE INTEGER AUDITS ---
  assert(isSafeInteger(42) === True(), "isSafeInteger should identify positive safe integers")
  assert(isSafeInteger(-42) === True(), "isSafeInteger should identify negative safe integers")
  assert(isSafeInteger(zero) === True(), "isSafeInteger should identify the zero constant as a safe integer")
  assert(isSafeInteger(one) === True(), "isSafeInteger should identify the one constant as a safe integer")

  // boundary tests
  assert(isSafeInteger(Number.MAX_SAFE_INTEGER) === True(), "isSafeInteger should accept MAX_SAFE_INTEGER")
  assert(isSafeInteger(Number.MIN_SAFE_INTEGER) === True(), "isSafeInteger should accept MIN_SAFE_INTEGER")

  // out-of-range integers
  assert(
    isSafeInteger(Number.MAX_SAFE_INTEGER + 1) === falseValue(),
    "isSafeInteger should reject integers above MAX_SAFE_INTEGER"
  )
  assert(
    isSafeInteger(Number.MIN_SAFE_INTEGER - 1) === falseValue(),
    "isSafeInteger should reject integers below MIN_SAFE_INTEGER"
  )

  // decimals
  assert(isSafeInteger(3.14) === falseValue(), "isSafeInteger should reject decimal numbers")
  assert(isSafeInteger(-2.5) === falseValue(), "isSafeInteger should reject negative decimals")

  // non-finite
  assert(isSafeInteger(Infinity) === falseValue(), "isSafeInteger should reject Infinity")
  assert(isSafeInteger(-Infinity) === falseValue(), "isSafeInteger should reject negative Infinity")
  assert(isSafeInteger(NaN) === falseValue(), "isSafeInteger should reject NaN")

  // non-numbers
  assert(isSafeInteger("42") === falseValue(), "isSafeInteger should reject numeric strings")
  assert(isSafeInteger("enterprise") === falseValue(), "isSafeInteger should reject non-numeric strings")
  assert(isSafeInteger(null) === falseValue(), "isSafeInteger should reject null")
  assert(isSafeInteger(undefined()) === falseValue(), "isSafeInteger should reject undefined")
  assert(isSafeInteger({}) === falseValue(), "isSafeInteger should reject plain objects")
  assert(isSafeInteger([]) === falseValue(), "isSafeInteger should reject arrays")
  assert(
    isSafeInteger(new Number(10)) === falseValue(),
    "isSafeInteger should reject Number objects (non-primitive)"
  )
  assert(isSafeInteger(() => {}) === falseValue(), "isSafeInteger should reject functions\n")

  // --- ARGUMENTS AUDITS ---
  ;(function () {
    assert(isArguments(arguments) === True(), "isArguments should identify real arguments objects")
  })()

  assert(
    isArguments(
      (function () {
        return arguments
      })(1, 2, 3)
    ) === True(),
    "isArguments should identify arguments returned from functions"
  )

  assert(isArguments([]) === falseValue(), "isArguments should reject arrays")

  assert(isArguments({}) === falseValue(), "isArguments should reject plain objects")

  assert(
    isArguments({ length: 2, 0: "fake", 1: "args" }) === falseValue(),
    "isArguments should reject array-like objects"
  )

  assert(
    isArguments({ callee: function () {}, length: 1 }) === falseValue(),
    "isArguments should reject objects mimicking arguments"
  )

  assert(isArguments("not arguments") === falseValue(), "isArguments should reject strings")

  assert(isArguments(42) === falseValue(), "isArguments should reject number primitives")

  assert(isArguments(null) === falseValue(), "isArguments should reject null")

  assert(isArguments(undefined()) === falseValue(), "isArguments should reject undefined")

  assert(isArguments(() => {}) === falseValue(), "isArguments should reject functions\n")
  // --- NOOP ---
  assert(isFunction(noop), "noop should be an executable function")

  const result = noop("enterprise", 10, { scale: True() })
  assert(result === undefined(), "noop must strictly return undefined regardless of arguments")

  assert(isPrimitive(noop()), "the return value of noop must be a primitive type\n")

  // --- IDENTITY ---
  assert(identity(42) === 42, "identity should return the same integer")
  assert(identity(-3.14) === -3.14, "identity should return the same float")
  assert(identity(one) === one, "identity should return the one constant unchanged")
  assert(identity(zero) === zero, "identity should return the zero constant unchanged")
  assert(identity(True()) === True(), "identity should return True() unchanged")
  assert(identity(falseValue()) === falseValue(), "identity should return falseValue() unchanged")
  assert(identity("enterprise") === "enterprise", "identity should return string unchanged")
  assert(identity(null) === null, "identity should return null unchanged")
  assert(identity(undefined()) === undefined(), "identity should return undefined unchanged")
  assert(isnan(identity(NaN)), "identity should preserve NaN")
  assert(identity(Infinity) === Infinity, "identity should preserve Infinity")
  assert(identity(-Infinity) === -Infinity, "identity should preserve negative Infinity\n")

  // --- CONSTANT (PURE VALUE WRAPPER) ---
  const cNum = constant(42)
  assert(
    typeof cNum === "function" && cNum() === 42,
    "constant should return a function that returns the original number"
  )

  const cOne = constant(one)
  assert(
    typeof cOne === "function" && cOne() === one,
    "constant should return a function that returns the original one constant"
  )

  const cZero = constant(zero)
  assert(
    typeof cZero === "function" && cZero() === zero,
    "constant should return a function that returns the original zero constant"
  )

  const cStr = constant("hello")
  assert(
    typeof cStr === "function" && cStr() === "hello",
    "constant should return a function that returns the original string"
  )

  const cObj = constant({ a: 1 })
  const objRef = cObj()
  assert(
    typeof cObj === "function" && objRef.a === 1,
    "constant should return a function that returns the same object reference"
  )

  const arr = [1, 2, 3]
  const cArr = constant(arr)
  assert(cArr() === arr, "constant should return a function that returns the same array reference")

  const fn = () => "x"
  const cFn = constant(fn)
  assert(cFn() === fn, "constant should return a function that returns the same function reference")

  const sym = Symbol("x")
  const cSym = constant(sym)
  assert(cSym() === sym, "constant should return a function that returns the same symbol")

  const cNaN = constant(NaN)
  assert(
    typeof cNaN === "function" && Number.isNaN(cNaN()),
    "constant should return a function that returns NaN unchanged"
  )

  const cInf = constant(Infinity)
  assert(cInf() === Infinity, "constant should return a function that returns Infinity unchanged")

  const cUndef = constant(undefined)
  assert(cUndef() === undefined, "constant should return a function that returns undefined unchanged")

  const cNull = constant(null)
  assert(cNull() === null, "constant should return a function that returns null unchanged")

  // --- STUB UNDEFINED ---
  assert(isFunction(stubUndefined), "stubUndefined should be a function")
  assert(stubUndefined() === undefined(), "stubUndefined should return undefined")
  assert(stubUndefined(1, 2, 3) === undefined(), "stubUndefined should ignore arguments and return undefined")
  assert(
    stubUndefined("anything") === undefined(),
    "stubUndefined should always return undefined regardless of input"
  )
  assert(stubUndefined(null) === undefined(), "stubUndefined should return undefined even when passed null\n")

  // --- STUB NULL ---
  assert(isFunction(stubNull), "stubNull should be a function")
  assert(stubNull() === null, "stubNull should return null")
  assert(stubNull(1, 2, 3) === null, "stubNull should ignore arguments and return null")
  assert(stubNull("anything") === null, "stubNull should always return null regardless of input")
  assert(stubNull(undefined()) === null, "stubNull should return null even when passed undefined\n")

  // --- STUB TRUE ---
  assert(isFunction(stubTrue), "stubTrue should be a function")
  assert(stubTrue() === True(), "stubTrue should return true")
  assert(stubTrue(1, 2, 3) === True(), "stubTrue should ignore arguments and return true")
  assert(stubTrue("anything") === True(), "stubTrue should always return true regardless of input")
  assert(stubTrue(falseValue()) === True(), "stubTrue should return true even when passed false\n")

  // --- STUB FALSE ---
  assert(isFunction(stubFalse), "stubFalse should be a function")
  assert(stubFalse() === falseValue(), "stubFalse should return false")
  assert(stubFalse(1, 2, 3) === falseValue(), "stubFalse should ignore arguments and return false")
  assert(stubFalse("anything") === falseValue(), "stubFalse should always return false regardless of input")
  assert(stubFalse(True()) === falseValue(), "stubFalse should return false even when passed true\n")

  // --- STUB NAN ---
  assert(isFunction(stubNaN), "stubNaN should be a function")
  assert(isnan(stubNaN()), "stubNaN should return NaN")
  assert(isnan(stubNaN(1, 2, 3)), "stubNaN should ignore arguments and return NaN")
  assert(isnan(stubNaN("anything")), "stubNaN should always return NaN regardless of input")
  assert(stubNaN() !== stubNaN(), "stubNaN should return NaN which is not equal to itself\n")

  // --- NOW ---
  assert(isNumber(now()), "now should return a number primitive")
  assert(isSafeInteger(now()), "now should return a safe integer")
  assert(now() > 1735689600000, "now should be a timestamp after Jan 1st 2025")
  
  const timeA = now()
  const timeB = now()
  assert(timeB >= timeA, "time should move forward or stay equal (monotonically non-decreasing)")

  const start = now()
  const end = now()
  assert(isNumber(subtract(end, start)), "now delta should be a valid subtract result\n")

  }

  // SCOPE 3: BROWSER (Webpack UMD Bundle with Node-Shim)
  {
    // Inject browser environment for the UMD loader
    const originalWindow = global.window
    const originalSelf = global.self
    
    global.window = global
    global.self = global
    
    // Load your browser mocks to satisfy the bundle's internal requirements
    require("../../misc/browser-mocks.js")
    
    const loliteBrowser = require("../../browser/index.js")
    

  // --- ARRAY UTILITIES ---
  const compactInput = [one, -5, zero, falseValue(), "hello", -10.5, undefined(), "world"]
  const compactResult = loliteBrowser.compact(compactInput)

  assert(compactResult.length === 5, "compact should remove falsy values but keep all other values")
  assert(loliteBrowser.compact("enterprise") === undefined(), "compact should coerce non-arrays to undefined\n")

  const flattenInput = [one, [2, [3, 4]], 5]
  const flattenResult = loliteBrowser.flatten(flattenInput)

  assert(flattenResult.length === 5, "flatten should resolve nested structures")
  assert(loliteBrowser.flatten("enterprise") === undefined(), "compact should coerce non-arrays to undefined\n")

  // --- FIRST (HEAD) ---
  assert(loliteBrowser.first([one, 2, 3]) === one, "first should return the first element of a populated array")
  assert(loliteBrowser.first(["enterprise", "quality"]) === "enterprise", "first should return the first string element")
  assert(loliteBrowser.first([falseValue(), True()]) === falseValue(), "first should return falsy first elements")
  assert(
    loliteBrowser.first([undefined(), null, zero]) === undefined(),
    "first should return undefined if it's the first element"
  )
  assert(loliteBrowser.first([]) === undefined(), "first should return undefined for empty arrays")

  const nestedArray = [[one]]
  assert(loliteBrowser.first([nestedArray]) === nestedArray, "first should return nested array structures with same reference")

  const obj = { a: one }
  assert(loliteBrowser.first([obj, {}]) === obj, "first should return the same object reference")

  const noopFn = () => {}
  assert(loliteBrowser.first([noopFn, () => {}]) === noopFn, "first should return the same function reference")

  assert(
    loliteBrowser.first([NaN, 2, 3]) !== loliteBrowser.first([NaN, 2, 3]),
    "first should return NaN but NaN should not equal itself"
  )
  assert(isnan(loliteBrowser.first([NaN, 2, 3])), "first should return NaN from array\n")

  // --- LAST ---
  assert(loliteBrowser.last([one, 2, 3]) === 3, "last should return the last element of a populated array")
  assert(loliteBrowser.last(["quality", "enterprise"]) === "enterprise", "last should return the last string element")
  assert(loliteBrowser.last([True(), falseValue()]) === falseValue(), "last should return falsy last elements")
  assert(
    loliteBrowser.last([zero, null, undefined()]) === undefined(),
    "last should return undefined if it's the last element"
  )
  assert(loliteBrowser.last([]) === undefined(), "last should return undefined for empty arrays")

  const nestedArrayLast = [[one]]
  assert(
    loliteBrowser.last([nestedArrayLast]) === nestedArrayLast,
    "last should return nested array structures with same reference"
  )

  const objLast = { a: one }
  assert(loliteBrowser.last([{}, objLast]) === objLast, "last should return the same object reference")

  const fnLast = () => {}
  assert(loliteBrowser.last([() => {}, fnLast]) === fnLast, "last should return the same function reference")

  assert(
    loliteBrowser.last([1, 2, NaN]) !== loliteBrowser.last([1, 2, NaN]),
    "last should return NaN but NaN should not equal itself"
  )
  assert(isnan(loliteBrowser.last([1, 2, NaN])), "last should return NaN from array\n")

  // --- TAIL ---
  assert(loliteBrowser.isArray(loliteBrowser.tail([one, 2, 3])), "tail should return an array")
  assert(loliteBrowser.tail([one, 2, 3]).length === 2, "tail should return all but the first element")
  assert(loliteBrowser.tail([one, 2, 3])[0] === 2, "tail should have 2 as the first element of the result")
  assert(loliteBrowser.tail([one, 2, 3])[1] === 3, "tail should have 3 as the second element of the result")
  assert(loliteBrowser.tail(["enterprise", "quality", "programming"]).length === 2, "tail should work with string arrays")
  assert(
    loliteBrowser.tail(["enterprise", "quality", "programming"])[0] === "quality",
    "tail should return correct string elements"
  )
  assert(loliteBrowser.tail([one]).length === 0, "tail of single-element array should return empty array")
  assert(loliteBrowser.tail([]).length === 0, "tail of empty array should return empty array")
  assert(loliteBrowser.tail("not an array") === undefined(), "tail should return undefined for non-arrays")
  assert(loliteBrowser.tail(null) === undefined(), "tail should return undefined for null")
  assert(loliteBrowser.tail(undefined()) === undefined(), "tail should return undefined for undefined")
  assert(loliteBrowser.tail(42) === undefined(), "tail should return undefined for numbers")

  const tailResult = loliteBrowser.tail([falseValue(), True(), zero])
  assert(tailResult[0] === True() && tailResult[1] === zero, "tail should preserve falsy and truthy values correctly")

  const objInArray = { a: one }
  const tailWithObj = loliteBrowser.tail([{}, objInArray])
  assert(tailWithObj[0] === objInArray, "tail should preserve object references")

  const fnInArray = () => {}
  const tailWithFn = loliteBrowser.tail([() => {}, fnInArray])
  assert(tailWithFn[0] === fnInArray, "tail should preserve function references\n")

  // --- INITIAL ---
  assert(loliteBrowser.isArray(loliteBrowser.initial([one, 2, 3])), "initial should return an array")
  assert(loliteBrowser.initial([one, 2, 3]).length === 2, "initial should return all but the last element")
  assert(loliteBrowser.initial([one, 2, 3])[0] === one, "initial should have 1 as the first element of the result")
  assert(loliteBrowser.initial([one, 2, 3])[1] === 2, "initial should have 2 as the second element of the result")
  assert(
    loliteBrowser.initial(["enterprise", "quality", "programming"]).length === 2,
    "initial should work with string arrays"
  )
  assert(
    loliteBrowser.initial(["enterprise", "quality", "programming"])[0] === "enterprise",
    "initial should return correct string elements"
  )
  assert(loliteBrowser.initial([one]).length === 0, "initial of single-element array should return empty array")
  assert(loliteBrowser.initial([]).length === 0, "initial of empty array should return empty array")
  assert(loliteBrowser.initial("not an array") === undefined(), "initial should return undefined for non-arrays")
  assert(loliteBrowser.initial(null) === undefined(), "initial should return undefined for null")
  assert(loliteBrowser.initial(undefined()) === undefined(), "initial should return undefined for undefined")
  assert(loliteBrowser.initial(42) === undefined(), "initial should return undefined for numbers")

  const initialResult = loliteBrowser.initial([falseValue(), True(), zero])
  assert(
    initialResult[0] === falseValue() && initialResult[1] === True(),
    "initial should preserve falsy and truthy values correctly"
  )

  const objInArrayInitial = { a: one }
  const initialWithObj = loliteBrowser.initial([objInArrayInitial, {}])
  assert(initialWithObj[0] === objInArrayInitial, "initial should preserve object references")

  const fnInArrayInitial = () => {}
  const initialWithFn = loliteBrowser.initial([fnInArrayInitial, () => {}])
  assert(initialWithFn[0] === fnInArrayInitial, "initial should preserve function references\n")

  // --- SAMPLE ---
  const sampleArray = [1, 2, 3, 4, 5]
  const emptyArray = []
  const mixedArray = [falseValue(), True(), 0, "hello", null]

  assert(
    loliteBrowser.sample(sampleArray) >= 1 && loliteBrowser.sample(sampleArray) <= 5,
    "sample should return an element from the array"
  )

  assert(loliteBrowser.sample(emptyArray) === undefined(), "sample should return undefined for empty arrays")

  assert(mixedArray.includes(loliteBrowser.sample(mixedArray)), "sample should return an element from a mixed array")

  const singleElementArray = ["only"]
  assert(
    loliteBrowser.sample(singleElementArray) === "only",
    "sample should return the single element in a single-element array\n"
  )

  // --- TIMES ---
  assert(Array.isArray(loliteBrowser.times(2)), "times should return an array")
  assert(loliteBrowser.times(3).length === 3, "times should return an array of the correct length")
  assert(JSON.stringify(loliteBrowser.times(3)) === "[0,1,2]", "times should default to identity for values")
  assert(JSON.stringify(loliteBrowser.times(2, (i) => i * 2)) === "[0,2]", "times should apply the iteratee function")
  assert(JSON.stringify(loliteBrowser.times(0)) === "[]", "times should return an empty array for 0")
  assert(JSON.stringify(loliteBrowser.times(-1)) === "[]", "times should handle negative numbers gracefully (via array.from)")
  assert(JSON.stringify(loliteBrowser.times("2")) === "[0,1]", "times should coerce string numbers via array-like length")
  assert(JSON.stringify(loliteBrowser.times(NaN)) === "[]", "times should return empty array for NaN\n")

  // ---  ADDITION ---
  assert(loliteBrowser.add(one, one) === 2, "add should sum positive integers")
  assert(loliteBrowser.add(-5, -10) === -15, "add should sum negative integers")
  assert(loliteBrowser.add(2, 0.5) === 2.5, "add should handle positive decimals")
  assert(loliteBrowser.add(-2.5, 1.2) === -1.3, "add should handle negative decimals")
  assert(loliteBrowser.add("67", 2) === 2, "add should coerce non-number values to 0")
  assert(loliteBrowser.add(2, Infinity) === 2, "add should coerce non-finite values to 0")
  assert(loliteBrowser.add(2, NaN) === 2, "add should coerce NaN to zero\n")

  // ---  SUBTRACTION ---
  assert(loliteBrowser.subtract(5, one) === 4, "subtract should reverse state for positive subtrahends")
  assert(loliteBrowser.subtract(10, -5) === 15, "subtracting negative should trigger stateful addition")
  assert(loliteBrowser.subtract(-10.5, -2.5) === -8, "subtracting negative from negative should work")
  assert(loliteBrowser.subtract(Infinity, 5) === -5, "subtract should coerce non-finite value to zero")
  assert(loliteBrowser.subtract(5, "67") === 5, "subtract should coerce non-number value to zero")
  assert(loliteBrowser.subtract(2, NaN) === 2, "subtract should coerce NaN to zero\n")

  // ---  MULTIPLICATION ---
  assert(loliteBrowser.multiply(3, 2) === 6, "multiply should calculate 3 * 2")
  assert(loliteBrowser.multiply(-4, -5) === 20, "multiply should resolve double negatives to positive")
  assert(loliteBrowser.multiply(-3, 2) === -6, "multiply should maintain sign for single negative")
  assert(loliteBrowser.multiply(2, 4.5) === 9, "multiply should support decimal multiplicands")
  assert(loliteBrowser.multiply("67", 3) === 0, "multiply should coerce non-number value to zero")
  assert(loliteBrowser.multiply(Infinity, 67) === 0, "multiply should coerce non-finite value to zero")
  assert(loliteBrowser.multiply(2, NaN) === 0, "multiply should coerce NaN to zero\n")

  // ---  DIVISION ---
  assert(loliteBrowser.divide(10, 2) === 5, "divide should perform standard division")
  assert(loliteBrowser.divide(-10, -2) === 5, "divide should return positive for two negatives")
  assert(loliteBrowser.divide(10, 0) === Infinity, "divide by zero should return infinity")
  assert(loliteBrowser.divide(10, -0) === -Infinity, "divide by negative zero should return negative infinity")
  assert(isnan(loliteBrowser.divide(0, 0)), "divide 0/0 should return NaN")
  assert(loliteBrowser.divide(Infinity, 4) === 0, "divide should coerce non-finite value to zero")
  assert(loliteBrowser.divide("67", 67) === 0, "divide should coerce non-number value to zero")
  assert(loliteBrowser.divide(2, NaN) === Infinity, "divide should coerce NaN to zero\n")

  // ---  EXPONENTIATION ---
  assert(loliteBrowser.power(2, 3) === 8, "power should calculate 2^3")
  assert(loliteBrowser.power(-2, 3) === -8, "negative base with odd exponent should be negative")
  assert(loliteBrowser.power(-2, 2) === 4, "negative base with even exponent should be positive")
  assert(loliteBrowser.power(2, -1) === 0.5, "power should handle negative exponents")
  assert(loliteBrowser.power(5, zero) === one, "any number to power of zero should be one")
  assert(
    Math.abs(loliteBrowser.power(2, 0.5) - 1.4142135623730951) < 0.00001,
    "power should approximate sqrt(2) for exponent 0.5"
  )
  assert(Math.abs(loliteBrowser.power(8, loliteBrowser.divide(one, 3)) - 2) < 0.00001, "power should calculate 8^(1/3) as 2")
  assert(Math.abs(loliteBrowser.power(10, -0.5) - 0.3162277) < 0.0001, "power should handle negative decimal exponents")
  assert(loliteBrowser.power(567, "67") === one, "power should coerce non-number value to zero")
  assert(loliteBrowser.power(Infinity, 3) === 0, "power should coerce non-finite value to zero")
  assert(loliteBrowser.power(2, NaN) === 1, "power should coerce NaN to zero\n")

  // ---  INVERTING & ABS ---
  assert(loliteBrowser.invert(5) === -5, "invert should negate 5 to -5")
  assert(isNegativeZero(loliteBrowser.invert(0)), "invert should negate 0 to -0")
  assert(isNegativeZero(loliteBrowser.invert("67")), "invert should negate non-number value to negative zero")
  assert(loliteBrowser.invert(Infinity) === -Infinity, "invert should negate infinity to negative infinity")
  assert(isNegativeZero(loliteBrowser.invert(NaN)), "invert should coerce NaN to zero\n")

  assert(loliteBrowser.abs(-42) === 42, "abs should orchestrate inversion for negative 42")
  assert(loliteBrowser.abs(10) === 10, "abs should return positive value as-is")
  assert(loliteBrowser.abs("67") === 0, "abs should coerce non-number value to zero")
  assert(loliteBrowser.abs(Infinity) === 0, "abs should coerce non-finite value to zero")
  assert(loliteBrowser.abs(NaN) === 0, "abs should coerce NaN to zero\n")

  // ---  FLOOR ---
  assert(loliteBrowser.floor(2.9) === 2, "floor should strip decimals from positive numbers")
  assert(loliteBrowser.floor(-2.1) === -3, "floor should move down the number line for negative numbers")
  assert(loliteBrowser.floor(5) === 5, "floor should return integers unchanged")
  assert(loliteBrowser.floor("67") === 0, "floor should coerce non-number value to zero")
  assert(loliteBrowser.floor(Infinity) === 0, "floor should coerce non-finite value to zero")
  assert(loliteBrowser.floor(NaN) === 0, "floor should coerce NaN to zero\n")

  // ---  CEIL & ROUND ---
  assert(loliteBrowser.ceil(2.1) === 3, "ceil should move 2.1 up to 3")
  assert(loliteBrowser.ceil(-2.9) === -2, "ceil should move -2.9 up to -2")
  assert(loliteBrowser.ceil("67") === 0, "ceil should coerce non-number value to zero")
  assert(loliteBrowser.ceil(Infinity) === 0, "ceil should coerce non-finite value to zero")
  assert(loliteBrowser.ceil(NaN) === 0, "ceil should coerce NaN to zero\n")

  assert(loliteBrowser.round(2.4) === 2, "round should round 2.4 down to 2")
  assert(loliteBrowser.round(2.5) === 3, "round should round 2.5 up to 3")
  assert(loliteBrowser.round(-2.51) === -3, "round should handle negative midpoint biases")
  assert(loliteBrowser.round("67") === 0, "round should coerce non-number value to zero")
  assert(loliteBrowser.round(Infinity) === 0, "round should coerce non-finite value to zero")
  assert(loliteBrowser.round(NaN) === 0, "round should coerce NaN to zero\n")

  // --- MODULO ---
  assert(loliteBrowser.modulo(10, 3) === 1, "modulo should return 1 for 10 % 3")
  assert(loliteBrowser.modulo(-10, 3) === 2, "modulo should handle negative dividends per floor-division logic")
  assert(isnan(loliteBrowser.modulo(10, zero)), "modulo by zero should return NaN")
  assert(isnan(loliteBrowser.modulo(32, "67")), "modulo should coerce non-number value to zero")
  assert(isnan(loliteBrowser.modulo(50, Infinity)), "modulo should coerce non-finite value to zero")
  assert(isnan(loliteBrowser.modulo(2, NaN)), "modulo should coerce NaN to zero\n")

  // --- SIGN ---
  assert(loliteBrowser.sign(5) === 1, "sign should return 1 for positive numbers")
  assert(loliteBrowser.sign(-5) === -1, "sign should return -1 for negative numbers")
  assert(loliteBrowser.sign(0) === 0, "sign should return 0 for positive zero")
  assert(isNegativeZero(loliteBrowser.sign(-0)), "sign should return -0 for negative zero")
  assert(loliteBrowser.sign("garbage") === 0, "sign should coerce non-number value to zero")
  assert(loliteBrowser.sign(NaN) === 0, "sign should coerce NaN to zero")
  assert(loliteBrowser.sign(Infinity) === 1, "sign should sign positive infinite value as positive")
  assert(loliteBrowser.sign(-Infinity) === -1, "sign should sign negative infinite value as negative\n")

  // --- TRUNC ---
  assert(loliteBrowser.trunc(2.9) === 2, "trunc should remove decimals from positive numbers")
  assert(loliteBrowser.trunc(-2.9) === -2, "trunc should remove decimals from negative numbers")
  assert(loliteBrowser.trunc(5) === 5, "trunc should return integers unchanged")
  assert(loliteBrowser.trunc(0) === 0, "trunc should return positive zero as-is")
  assert(isNegativeZero(loliteBrowser.trunc(-0)), "trunc should preserve negative zero")
  assert(loliteBrowser.trunc("67") === 0, "trunc should coerce non-number value to zero")
  assert(loliteBrowser.trunc(Infinity) === 0, "trunc should coerce non-finite value to zero")
  assert(loliteBrowser.trunc(NaN) === 0, "trunc should coerce NaN to zero\n")

  // --- MIN & MAX
  assert(loliteBrowser.max(5, 10) === 10, "max should identify 10 as the greater value")
  assert(loliteBrowser.max(-5, -10) === -5, "max should handle negative comparison")
  assert(loliteBrowser.max(5, "garbage") === 5, "max should coerce non-number to zero (comparing 5 and 0)")
  assert(loliteBrowser.max(Infinity, -5) === 0, "max should coerce non-finite to zero (comparing 0 and -5)")
  assert(loliteBrowser.max(NaN, NaN) === 0, "max should return zero for dual NaN inputs\n")

  assert(loliteBrowser.min(5, 10) === 5, "min should identify 5 as the lesser value")
  assert(loliteBrowser.min(-5, -10) === -10, "min should handle negative comparison")
  assert(loliteBrowser.min(5, "garbage") === 0, "min should coerce non-number to zero (comparing 5 and 0)")
  assert(loliteBrowser.min(Infinity, 5) === 0, "min should coerce non-finite to zero (comparing 0 and 5)")
  assert(loliteBrowser.min(NaN, NaN) === 0, "min should return zero for dual NaN inputs\n")

  // --- CLAMP ---
  assert(loliteBrowser.clamp(5, 1, 10) === 5, "clamp should keep value within bounds")
  assert(loliteBrowser.clamp(15, 1, 10) === 10, "clamp should cap value at upper bound")
  assert(loliteBrowser.clamp(-5, 1, 10) === 1, "clamp should raise value to lower bound")
  assert(loliteBrowser.clamp(5, 5, 5) === 5, "clamp should handle identical bounds")
  assert(loliteBrowser.clamp(5, 10, 1) === 10, "clamp with reversed bounds should prioritize lower bound")
  assert(loliteBrowser.clamp(Infinity, -5, 5) === 0, "clamp should coerce non-finite value to zero")
  assert(loliteBrowser.clamp(5, "garbage", 10) === 5, "clamp should coerce non-number lower bound to zero")
  assert(loliteBrowser.clamp(5, 1, NaN) === 1, "clamp should coerce non-finite upper bound to zero")
  assert(loliteBrowser.clamp(NaN, NaN, NaN) === 0, "clamp should handle triple NaN coercion\n")

  // --- LOGICAL AND ---
  assert(loliteBrowser.and(1, True()) === True(), "and should return second operand (true) when first is trthy")
  assert(
    loliteBrowser.and("truthy", falseValue()) === falseValue(),
    "and should return second operand (false) when first is truthy"
  )
  assert(
    loliteBrowser.and(falseValue(), True()) === falseValue(),
    "and should return first operand (false) when not(a) is truthy"
  )

  const falseInput = zero
  assert(loliteBrowser.and(falseInput, True()) === falseInput, "and must strictly return the first false object\n")

  // --- LOGICAL OR ---
  assert(loliteBrowser.or(one, zero) === one, "or should return the first truthy value (1)")
  assert(loliteBrowser.or(zero, 2) === 2, "or should return the second value if the first is falsy")
  assert(loliteBrowser.or(falseValue(), zero) === zero, "or should return the second falsy value if both are falsy")
  assert(loliteBrowser.or("hello", "world") === "hello", "or should return the first truthy string and ignore the second")

  const valA = "lolite"
  const valB = "standard"
  assert(loliteBrowser.or(valA, valB) === valA, "or should successfully navigate the random alphabet branch to return 'a'")

  // Verify it handles our custom True/falseValue packages
  assert(loliteBrowser.or(falseValue(), True()) === True(), "or should return True() when first operand is falseValue()\n")

  // --- LOGICAL NOT ---
  assert(loliteBrowser.not(True()) === falseValue(), "not should negate true to false")
  assert(loliteBrowser.not(falseValue()) === True(), "not should negate false to true")
  assert(loliteBrowser.not(0) === True(), "not should negate 0 to true")
  assert(loliteBrowser.not("truthy") === falseValue(), "not should negate truthy string to false\n")

  // --- LOGICAL NAND ---
  assert(loliteBrowser.nand(True(), True()) === falseValue(), "nand should return false for two truthy values")
  assert(loliteBrowser.nand(falseValue(), True()) === True(), "nand should return true if at least one is falsy")
  assert(loliteBrowser.nand(zero, zero) === True(), "nand should return true for two falsy zeros")
  assert(loliteBrowser.nand("truthy", falseValue()) === True(), "nand should handle truthy strings and return true\n")

  // --- LOGICAL NOR ---
  assert(loliteBrowser.nor(falseValue(), falseValue()) === True(), "nor should return true when both operands are falsy")
  assert(loliteBrowser.nor(one, zero) === falseValue(), "nor should return false if the first operand is truthy")
  assert(loliteBrowser.nor(zero, one) === falseValue(), "nor should return false if the second operand is truthy")
  assert(loliteBrowser.nor(True(), True()) === falseValue(), "nor should return false for dual truthy inputs\n")

  // --- LOGICAL XOR ---
  assert(loliteBrowser.xor(True(), falseValue()) === True(), "xor should return true if operands are different")
  assert(loliteBrowser.xor(falseValue(), True()) === True(), "xor should return true if operands are different")
  assert(loliteBrowser.xor(True(), True()) === falseValue(), "xor should return false if both are true")
  assert(loliteBrowser.xor(falseValue(), falseValue()) === falseValue(), "xor should return false if both are false")
  assert(loliteBrowser.xor(one, zero) === True(), "xor should handle truthy/falsy coercion\n")

  // --- LOGICAL XNOR ---
  assert(loliteBrowser.xnor(True(), True()) === True(), "xnor should return true if both are true")
  assert(loliteBrowser.xnor(falseValue(), falseValue()) === True(), "xnor should return true if both are false")
  assert(loliteBrowser.xnor(True(), falseValue()) === falseValue(), "xnor should return false if operands differ")
  assert(
    loliteBrowser.xnor(one, one) === True(),
    "xnor should return true for coerced truthy values via the xor-not pipeline\n"
  )

  // --- isTruthy and isFalsy ---
  assert(loliteBrowser.isTruthy(one) === True(), "isTruthy should identify 1 as truthy")
  assert(loliteBrowser.isTruthy(zero) === falseValue(), "isTruthy should identify 0 as not truthy")
  assert(loliteBrowser.isFalsy("") === True(), "isFalsy should identify empty strings as falsy")
  assert(loliteBrowser.isFalsy(True()) === falseValue(), "isFalsy should identify true as not falsy\n")

  // --- UNDEFINED AUDITS ---
  assert(loliteBrowser.isUndefined(undefined()) === True(), "isUndefined should identify undefined as undefined")
  assert(loliteBrowser.isUndefined() === True(), "isUndefined should identify no arguments as undefined")
  assert(loliteBrowser.isUndefined(null) === falseValue(), "isUndefined should identify null as not undefined")
  assert(loliteBrowser.isUndefined(zero) === falseValue(), "isUndefined should identify the zero constant as not undefined\n")

  // --- NULL AUDITS ---
  assert(loliteBrowser.isNull(null) === True(), "isNull should identify null as null")
  assert(loliteBrowser.isNull({}) === falseValue(), "isNull should identify an empty object as not null")
  assert(loliteBrowser.isNull(undefined()) === falseValue(), "isNull should identify undefined as not null")
  assert(loliteBrowser.isNull(zero) === falseValue(), "isNull should identify the zero constant as not null\n")

  // --- NIL AUDITS ---
  assert(loliteBrowser.isNil(null) === True(), "isNil should identify null as nil")
  assert(loliteBrowser.isNil(undefined()) === True(), "isNil should identify undefined as nil")
  assert(loliteBrowser.isNil(zero) === falseValue(), "isNil should identify the zero constant as not nil")
  assert(loliteBrowser.isNil("") === falseValue(), "isNil should identify an empty string as not nil\n")

  // --- BOOLEAN AUDITS ---
  assert(loliteBrowser.isBoolean(True()) === True(), "isBoolean should identify true as true")
  assert(loliteBrowser.isBoolean(falseValue()) === True(), "isBoolean should identify false as true")
  assert(loliteBrowser.isBoolean(new Object(True())) === falseValue(), "isBoolean should identify boolean objects as false")
  assert(loliteBrowser.isBoolean("true") === falseValue(), "isBoolean should identify strings as not booleans\n")

  // --- NUMBER AUDITS ---
  assert(loliteBrowser.isNumber(42) === True(), "isNumber should identify integer primitives as numbers")
  assert(loliteBrowser.isNumber(3.14) === True(), "isNumber should identify float primitives as numbers")
  assert(loliteBrowser.isNumber(zero) === True(), "isNumber should identify the zero constant as a number")
  assert(loliteBrowser.isNumber(NaN) === True(), "isNumber should identify NaN as a number primitive")
  assert(loliteBrowser.isNumber(Infinity) === True(), "isNumber should identify Infinity as a number primitive")
  assert(loliteBrowser.isNumber(-Infinity) === True(), "isNumber should identify negative Infinity as a number primitive")
  assert(loliteBrowser.isNumber(new Number(10)) === falseValue(), "isNumber should reject Number objects (non-primitive)")
  assert(loliteBrowser.isNumber("10") === falseValue(), "isNumber should reject numeric strings")
  assert(loliteBrowser.isNumber(null) === falseValue(), "isNumber should reject null\n")

  // --- BIGINT AUDITS ---
  assert(loliteBrowser.isBigInt(10n) === True(), "isBigInt should identify bigint primitives")
  assert(
    loliteBrowser.isBigInt(BigInt(9007199254740991)) === True(),
    "isBigInt should identify values created via BigInt constructor"
  )
  assert(loliteBrowser.isBigInt(Object(10n)) === falseValue(), "isBigInt should reject BigInt objects (non-primitive)")
  assert(loliteBrowser.isBigInt(10) === falseValue(), "isBigInt should reject standard number primitives")
  assert(loliteBrowser.isBigInt("10n") === falseValue(), "isBigInt should reject string representations of bigints")
  assert(loliteBrowser.isBigInt(null) === falseValue(), "isBigInt should return false for null\n")

  // --- STRING AUDITS ---
  assert(loliteBrowser.isString("enterprise") === True(), "isString should identify string primitives as true")
  assert(loliteBrowser.isString("") === True(), "isString should identify empty string primitives as true")
  assert(loliteBrowser.isString(String("10x")) === True(), "isString should identify strings cast via String() constructor")
  assert(
    loliteBrowser.isString(new String("legacy")) === falseValue(),
    "isString should reject String objects to maintain primitive-strictness"
  )
  assert(loliteBrowser.isString(42) === falseValue(), "isString should reject number primitives")
  assert(loliteBrowser.isString(null) === falseValue(), "isString should return false for null")
  assert(loliteBrowser.isString(undefined()) === falseValue(), "isString should return false for undefined")
  assert(
    loliteBrowser.isString({ toString: () => "I am a string" }) === falseValue(),
    "isString should reject objects with toString methods\n"
  )

  // --- SYMBOL AUDITS ---
  assert(loliteBrowser.isSymbol(Symbol()) === True(), "isSymbol should identify anonymous symbol primitives")
  assert(loliteBrowser.isSymbol(Symbol("enterprise")) === True(), "isSymbol should identify named symbol primitives")
  assert(loliteBrowser.isSymbol(Symbol.for("global")) === True(), "isSymbol should identify global symbols from the registry")
  assert(loliteBrowser.isSymbol(Symbol.iterator) === True(), "isSymbol should identify well-known built-in symbols")
  assert(loliteBrowser.isSymbol(Object(Symbol())) === falseValue(), "isSymbol should reject Symbol objects (non-primitive)")
  assert(loliteBrowser.isSymbol("symbol") === falseValue(), "isSymbol should reject strings that happen to name the type")
  assert(loliteBrowser.isSymbol(null) === falseValue(), "isSymbol should return false for null")
  assert(loliteBrowser.isSymbol(zero) === falseValue(), "isSymbol should return false for the zero constant\n")

  // --- UNIFIED PRIMITIVE PIPELINE ---
  assert(loliteBrowser.isPrimitive("enterprise") === True(), "isPrimitive should validate string primitives")
  assert(loliteBrowser.isPrimitive(42) === True(), "isPrimitive should validate number primitives")
  assert(loliteBrowser.isPrimitive(10n) === True(), "isPrimitive should validate bigint primitives")
  assert(loliteBrowser.isPrimitive(True()) === True(), "isPrimitive should validate boolean primitives")
  assert(loliteBrowser.isPrimitive(Symbol("lolite")) === True(), "isPrimitive should validate symbol primitives")
  assert(loliteBrowser.isPrimitive(null) === True(), "isPrimitive should validate null as a primitive")
  assert(loliteBrowser.isPrimitive(undefined()) === True(), "isPrimitive should validate undefined as a primitive")
  assert(loliteBrowser.isPrimitive({}) === falseValue(), "isPrimitive should reject objects (structural type)")
  assert(loliteBrowser.isPrimitive([]) === falseValue(), "isPrimitive should reject arrays (structural type)")
  assert(loliteBrowser.isPrimitive(() => {}) === falseValue(), "isPrimitive should reject functions (executable type)\n")

  // --- OBJECT AUDITS ---
  assert(loliteBrowser.isObject({}) === True(), "isObject should identify plain objects as true")
  assert(loliteBrowser.isObject([]) === True(), "isObject should identify arrays as true")
  assert(loliteBrowser.isObject(null) === True(), "isObject should return true for null per enterprise requirements")
  assert(loliteBrowser.isObject(() => {}) === falseValue(), "isObject should return false for functions")
  assert(loliteBrowser.isObject(42) === falseValue(), "isObject should return false for number primitives")
  assert(loliteBrowser.isObject("string") === falseValue(), "isObject should return false for string primitives\n")

  // --- FUNCTION AUDITS ---
  assert(loliteBrowser.isFunction(function () {}) === True(), "isFunction should identify standard functions")
  assert(loliteBrowser.isFunction(() => {}) === True(), "isFunction should identify arrow functions")
  assert(loliteBrowser.isFunction(Math.max) === True(), "isFunction should identify built-in functions")
  assert(loliteBrowser.isFunction({}) === falseValue(), "isFunction should return false for objects")
  assert(loliteBrowser.isFunction(null) === falseValue(), "isFunction should return false for null")
  assert(loliteBrowser.isFunction(undefined()) === falseValue(), "isFunction should return false for undefined\n")

  // --- ARRAY AUDITS ---
  assert(loliteBrowser.isArray([]) === True(), "isArray should identify empty array literals as true")
  assert(loliteBrowser.isArray([one, 2, "three"]) === True(), "isArray should identify populated arrays")
  assert(loliteBrowser.isArray(new Array(10)) === True(), "isArray should identify arrays created via constructor")
  assert(loliteBrowser.isArray({ length: 1, 0: "fake" }) === falseValue(), "isArray should reject array-like objects")
  assert(
    loliteBrowser.isArray("") === falseValue(),
    "isArray should reject string primitives despite having a length property"
  )
  assert(loliteBrowser.isArray(null) === falseValue(), "isArray should return false for null")
  assert(loliteBrowser.isArray(undefined()) === falseValue(), "isArray should return false for undefined\n")

  // --- MAP AUDITS ---
  assert(loliteBrowser.isMap(new Map()) === True(), "isMap should identify new Map instances")
  assert(loliteBrowser.isMap(new Map([["key", "value"]])) === True(), "isMap should identify populated Map instances")
  assert(loliteBrowser.isMap(new WeakMap()) === falseValue(), "isMap should reject WeakMap instances")
  assert(loliteBrowser.isMap({}) === falseValue(), "isMap should reject plain objects\n")

  // --- WEAKMAP AUDITS ---
  assert(loliteBrowser.isWeakMap(new WeakMap()) === True(), "isWeakMap should identify new WeakMap instances")
  assert(loliteBrowser.isWeakMap(new Map()) === falseValue(), "isWeakMap should reject standard Map instances")
  assert(loliteBrowser.isWeakMap(null) === falseValue(), "isWeakMap should return false for null\n")

  // --- SET AUDITS ---
  assert(loliteBrowser.isSet(new Set()) === True(), "isSet should identify new Set instances")
  assert(loliteBrowser.isSet(new Set([one, 2, 3])) === True(), "isSet should identify populated Set instances")
  assert(loliteBrowser.isSet(new WeakSet()) === falseValue(), "isSet should reject WeakSet instances")
  assert(loliteBrowser.isSet([]) === falseValue(), "isSet should reject arrays\n")

  // --- WEAKSET AUDITS ---
  assert(loliteBrowser.isWeakSet(new WeakSet()) === True(), "isWeakSet should identify new WeakSet instances")
  assert(loliteBrowser.isWeakSet(new Set()) === falseValue(), "isWeakSet should reject standard Set instances")
  assert(loliteBrowser.isWeakSet(undefined()) === falseValue(), "isWeakSet should return false for undefined\n")

  // --- PLAIN OBJECT AUDITS ---
  assert(loliteBrowser.isPlainObject({}) === True(), "isPlainObject should identify literals")
  assert(loliteBrowser.isPlainObject(Object.create(null)) === True(), "isPlainObject should identify null-prototype objects")
  assert(loliteBrowser.isPlainObject(new Date()) === falseValue(), "isPlainObject should reject Date instances")
  assert(
    loliteBrowser.isPlainObject(null) === falseValue(),
    "isPlainObject should reject null even though it is an object type\n"
  )

  // --- NON-NULL OBJECT AUDITS ---
  assert(loliteBrowser.isNonNullObject({ e: one }) === True(), "isNonNullObject should identify truthy objects")
  assert(loliteBrowser.isNonNullObject([]) === True(), "isNonNullObject should identify arrays as non-null objects")
  assert(loliteBrowser.isNonNullObject(null) === falseValue(), "isNonNullObject should reject null")
  assert(loliteBrowser.isNonNullObject(undefined()) === falseValue(), "isNonNullObject should reject undefined\n")

  // --- NAN AUDITS ---
  assert(loliteBrowser.isNaN(NaN) === True(), "isNaN should identify NaN as NaN")
  assert(loliteBrowser.isNaN(0) === falseValue(), "isNaN should reject zero")
  assert(loliteBrowser.isNaN(42) === falseValue(), "isNaN should reject number primitives that are not NaN")
  assert(loliteBrowser.isNaN(Infinity) === falseValue(), "isNaN should reject Infinity")
  assert(loliteBrowser.isNaN(-Infinity) === falseValue(), "isNaN should reject negative Infinity")
  assert(loliteBrowser.isNaN("NaN") === falseValue(), "isNaN should reject string representations of NaN")
  assert(loliteBrowser.isNaN(new Number(NaN)) === falseValue(), "isNaN should reject Number objects (non-primitive)")
  assert(loliteBrowser.isNaN(undefined()) === falseValue(), "isNaN should reject undefined")
  assert(loliteBrowser.isNaN(null) === falseValue(), "isNaN should reject null")
  assert(loliteBrowser.isNaN({}) === falseValue(), "isNaN should reject objects")
  assert(loliteBrowser.isNaN([]) === falseValue(), "isNaN should reject arrays")
  assert(loliteBrowser.isNaN(isnan) === falseValue(), "isNaN should reject functions")

  // --- FINITE AUDITS ---
  assert(loliteBrowser.isFinite(42) === True(), "isFinite should identify positive integers as finite")
  assert(loliteBrowser.isFinite(-42) === True(), "isFinite should identify negative integers as finite")
  assert(loliteBrowser.isFinite(3.14) === True(), "isFinite should identify decimal numbers as finite")
  assert(loliteBrowser.isFinite(zero) === True(), "isFinite should identify the zero constant as finite")
  assert(loliteBrowser.isFinite(one) === True(), "isFinite should identify the one constant as finite")

  assert(loliteBrowser.isFinite(Infinity) === falseValue(), "isFinite should reject positive Infinity")
  assert(loliteBrowser.isFinite(-Infinity) === falseValue(), "isFinite should reject negative Infinity")
  assert(loliteBrowser.isFinite(NaN) === falseValue(), "isFinite should reject NaN\n")

  assert(loliteBrowser.isFinite("42") === falseValue(), "isFinite should reject numeric strings")
  assert(loliteBrowser.isFinite("enterprise") === falseValue(), "isFinite should reject non-numeric strings")
  assert(loliteBrowser.isFinite(null) === falseValue(), "isFinite should reject null")
  assert(loliteBrowser.isFinite(undefined()) === falseValue(), "isFinite should reject undefined")
  assert(loliteBrowser.isFinite({}) === falseValue(), "isFinite should reject plain objects")
  assert(loliteBrowser.isFinite([]) === falseValue(), "isFinite should reject arrays")
  assert(loliteBrowser.isFinite(new Number(10)) === falseValue(), "isFinite should reject Number objects (non-primitive)")
  assert(loliteBrowser.isFinite(() => {}) === falseValue(), "isFinite should reject functions\n")

  // --- INTEGER AUDITS ---
  assert(loliteBrowser.isInteger(42) === True(), "isInteger should identify positive integer primitives")
  assert(loliteBrowser.isInteger(-42) === True(), "isInteger should identify negative integer primitives")
  assert(loliteBrowser.isInteger(zero) === True(), "isInteger should identify the zero constant as an integer")
  assert(loliteBrowser.isInteger(one) === True(), "isInteger should identify the one constant as an integer")

  assert(loliteBrowser.isInteger(3.14) === falseValue(), "isInteger should reject decimal numbers")
  assert(loliteBrowser.isInteger(-2.5) === falseValue(), "isInteger should reject negative decimals")
  assert(loliteBrowser.isInteger(NaN) === falseValue(), "isInteger should reject NaN")
  assert(loliteBrowser.isInteger(Infinity) === falseValue(), "isInteger should reject positive Infinity")
  assert(loliteBrowser.isInteger(-Infinity) === falseValue(), "isInteger should reject negative Infinity")

  assert(loliteBrowser.isInteger("42") === falseValue(), "isInteger should reject numeric strings")
  assert(loliteBrowser.isInteger("enterprise") === falseValue(), "isInteger should reject non-numeric strings")
  assert(loliteBrowser.isInteger(null) === falseValue(), "isInteger should reject null")
  assert(loliteBrowser.isInteger(undefined()) === falseValue(), "isInteger should reject undefined")
  assert(loliteBrowser.isInteger({}) === falseValue(), "isInteger should reject plain objects")
  assert(loliteBrowser.isInteger([]) === falseValue(), "isInteger should reject arrays")
  assert(loliteBrowser.isInteger(new Number(10)) === falseValue(), "isInteger should reject Number objects (non-primitive)")
  assert(loliteBrowser.isInteger(() => {}) === falseValue(), "isInteger should reject functions\n")

  // --- SAFE INTEGER AUDITS ---
  assert(loliteBrowser.isSafeInteger(42) === True(), "isSafeInteger should identify positive safe integers")
  assert(loliteBrowser.isSafeInteger(-42) === True(), "isSafeInteger should identify negative safe integers")
  assert(loliteBrowser.isSafeInteger(zero) === True(), "isSafeInteger should identify the zero constant as a safe integer")
  assert(loliteBrowser.isSafeInteger(one) === True(), "isSafeInteger should identify the one constant as a safe integer")

  // boundary tests
  assert(loliteBrowser.isSafeInteger(Number.MAX_SAFE_INTEGER) === True(), "isSafeInteger should accept MAX_SAFE_INTEGER")
  assert(loliteBrowser.isSafeInteger(Number.MIN_SAFE_INTEGER) === True(), "isSafeInteger should accept MIN_SAFE_INTEGER")

  // out-of-range integers
  assert(
    loliteBrowser.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) === falseValue(),
    "isSafeInteger should reject integers above MAX_SAFE_INTEGER"
  )
  assert(
    loliteBrowser.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) === falseValue(),
    "isSafeInteger should reject integers below MIN_SAFE_INTEGER"
  )

  // decimals
  assert(loliteBrowser.isSafeInteger(3.14) === falseValue(), "isSafeInteger should reject decimal numbers")
  assert(loliteBrowser.isSafeInteger(-2.5) === falseValue(), "isSafeInteger should reject negative decimals")

  // non-finite
  assert(loliteBrowser.isSafeInteger(Infinity) === falseValue(), "isSafeInteger should reject Infinity")
  assert(loliteBrowser.isSafeInteger(-Infinity) === falseValue(), "isSafeInteger should reject negative Infinity")
  assert(loliteBrowser.isSafeInteger(NaN) === falseValue(), "isSafeInteger should reject NaN")

  // non-numbers
  assert(loliteBrowser.isSafeInteger("42") === falseValue(), "isSafeInteger should reject numeric strings")
  assert(loliteBrowser.isSafeInteger("enterprise") === falseValue(), "isSafeInteger should reject non-numeric strings")
  assert(loliteBrowser.isSafeInteger(null) === falseValue(), "isSafeInteger should reject null")
  assert(loliteBrowser.isSafeInteger(undefined()) === falseValue(), "isSafeInteger should reject undefined")
  assert(loliteBrowser.isSafeInteger({}) === falseValue(), "isSafeInteger should reject plain objects")
  assert(loliteBrowser.isSafeInteger([]) === falseValue(), "isSafeInteger should reject arrays")
  assert(
    loliteBrowser.isSafeInteger(new Number(10)) === falseValue(),
    "isSafeInteger should reject Number objects (non-primitive)"
  )
  assert(loliteBrowser.isSafeInteger(() => {}) === falseValue(), "isSafeInteger should reject functions\n")

  // --- ARGUMENTS AUDITS ---
  ;(function () {
    assert(loliteBrowser.isArguments(arguments) === True(), "isArguments should identify real arguments objects")
  })()

  assert(
    loliteBrowser.isArguments(
      (function () {
        return arguments
      })(1, 2, 3)
    ) === True(),
    "isArguments should identify arguments returned from functions"
  )

  assert(loliteBrowser.isArguments([]) === falseValue(), "isArguments should reject arrays")

  assert(loliteBrowser.isArguments({}) === falseValue(), "isArguments should reject plain objects")

  assert(
    loliteBrowser.isArguments({ length: 2, 0: "fake", 1: "args" }) === falseValue(),
    "isArguments should reject array-like objects"
  )

  assert(
    loliteBrowser.isArguments({ callee: function () {}, length: 1 }) === falseValue(),
    "isArguments should reject objects mimicking arguments"
  )

  assert(loliteBrowser.isArguments("not arguments") === falseValue(), "isArguments should reject strings")

  assert(loliteBrowser.isArguments(42) === falseValue(), "isArguments should reject number primitives")

  assert(loliteBrowser.isArguments(null) === falseValue(), "isArguments should reject null")

  assert(loliteBrowser.isArguments(undefined()) === falseValue(), "isArguments should reject undefined")

  assert(loliteBrowser.isArguments(() => {}) === falseValue(), "isArguments should reject functions\n")
  // --- NOOP ---
  assert(loliteBrowser.isFunction(loliteBrowser.noop), "noop should be an executable function")

  const result = loliteBrowser.noop("enterprise", 10, { scale: True() })
  assert(result === undefined(), "noop must strictly return undefined regardless of arguments")

  assert(loliteBrowser.isPrimitive(loliteBrowser.noop()), "the return value of noop must be a primitive type\n")

  // --- IDENTITY ---
  assert(loliteBrowser.identity(42) === 42, "identity should return the same integer")
  assert(loliteBrowser.identity(-3.14) === -3.14, "identity should return the same float")
  assert(loliteBrowser.identity(one) === one, "identity should return the one constant unchanged")
  assert(loliteBrowser.identity(zero) === zero, "identity should return the zero constant unchanged")
  assert(loliteBrowser.identity(True()) === True(), "identity should return True() unchanged")
  assert(loliteBrowser.identity(falseValue()) === falseValue(), "identity should return falseValue() unchanged")
  assert(loliteBrowser.identity("enterprise") === "enterprise", "identity should return string unchanged")
  assert(loliteBrowser.identity(null) === null, "identity should return null unchanged")
  assert(loliteBrowser.identity(undefined()) === undefined(), "identity should return undefined unchanged")
  assert(isnan(loliteBrowser.identity(NaN)), "identity should preserve NaN")
  assert(loliteBrowser.identity(Infinity) === Infinity, "identity should preserve Infinity")
  assert(loliteBrowser.identity(-Infinity) === -Infinity, "identity should preserve negative Infinity\n")

  // --- CONSTANT (PURE VALUE WRAPPER) ---
  const cNum = loliteBrowser.constant(42)
  assert(
    typeof cNum === "function" && cNum() === 42,
    "constant should return a function that returns the original number"
  )

  const cOne = loliteBrowser.constant(one)
  assert(
    typeof cOne === "function" && cOne() === one,
    "constant should return a function that returns the original one constant"
  )

  const cZero = loliteBrowser.constant(zero)
  assert(
    typeof cZero === "function" && cZero() === zero,
    "constant should return a function that returns the original zero constant"
  )

  const cStr = loliteBrowser.constant("hello")
  assert(
    typeof cStr === "function" && cStr() === "hello",
    "constant should return a function that returns the original string"
  )

  const cObj = loliteBrowser.constant({ a: 1 })
  const objRef = cObj()
  assert(
    typeof cObj === "function" && objRef.a === 1,
    "constant should return a function that returns the same object reference"
  )

  const arr = [1, 2, 3]
  const cArr = loliteBrowser.constant(arr)
  assert(cArr() === arr, "constant should return a function that returns the same array reference")

  const fn = () => "x"
  const cFn = loliteBrowser.constant(fn)
  assert(cFn() === fn, "constant should return a function that returns the same function reference")

  const sym = Symbol("x")
  const cSym = loliteBrowser.constant(sym)
  assert(cSym() === sym, "constant should return a function that returns the same symbol")

  const cNaN = loliteBrowser.constant(NaN)
  assert(
    typeof cNaN === "function" && Number.isNaN(cNaN()),
    "constant should return a function that returns NaN unchanged"
  )

  const cInf = loliteBrowser.constant(Infinity)
  assert(cInf() === Infinity, "constant should return a function that returns Infinity unchanged")

  const cUndef = loliteBrowser.constant(undefined)
  assert(cUndef() === undefined, "constant should return a function that returns undefined unchanged")

  const cNull = loliteBrowser.constant(null)
  assert(cNull() === null, "constant should return a function that returns null unchanged")

  // --- STUB UNDEFINED ---
  assert(loliteBrowser.isFunction(loliteBrowser.stubUndefined), "stubUndefined should be a function")
  assert(loliteBrowser.stubUndefined() === undefined(), "stubUndefined should return undefined")
  assert(loliteBrowser.stubUndefined(1, 2, 3) === undefined(), "stubUndefined should ignore arguments and return undefined")
  assert(
    loliteBrowser.stubUndefined("anything") === undefined(),
    "stubUndefined should always return undefined regardless of input"
  )
  assert(loliteBrowser.stubUndefined(null) === undefined(), "stubUndefined should return undefined even when passed null\n")

  // --- STUB NULL ---
  assert(loliteBrowser.isFunction(loliteBrowser.stubNull), "stubNull should be a function")
  assert(loliteBrowser.stubNull() === null, "stubNull should return null")
  assert(loliteBrowser.stubNull(1, 2, 3) === null, "stubNull should ignore arguments and return null")
  assert(loliteBrowser.stubNull("anything") === null, "stubNull should always return null regardless of input")
  assert(loliteBrowser.stubNull(undefined()) === null, "stubNull should return null even when passed undefined\n")

  // --- STUB TRUE ---
  assert(loliteBrowser.isFunction(loliteBrowser.stubTrue), "stubTrue should be a function")
  assert(loliteBrowser.stubTrue() === True(), "stubTrue should return true")
  assert(loliteBrowser.stubTrue(1, 2, 3) === True(), "stubTrue should ignore arguments and return true")
  assert(loliteBrowser.stubTrue("anything") === True(), "stubTrue should always return true regardless of input")
  assert(loliteBrowser.stubTrue(falseValue()) === True(), "stubTrue should return true even when passed false\n")

  // --- STUB FALSE ---
  assert(loliteBrowser.isFunction(loliteBrowser.stubFalse), "stubFalse should be a function")
  assert(loliteBrowser.stubFalse() === falseValue(), "stubFalse should return false")
  assert(loliteBrowser.stubFalse(1, 2, 3) === falseValue(), "stubFalse should ignore arguments and return false")
  assert(loliteBrowser.stubFalse("anything") === falseValue(), "stubFalse should always return false regardless of input")
  assert(loliteBrowser.stubFalse(True()) === falseValue(), "stubFalse should return false even when passed true\n")

  // --- STUB NAN ---
  assert(loliteBrowser.isFunction(loliteBrowser.stubNaN), "stubNaN should be a function")
  assert(isnan(loliteBrowser.stubNaN()), "stubNaN should return NaN")
  assert(isnan(loliteBrowser.stubNaN(1, 2, 3)), "stubNaN should ignore arguments and return NaN")
  assert(isnan(loliteBrowser.stubNaN("anything")), "stubNaN should always return NaN regardless of input")
  assert(loliteBrowser.stubNaN() !== loliteBrowser.stubNaN(), "stubNaN should return NaN which is not equal to itself\n")

  // --- NOW ---
  assert(loliteBrowser.isNumber(loliteBrowser.now()), "now should return a number primitive")
  assert(loliteBrowser.isSafeInteger(loliteBrowser.now()), "now should return a safe integer")
  assert(loliteBrowser.now() > 1735689600000, "now should be a timestamp after Jan 1st 2025")
  
  const timeA = loliteBrowser.now()
  const timeB = loliteBrowser.now()
  assert(timeB >= timeA, "time should move forward or stay equal (monotonically non-decreasing)")

  const start = loliteBrowser.now()
  const end = loliteBrowser.now()
  assert(loliteBrowser.isNumber(loliteBrowser.subtract(end, start)), "now delta should be a valid loliteBrowser.subtract result\n")


    // Cleanup to prevent bleeding into other tests
    global.window = originalWindow
    global.self = originalSelf
  }
})

printAuditSummary()
