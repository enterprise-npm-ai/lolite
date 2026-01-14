# lolite.subtract

### subtract(minuend, subtrahend)
Calculates the arithmetic difference between two values.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite")
const diff = subtract(10, 3)
// diff: 7

const coercedDiff = subtract(Infinity, NaN)
// result: 0 (0 - 0)
```