# lolite.isnan

### isNaN(value)
Check if a value is NaN.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(isNaN(NaN))
assert.ok(!isNaN("anything else"))
```