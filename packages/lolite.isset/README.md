# lolite.isset

### isSet(value)
Check if a value is a Set.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(isSet(new Set()))
assert.ok(!isSet(new WeakSet()))
assert.ok(!isSet([]))
```