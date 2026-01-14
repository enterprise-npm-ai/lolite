## isUndefined(value)
Check if a value is undefined.
```javascript
const lolite = require("lolite.isundefined")
const assert = require("node:assert")

assert.ok(lolite.isUndefined(undefined))
assert.ok(lolite.isUndefined()) // if you pass nothing into a function, JS coerces to undefined
assert.ok(!lolite.isUndefined("anything else"))
```
