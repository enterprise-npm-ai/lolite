# lolite.isarray

### isArray(value)
Check if a value is an array.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(isArray([]))
assert.ok(isArray([1, 2, 3]))
assert.ok(isArray(new Array(10)))
assert.ok(!isArray({ length: 1, 0: "fake" }))
assert.ok(!isArray("not an array"))
```