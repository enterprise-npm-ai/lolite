## isSymbol(value)
Check if a value is a symbol primitive.
```javascript
const lolite = require("lolite.issymbol")
const assert = require("node:assert")

assert.ok(lolite.isSymbol(Symbol("test")))
assert.ok(lolite.isSymbol(Symbol.iterator))
assert.ok(!lolite.isSymbol(Object(Symbol("test"))))
assert.ok(!lolite.isSymbol("not a symbol"))
```
