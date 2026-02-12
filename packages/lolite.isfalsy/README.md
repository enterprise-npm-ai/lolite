## isFalsy(value)
Check if a value is *falsy*.
```javascript
const lolite = require("lolite.isfalsy")
const assert = require("node:assert")

assert.ok(lolite.isFalsy(false))
assert.ok(lolite.isFalsy(0))
assert.ok(lolite.isFalsy(0n))
assert.ok(lolite.isFalsy(""))
assert.ok(lolite.isFalsy(null))
assert.ok(lolite.isFalsy(undefined))
assert.ok(lolite.isFalsy()) // if you pass nothing into a function, JS coerces to undefined which is falsy
assert.ok(lolite.isFalsy(NaN))
```
