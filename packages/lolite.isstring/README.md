## isString(value)
Check if a value is a string primitive.
```javascript
const lolite = require("lolite.isstring")
const assert = require("node:assert")

assert.ok(lolite.isString("test"))
assert.ok(lolite.isString(""))
assert.ok(!lolite.isString(Object("test")))
assert.ok(!lolite.isString(new String("test")))
assert.ok(!lolite.isString(/anything else that isn't a string/))
```
