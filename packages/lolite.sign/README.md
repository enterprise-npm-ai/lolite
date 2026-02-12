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
