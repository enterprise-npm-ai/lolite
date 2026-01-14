## multiply(multiplier, multiplicand)
Calculates the product of two values.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite.multiply")
const product = multiply(6, 7)
// product: 42

const coercedProduct = multiply(NaN, "garbage")
// result: 0 (0 * 0)
```
