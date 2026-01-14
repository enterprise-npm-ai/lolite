# lolite.isplainobject

### isPlainObject(value)
Check if a value is a plain object.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(isPlainObject({}))
assert.ok(isPlainObject(Object.create(null)))
assert.ok(!isPlainObject([]))
assert.ok(!isPlainObject(null))
```