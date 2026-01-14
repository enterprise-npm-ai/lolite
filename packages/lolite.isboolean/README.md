# lolite.isboolean

### isBoolean(value)
Check if a value is a boolean primitive.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(isBoolean(true))
assert.ok(isBoolean(false))
assert.ok(!isBoolean(new Boolean())) // this is a boolean object, not a boolean primitive
assert.ok(!"anything else")
```