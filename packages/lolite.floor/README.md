## floor(value)
Round a number down to the nearest whole integer.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite.floor")
const positiveResult = floor(2.1)
// result: 2

const negativeResult = floor(-2.1)
// result: 3

const coercedResult = floor("garbage")
// result: 0 (0 floored)
```
