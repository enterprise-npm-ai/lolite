## abs(value)
Gets the absolute value of a number.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite.abs")
const result = abs(-42)
// result: 42

const coercedAbs = abs("garbage")
// result: 0
```

### invert(value)
Inverts the sign of a value. Zero becomes negative zero.
Non-numeric values are coerced to zero.
Infinity is negated to -Infinity, and vice versa.

```javascript
const lolite = require("lolite.abs")
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
const lolite = require("lolite.abs")
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
const lolite = require("lolite.abs")
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
const lolite = require("lolite.abs")

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
const lolite = require("lolite.abs")

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
const lolite = require("lolite.abs")

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
const lolite = require("lolite.abs")
const result = lolite.max(5, 10)
// result: 10

const coercedMax = lolite.max(-5, Infinity)
// result: 0 (comparing -5 and 0)
```

### min(a, b)
Returns the smallest of two numbers.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite.abs")
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
const lolite = require("lolite.abs")
const result = lolite.clamp(5, 1, 10)
// result: 5

const capped = lolite.clamp(15, 1, 10)
// result: 10

const raised = lolite.clamp(-5, 1, 10)
// result: 1

const coercedClamp = lolite.clamp(Infinity, "garbage", NaN)
// result: 0 (0 clamped between 0 and 0)
```
