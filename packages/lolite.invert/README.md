## invert(value)
Inverts the sign of a value. Zero becomes negative zero.
Non-numeric values are coerced to zero.
Infinity is negated to -Infinity, and vice versa.

```javascript
const lolite = require("lolite.invert")
const inverted = invert(10)
// inverted: -10

const doubleNegative = invert(-5)
// result: 5

const negativeInfinity = invert(Infinity)
// result: -Infinity

const coercedNegative = invert("garbage")
// result: -0 (0 inverted)
```
