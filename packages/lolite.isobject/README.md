## isObject(value)
Check if a value is an object or null. Returns false for functions.
```javascript
const lolite = require("lolite.isobject")
const assert = require("node:assert")

assert.ok(lolite.isObject({}))
assert.ok(lolite.isObject(new Object()))
assert.ok(lolite.isObject(lolite))
assert.ok(lolite.isObject({ e: 1 }))
assert.ok(lolite.isObject(null))
assert.ok(lolite.isObject(Object("hi")))
assert.ok(!lolite.isObject(() => {}))
assert.ok(!lolite.isObject("hi"))
assert.ok(!lolite.isObject(63))
```
