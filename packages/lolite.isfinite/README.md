# lolite.isfinite

### isFinite(value)
Check if a value is a finite number primitive.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(isFinite(342))
assert.ok(isFinite(-230))
assert.ok(!isFinite(Infinity))
assert.ok(!isFinite(new Number(10)))
assert.ok(!isFinite("test"))
```