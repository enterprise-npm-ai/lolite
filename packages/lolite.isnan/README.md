## isNaN(value)
Check if a value is NaN.
```javascript
const lolite = require("lolite.isnan")
const assert = require("node:assert")

assert.ok(lolite.isNaN(NaN))
assert.ok(!lolite.isNaN("anything else"))
```

### isFinite(value)
Check if a value is a finite number primitive.
```javascript
const lolite = require("lolite.isnan")
const assert = require("node:assert")

assert.ok(lolite.isFinite(342))
assert.ok(lolite.isFinite(-230))
assert.ok(!lolite.isFinite(Infinity))
assert.ok(!lolite.isFinite(new Number(10)))
assert.ok(!lolite.isFinite("test"))
```

### isInteger(value)
Check if a value is an integer primitive.
```javascript
const lolite = require("lolite.isnan")
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

### isSafeInteger(value)
Check if a value is a safe integer primitive.
```javascript
const lolite = require("lolite.isnan")
const assert = require("node:assert")

assert.ok(lolite.isSafeInteger(42))
assert.ok(lolite.isSafeInteger(Number.MAX_SAFE_INTEGER))
assert.ok(lolite.isSafeInteger(Number.MIN_SAFE_INTEGER))

assert.ok(!lolite.isSafeInteger(Math.pow(2, 53))) // Out of bounds
assert.ok(!lolite.isSafeInteger(3.14))            // Not an integer
assert.ok(!lolite.isSafeInteger(Infinity))        // Not finite
assert.ok(!lolite.isSafeInteger("42"))            // String primitive
assert.ok(!lolite.isSafeInteger(42n))             // BigInt is not a Number primitive
```

### isArguments(value)
Check if a value is an `arguments` object.
```javascript
const lolite = require("lolite.isnan")
const assert = require("node:assert")

(function () {
  assert.ok(lolite.isArguments(arguments))
})()

assert.ok(
  lolite.isArguments((function () { return arguments })(1, 2, 3))
)

assert.ok(!lolite.isArguments([]))                        // arrays are not arguments
assert.ok(!lolite.isArguments({}))                        // plain objects are not arguments
assert.ok(!lolite.isArguments({ length: 2, 0: "fake" }))  // array-like ≠ arguments
assert.ok(!lolite.isArguments({ callee: () => {}, length: 1 })) // nice try
assert.ok(!lolite.isArguments("not arguments"))           // strings are not arguments
assert.ok(!lolite.isArguments(42))                        // numbers are not arguments
assert.ok(!lolite.isArguments(null))                      // null is not arguments
assert.ok(!lolite.isArguments(undefined))                 // undefined is not arguments
assert.ok(!lolite.isArguments(() => {}))                  // functions are not arguments
```
