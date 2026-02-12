## isWeakSet(value)
Check if a value is a WeakSet.
```javascript
const lolite = require("lolite.isweakset")
const assert = require("node:assert")

assert.ok(lolite.isWeakSet(new WeakSet()))
assert.ok(!lolite.isWeakSet(new Set()))
assert.ok(!lolite.isWeakSet(undefined))
```
