## isNil(value)
Check if a value is null or undefined.
```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

assert.ok(lolite.isNil(null))
assert.ok(lolite.isNil(undefined))
assert.ok(lolite.isNil()) // if you pass nothing into a function, JS coerces to undefined
assert.ok(!lolite.isNil("anything else"))
```
