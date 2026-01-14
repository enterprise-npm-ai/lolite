# lolite.isnil

### isNil(value)
Check if a value is null or undefined.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(isNil(null))
assert.ok(isNil(undefined))
assert.ok(isNil()) // if you pass nothing into a function, JS coerces to undefined
assert.ok(!isNil("anything else"))
```