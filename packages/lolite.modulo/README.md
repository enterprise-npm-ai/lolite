# lolite.modulo

### modulo(dividend, divisor)
Calculates the remainder of division.
Non-finite or non-numeric values are coerced to zero.

Note on Negative Arithmetic: LoLite implements Floored Modulo logic ($a \pmod b$). Unlike the native JavaScript `%` operator which truncates toward zero, LoLite follows the mathematical standard where the result takes the sign of the divisor. For example, `modulo(-10, 3)` returns 2.

If the divisor is zero, it will return `NaN`.

```javascript
const lolite = require("lolite")
const remainder = modulo(10, 3)
// remainder: 1

const negativeModuloResult = modulo(10, 3)
// result: 2

const coercedModulo = modulo(Infinity, "garbage")
// result: NaN (0 % 0)
```