# lolite.istruthy

### isTruthy(value)
Check if a value is *truthy*.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(isTruthy(true))
assert.ok(isTruthy("garbage"))
assert.ok(isTruthy(67))
assert.ok(isTruthy({ test: 1 }))
assert.ok(isTruthy([ sigma: "skibidi" ]))
assert.ok(isTruthy(Symbol("foo")))
assert.ok(isTruthy(42n))
assert.ok(isTruthy(() => {}))
```