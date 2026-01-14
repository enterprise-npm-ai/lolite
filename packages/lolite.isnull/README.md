## isNull(value)
Check if a value is null.
```javascript
const lolite = require("lolite.isnull")
const assert = require("node:assert")

assert.ok(lolite.isNull(null))
assert.ok(!lolite.isUndefined("anything else"))
```
