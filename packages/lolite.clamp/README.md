## clamp(value, lower, upper)
Restricts a value to be within the specified bounds.
Non-finite or non-numeric values are coerced to zero.

Note: If lower bound exceeds upper bound after coercion, the function prioritizes the lower bound.
```javascript
const lolite = require("lolite.clamp")
const result = clamp(5, 1, 10)
// result: 5

const capped = clamp(15, 1, 10)
// result: 10

const raised = clamp(-5, 1, 10)
// result: 1

const coercedClamp = clamp(Infinity, "garbage", NaN)
// result: 0 (0 clamped between 0 and 0)
```

---

## LOGIC GATES
