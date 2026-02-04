# LoLite: Utils For The Future

LoLite is a 10x enterprise-grade utility suite designed for productive and high-quality programming.

## Table Of Contents
* [Installation](#installation)
* [Importing](#importing)
* [What is this?](#what-is-this)
* [Tests](#tests)
* [Linting](#linting)
* [Building](#building)
* [License](#license)
* [Code Of Conduct](#code-of-conduct)
* [Contributing](#contributing)
* [Notice](#notice)
* [Documentation](#documentation)
  * [Array Utilities](#array-utilities)
  * [Math Utilities](#math-utilities)
  * [Logic Gates](#logic-gates)
  * [Validation Utilities](#validation-utilities)
  * [Simple Function Utilities](#simple-function-utilities)
* [Extended Documentation](#extended-documentation)
## Installation
As per 10x'ness, LoLite comes with many ways to install it.

The boring way:
```bash
npm install lolite
```
or, if you're more fancy:
```bash
npm install --save lolite
```
or, if you're less fancy:
```bash
npm i lolite
```
or, if you can't decide whether you're fancy or not:
```bash
npm i --save-dev lolite
```
or, if you're actually fancy:
```bash
yarn add lolite
```
or, if you're even more fancy:
```bash
pnpm add lolite
```
or, if you're super duper fancy:
```bash
nimstall lolite
```
or, if you're insane:
```bash
npm pkg set dependencies.lolite="*"
npm install
```
or, if you're *really* insane:
```bash
npm pkg set dependencies.lolite="*"
git clone https://github.com/enterprise-npm-ai/lolite.git node_modules/lolite
```
or, if you're sane:
```bash
# sane people don't use this library
```

## Importing
Import it like this:
```javascript
const lolite = require("lolite")
```
Or, if you're using ESM, this:
```javascript
import * as lolite from "lolite"
```
If you're on browser:
```js
<script src="https://unpkg.com/lolite-browser"></script>
```

## Individual packages
Only want one method from lolite? Well there are packages with individual lolite methods. For example, instead of installing `lolite` and using `lolite.add`, just install the package `lolite.add`. Or for private methods, like `lolite.__private.isNotInteger`, install the package `lolite.__private.isnotinteger`. All lowercase.

## What is this?
Ever wanted a 10x utility library? this library is part of [the 10x engineering maximalism project](https://github.com/enterprise-npm-ai) / 10x'ly Made. We believe in no direct primitive use, and extreme modularism and the SOMOM,TYPRPL responsibility principle (Single/Minimal Or Maximal, Take Your Pick Responsibility Principal). 

## Tests
LoLite proudly has some number of test coverage. clone the repo and run npm test to test.

## Linting
LoLite proudly is linted with almost every ESLint rule, and the recommended rules for Sonar.js ESLint plugin, and almost all the ESLint Unicorn plugin rules. It also uses the ESLint Ninja plugin, the 10x linter plugin.

## Building
LoLite uses Webpack to build all of its source code into one file.

## License
[EGPSL10X-1.0](https://github.com/enterprise-npm-ai/EGPSL10X-1.0)

## Code Of Conduct
See the [CODE_OF_CONDUCT](https://github.com/enterprise-npm-ai/lolite/blob/main/CODE_OF_CONDUCT.md) file.

## Contributing
See the [CONTRIBUTING](https://github.com/enterprise-npm-ai/lolite/blob/main/CONTRIBUTING.md) file.

## Notice
PLEASE STAR THIS REPO!!!!!!!!!! I SPENT DAYS MAKING THIS, AND HARDLY ANYONE RECOGNIZES WHAT I'VE DONE! SHARE THIS WITH YOUR FRIENDS! PLEASE!

## Builds
LoLite has several builds:
- [lolite](https://npmjs.com/package/lolite) - The normal build of Lolite.
- [lolite-browser](https://npmjs.com/package/lolite-browser) - LoLite for browsers. Also works in Node.js as a 1-dependency version of LoLite.
- [lolite-unbundled](https://npmjs.com/package/lolite-unbundled) - LoLite, but it uses all the tiny lolite.* packages instead.


---

# DOCUMENTATION

## ARRAY UTILITIES

### compact(array)
Cleanses an array of all falsy values. Returns undefined for non-arrays.

```javascript
const lolite = require("lolite")
const result = lolite.compact([1, 0, false, "hello"])
// result: [1, "hello"]
const undef = lolite.compact("Not an array")
// undef: undefined
```

### flatten(array)
Flattens arrays. Returns undefined for non-arrays.

```javascript
const lolite = require("lolite")
const flat = lolite.flatten([1, [2, [3]]])
// flat: [1, 2, 3]
const undef = lolite.flatten("Not an array")
// undef: undefined
```

### first(array)
alias: head(array)

Get the first element of an array. Returns undefined for non-arrays.
```javascript
const lolite = require("lolite")
const testArray = [0, 1, 2]
console.log(lolite.first(testArray)) // 0
console.log(lolite.head(testArray)) // 0
```

### last(array)

Get the last element of an array. Returns undefined for non-arrays.
```javascript
const lolite = require("lolite")
const testArray = [0, 1, 2]
console.log(lolite.last(testArray)) // 2
```

### initial(array)
Returns all but the last element of an array. Returns undefined for non-arrays.
```js
const lolite = require("lolite")
const result = lolite.initial([1, 2, 3])
// result: [1, 2]

const single = lolite.initial([1])
// result: []

const undef = lolite.initial("Not an array")
// result: undefined
```

### tail(array)
Returns all but the first element of an array. Returns undefined for non-arrays.
```js
const lolite = require("lolite")
const result = lolite.tail([1, 2, 3])
// result: [2, 3]

const single = lolite.tail([1])
// result: []

const undef = lolite.tail(null)
// result: undefined
```

### sample(array)
Gets a random element from an array. Returns undefined for non-arrays.
```js
const lolite = require("lolite")
console.log(lolite.sample(139)) // undefined
console.log(typeof lolite.sample([1, 2, 3])) // "number"
console.log(typeof lolite.sample(["h", "g", "r"])) // "string"
```

### times(number, iteratee)
Invokes the `iteratee` `number` times, returning an array of the results of each invocation. The iteratee is invoked with one argument: `index`.

If `iteratee` is nullish, it defaults to `lolite.identity`.
```js
const lolite = require("lolite")

const result = lolite.times(3)
// result: [0, 1, 2]

const doubled = lolite.times(4, (i) => lolite.multiply(i, 2))
// doubled: [0, 2, 4, 6]

const empty = lolite.times("not a number")
// empty: []

const trueStory = lolite.times(2, lolite.stubTrue) // lolite.stubTrue is a function that returns true
// trueStory: [true, true]
```

---
###

## MATH UTILITIES

### add(augend, addend)
Calculates the arithmetic sum of two values. 
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite")
const sum = lolite.add(5, 2)
// sum: 7

const coercedSum = lolite.add(Infinity, "garbage")
// result: 0 (0 + 0)
```

### subtract(minuend, subtrahend)
Calculates the arithmetic difference between two values.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite")
const diff = lolite.subtract(10, 3)
// diff: 7

const coercedDiff = lolite.subtract(Infinity, NaN)
// result: 0 (0 - 0)
```

### multiply(multiplier, multiplicand)
Calculates the product of two values.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite")
const product = lolite.multiply(6, 7)
// product: 42

const coercedProduct = lolite.multiply(NaN, "garbage")
// result: 0 (0 * 0)
```

### divide(dividend, divisor)
Calculates the quotient of two values. 
Non-finite or non-numeric values are coerced to zero. Division by positive zero returns infinity, and divison by negative zero returns negative infinity. If you divide zero by zero it returns NaN.

```javascript
const lolite = require("lolite")
const quotient = lolite.divide(20, 5)
// quotient: 4

const divisonByZero = lolite.divide(10, 0)
// result: Infinity

const coercedDivide = lolite.divide("garbage", Infinity)
// result: NaN (0 / 0)
```

### power(base, exponent)
Calculates the exponentiation of a base to a power. Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite")
const result = lolite.power(2, 3)
// result: 8

const fractional = lolite.power(2, -1)
// result: 0.5

const zeroPower = lolite.power(10, 0)
// result: 1

const coercedPower = lolite.power(Infinity, "garbage")
// result: 1 (0^0)
```

### modulo(dividend, divisor)
Calculates the remainder of division.
Non-finite or non-numeric values are coerced to zero.

Note on Negative Arithmetic: LoLite implements Floored Modulo logic ($a \pmod b$). Unlike the native JavaScript `%` operator which truncates toward zero, LoLite follows the mathematical standard where the result takes the sign of the divisor. For example, `lolite.modulo(-10, 3)` returns 2.

If the divisor is zero, it will return `NaN`.

```javascript
const lolite = require("lolite")
const remainder = lolite.modulo(10, 3)
// remainder: 1

const negativeModuloResult = lolite.modulo(10, 3)
// result: 2

const coercedModulo = lolite.modulo(Infinity, "garbage")
// result: NaN (0 % 0)
```

### abs(value)
Gets the absolute value of a number.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite")
const result = lolite.abs(-42)
// result: 42

const coercedAbs = lolite.abs("garbage")
// result: 0
```

### invert(value)
Inverts the sign of a value. Zero becomes negative zero.
Non-numeric values are coerced to zero.
Infinity is negated to -Infinity, and vice versa.

```javascript
const lolite = require("lolite")
const inverted = lolite.invert(10)
// inverted: -10

const doubleNegative = lolite.invert(-5)
// result: 5

const negativeInfinity = lolite.invert(Infinity)
// result: -Infinity

const coercedNegative = lolite.invert("garbage")
// result: -0 (0 inverted)
```

### floor(value)
Round a number down to the nearest whole integer.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite")
const positiveResult = lolite.floor(2.1)
// result: 2

const negativeResult = lolite.floor(-2.1)
// result: 3

const coercedResult = lolite.floor("garbage")
// result: 0 (0 floored)
```

### ceil(value)
Round a number up to the nearest whole integer.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite")
const positiveResult = lolite.ceil(2.1)
// result: 3

const negativeResult = lolite.ceil(-2.1)
// result: 2

const coercedResult = lolite.ceil("garbage")
// result: 0 (0 ceiled)
```

### round(value)
Round a number either up to the nearest whole integer, unless the number is less than `0.5`, then it rounds down.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite")

const flooredResult = lolite.round(2.1)
// result: 2

const ceiledResult = lolite.round(2.9)
// result: 3

const coercedResult = lolite.round("garbage")
// result: 0 (0 ceiled)
```

### trunc(value)
Truncates the decimal portion of a number, returning only the integer part. Truncation moves toward zero for both positive and negative numbers.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite")

const positiveResult = lolite.trunc(2.9)
// result: 2

const negativeResult = lolite.trunc(-2.9)
// result: -2

const zeroPreservation = lolite.trunc(-0)
// result: -0

const coercedResult = lolite.trunc("garbage")
// result: 0
```

### sign(value)
Returns the sign of a number, indicating whether the number is positive, negative, or zero, or negative zero.
Non-finite values are coerced to zero.

```javascript
const lolite = require("lolite")

lolite.sign(42)        // result: 1
lolite.sign(Infinity)  // result: 1
lolite.sign(-42)       // result: -1
lolite.sign(-Infinity) // result: -1
lolite.sign(0)         // result: 0
lolite.sign(-0)        // result: -0

lolite.sign("garbage") // result: 0
lolite.sign(NaN) // result: 0
```

### max(a, b)
Returns the largest of two numbers.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite")
const result = lolite.max(5, 10)
// result: 10

const coercedMax = lolite.max(-5, Infinity)
// result: 0 (comparing -5 and 0)
```

### min(a, b)
Returns the smallest of two numbers.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite")
const result = lolite.min(5, 10)
// result: 5

const coercedMin = lolite.min(5, "garbage")
// result: 0 (comparing 5 and 0)
```

### clamp(value, lower, upper)
Restricts a value to be within the specified bounds.
Non-finite or non-numeric values are coerced to zero.

Note: If lower bound exceeds upper bound after coercion, the function prioritizes the lower bound.
```javascript
const lolite = require("lolite")
const result = lolite.clamp(5, 1, 10)
// result: 5

const capped = lolite.clamp(15, 1, 10)
// result: 10

const raised = lolite.clamp(-5, 1, 10)
// result: 1

const coercedClamp = lolite.clamp(Infinity, "garbage", NaN)
// result: 0 (0 clamped between 0 and 0)
```

###
---

## LOGIC GATES

### and(a, b)
Returns `b` if both values are truthy, otherwise returns the first value passed into the function that *isn't* truthy.
```javascript
const lolite = require("lolite")

console.log(lolite.and(true, true))   // true
console.log(lolite.and(true, false))  // false
console.log(lolite.and(false, true))  // false
console.log(lolite.and(false, false)) // false
console.log(lolite.and("truthy value", true)) // true
console.log(lolite.and(0, true)) // 0
console.log(lolite.and("", 0)) // ""
```

### or(a,b)
Returns `a` if `a` is truthy, else returns `b`.
```javascript
const lolite = require("lolite")

console.log(lolite.or(true, false)) // true
console.log(lolite.or(false, true)) // true
console.log(lolite.or(true, true)) // true
console.log(lolite.or(false, false)) // false
console.log(lolite.or(0, true)) // true
console.log(lolite.or(0, "truthy value")) // "truthy value"
console.log(lolite.or("truthy value", false)) // "truthy value"
```

### not(value)
Returns the negation of the value passed in. Equivalent to JavaScript `!`.
```javascript
const lolite = require("lolite")

console.log(lolite.not(false)) // true
console.log(lolite.not(true)) // false
console.log(lolite.not(0)) // true
console.log(lolite.not("")) // true
console.log(lolite.not()) // true
console.log(lolite.not(1)) // false
```

### nand(a, b)
Returns the negation of the result of `and(a, b)`, where the `a` and `b` passed into `and` are the same `a` and `b` the user provides for `nand`.
```javascript
const lolite = require("lolite")

console.log(lolite.nand(true, true)) // false

console.log(lolite.nand(false, true)) // true

console.log(lolite.nand(true, false)) // true

console.log(lolite.nand(false, false)) // true
```

### nor(a, b)
Returns the negation of the result of `or(a, b)`, where the `a` and `b` passed into `or` are the same `a` and `b` the user provides for `nor`.
```javascript
const lolite = require("lolite")

console.log(lolite.nor(false, false)) // true
console.log(lolite.nor(true, false))  // false
console.log(lolite.nor(false, true)) // false
console.log(lolite.nor(true, true)) // false
```

### xor(a, b)
Like `or`, but if `a` and `b` are both truthy, or if `a` and `b` are both falsy, returns `false`.

```javascript
const lolite = require("lolite")
const testTruthyValue = "truthy"
const testFalsyValue = 0

console.log(lolite.xor(true, false)) // true
console.log(lolite.xor(false, true)) // true
console.log(lolite.xor(testTruthyValue, testFalsyValue)) // true

console.log(lolite.xor(true, true))  // false
console.log(lolite.xor(false, false)) // false
console.log(lolite.xor(testTruthyValue, testTruthyValue)) // false
console.log(lolite.xor(testFalsyValue, testFalsyValue)) // false
```

### xnor(a, b)
Returns the negation of the result of `xor(a, b)`, where the `a` and `b` passed into `xor` are the same `a` and `b` the user provides for `xnor`.

```javascript
const lolite = require("lolite")
const testTruthyValue = "truthy"
const testFalsyValue = 0

console.log(lolite.xnor(true, false)) // false
console.log(lolite.xnor(false, true)) // false
console.log(lolite.xnor(testTruthyValue, testFalsyValue)) // false

console.log(lolite.xnor(true, true))  // true
console.log(lolite.xnor(false, false)) // true
console.log(lolite.xnor(testTruthyValue, testTruthyValue)) // true
console.log(lolite.xnor(testFalsyValue, testFalsyValue)) // true
```

###
---

## VALIDATION UTILITIES

### isTruthy(value)
Check if a value is *truthy*.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isTruthy(true))
assert.ok(lolite.isTruthy("garbage"))
assert.ok(lolite.isTruthy(67))
assert.ok(lolite.isTruthy({ test: 1 }))
assert.ok(lolite.isTruthy([ sigma: "skibidi" ]))
assert.ok(lolite.isTruthy(Symbol("foo")))
assert.ok(lolite.isTruthy(42n))
assert.ok(lolite.isTruthy(() => {}))
```

### isFalsy(value)
Check if a value is *falsy*.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isFalsy(false))
assert.ok(lolite.isFalsy(0))
assert.ok(lolite.isFalsy(0n))
assert.ok(lolite.isFalsy(""))
assert.ok(lolite.isFalsy(null))
assert.ok(lolite.isFalsy(undefined))
assert.ok(lolite.isFalsy()) // if you pass nothing into a function, JS coerces to undefined which is falsy
assert.ok(lolite.isFalsy(NaN))
```

### isUndefined(value)
Check if a value is undefined.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isUndefined(undefined))
assert.ok(lolite.isUndefined()) // if you pass nothing into a function, JS coerces to undefined
assert.ok(!lolite.isUndefined("anything else"))
```

### isNull(value)
Check if a value is null.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isNull(null))
assert.ok(!lolite.isUndefined("anything else"))
```

### isNil(value)
Check if a value is null or undefined.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isNil(null))
assert.ok(lolite.isNil(undefined))
assert.ok(lolite.isNil()) // if you pass nothing into a function, JS coerces to undefined
assert.ok(!lolite.isNil("anything else"))
```

### isBoolean(value)
Check if a value is a boolean primitive.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isBoolean(true))
assert.ok(lolite.isBoolean(false))
assert.ok(!lolite.isBoolean(new Boolean())) // this is a boolean object, not a boolean primitive
assert.ok(!"anything else")
```

### isNumber(value)
Check if a value is a number primitive.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isNumber(2))
assert.ok(lolite.isNumber(54))
assert.ok(lolite.isNumber(-49))
assert.ok(lolite.isNumber(0))
assert.ok(lolite.isNumber(-0))
assert.ok(lolite.isNumber(NaN))
assert.ok(lolite.isNumber(Infinity))
assert.ok(lolite.isNumber(-Infinity))
assert.ok(!lolite.isNumber(new Number(42)))
assert.ok(!lolite.isNumber(Object(3)))
assert.ok(!lolite.isNumber("67"))
assert.ok(!lolite.isNumber("anything else"))
```

### isBigInt(value)
Check if a value is a bigint primitive.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isBigInt(20n))
assert.ok(lolite.isBigInt(-2093280n))
assert.ok(!lolite.isBigInt(Object(3n)))
assert.ok(!lolite.isBigInt("anything else"))
```

### isString(value)
Check if a value is a string primitive.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isString("test"))
assert.ok(lolite.isString(""))
assert.ok(!lolite.isString(Object("test")))
assert.ok(!lolite.isString(new String("test")))
assert.ok(!lolite.isString(/anything else that isn't a string/))
```

### isSymbol(value)
Check if a value is a symbol primitive.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isSymbol(Symbol("test")))
assert.ok(lolite.isSymbol(Symbol.iterator))
assert.ok(!lolite.isSymbol(Object(Symbol("test"))))
assert.ok(!lolite.isSymbol("not a symbol"))
```

### isPrimitive(value)
Check if a value is a JavaScript primitive. LoLite validates the seven core primitives: string, number, bigint, boolean, symbol, null, and undefined.

```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isPrimitive("enterprise"))
assert.ok(lolite.isPrimitive(42))
assert.ok(lolite.isPrimitive(10n))
assert.ok(lolite.isPrimitive(true))
assert.ok(lolite.isPrimitive(Symbol("lolite")))
assert.ok(lolite.isPrimitive(null))
assert.ok(lolite.isPrimitive(undefined))

assert.ok(!lolite.isPrimitive({}))
assert.ok(!lolite.isPrimitive([]))
assert.ok(!lolite.isPrimitive(() => {}))
assert.ok(!lolite.isPrimitive(new String("I am an object now")))
```

### isObject(value)
Check if a value is an object or null. Returns false for functions.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isObject({}))
assert.ok(lolite.isObject(new Object()))
assert.ok(lolite.isObject(lolite))
assert.ok(lolite.isObject({ e: 1 }))
assert.ok(lolite.isObject(null))
assert.ok(lolite.isObject(Object("hi")))
assert.ok(!lolite.isObject(() => {}))
assert.ok(!lolite.isObject("hi"))
assert.ok(!lolite.isObject(63))
```

### isFunction(value)
Check if a value is a function.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isFunction(function() {}))
assert.ok(lolite.isFunction(function*() {}))
assert.ok(lolite.isFunction(async function() {}))
assert.ok(lolite.isFunction(async function*() {}))
assert.ok(lolite.isFunction(() => {}))
assert.ok(lolite.isFunction(async () => {}))
assert.ok(!lolite.isFunction("anything else"))
```

### isArray(value)
Check if a value is an array.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isArray([]))
assert.ok(lolite.isArray([1, 2, 3]))
assert.ok(lolite.isArray(new Array(10)))
assert.ok(!lolite.isArray({ length: 1, 0: "fake" }))
assert.ok(!lolite.isArray("not an array"))
```

### isMap(value)
Check if a value is a Map.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isMap(new Map()))
assert.ok(!lolite.isMap(new WeakMap()))
assert.ok(!lolite.isMap({}))
```

### isWeakMap(value)
Check if a value is a WeakMap.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isWeakMap(new WeakMap()))
assert.ok(!lolite.isWeakMap(new Map()))
assert.ok(!lolite.isWeakMap(null))
```

### isSet(value)
Check if a value is a Set.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isSet(new Set()))
assert.ok(!lolite.isSet(new WeakSet()))
assert.ok(!lolite.isSet([]))
```

### isWeakSet(value)
Check if a value is a WeakSet.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isWeakSet(new WeakSet()))
assert.ok(!lolite.isWeakSet(new Set()))
assert.ok(!lolite.isWeakSet(undefined))
```

### isPlainObject(value)
Check if a value is a plain object.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isPlainObject({}))
assert.ok(lolite.isPlainObject(Object.create(null)))
assert.ok(!lolite.isPlainObject([]))
assert.ok(!lolite.isPlainObject(null))
```

### isNonNullObject(value)
Check if a value is an object that isn't null.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isNonNullObject({}))
assert.ok(lolite.isNonNullObject([]))
assert.ok(!lolite.isNonNullObject(null))
assert.ok(!lolite.isNonNullObject(42))
```

### isNaN(value)
Check if a value is NaN.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isNaN(NaN))
assert.ok(!lolite.isNaN("anything else"))
```

### isFinite(value)
Check if a value is a finite number primitive.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isFinite(342))
assert.ok(lolite.isFinite(-230))
assert.ok(!lolite.isFinite(Infinity))
assert.ok(!lolite.isFinite(new Number(10)))
assert.ok(!lolite.isFinite("test"))
```

### isInteger(value)
Check if a value is an integer primitive.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isInteger(42))
assert.ok(lolite.isInteger(-42))
assert.ok(lolite.isInteger(0))
assert.ok(lolite.isInteger(-0))

assert.ok(!lolite.isInteger(3.14))        // decimals are not integers
assert.ok(!lolite.isInteger(-2.5))        // still not integers
assert.ok(!lolite.isInteger(Infinity))    // too big to be finite
assert.ok(!lolite.isInteger(NaN))         // not a number, ironically
assert.ok(!lolite.isInteger(new Number(5))) // boxed numbers are impostors
assert.ok(!lolite.isInteger("42"))        // strings are not integers
assert.ok(!lolite.isInteger(null))        // null is not an integer
assert.ok(!lolite.isInteger(undefined))   // undefined is not an integer
```

### isSafeInteger(value)
Check if a value is a safe integer primitive.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isSafeInteger(42))
assert.ok(lolite.isSafeInteger(Number.MAX_SAFE_INTEGER))
assert.ok(lolite.isSafeInteger(Number.MIN_SAFE_INTEGER))

assert.ok(!lolite.isSafeInteger(Math.pow(2, 53))) // Out of bounds
assert.ok(!lolite.isSafeInteger(3.14))            // Not an integer
assert.ok(!lolite.isSafeInteger(Infinity))        // Not finite
assert.ok(!lolite.isSafeInteger("42"))            // String primitive
assert.ok(!lolite.isSafeInteger(42n))             // BigInt is not a Number primitive
```

### isArguments(value)
Check if a value is an `arguments` object.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

(function () {
  assert.ok(lolite.isArguments(arguments))
})()

assert.ok(
  lolite.isArguments((function () { return arguments })(1, 2, 3))
)

assert.ok(!lolite.isArguments([]))                        // arrays are not arguments
assert.ok(!lolite.isArguments({}))                        // plain objects are not arguments
assert.ok(!lolite.isArguments({ length: 2, 0: "fake" }))  // array-like ≠ arguments
assert.ok(!lolite.isArguments({ callee: () => {}, length: 1 })) // nice try
assert.ok(!lolite.isArguments("not arguments"))           // strings are not arguments
assert.ok(!lolite.isArguments(42))                        // numbers are not arguments
assert.ok(!lolite.isArguments(null))                      // null is not arguments
assert.ok(!lolite.isArguments(undefined))                 // undefined is not arguments
assert.ok(!lolite.isArguments(() => {}))                  // functions are not arguments
```

## SIMPLE FUNCTION UTILITIES

### noop()
Does nothing.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(lolite.isUndefined(lolite.noop())) // noop returns undefined
assert.ok(lolite.isFunction(noop)) // noop is as function
```

### identity(value)
Returns the value passed into the identity function.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

console.log(lolite.identity(2)) // 2
console.log(lolite.identity()) // undefined
console.log(lolite.identity(true)) // true
console.log(lolite.identity(null)) // null
console.log(lolite.identity("enterprise")) // "enterprise"
```

### constant(value)
Returns a function that returns a value.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

console.log(lolite.constant(2)()) // 2
const returnEnterprise = lolite.constant("enterprise")
console.log(returnEnterprise()) // "enterprise"
```

### stubUndefined()
Returns the primitive value undefined.
```javascript
const lolite = require("lolite")
console.log(lolite.stubUndefined()) // undefined
```

### stubTrue()
Returns the primitive boolean value true.
```javascript
const lolite = require("lolite")
console.log(lolite.stubTrue()) // true
```

### stubFalse()
Returns the primitive boolean value false.
```javascript
const lolite = require("lolite")
console.log(lolite.stubFalse()) // false
```

### stubNaN()
Returns the primitive value NaN.
```javascript
const lolite = require("lolite")
console.log(lolite.stubNaN()) // NaN
```

### stubNull()
Returns the primitive value null.
```javascript
const lolite = require("lolite")
console.log(lolite.stubNull()) // null
```

###
---

## DATE UTILITIES

### now()
Gets the timestamp of the number of milliseconds that have elapsed since the Unix epoch (1 January 1970 00:00:00 UTC).

```js
const lolite = require("lolite")

console.log(lolite.now() === Date.now()) // true
```

###
---

# EXTENDED DOCUMENTATION
LoLite contains some private utilities in its code that it uses internally. These are exported under the `__private` key in the default export. You probably don't want to use these, unless you have a really good reason to.

### __private.arrayOfAllBooleans
An array that contains true and false.
```javascript
const booleans = require("lolite").__private.arrayOfAllBooleans

console.log(booleans) // [true, false]
```

### __private.crash
An internal function that crashes the program. This is used internally in code for cases that should never happen. If LoLite crashes, it is a serious bug and your Node.js could be broken, or the world could be ending.
```javascript
const crash_program = require("lolite").__private.crash
crash_program()
/* The above code will output something like this:

[lolite] SOMETHING WENT WRONG, PORGAM IS ABOUT TO CRASH, A CRASH DUMP FILE WILL PROBABLY BE GENERATED
~ PLEASE FILE ISSUE ON GITHUB REPO:
https://github.com/enterprise-npm-ai/lolite.
Porgam crahed.
*/
```
It will also create a crash dump file with a filename like `crash_3989.bin` in your root project directory, with some stack dump information.
Note: you can also require `lolite/test/crash` and it will immediately crash the program, like this:
```javascript
require("lolite/test/crash") // crashes program
```

### __private.date
The `Date` constructor.
```javascript
const $Date = require("lolite").__private.date
const assert = require("node:assert")
assert.ok($Date === Date)
```

### __private.invertFallback
A fallback implementation of `lolite.invert` to avoid circular dependencies. No non-finite-to-zero coercion is in this implementation.
```javascript
const invert = require("lolite").__private.invertFallback
console.log(invert(1)) // -1
console.log(invert(-1)) // 1
console.log(invert("hi")) // "hi" (normal lolite.invert would return -0)
```

### __private.isNotInteger
An internal function that checks if a value is not an integer. This is used to avoid a crash-on-zero bug in the `is-not-integer` NPM package.
```javascript
const isNotInteger = require("lolite").__private.isNotInteger
console.log(isNotInteger(39)) // false
console.log(isNotInteger(3.2)) // true
console.log(isNotInteger("test")) // true
```

### __private.multiplyFallback
A fallback implementation of `lolite.multiply` to avoid circular dependencies. No non-finite-to-zero coercion is in this implementation.
```javascript
const multiply = require("lolite").__private.multiplyFallback
console.log(multiply(2, 6)) // 12
```


### `__using_development__` in `isFunction`
This internal feature is not a private function, it's a hidden argument in the `isFunction` function. The parameter is called `__using_development__`, and if it's on, it defines a getter on the value passed in for `Symbol.toStringTag`. The reason for this is that LoLite internally has a file that requires some other file that ends up requiring the first file. You might think this crashes the program, but it doesn't, because when you do infinite require loop like that Node.js cuts off the loop and makes it so when you require it it just returns an empty object. LoLite checks if the required file is not a function using `isFunction`, and if it is not a function, reassigns it to a fallback. However, the empty object that Node.js returns is actually an object but without any of the Object.prototype properties, so it doesn't have `Symbol.toStringTag` as a property. When it uses `isFunction`, it checks the toStringTag of the value to check if it's a function. This triggers a Node.js warning for accessing non-existent property `Symbol.toStringTag` on object. This is where the `__using_development__` parameter comes in. It stops this Node.js internal warning.

# SUPER IMPORTANT CONTRIBUTING THING/NOTE FOR MYSELF
RUN NPM PUBLISH BEFORE GIT COMMIT!!!!!!!!!!!!!!!!