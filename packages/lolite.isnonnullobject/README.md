## isNonNullObject(value)
Check if a value is an object that isn't null.
```javascript
const lolite = require("lolite.isnonnullobject")
const assert = require("node:assert")

assert.ok(lolite.isNonNullObject({}))
assert.ok(lolite.isNonNullObject([]))
assert.ok(!lolite.isNonNullObject(null))
assert.ok(!lolite.isNonNullObject(42))
```
