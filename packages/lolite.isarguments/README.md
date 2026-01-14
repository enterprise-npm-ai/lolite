# lolite.isarguments

### isArguments(value)
Check if a value is an `arguments` object.
```javascript
const lolite = require("lolite")
const assert = require("node:assert")

(function () {
  assert.ok(isArguments(arguments))
})()

assert.ok(
  isArguments((function () { return arguments })(1, 2, 3))
)

assert.ok(!isArguments([]))                        // arrays are not arguments
assert.ok(!isArguments({}))                        // plain objects are not arguments
assert.ok(!isArguments({ length: 2, 0: "fake" }))  // array-like ≠ arguments
assert.ok(!isArguments({ callee: () => {}, length: 1 })) // nice try
assert.ok(!isArguments("not arguments"))           // strings are not arguments
assert.ok(!isArguments(42))                        // numbers are not arguments
assert.ok(!isArguments(null))                      // null is not arguments
assert.ok(!isArguments(undefined))                 // undefined is not arguments
assert.ok(!isArguments(() => {}))                  // functions are not arguments
```