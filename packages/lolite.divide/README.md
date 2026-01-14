# lolite.divide

### divide(dividend, divisor)
Calculates the quotient of two values. 
Non-finite or non-numeric values are coerced to zero. Division by positive zero returns infinity, and divison by negative zero returns negative infinity. If you divide zero by zero it returns NaN.

```javascript
const lolite = require("lolite")
const quotient = divide(20, 5)
// quotient: 4

const divisonByZero = divide(10, 0)
// result: Infinity

const coercedDivide = divide("garbage", Infinity)
// result: NaN (0 / 0)
```