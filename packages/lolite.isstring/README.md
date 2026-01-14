# lolite.isstring

### isString(value)
Check if a value is a string primitive.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(isString("test"))
assert.ok(isString(""))
assert.ok(!isString(Object("test")))
assert.ok(!isString(new String("test")))
assert.ok(!isString(/anything else that isn't a string/))
```