# lolite.isprimitive

### isPrimitive(value)
Check if a value is a JavaScript primitive. LoLite validates the seven core primitives: string, number, bigint, boolean, symbol, null, and undefined.

```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(isPrimitive("enterprise"))
assert.ok(isPrimitive(42))
assert.ok(isPrimitive(10n))
assert.ok(isPrimitive(true))
assert.ok(isPrimitive(Symbol("lolite")))
assert.ok(isPrimitive(null))
assert.ok(isPrimitive(undefined))

assert.ok(!isPrimitive({}))
assert.ok(!isPrimitive([]))
assert.ok(!isPrimitive(() => {}))
assert.ok(!isPrimitive(new String("I am an object now")))
```