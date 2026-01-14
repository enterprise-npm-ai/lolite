## isTruthy(value)
Check if a value is *truthy*.
```javascript
const lolite = require("lolite.istruthy")
const assert = require("node:assert")

assert.ok(lolite.isTruthy(true))
assert.ok(lolite.isTruthy("garbage"))
assert.ok(lolite.isTruthy(67))
assert.ok(lolite.isTruthy({ test: 1 }))
assert.ok(lolite.isTruthy([ sigma: "skibidi" ]))
assert.ok(lolite.isTruthy(Symbol("foo")))
assert.ok(lolite.isTruthy(42n))
assert.ok(lolite.isTruthy(() => {}))
```
