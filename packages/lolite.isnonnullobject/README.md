# lolite.isnonnullobject

### isNonNullObject(value)
Check if a value is an object that isn't null.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(isNonNullObject({}))
assert.ok(isNonNullObject([]))
assert.ok(!isNonNullObject(null))
assert.ok(!isNonNullObject(42))
```