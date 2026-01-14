## isPlainObject(value)
Check if a value is a plain object.
```javascript
const lolite = require("lolite.isplainobject")
const assert = require("node:assert")

assert.ok(lolite.isPlainObject({}))
assert.ok(lolite.isPlainObject(Object.create(null)))
assert.ok(!lolite.isPlainObject([]))
assert.ok(!lolite.isPlainObject(null))
```
