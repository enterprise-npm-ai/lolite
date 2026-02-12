## isArray(value)
Check if a value is an array.
```javascript
const lolite = require("lolite.isarray")
const assert = require("node:assert")

assert.ok(lolite.isArray([]))
assert.ok(lolite.isArray([1, 2, 3]))
assert.ok(lolite.isArray(new Array(10)))
assert.ok(!lolite.isArray({ length: 1, 0: "fake" }))
assert.ok(!lolite.isArray("not an array"))
```
