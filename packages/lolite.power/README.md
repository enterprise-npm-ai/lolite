## power(base, exponent)
Calculates the exponentiation of a base to a power. Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite.power")
const result = power(2, 3)
// result: 8

const fractional = power(2, -1)
// result: 0.5

const zeroPower = power(10, 0)
// result: 1

const coercedPower = power(Infinity, "garbage")
// result: 1 (0^0)
```
