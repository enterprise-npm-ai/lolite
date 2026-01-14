## add(augend, addend)
Calculates the arithmetic sum of two values. 
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite.add")
const sum = add(5, 2)
// sum: 7

const coercedSum = add(Infinity, "garbage")
// result: 0 (0 + 0)
```

### subtract(minuend, subtrahend)
Calculates the arithmetic difference between two values.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite.add")
const diff = lolite.subtract(10, 3)
// diff: 7

const coercedDiff = lolite.subtract(Infinity, NaN)
// result: 0 (0 - 0)
```

### multiply(multiplier, multiplicand)
Calculates the product of two values.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite.add")
const product = lolite.multiply(6, 7)
// product: 42

const coercedProduct = lolite.multiply(NaN, "garbage")
// result: 0 (0 * 0)
```

### divide(dividend, divisor)
Calculates the quotient of two values. 
Non-finite or non-numeric values are coerced to zero. Division by positive zero returns infinity, and divison by negative zero returns negative infinity. If you divide zero by zero it returns NaN.

```javascript
const lolite = require("lolite.add")
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
const lolite = require("lolite.add")
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
const lolite = require("lolite.add")
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
const lolite = require("lolite.add")
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
const lolite = require("lolite.add")
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
const lolite = require("lolite.add")
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
const lolite = require("lolite.add")
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
const lolite = require("lolite.add")

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
const lolite = require("lolite.add")

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
const lolite = require("lolite.add")

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
const lolite = require("lolite.add")
const result = lolite.max(5, 10)
// result: 10

const coercedMax = lolite.max(-5, Infinity)
// result: 0 (comparing -5 and 0)
```

### min(a, b)
Returns the smallest of two numbers.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite.add")
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
const lolite = require("lolite.add")
const result = lolite.clamp(5, 1, 10)
// result: 5

const capped = lolite.clamp(15, 1, 10)
// result: 10

const raised = lolite.clamp(-5, 1, 10)
// result: 1

const coercedClamp = lolite.clamp(Infinity, "garbage", NaN)
// result: 0 (0 clamped between 0 and 0)
```
