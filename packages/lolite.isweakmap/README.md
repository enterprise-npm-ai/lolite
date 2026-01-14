## isWeakMap(value)
Check if a value is a WeakMap.
```javascript
const lolite = require("lolite.isweakmap")
const assert = require("node:assert")

assert.ok(lolite.isWeakMap(new WeakMap()))
assert.ok(!lolite.isWeakMap(new Map()))
assert.ok(!lolite.isWeakMap(null))
```
