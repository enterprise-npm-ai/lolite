## isFunction(value)
Check if a value is a function.
```javascript
const lolite = require("lolite.isfunction")
const assert = require("node:assert")

assert.ok(lolite.isFunction(function() {}))
assert.ok(lolite.isFunction(function*() {}))
assert.ok(lolite.isFunction(async function() {}))
assert.ok(lolite.isFunction(async function*() {}))
assert.ok(lolite.isFunction(() => {}))
assert.ok(lolite.isFunction(async () => {}))
assert.ok(!lolite.isFunction("anything else"))
```
