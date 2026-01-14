## isBoolean(value)
Check if a value is a boolean primitive.
```javascript
const lolite = require("lolite.isboolean")
const assert = require("node:assert")

assert.ok(lolite.isBoolean(true))
assert.ok(lolite.isBoolean(false))
assert.ok(!lolite.isBoolean(new Boolean())) // this is a boolean object, not a boolean primitive
assert.ok(!"anything else")
```
