# lolite.isundefined

### isUndefined(value)
Check if a value is undefined.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(isUndefined(undefined))
assert.ok(isUndefined()) // if you pass nothing into a function, JS coerces to undefined
assert.ok(!isUndefined("anything else"))
```