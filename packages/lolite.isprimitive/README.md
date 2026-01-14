## isPrimitive(value)
Check if a value is a JavaScript primitive. LoLite validates the seven core primitives: string, number, bigint, boolean, symbol, null, and undefined.

```javascript
const lolite = require("lolite.isprimitive")
const assert = require("node:assert")

assert.ok(lolite.isPrimitive("enterprise"))
assert.ok(lolite.isPrimitive(42))
assert.ok(lolite.isPrimitive(10n))
assert.ok(lolite.isPrimitive(true))
assert.ok(lolite.isPrimitive(Symbol("lolite")))
assert.ok(lolite.isPrimitive(null))
assert.ok(lolite.isPrimitive(undefined))

assert.ok(!lolite.isPrimitive({}))
assert.ok(!lolite.isPrimitive([]))
assert.ok(!lolite.isPrimitive(() => {}))
assert.ok(!lolite.isPrimitive(new String("I am an object now")))
```
