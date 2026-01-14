# lolite.min

### min(a, b)
Returns the smallest of two numbers.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite")
const result = min(5, 10)
// result: 5

const coercedMin = min(5, "garbage")
// result: 0 (comparing 5 and 0)
```