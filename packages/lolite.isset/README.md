## isSet(value)
Check if a value is a Set.
```javascript
const lolite = require("lolite.isset")
const assert = require("node:assert")

assert.ok(lolite.isSet(new Set()))
assert.ok(!lolite.isSet(new WeakSet()))
assert.ok(!lolite.isSet([]))
```
