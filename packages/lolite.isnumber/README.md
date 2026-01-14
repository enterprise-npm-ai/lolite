# lolite.isnumber

### isNumber(value)
Check if a value is a number primitive.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(isNumber(2))
assert.ok(isNumber(54))
assert.ok(isNumber(-49))
assert.ok(isNumber(0))
assert.ok(isNumber(-0))
assert.ok(isNumber(NaN))
assert.ok(isNumber(Infinity))
assert.ok(isNumber(-Infinity))
assert.ok(!isNumber(new Number(42)))
assert.ok(!isNumber(Object(3)))
assert.ok(!isNumber("67"))
assert.ok(!isNumber("anything else"))
```