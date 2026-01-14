## isBigInt(value)
Check if a value is a bigint primitive.
```javascript
const lolite = require("lolite.isbigint")
const assert = require("node:assert")

assert.ok(lolite.isBigInt(20n))
assert.ok(lolite.isBigInt(-2093280n))
assert.ok(!lolite.isBigInt(Object(3n)))
assert.ok(!lolite.isBigInt("anything else"))
```
