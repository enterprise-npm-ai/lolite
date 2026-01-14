## sign(value)
Returns the sign of a number, indicating whether the number is positive, negative, or zero, or negative zero.
Non-finite values are coerced to zero.

```javascript
const lolite = require("lolite.sign")

sign(42)        // result: 1
sign(Infinity)  // result: 1
sign(-42)       // result: -1
sign(-Infinity) // result: -1
sign(0)         // result: 0
sign(-0)        // result: -0

sign("garbage") // result: 0
sign(NaN) // result: 0
```

### max(a, b)
Returns the largest of two numbers.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite.sign")
const result = lolite.max(5, 10)
// result: 10

const coercedMax = lolite.max(-5, Infinity)
// result: 0 (comparing -5 and 0)
```

### min(a, b)
Returns the smallest of two numbers.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite.sign")
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
const lolite = require("lolite.sign")
const result = lolite.clamp(5, 1, 10)
// result: 5

const capped = lolite.clamp(15, 1, 10)
// result: 10

const raised = lolite.clamp(-5, 1, 10)
// result: 1

const coercedClamp = lolite.clamp(Infinity, "garbage", NaN)
// result: 0 (0 clamped between 0 and 0)
```
