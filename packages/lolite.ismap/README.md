# lolite.ismap

### isMap(value)
Check if a value is a Map.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(isMap(new Map()))
assert.ok(!isMap(new WeakMap()))
assert.ok(!isMap({}))
```