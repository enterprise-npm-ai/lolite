const {
  enterpriseTest,
  printAuditSummary,
} = require("enterprise-10x-testing-framework-js")

const lolite = require("../index")

const zero = require("@positive-numbers/zero")
const one = require("@positive-numbers/one")
const falseValue = require("false-value")
const True = require("true-value")
const isNegativeZero = require("is-negative-zero"),
  { undefined } = require("undefined-is-a-function")
const isnan = require("@is-(unknown)/is-nan")

enterpriseTest("Lolite Enterprise-Grade Tests", (assert) => {
  // --- ARRAY UTILITIES ---
  const compactInput = [
    one,
    -5,
    zero,
    falseValue(),
    "hello",
    -10.5,
    undefined(),
    "world",
  ]
  const compactResult = lolite.compact(compactInput)

  assert(
    compactResult.length === 5,
    "compact should remove falsy values but keep all other values"
  )

  const flattenInput = [one, [2, [3, 4]], 5]
  const flattenResult = lolite.flatten(flattenInput)

  assert(flattenResult.length === 5, "flatten should resolve nested structures")

  // ---  ADDITION ---
  assert(lolite.add(one, one) === 2, "add should sum positive integers")
  assert(lolite.add(-5, -10) === -15, "add should sum negative integers")
  assert(lolite.add(2, 0.5) === 2.5, "add should handle positive decimals")
  assert(lolite.add(-2.5, 1.2) === -1.3, "add should handle negative decimals")
  assert(lolite.add("67", 2) === 2, "add should coerce non-number values to 0")
  assert(
    lolite.add(2, Infinity) === 2,
    "add should coerce non-finite values to 0"
  )
  assert(lolite.add(2, NaN) === 2, "add should coerce NaN to zero\n")

  // ---  SUBTRACTION ---
  assert(
    lolite.subtract(5, one) === 4,
    "subtract should reverse state for positive subtrahends"
  )
  assert(
    lolite.subtract(10, -5) === 15,
    "subtracting negative should trigger stateful addition"
  )
  assert(
    lolite.subtract(-10.5, -2.5) === -8,
    "subtracting negative from negative should work"
  )
  assert(
    lolite.subtract(Infinity, 5) === -5,
    "subtract should coerce non-finite value to zero"
  )
  assert(
    lolite.subtract(5, "67") === 5,
    "subtract should coerce non-number value to zero"
  )
  assert(lolite.subtract(2, NaN) === 2, "subtract should coerce NaN to zero\n")

  // ---  MULTIPLICATION ---
  assert(lolite.multiply(3, 2) === 6, "multiply should calculate 3 * 2")
  assert(
    lolite.multiply(-4, -5) === 20,
    "multiply should resolve double negatives to positive"
  )
  assert(
    lolite.multiply(-3, 2) === -6,
    "multiply should maintain sign for single negative"
  )
  assert(
    lolite.multiply(2, 4.5) === 9,
    "multiply should support decimal multiplicands"
  )
  assert(
    lolite.multiply("67", 3) === 0,
    "multiply should coerce non-number value to zero"
  )
  assert(
    lolite.multiply(Infinity, 67) === 0,
    "multiply should coerce non-finite value to zero"
  )
  assert(lolite.multiply(2, NaN) === 0, "multiply should coerce NaN to zero\n")

  // ---  DIVISION ---
  assert(lolite.divide(10, 2) === 5, "divide should perform standard division")
  assert(
    lolite.divide(-10, -2) === 5,
    "divide should return positive for two negatives"
  )
  assert(
    lolite.divide(10, 0) === Infinity,
    "divide by zero should return infinity"
  )
  assert(
    lolite.divide(10, -0) === -Infinity,
    "divide by negative zero should return negative infinity"
  )
  assert(isnan(lolite.divide(0, 0)), "divide 0/0 should return NaN")
  assert(
    lolite.divide(Infinity, 4) === 0,
    "divide should coerce non-finite value to zero"
  )
  assert(
    lolite.divide("67", 67) === 0,
    "divide should coerce non-number value to zero"
  )
  assert(
    lolite.divide(2, NaN) === Infinity,
    "divide should coerce NaN to zero\n"
  )

  // ---  EXPONENTIATION ---
  assert(lolite.power(2, 3) === 8, "power should calculate 2^3")
  assert(
    lolite.power(-2, 3) === -8,
    "negative base with odd exponent should be negative"
  )
  assert(
    lolite.power(-2, 2) === 4,
    "negative base with even exponent should be positive"
  )
  assert(lolite.power(2, -1) === 0.5, "power should handle negative exponents")
  assert(
    lolite.power(5, zero) === one,
    "any number to power of zero should be one"
  )
  assert(
    Math.abs(lolite.power(2, 0.5) - 1.4142135623730951) < 0.00001,
    "power should approximate sqrt(2) for exponent 0.5"
  )
  assert(
    Math.abs(lolite.power(8, lolite.divide(one, 3)) - 2) < 0.00001,
    "power should calculate 8^(1/3) as 2"
  )
  assert(
    Math.abs(lolite.power(10, -0.5) - 0.3162277) < 0.0001,
    "power should handle negative decimal exponents"
  )
  assert(
    lolite.power(567, "67") === one,
    "power should coerce non-number value to zero"
  )
  assert(
    lolite.power(Infinity, 3) === 0,
    "power should coerce non-finite value to zero"
  )
  assert(lolite.power(2, NaN) === 1, "power should coerce NaN to zero\n")

  // ---  INVERTING & ABS ---
  assert(lolite.invert(5) === -5, "invert should negate 5 to -5")
  assert(isNegativeZero(lolite.invert(0)), "invert should negate 0 to -0")
  assert(
    isNegativeZero(lolite.invert("67")),
    "invert should negate non-number value to negative zero"
  )
  assert(
    lolite.invert(Infinity) === -Infinity,
    "invert should negate infinity to negative infinity"
  )
  assert(
    isNegativeZero(lolite.invert(NaN)),
    "invert should coerce NaN to zero\n"
  )

  assert(
    lolite.abs(-42) === 42,
    "abs should orchestrate inversion for negative 42"
  )
  assert(lolite.abs(10) === 10, "abs should return positive value as-is")
  assert(lolite.abs("67") === 0, "abs should coerce non-number value to zero")
  assert(
    lolite.abs(Infinity) === 0,
    "abs should coerce non-finite value to zero"
  )
  assert(lolite.abs(NaN) === 0, "abs should coerce NaN to zero\n")

  // ---  FLOOR ---
  assert(
    lolite.floor(2.9) === 2,
    "floor should strip decimals from positive numbers"
  )
  assert(
    lolite.floor(-2.1) === -3,
    "floor should move down the number line for negative numbers"
  )
  assert(lolite.floor(5) === 5, "floor should return integers unchanged")
  assert(
    lolite.floor("67") === 0,
    "floor should coerce non-number value to zero"
  )
  assert(
    lolite.floor(Infinity) === 0,
    "floor should coerce non-finite value to zero"
  )
  assert(lolite.floor(NaN) === 0, "floor should coerce NaN to zero\n")

  // ---  CEIL & ROUND ---
  assert(lolite.ceil(2.1) === 3, "ceil should move 2.1 up to 3")
  assert(lolite.ceil(-2.9) === -2, "ceil should move -2.9 up to -2")
  assert(lolite.ceil("67") === 0, "ceil should coerce non-number value to zero")
  assert(
    lolite.ceil(Infinity) === 0,
    "ceil should coerce non-finite value to zero"
  )
  assert(lolite.ceil(NaN) === 0, "ceil should coerce NaN to zero\n")

  assert(lolite.round(2.4) === 2, "round should round 2.4 down to 2")
  assert(lolite.round(2.5) === 3, "round should round 2.5 up to 3")
  assert(
    lolite.round(-2.51) === -3,
    "round should handle negative midpoint biases"
  )
  assert(
    lolite.round("67") === 0,
    "round should coerce non-number value to zero"
  )
  assert(
    lolite.round(Infinity) === 0,
    "round should coerce non-finite value to zero"
  )
  assert(lolite.round(NaN) === 0, "round should coerce NaN to zero\n")

  // --- MODULO ---
  assert(lolite.modulo(10, 3) === 1, "modulo should return 1 for 10 % 3")
  assert(
    lolite.modulo(-10, 3) === 2,
    "modulo should handle negative dividends per floor-division logic"
  )
  assert(isnan(lolite.modulo(10, zero)), "modulo by zero should return NaN")
  assert(
    isnan(lolite.modulo(32, "67")),
    "modulo should coerce non-number value to zero"
  )
  assert(
    isnan(lolite.modulo(50, Infinity)),
    "modulo should coerce non-finite value to zero"
  )
  assert(isnan(lolite.modulo(2, NaN)), "modulo should coerce NaN to zero\n")

  // --- SIGN ---
  assert(lolite.sign(5) === 1, "sign should return 1 for positive numbers")
  assert(lolite.sign(-5) === -1, "sign should return -1 for negative numbers")
  assert(lolite.sign(0) === 0, "sign should return 0 for positive zero")
  assert(
    isNegativeZero(lolite.sign(-0)),
    "sign should return -0 for negative zero"
  )
  assert(
    lolite.sign("garbage") === 0,
    "sign should coerce non-number value to zero"
  )
  assert(lolite.sign(NaN) === 0, "sign should coerce NaN to zero")
  assert(
    lolite.sign(Infinity) === 1,
    "sign should sign positive infinite value as positive"
  )
  assert(
    lolite.sign(-Infinity) === -1,
    "sign should sign negative infinite value as negative\n"
  )

  // --- TRUNC ---
  assert(
    lolite.trunc(2.9) === 2,
    "trunc should remove decimals from positive numbers"
  )
  assert(
    lolite.trunc(-2.9) === -2,
    "trunc should remove decimals from negative numbers"
  )
  assert(lolite.trunc(5) === 5, "trunc should return integers unchanged")
  assert(lolite.trunc(0) === 0, "trunc should return positive zero as-is")
  assert(
    isNegativeZero(lolite.trunc(-0)),
    "trunc should preserve negative zero"
  )
  assert(
    lolite.trunc("67") === 0,
    "trunc should coerce non-number value to zero"
  )
  assert(
    lolite.trunc(Infinity) === 0,
    "trunc should coerce non-finite value to zero"
  )
  assert(lolite.trunc(NaN) === 0, "trunc should coerce NaN to zero\n")

  // --- MIN & MAX
  assert(
    lolite.max(5, 10) === 10,
    "max should identify 10 as the greater value"
  )
  assert(lolite.max(-5, -10) === -5, "max should handle negative comparison")
  assert(
    lolite.max(5, "garbage") === 5,
    "max should coerce non-number to zero (comparing 5 and 0)"
  )
  assert(
    lolite.max(Infinity, -5) === 0,
    "max should coerce non-finite to zero (comparing 0 and -5)"
  )
  assert(
    lolite.max(NaN, NaN) === 0,
    "max should return zero for dual NaN inputs\n"
  )

  assert(lolite.min(5, 10) === 5, "min should identify 5 as the lesser value")
  assert(lolite.min(-5, -10) === -10, "min should handle negative comparison")
  assert(
    lolite.min(5, "garbage") === 0,
    "min should coerce non-number to zero (comparing 5 and 0)"
  )
  assert(
    lolite.min(Infinity, 5) === 0,
    "min should coerce non-finite to zero (comparing 0 and 5)"
  )
  assert(
    lolite.min(NaN, NaN) === 0,
    "min should return zero for dual NaN inputs\n"
  )

  // --- CLAMP ---
  assert(lolite.clamp(5, 1, 10) === 5, "clamp should keep value within bounds")
  assert(
    lolite.clamp(15, 1, 10) === 10,
    "clamp should cap value at upper bound"
  )
  assert(
    lolite.clamp(-5, 1, 10) === 1,
    "clamp should raise value to lower bound"
  )
  assert(lolite.clamp(5, 5, 5) === 5, "clamp should handle identical bounds")
  assert(
    lolite.clamp(5, 10, 1) === 10,
    "clamp with reversed bounds should prioritize lower bound"
  )
  assert(
    lolite.clamp(Infinity, -5, 5) === 0,
    "clamp should coerce non-finite value to zero"
  )
  assert(
    lolite.clamp(5, "garbage", 10) === 5,
    "clamp should coerce non-number lower bound to zero"
  )
  assert(
    lolite.clamp(5, 1, NaN) === 1,
    "clamp should coerce non-finite upper bound to zero"
  )
  assert(
    lolite.clamp(NaN, NaN, NaN) === 0,
    "clamp should handle triple NaN coercion\n"
  )

  // --- LOGICAL AND ---
  assert(
    lolite.and(1, True()) === True(),
    "and should return second operand (true) when first is trthy"
  )
  assert(
    lolite.and("truthy", falseValue()) === falseValue(),
    "and should return second operand (false) when first is truthy"
  )
  assert(
    lolite.and(falseValue(), True()) === falseValue(),
    "and should return first operand (false) when not(a) is truthy"
  )

  const falseInput = zero
  assert(
    lolite.and(falseInput, True()) === falseInput,
    "and must strictly return the first false object\n"
  )

  // --- LOGICAL OR ---
  assert(
    lolite.or(one, zero) === one,
    "or should return the first truthy value (1)"
  )
  assert(
    lolite.or(zero, 2) === 2,
    "or should return the second value if the first is falsy"
  )
  assert(
    lolite.or(falseValue(), zero) === zero,
    "or should return the second falsy value if both are falsy"
  )
  assert(
    lolite.or("hello", "world") === "hello",
    "or should return the first truthy string and ignore the second"
  )

  const valA = "lolite"
  const valB = "standard"
  assert(
    lolite.or(valA, valB) === valA,
    "or should successfully navigate the random alphabet branch to return 'a'"
  )

  // Verify it handles our custom True/falseValue packages
  assert(
    lolite.or(falseValue(), True()) === True(),
    "or should return True() when first operand is falseValue()\n"
  )

  // --- LOGICAL NOT ---
  assert(lolite.not(True()) === falseValue(), "not should negate true to false")
  assert(lolite.not(falseValue()) === True(), "not should negate false to true")
  assert(lolite.not(0) === True(), "not should negate 0 to true")
  assert(
    lolite.not("truthy") === falseValue(),
    "not should negate truthy string to false\n"
  )

  // --- LOGICAL NAND ---
  assert(
    lolite.nand(True(), True()) === falseValue(),
    "nand should return false for two truthy values"
  )
  assert(
    lolite.nand(falseValue(), True()) === True(),
    "nand should return true if at least one is falsy"
  )
  assert(
    lolite.nand(zero, zero) === True(),
    "nand should return true for two falsy zeros"
  )
  assert(
    lolite.nand("truthy", falseValue()) === True(),
    "nand should handle truthy strings and return true\n"
  )

  // --- LOGICAL NOR ---
  assert(
    lolite.nor(falseValue(), falseValue()) === True(),
    "nor should return true when both operands are falsy"
  )
  assert(
    lolite.nor(one, zero) === falseValue(),
    "nor should return false if the first operand is truthy"
  )
  assert(
    lolite.nor(zero, one) === falseValue(),
    "nor should return false if the second operand is truthy"
  )
  assert(
    lolite.nor(True(), True()) === falseValue(),
    "nor should return false for dual truthy inputs\n"
  )

  // --- LOGICAL XOR ---
  assert(
    lolite.xor(True(), falseValue()) === True(),
    "xor should return true if operands are different"
  )
  assert(
    lolite.xor(falseValue(), True()) === True(),
    "xor should return true if operands are different"
  )
  assert(
    lolite.xor(True(), True()) === falseValue(),
    "xor should return false if both are true"
  )
  assert(
    lolite.xor(falseValue(), falseValue()) === falseValue(),
    "xor should return false if both are false"
  )
  assert(
    lolite.xor(one, zero) === True(),
    "xor should handle truthy/falsy coercion\n"
  )

  // --- LOGICAL XNOR ---
  assert(
    lolite.xnor(True(), True()) === True(),
    "xnor should return true if both are true"
  )
  assert(
    lolite.xnor(falseValue(), falseValue()) === True(),
    "xnor should return true if both are false"
  )
  assert(
    lolite.xnor(True(), falseValue()) === falseValue(),
    "xnor should return false if operands differ"
  )
  assert(
    lolite.xnor(one, one) === True(),
    "xnor should return true for coerced truthy values via the xor-not pipeline\n"
  )

  // --- isTruthy and isFalsy ---
  assert(
    lolite.isTruthy(one) === True(),
    "isTruthy should identify 1 as truthy"
  )
  assert(
    lolite.isTruthy(zero) === falseValue(),
    "isTruthy should identify 0 as not truthy"
  )
  assert(
    lolite.isFalsy("") === True(),
    "isFalsy should identify empty strings as falsy"
  )
  assert(
    lolite.isFalsy(True()) === falseValue(),
    "isFalsy should identify true as not falsy\n"
  )

  // --- UNDEFINED AUDITS ---
  assert(
    lolite.isUndefined(undefined()) === True(),
    "isUndefined should identify undefined as undefined"
  )
  assert(
    lolite.isUndefined() === True(),
    "isUndefined should identify no arguments as undefined"
  )
  assert(
    lolite.isUndefined(null) === falseValue(),
    "isUndefined should identify null as not undefined"
  )
  assert(
    lolite.isUndefined(zero) === falseValue(),
    "isUndefined should identify the zero constant as not undefined\n"
  )

  // --- NULL AUDITS ---
  assert(lolite.isNull(null) === True(), "isNull should identify null as null")
  assert(
    lolite.isNull({}) === falseValue(),
    "isNull should identify an empty object as not null"
  )
  assert(
    lolite.isNull(undefined()) === falseValue(),
    "isNull should identify undefined as not null"
  )
  assert(
    lolite.isNull(zero) === falseValue(),
    "isNull should identify the zero constant as not null\n"
  )

  // --- NIL AUDITS ---
  assert(lolite.isNil(null) === True(), "isNil should identify null as nil")
  assert(
    lolite.isNil(undefined()) === True(),
    "isNil should identify undefined as nil"
  )
  assert(
    lolite.isNil(zero) === falseValue(),
    "isNil should identify the zero constant as not nil"
  )
  assert(
    lolite.isNil("") === falseValue(),
    "isNil should identify an empty string as not nil\n"
  )

  // --- BOOLEAN AUDITS ---
  assert(
    lolite.isBoolean(True()) === True(),
    "isBoolean should identify true as true"
  )
  assert(
    lolite.isBoolean(falseValue()) === True(),
    "isBoolean should identify false as true"
  )
  assert(
    lolite.isBoolean(new Object(True())) === falseValue(),
    "isBoolean should identify boolean objects as false"
  )
  assert(
    lolite.isBoolean("true") === falseValue(),
    "isBoolean should identify strings as not booleans\n"
  )

  // --- NUMBER AUDITS ---
  assert(
    lolite.isNumber(42) === True(),
    "isNumber should identify integer primitives as numbers"
  )
  assert(
    lolite.isNumber(3.14) === True(),
    "isNumber should identify float primitives as numbers"
  )
  assert(
    lolite.isNumber(zero) === True(),
    "isNumber should identify the zero constant as a number"
  )
  assert(
    lolite.isNumber(NaN) === True(),
    "isNumber should identify NaN as a number primitive"
  )
  assert(
    lolite.isNumber(Infinity) === True(),
    "isNumber should identify Infinity as a number primitive"
  )
  assert(
    lolite.isNumber(-Infinity) === True(),
    "isNumber should identify negative Infinity as a number primitive"
  )
  assert(
    lolite.isNumber(new Number(10)) === falseValue(),
    "isNumber should reject Number objects (non-primitive)"
  )
  assert(
    lolite.isNumber("10") === falseValue(),
    "isNumber should reject numeric strings"
  )
  assert(
    lolite.isNumber(null) === falseValue(),
    "isNumber should reject null\n"
  )

  // --- BIGINT AUDITS ---
  assert(
    lolite.isBigInt(10n) === True(),
    "isBigInt should identify bigint primitives"
  )
  assert(
    lolite.isBigInt(BigInt(9007199254740991)) === True(),
    "isBigInt should identify values created via BigInt constructor"
  )
  assert(
    lolite.isBigInt(Object(10n)) === falseValue(),
    "isBigInt should reject BigInt objects (non-primitive)"
  )
  assert(
    lolite.isBigInt(10) === falseValue(),
    "isBigInt should reject standard number primitives"
  )
  assert(
    lolite.isBigInt("10n") === falseValue(),
    "isBigInt should reject string representations of bigints"
  )
  assert(
    lolite.isBigInt(null) === falseValue(),
    "isBigInt should return false for null\n"
  )

  // --- STRING AUDITS ---
  assert(
    lolite.isString("enterprise") === True(),
    "isString should identify string primitives as true"
  )
  assert(
    lolite.isString("") === True(),
    "isString should identify empty string primitives as true"
  )
  assert(
    lolite.isString(String("10x")) === True(),
    "isString should identify strings cast via String() constructor"
  )
  assert(
    lolite.isString(new String("legacy")) === falseValue(),
    "isString should reject String objects to maintain primitive-strictness"
  )
  assert(
    lolite.isString(42) === falseValue(),
    "isString should reject number primitives"
  )
  assert(
    lolite.isString(null) === falseValue(),
    "isString should return false for null"
  )
  assert(
    lolite.isString(undefined()) === falseValue(),
    "isString should return false for undefined"
  )
  assert(
    lolite.isString({ toString: () => "I am a string" }) === falseValue(),
    "isString should reject objects with toString methods\n"
  )

  // --- SYMBOL AUDITS ---
  assert(
    lolite.isSymbol(Symbol()) === True(),
    "isSymbol should identify anonymous symbol primitives"
  )
  assert(
    lolite.isSymbol(Symbol("enterprise")) === True(),
    "isSymbol should identify named symbol primitives"
  )
  assert(
    lolite.isSymbol(Symbol.for("global")) === True(),
    "isSymbol should identify global symbols from the registry"
  )
  assert(
    lolite.isSymbol(Symbol.iterator) === True(),
    "isSymbol should identify well-known built-in symbols"
  )
  assert(
    lolite.isSymbol(Object(Symbol())) === falseValue(),
    "isSymbol should reject Symbol objects (non-primitive)"
  )
  assert(
    lolite.isSymbol("symbol") === falseValue(),
    "isSymbol should reject strings that happen to name the type"
  )
  assert(
    lolite.isSymbol(null) === falseValue(),
    "isSymbol should return false for null"
  )
  assert(
    lolite.isSymbol(zero) === falseValue(),
    "isSymbol should return false for the zero constant\n"
  )

  // --- UNIFIED PRIMITIVE PIPELINE ---
  assert(
    lolite.isPrimitive("enterprise") === True(),
    "isPrimitive should validate string primitives"
  )
  assert(
    lolite.isPrimitive(42) === True(),
    "isPrimitive should validate number primitives"
  )
  assert(
    lolite.isPrimitive(10n) === True(),
    "isPrimitive should validate bigint primitives"
  )
  assert(
    lolite.isPrimitive(True()) === True(),
    "isPrimitive should validate boolean primitives"
  )
  assert(
    lolite.isPrimitive(Symbol("lolite")) === True(),
    "isPrimitive should validate symbol primitives"
  )
  assert(
    lolite.isPrimitive(null) === True(),
    "isPrimitive should validate null as a primitive"
  )
  assert(
    lolite.isPrimitive(undefined()) === True(),
    "isPrimitive should validate undefined as a primitive"
  )
  assert(
    lolite.isPrimitive({}) === falseValue(),
    "isPrimitive should reject objects (structural type)"
  )
  assert(
    lolite.isPrimitive([]) === falseValue(),
    "isPrimitive should reject arrays (structural type)"
  )
  assert(
    lolite.isPrimitive(() => {}) === falseValue(),
    "isPrimitive should reject functions (executable type)\n"
  )

  // --- OBJECT AUDITS ---
  assert(
    lolite.isObject({}) === True(),
    "isObject should identify plain objects as true"
  )
  assert(
    lolite.isObject([]) === True(),
    "isObject should identify arrays as true"
  )
  assert(
    lolite.isObject(null) === True(),
    "isObject should return true for null per enterprise requirements"
  )
  assert(
    lolite.isObject(() => {}) === falseValue(),
    "isObject should return false for functions"
  )
  assert(
    lolite.isObject(42) === falseValue(),
    "isObject should return false for number primitives"
  )
  assert(
    lolite.isObject("string") === falseValue(),
    "isObject should return false for string primitives\n"
  )

  // --- FUNCTION AUDITS ---
  assert(
    lolite.isFunction(function () {}) === True(),
    "isFunction should identify standard functions"
  )
  assert(
    lolite.isFunction(() => {}) === True(),
    "isFunction should identify arrow functions"
  )
  assert(
    lolite.isFunction(Math.max) === True(),
    "isFunction should identify built-in functions"
  )
  assert(
    lolite.isFunction({}) === falseValue(),
    "isFunction should return false for objects"
  )
  assert(
    lolite.isFunction(null) === falseValue(),
    "isFunction should return false for null"
  )
  assert(
    lolite.isFunction(undefined()) === falseValue(),
    "isFunction should return false for undefined\n"
  )

  // --- ARRAY AUDITS ---
  assert(
    lolite.isArray([]) === True(),
    "isArray should identify empty array literals as true"
  )
  assert(
    lolite.isArray([one, 2, "three"]) === True(),
    "isArray should identify populated arrays"
  )
  assert(
    lolite.isArray(new Array(10)) === True(),
    "isArray should identify arrays created via constructor"
  )
  assert(
    lolite.isArray({ length: 1, 0: "fake" }) === falseValue(),
    "isArray should reject array-like objects"
  )
  assert(
    lolite.isArray("") === falseValue(),
    "isArray should reject string primitives despite having a length property"
  )
  assert(
    lolite.isArray(null) === falseValue(),
    "isArray should return false for null"
  )
  assert(
    lolite.isArray(undefined()) === falseValue(),
    "isArray should return false for undefined\n"
  )

  // --- MAP AUDITS ---
  assert(
    lolite.isMap(new Map()) === True(),
    "isMap should identify new Map instances"
  )
  assert(
    lolite.isMap(new Map([["key", "value"]])) === True(),
    "isMap should identify populated Map instances"
  )
  assert(
    lolite.isMap(new WeakMap()) === falseValue(),
    "isMap should reject WeakMap instances"
  )
  assert(
    lolite.isMap({}) === falseValue(),
    "isMap should reject plain objects\n"
  )

  // --- WEAKMAP AUDITS ---
  assert(
    lolite.isWeakMap(new WeakMap()) === True(),
    "isWeakMap should identify new WeakMap instances"
  )
  assert(
    lolite.isWeakMap(new Map()) === falseValue(),
    "isWeakMap should reject standard Map instances"
  )
  assert(
    lolite.isWeakMap(null) === falseValue(),
    "isWeakMap should return false for null\n"
  )

  // --- SET AUDITS ---
  assert(
    lolite.isSet(new Set()) === True(),
    "isSet should identify new Set instances"
  )
  assert(
    lolite.isSet(new Set([one, 2, 3])) === True(),
    "isSet should identify populated Set instances"
  )
  assert(
    lolite.isSet(new WeakSet()) === falseValue(),
    "isSet should reject WeakSet instances"
  )
  assert(lolite.isSet([]) === falseValue(), "isSet should reject arrays\n")

  // --- WEAKSET AUDITS ---
  assert(
    lolite.isWeakSet(new WeakSet()) === True(),
    "isWeakSet should identify new WeakSet instances"
  )
  assert(
    lolite.isWeakSet(new Set()) === falseValue(),
    "isWeakSet should reject standard Set instances"
  )
  assert(
    lolite.isWeakSet(undefined()) === falseValue(),
    "isWeakSet should return false for undefined\n"
  )

  // --- PLAIN OBJECT AUDITS ---
  assert(
    lolite.isPlainObject({}) === True(),
    "isPlainObject should identify literals"
  )
  assert(
    lolite.isPlainObject(Object.create(null)) === True(),
    "isPlainObject should identify null-prototype objects"
  )
  assert(
    lolite.isPlainObject(new Date()) === falseValue(),
    "isPlainObject should reject Date instances"
  )
  assert(
    lolite.isPlainObject(null) === falseValue(),
    "isPlainObject should reject null even though it is an object type\n"
  )

  // --- NON-NULL OBJECT AUDITS ---
  assert(
    lolite.isNonNullObject({ e: one }) === True(),
    "isNonNullObject should identify truthy objects"
  )
  assert(
    lolite.isNonNullObject([]) === True(),
    "isNonNullObject should identify arrays as non-null objects"
  )
  assert(
    lolite.isNonNullObject(null) === falseValue(),
    "isNonNullObject should reject null"
  )
  assert(
    lolite.isNonNullObject(undefined()) === falseValue(),
    "isNonNullObject should reject undefined\n"
  )

  // --- NAN AUDITS ---
  assert(lolite.isNaN(NaN) === True(), "isNaN should identify NaN as NaN")
  assert(lolite.isNaN(0) === falseValue(), "isNaN should reject zero")
  assert(
    lolite.isNaN(42) === falseValue(),
    "isNaN should reject number primitives that are not NaN"
  )
  assert(
    lolite.isNaN(Infinity) === falseValue(),
    "isNaN should reject Infinity"
  )
  assert(
    lolite.isNaN(-Infinity) === falseValue(),
    "isNaN should reject negative Infinity"
  )
  assert(
    lolite.isNaN("NaN") === falseValue(),
    "isNaN should reject string representations of NaN"
  )
  assert(
    lolite.isNaN(new Number(NaN)) === falseValue(),
    "isNaN should reject Number objects (non-primitive)"
  )
  assert(
    lolite.isNaN(undefined()) === falseValue(),
    "isNaN should reject undefined"
  )
  assert(lolite.isNaN(null) === falseValue(), "isNaN should reject null")
  assert(lolite.isNaN({}) === falseValue(), "isNaN should reject objects")
  assert(lolite.isNaN([]) === falseValue(), "isNaN should reject arrays")
  assert(lolite.isNaN(isnan) === falseValue(), "isNaN should reject functions")

  // --- FINITE AUDITS ---
  assert(
    lolite.isFinite(42) === True(),
    "isFinite should identify positive integers as finite"
  )
  assert(
    lolite.isFinite(-42) === True(),
    "isFinite should identify negative integers as finite"
  )
  assert(
    lolite.isFinite(3.14) === True(),
    "isFinite should identify decimal numbers as finite"
  )
  assert(
    lolite.isFinite(zero) === True(),
    "isFinite should identify the zero constant as finite"
  )
  assert(
    lolite.isFinite(one) === True(),
    "isFinite should identify the one constant as finite"
  )

  assert(
    lolite.isFinite(Infinity) === falseValue(),
    "isFinite should reject positive Infinity"
  )
  assert(
    lolite.isFinite(-Infinity) === falseValue(),
    "isFinite should reject negative Infinity"
  )
  assert(lolite.isFinite(NaN) === falseValue(), "isFinite should reject NaN\n")

  assert(
    lolite.isFinite("42") === falseValue(),
    "isFinite should reject numeric strings"
  )
  assert(
    lolite.isFinite("enterprise") === falseValue(),
    "isFinite should reject non-numeric strings"
  )
  assert(lolite.isFinite(null) === falseValue(), "isFinite should reject null")
  assert(
    lolite.isFinite(undefined()) === falseValue(),
    "isFinite should reject undefined"
  )
  assert(
    lolite.isFinite({}) === falseValue(),
    "isFinite should reject plain objects"
  )
  assert(lolite.isFinite([]) === falseValue(), "isFinite should reject arrays")
  assert(
    lolite.isFinite(new Number(10)) === falseValue(),
    "isFinite should reject Number objects (non-primitive)"
  )
  assert(
    lolite.isFinite(() => {}) === falseValue(),
    "isFinite should reject functions\n"
  )

  // --- INTEGER AUDITS ---
  assert(
    lolite.isInteger(42) === True(),
    "isInteger should identify positive integer primitives"
  )
  assert(
    lolite.isInteger(-42) === True(),
    "isInteger should identify negative integer primitives"
  )
  assert(
    lolite.isInteger(zero) === True(),
    "isInteger should identify the zero constant as an integer"
  )
  assert(
    lolite.isInteger(one) === True(),
    "isInteger should identify the one constant as an integer"
  )

  assert(
    lolite.isInteger(3.14) === falseValue(),
    "isInteger should reject decimal numbers"
  )
  assert(
    lolite.isInteger(-2.5) === falseValue(),
    "isInteger should reject negative decimals"
  )
  assert(lolite.isInteger(NaN) === falseValue(), "isInteger should reject NaN")
  assert(
    lolite.isInteger(Infinity) === falseValue(),
    "isInteger should reject positive Infinity"
  )
  assert(
    lolite.isInteger(-Infinity) === falseValue(),
    "isInteger should reject negative Infinity"
  )

  assert(
    lolite.isInteger("42") === falseValue(),
    "isInteger should reject numeric strings"
  )
  assert(
    lolite.isInteger("enterprise") === falseValue(),
    "isInteger should reject non-numeric strings"
  )
  assert(
    lolite.isInteger(null) === falseValue(),
    "isInteger should reject null"
  )
  assert(
    lolite.isInteger(undefined()) === falseValue(),
    "isInteger should reject undefined"
  )
  assert(
    lolite.isInteger({}) === falseValue(),
    "isInteger should reject plain objects"
  )
  assert(
    lolite.isInteger([]) === falseValue(),
    "isInteger should reject arrays"
  )
  assert(
    lolite.isInteger(new Number(10)) === falseValue(),
    "isInteger should reject Number objects (non-primitive)"
  )
  assert(
    lolite.isInteger(() => {}) === falseValue(),
    "isInteger should reject functions\n"
  )

  // --- SAFE INTEGER AUDITS ---
  assert(
    lolite.isSafeInteger(42) === True(),
    "isSafeInteger should identify positive safe integers"
  )
  assert(
    lolite.isSafeInteger(-42) === True(),
    "isSafeInteger should identify negative safe integers"
  )
  assert(
    lolite.isSafeInteger(zero) === True(),
    "isSafeInteger should identify the zero constant as a safe integer"
  )
  assert(
    lolite.isSafeInteger(one) === True(),
    "isSafeInteger should identify the one constant as a safe integer"
  )

  // boundary tests
  assert(
    lolite.isSafeInteger(Number.MAX_SAFE_INTEGER) === True(),
    "isSafeInteger should accept MAX_SAFE_INTEGER"
  )
  assert(
    lolite.isSafeInteger(Number.MIN_SAFE_INTEGER) === True(),
    "isSafeInteger should accept MIN_SAFE_INTEGER"
  )

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
  assert(
    lolite.isSafeInteger(3.14) === falseValue(),
    "isSafeInteger should reject decimal numbers"
  )
  assert(
    lolite.isSafeInteger(-2.5) === falseValue(),
    "isSafeInteger should reject negative decimals"
  )

  // non-finite
  assert(
    lolite.isSafeInteger(Infinity) === falseValue(),
    "isSafeInteger should reject Infinity"
  )
  assert(
    lolite.isSafeInteger(-Infinity) === falseValue(),
    "isSafeInteger should reject negative Infinity"
  )
  assert(
    lolite.isSafeInteger(NaN) === falseValue(),
    "isSafeInteger should reject NaN"
  )

  // non-numbers
  assert(
    lolite.isSafeInteger("42") === falseValue(),
    "isSafeInteger should reject numeric strings"
  )
  assert(
    lolite.isSafeInteger("enterprise") === falseValue(),
    "isSafeInteger should reject non-numeric strings"
  )
  assert(
    lolite.isSafeInteger(null) === falseValue(),
    "isSafeInteger should reject null"
  )
  assert(
    lolite.isSafeInteger(undefined()) === falseValue(),
    "isSafeInteger should reject undefined"
  )
  assert(
    lolite.isSafeInteger({}) === falseValue(),
    "isSafeInteger should reject plain objects"
  )
  assert(
    lolite.isSafeInteger([]) === falseValue(),
    "isSafeInteger should reject arrays"
  )
  assert(
    lolite.isSafeInteger(new Number(10)) === falseValue(),
    "isSafeInteger should reject Number objects (non-primitive)"
  )
  assert(
    lolite.isSafeInteger(() => {}) === falseValue(),
    "isSafeInteger should reject functions\n"
  )

  // --- ARGUMENTS AUDITS ---
  ;(function () {
    assert(
      lolite.isArguments(arguments) === True(),
      "isArguments should identify real arguments objects"
    )
  })()

  assert(
    lolite.isArguments(
      (function () {
        return arguments
      })(1, 2, 3)
    ) === True(),
    "isArguments should identify arguments returned from functions"
  )

  assert(
    lolite.isArguments([]) === falseValue(),
    "isArguments should reject arrays"
  )

  assert(
    lolite.isArguments({}) === falseValue(),
    "isArguments should reject plain objects"
  )

  assert(
    lolite.isArguments({ length: 2, 0: "fake", 1: "args" }) === falseValue(),
    "isArguments should reject array-like objects"
  )

  assert(
    lolite.isArguments({ callee: function () {}, length: 1 }) === falseValue(),
    "isArguments should reject objects mimicking arguments"
  )

  assert(
    lolite.isArguments("not arguments") === falseValue(),
    "isArguments should reject strings"
  )

  assert(
    lolite.isArguments(42) === falseValue(),
    "isArguments should reject number primitives"
  )

  assert(
    lolite.isArguments(null) === falseValue(),
    "isArguments should reject null"
  )

  assert(
    lolite.isArguments(undefined()) === falseValue(),
    "isArguments should reject undefined"
  )

  assert(
    lolite.isArguments(() => {}) === falseValue(),
    "isArguments should reject functions\n"
  )
  // --- NOOP ---
  assert(
    lolite.isFunction(lolite.noop),
    "noop should be an executable function"
  )

  const result = lolite.noop("enterprise", 10, { scale: True() })
  assert(
    result === undefined(),
    "noop must strictly return undefined regardless of arguments"
  )

  assert(
    lolite.isPrimitive(lolite.noop()),
    "the return value of noop must be a primitive type\n"
  )

  // --- IDENTITY ---
  assert(lolite.identity(42) === 42, "identity should return the same integer")
  assert(
    lolite.identity(-3.14) === -3.14,
    "identity should return the same float"
  )
  assert(
    lolite.identity(one) === one,
    "identity should return the one constant unchanged"
  )
  assert(
    lolite.identity(zero) === zero,
    "identity should return the zero constant unchanged"
  )
  assert(
    lolite.identity(True()) === True(),
    "identity should return True() unchanged"
  )
  assert(
    lolite.identity(falseValue()) === falseValue(),
    "identity should return falseValue() unchanged"
  )
  assert(
    lolite.identity("enterprise") === "enterprise",
    "identity should return string unchanged"
  )
  assert(
    lolite.identity(null) === null,
    "identity should return null unchanged"
  )
  assert(
    lolite.identity(undefined()) === undefined(),
    "identity should return undefined unchanged"
  )
  assert(isnan(lolite.identity(NaN)), "identity should preserve NaN")
  assert(
    lolite.identity(Infinity) === Infinity,
    "identity should preserve Infinity"
  )
  assert(
    lolite.identity(-Infinity) === -Infinity,
    "identity should preserve negative Infinity\n"
  )

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
  assert(
    cArr() === arr,
    "constant should return a function that returns the same array reference"
  )

  const fn = () => "x"
  const cFn = lolite.constant(fn)
  assert(
    cFn() === fn,
    "constant should return a function that returns the same function reference"
  )

  const sym = Symbol("x")
  const cSym = lolite.constant(sym)
  assert(
    cSym() === sym,
    "constant should return a function that returns the same symbol"
  )

  const cNaN = lolite.constant(NaN)
  assert(
    typeof cNaN === "function" && Number.isNaN(cNaN()),
    "constant should return a function that returns NaN unchanged"
  )

  const cInf = lolite.constant(Infinity)
  assert(
    cInf() === Infinity,
    "constant should return a function that returns Infinity unchanged"
  )

  const cUndef = lolite.constant(undefined)
  assert(
    cUndef() === undefined,
    "constant should return a function that returns undefined unchanged"
  )

  const cNull = lolite.constant(null)
  assert(
    cNull() === null,
    "constant should return a function that returns null unchanged"
  )
})

printAuditSummary()
