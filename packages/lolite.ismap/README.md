## isMap(value)
Check if a value is a Map.
```javascript
const lolite = require("lolite.ismap")
const assert = require("node:assert")

assert.ok(lolite.isMap(new Map()))
assert.ok(!lolite.isMap(new WeakMap()))
assert.ok(!lolite.isMap({}))
```
