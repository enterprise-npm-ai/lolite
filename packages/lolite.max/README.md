## max(a, b)
Returns the largest of two numbers.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite.max")
const result = max(5, 10)
// result: 10

const coercedMax = max(-5, Infinity)
// result: 0 (comparing -5 and 0)
```
