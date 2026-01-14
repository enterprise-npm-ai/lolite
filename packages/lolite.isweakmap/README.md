# lolite.isweakmap

### isWeakMap(value)
Check if a value is a WeakMap.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(isWeakMap(new WeakMap()))
assert.ok(!isWeakMap(new Map()))
assert.ok(!isWeakMap(null))
```