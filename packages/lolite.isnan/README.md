## isNaN(value)
Check if a value is NaN.
```javascript
const lolite = require("lolite.isnan")
const assert = require("node:assert")

assert.ok(lolite.isNaN(NaN))
assert.ok(!lolite.isNaN("anything else"))
```
