# lolite.isfunction

### isFunction(value)
Check if a value is a function.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(isFunction(function() {}))
assert.ok(isFunction(function*() {}))
assert.ok(isFunction(async function() {}))
assert.ok(isFunction(async function*() {}))
assert.ok(isFunction(() => {}))
assert.ok(isFunction(async () => {}))
assert.ok(!isFunction("anything else"))
```