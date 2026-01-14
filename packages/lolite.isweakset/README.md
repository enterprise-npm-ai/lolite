# lolite.isweakset

### isWeakSet(value)
Check if a value is a WeakSet.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(isWeakSet(new WeakSet()))
assert.ok(!isWeakSet(new Set()))
assert.ok(!isWeakSet(undefined))
```