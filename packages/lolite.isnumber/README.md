## isNumber(value)
Check if a value is a number primitive.
```javascript
const lolite = require("lolite.isnumber")
const assert = require("node:assert")

assert.ok(lolite.isNumber(2))
assert.ok(lolite.isNumber(54))
assert.ok(lolite.isNumber(-49))
assert.ok(lolite.isNumber(0))
assert.ok(lolite.isNumber(-0))
assert.ok(lolite.isNumber(NaN))
assert.ok(lolite.isNumber(Infinity))
assert.ok(lolite.isNumber(-Infinity))
assert.ok(!lolite.isNumber(new Number(42)))
assert.ok(!lolite.isNumber(Object(3)))
assert.ok(!lolite.isNumber("67"))
assert.ok(!lolite.isNumber("anything else"))
```
