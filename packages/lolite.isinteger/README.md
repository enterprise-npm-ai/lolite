## isInteger(value)
Check if a value is an integer primitive.
```javascript
const lolite = require("lolite.isinteger")
const assert = require("node:assert")

assert.ok(lolite.isInteger(42))
assert.ok(lolite.isInteger(-42))
assert.ok(lolite.isInteger(0))
assert.ok(lolite.isInteger(-0))

assert.ok(!lolite.isInteger(3.14))        // decimals are not integers
assert.ok(!lolite.isInteger(-2.5))        // still not integers
assert.ok(!lolite.isInteger(Infinity))    // too big to be finite
assert.ok(!lolite.isInteger(NaN))         // not a number, ironically
assert.ok(!lolite.isInteger(new Number(5))) // boxed numbers are impostors
assert.ok(!lolite.isInteger("42"))        // strings are not integers
assert.ok(!lolite.isInteger(null))        // null is not an integer
assert.ok(!lolite.isInteger(undefined))   // undefined is not an integer
```
