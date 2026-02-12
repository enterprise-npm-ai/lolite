## isFinite(value)
Check if a value is a finite number primitive.
```javascript
const lolite = require("lolite.isfinite")
const assert = require("node:assert")

assert.ok(lolite.isFinite(342))
assert.ok(lolite.isFinite(-230))
assert.ok(!lolite.isFinite(Infinity))
assert.ok(!lolite.isFinite(new Number(10)))
assert.ok(!lolite.isFinite("test"))
```
