## abs(value)
Gets the absolute value of a number.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite.abs")
const result = abs(-42)
// result: 42

const coercedAbs = abs("garbage")
// result: 0
```
