# lolite.isinteger

### isInteger(value)
Check if a value is an integer primitive.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

assert.ok(isInteger(42))
assert.ok(isInteger(-42))
assert.ok(isInteger(0))
assert.ok(isInteger(-0))

assert.ok(!isInteger(3.14))        // decimals are not integers
assert.ok(!isInteger(-2.5))        // still not integers
assert.ok(!isInteger(Infinity))    // too big to be finite
assert.ok(!isInteger(NaN))         // not a number, ironically
assert.ok(!isInteger(new Number(5))) // boxed numbers are impostors
assert.ok(!isInteger("42"))        // strings are not integers
assert.ok(!isInteger(null))        // null is not an integer
assert.ok(!isInteger(undefined))   // undefined is not an integer
```