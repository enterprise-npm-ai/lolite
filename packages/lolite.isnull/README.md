# lolite.isnull

### isNull(value)
Check if a value is null.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(isNull(null))
assert.ok(!lolite.isUndefined("anything else"))
```