## noop()
Does nothing.
```javascript
const lolite = require("lolite.noop")
const assert = require("node:assert")

assert.ok(lolite.isUndefined(noop())) // noop returns undefined
assert.ok(lolite.isFunction(noop)) // noop is as function
```
