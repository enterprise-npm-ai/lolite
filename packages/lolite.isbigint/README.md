# lolite.isbigint

### isBigInt(value)
Check if a value is a bigint primitive.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(isBigInt(20n))
assert.ok(isBigInt(-2093280n))
assert.ok(!isBigInt(Object(3n)))
assert.ok(!isBigInt("anything else"))
```